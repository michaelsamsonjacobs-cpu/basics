const { signGpApproveHmac, signPayload } = require('./_lib/syndicate_crypto');

module.exports = async function handler(req, res) {
  const email = String(req.query.email || '').trim().toLowerCase();
  const name = String(req.query.name || '').trim();
  const sig = String(req.query.sig || '').trim();

  if (!email || !sig || sig !== signGpApproveHmac(email, name)) {
    return res.status(403).send('Invalid or expired GP approval signature.');
  }

  const inviteToken = signPayload({
    typ: 'gp_invite',
    email,
    name,
    approved_at: new Date().toISOString(),
    exp: Date.now() + 45 * 24 * 3600 * 1000,
  });

  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host || 'basics.fyi';
  const personalLink = `${proto}://${host}/deals.html?email=${encodeURIComponent(email)}&invite=${encodeURIComponent(inviteToken)}`;
  const mailSubject = encodeURIComponent('Approved: Your BASICS at Berkeley Accredited Syndicate & Deal Room Access');
  const mailBody = encodeURIComponent(
    `Hi ${name || 'there'},\n\nWelcome to the BASICS at Berkeley Accredited Syndicate. Your investor profile has been approved.\n\nAccess our private Deal Room here (personal link tied to ${email} — please do not forward or share publicly):\n${personalLink}\n\nBest,\nMike Jacobs\nBASICS at Berkeley LLC`
  );

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(200).send(`<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>GP Approved — BASICS Syndicate</title>
<style>body{font-family:Inter,system-ui,sans-serif;background:#001a33;color:#fff;padding:2.5rem;max-width:720px;margin:0 auto;line-height:1.55}
.card{background:#002244;border:1px solid rgba(253,181,21,0.3);border-radius:14px;padding:2rem}
code,input{width:100%;padding:10px;background:#001224;border:1px solid rgba(253,181,21,0.25);color:#FDB515;border-radius:6px;font-size:0.88rem;box-sizing:border-box}
a.btn{display:inline-block;margin-top:1rem;background:#FDB515;color:#003262;font-weight:700;padding:12px 20px;border-radius:8px;text-decoration:none}</style></head>
<body><div class="card">
<h2 style="color:#FDB515;margin-top:0;">&#10003; Investor Approved for BASICS Deal Room</h2>
<p><strong>Investor:</strong> ${name} (${email})</p>
<p><strong>1. Personal Signed Deal Room URL (valid 45 days):</strong></p>
<input type="text" readonly value="${personalLink}" onclick="this.select()">
<p style="margin-top:1rem;"><strong>2. Sydecar Lead Tab CSV Row (paste into Sydecar &rarr; Leads):</strong></p>
<input type="text" readonly value="${name},${email}" onclick="this.select()">
<div><a class="btn" href="mailto:${encodeURIComponent(email)}?subject=${mailSubject}&body=${mailBody}">Send Approval Email to ${name || email} &rarr;</a></div>
</div></body></html>`);
};
