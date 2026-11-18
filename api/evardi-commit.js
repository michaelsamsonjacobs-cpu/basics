const { parseCookies, verifyPayload, notifyGpAudit } = require('./_lib/syndicate_crypto');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const cookies = parseCookies(req);
  const claims = verifyPayload(cookies.basics_lp_session);
  if (!claims || claims.typ !== 'lp_session') {
    return res.status(401).json({ error: 'Session expired. Please re-verify accreditation.' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const amountUsd = Number(body.amount_usd || 0);
  const notes = String(body.notes || '').trim();

  if (!Number.isFinite(amountUsd) || amountUsd < 5000) {
    return res.status(400).json({ error: 'Minimum SPV allocation under BASICS at Berkeley LLC is $5,000.' });
  }

  const sydecarUrl = process.env.SYDECAR_EVARDI_URL || '';

  await notifyGpAudit(
    `[EVARDI SPV SOFT COMMIT: $${amountUsd.toLocaleString()}] ${claims.name} (${claims.email})`,
    {
      Deal: 'Evardi (YC) — BASICS at Berkeley LLC SPV ($5k min / 20% carry)',
      Committed_Amount_USD: `$${amountUsd.toLocaleString()}`,
      Investor_Name: claims.name,
      Investor_Email: claims.email,
      Firm: claims.firm || 'Individual Angel',
      Rule_501a_Basis: claims.basis,
      Compliance_Lane: claims.lane,
      Investor_Notes: notes || 'None',
      Sydecar_Redirect_Active: sydecarUrl ? 'YES -> Redirected to Sydecar' : 'QUEUED -> Send Sydecar Soft-Commit Link on Activation',
      Sydecar_Import_CSV: `${claims.name},${claims.email},${amountUsd}`,
      Timestamp_UTC: new Date().toISOString(),
    }
  );

  return res.status(200).json({
    ok: true,
    amount_usd: amountUsd,
    redirect_url: sydecarUrl || null,
    message: sydecarUrl
      ? 'Redirecting you directly to BASICS at Berkeley LLC on Sydecar to finalize your commitment...'
      : `Your $${amountUsd.toLocaleString()} Soft Commit in the BASICS at Berkeley — Evardi (YC) SPV ($5,000 min / 20% carry) is logged! Your direct 1-click Sydecar execution link will be dispatched to ${claims.email}.`,
  });
};
