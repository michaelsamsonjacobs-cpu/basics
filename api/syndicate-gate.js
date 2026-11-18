const crypto = require('crypto');
const {
  isPreExistingEmail,
  signPayload,
  verifyPayload,
  signGpApproveHmac,
  notifyGpAudit,
} = require('./_lib/syndicate_crypto');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const email = String(body.email || '').trim().toLowerCase();
  const fullName = String(body.full_name || '').trim();
  const firm = String(body.firm || '').trim();
  const accBasis = String(body.accreditation_basis || '').trim();
  const checkBand = String(body.check_band || '').trim();
  const priorDeals = String(body.prior_deals || '').trim();
  const ndaAccepted = Boolean(body.nda_accepted);
  const inviteToken = String(body.invite_token || '').trim();

  if (!email || !email.includes('@') || !fullName || !accBasis || !ndaAccepted) {
    return res.status(400).json({
      error: 'Please complete your name, email, SEC Rule 501(a) accreditation basis, and confidentiality attestation.',
    });
  }

  const ipRaw = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown');
  const ipHash = crypto.createHash('sha256').update(ipRaw).digest('hex').slice(0, 16);
  const nowIso = new Date().toISOString();

  // Check if user has a valid GP-signed invite token OR is in the 1,652 pre-existing Berkeley investor network
  const inviteClaims = inviteToken ? verifyPayload(inviteToken) : null;
  const inviteMatches = inviteClaims && inviteClaims.typ === 'gp_invite' && inviteClaims.email === email;
  const preExisting = isPreExistingEmail(email) || Boolean(inviteMatches);

  if (preExisting) {
    const sessionToken = signPayload({
      typ: 'lp_session',
      email,
      name: fullName,
      firm,
      basis: accBasis,
      lane: inviteMatches ? 'gp_approved_invite' : 'pre_existing_network',
      attested_at: nowIso,
      exp: Date.now() + 14 * 24 * 3600 * 1000,
    });

    const isSecure = (req.headers['x-forwarded-proto'] || 'https') === 'https';
    res.setHeader(
      'Set-Cookie',
      `basics_lp_session=${encodeURIComponent(sessionToken)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=1209600${isSecure ? '; Secure' : ''}`
    );

    await notifyGpAudit(`[BASICS 506b UNLOCKED] ${fullName} (${email}) entered Deal Room`, {
      Investor_Name: fullName,
      Email: email,
      Firm: firm || 'Individual Angel',
      Compliance_Lane: inviteMatches ? 'GP-Approved Invite Token' : 'Pre-Existing Berkeley Network Allowlist',
      Rule_501a_Basis: accBasis,
      Typical_Check_Band: checkBand,
      Prior_Venture_Deals: priorDeals,
      Confidentiality_NDA_Accepted: 'YES (' + nowIso + ')',
      IP_SHA256: ipHash,
      Sydecar_Lead_CSV_Row: `${fullName},${email},${checkBand}`,
    });

    return res.status(200).json({
      status: 'approved',
      lane: inviteMatches ? 'gp_approved_invite' : 'pre_existing_network',
    });
  }

  // Lane 2: Cold website inbound -> Citizen VC Substantive Suitability Review + 1-Click GP Approval URL
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host || 'basics.fyi';
  const gpSig = signGpApproveHmac(email, fullName);
  const approveUrl = `${proto}://${host}/api/gp-approve?email=${encodeURIComponent(email)}&name=${encodeURIComponent(fullName)}&sig=${encodeURIComponent(gpSig)}`;

  await notifyGpAudit(`[BASICS SYNDICATE REVIEW] New Inbound Accredited Profile: ${fullName} (${firm || 'Angel'})`, {
    Action_1Click_Approve: approveUrl,
    Investor_Name: fullName,
    Email: email,
    Firm: firm || 'Individual Angel',
    Rule_501a_Basis: accBasis,
    Typical_Check_Band: checkBand,
    Prior_Venture_Deals: priorDeals,
    Sector_Notes: String(body.notes || ''),
    Confidentiality_NDA_Accepted: 'YES (' + nowIso + ')',
    Compliance_Rule: 'SEC Rule 506(b) Citizen VC — Approve substantive relationship before sharing live SPV link',
    IP_SHA256: ipHash,
  });

  return res.status(200).json({
    status: 'pending_gp_review',
    message:
      'Thank you — your Accredited Suitability Profile has been logged for BASICS at Berkeley LLC GP review. Once our team confirms your substantive investor profile, we will email your private 1-click Deal Room & Sydecar syndicate link.',
  });
};
