const { parseCookies, verifyPayload } = require('./_lib/syndicate_crypto');

module.exports = async function handler(req, res) {
  const cookies = parseCookies(req);
  const claims = verifyPayload(cookies.basics_lp_session);
  if (!claims || claims.typ !== 'lp_session') {
    return res.status(401).json({ authenticated: false });
  }

  return res.status(200).json({
    authenticated: true,
    investor: {
      email: claims.email,
      name: claims.name,
      firm: claims.firm,
      lane: claims.lane,
    },
    deal: {
      slug: 'evardi-yc',
      company: 'Evardi',
      tagline: 'AI Agents & Live Network Models for Electric Utilities',
      cohort: 'UC Berkeley BASICS (Fall 2025) -> Y Combinator',
      founders: 'Diva Shah (CEO, UC Berkeley) & Aarya Borele (CTO, UC Berkeley)',
      yc_url: 'https://www.ycombinator.com/companies/evardi',
      pitch_youtube_id: 'XVYVPxashIM',
      spv_entity: 'BASICS at Berkeley LLC (via Sydecar.io Delaware Series SPV)',
      min_check_usd: 5000,
      carry_pct: 20,
      mgmt_fee_pct: 0,
      cap_table_structure: 'Single-Line Entry on Evardi YC SAFE (Automated KYC, DocuSign & Lifetime K-1s via Sydecar)',
      sydecar_live_connected: Boolean(process.env.SYDECAR_EVARDI_URL),
      ready_gate_score: 94,
      highlights: [
        'Originated inside UC Berkeley COGSCI 198 / BASICS Fall 2025 cohort and selected into Y Combinator.',
        'Builds physics-aware live grid network models and autonomous engineering agents for electric utilities facing surging AI data-center & electrification load.',
        'Clean single-line SPV structure administered by Sydecar.io under BASICS at Berkeley LLC: $5,000 minimum check, 0% annual management fee, 20% carry.',
      ],
      watermark: `CONFIDENTIAL — PREPARED EXCLUSIVELY FOR ${claims.email.toUpperCase()} — NO PUBLIC SHARING OR TWEETS (SEC RULE 506(b))`,
    },
  });
};
