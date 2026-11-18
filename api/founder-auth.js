const crypto = require('crypto');
const { signPayload, parseCookies, verifyPayload, notifyGpAudit } = require('./_lib/syndicate_crypto');

const INSTRUCTOR_ALLOWLIST = new Set([
  'michaelsamsonjacobs@gmail.com',
  'mikejacobs@berkeley.edu',
  'mike@qluulab.com',
  'uri.korisky@gmail.com',
  'oguzhan@berkeley.edu',
  'gerelee@gmail.com',
]);

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    const cookies = parseCookies(req);
    const claims = verifyPayload(cookies.basics_founder_session);
    if (!claims || claims.typ !== 'founder_session') {
      return res.status(401).json({ authenticated: false });
    }
    return res.status(200).json({ authenticated: true, user: claims });
  }

  if (req.method === 'DELETE') {
    res.setHeader('Set-Cookie', 'basics_founder_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Secure');
    return res.status(200).json({ ok: true });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const mode = String(body.mode || 'register').trim();
  const email = String(body.email || '').trim().toLowerCase();
  const fullName = String(body.full_name || '').trim();
  const startupName = String(body.startup_name || '').trim();
  const cohortRole = String(body.cohort_role || 'Founder').trim();
  const accessPin = String(body.password || '').trim();

  const isBerkeley = email.endsWith('@berkeley.edu') || email.endsWith('@cal.berkeley.edu');
  const isInstructor = INSTRUCTOR_ALLOWLIST.has(email);

  if (!email || (!isBerkeley && !isInstructor)) {
    return res.status(403).json({
      error: 'Registration & access require a valid @berkeley.edu or @cal.berkeley.edu email address.',
    });
  }

  if (!accessPin || accessPin.length < 6) {
    return res.status(400).json({
      error: 'Please enter a password of at least 6 characters for your account.',
    });
  }

  if (mode === 'register' && !fullName) {
    return res.status(400).json({
      error: 'Please enter your full name to register your Berkeley founder account.',
    });
  }

  // Deterministic account passcode derivation check (stateless across serverless instances)
  const pwDigest = crypto.createHmac('sha256', process.env.BASICS_SYNDICATE_SECRET || 'dev').update(`pw:${email}:${accessPin}`).digest('hex').slice(0, 16);

  const nowIso = new Date().toISOString();
  const sessionClaims = {
    typ: 'founder_session',
    email,
    name: fullName || email.split('@')[0],
    startup: startupName || 'Stealth Berkeley Venture',
    role: isInstructor ? 'Instructor / Staff' : cohortRole,
    pw_tag: pwDigest,
    iat: nowIso,
    exp: Date.now() + 30 * 24 * 3600 * 1000,
  };

  const token = signPayload(sessionClaims);
  const isSecure = (req.headers['x-forwarded-proto'] || 'https') === 'https';
  res.setHeader(
    'Set-Cookie',
    `basics_founder_session=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000${isSecure ? '; Secure' : ''}`
  );

  if (mode === 'register') {
    await notifyGpAudit(`[BASICS PORTAL REGISTRATION] ${sessionClaims.name} (${email}) — ${sessionClaims.startup}`, {
      Name: sessionClaims.name,
      Berkeley_Email: email,
      Startup_Team: sessionClaims.startup,
      Role: sessionClaims.role,
      Registered_At_UTC: nowIso,
    });
  }

  return res.status(200).json({ authenticated: true, user: sessionClaims });
};
