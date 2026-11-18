const { parseCookies, verifyPayload } = require('./_lib/syndicate_crypto');

const CURRICULUM = {
  course_code: 'COGSCI 198',
  course_title: 'Startup Battle School: Building AI-Powered Ventures',
  instructor: 'Michael Jacobs',
  chapters: [
  {
    "id": "s1",
    "session": "Module 1 \u00b7 Session 1",
    "title": "Business 101, Cognitive Science & Lean AGI",
    "est_time": "25 min lesson + quiz + thesis lab",
    "objectives": [
      "Understand the 4-stage startup lifecycle: Conception -> Validation -> Repeatable GTM -> Scale.",
      "Apply cognitive science principles (bounded rationality, cognitive load, human-in-the-loop verification) to AI copilot workflows.",
      "Distinguish 'AI wrapper features' from durable workflow + proprietary-data moats."
    ],
    "lesson_html": "\n            <h4>1.1 Why <em>Ender's Game</em> &amp; Cognitive Science Anchor Startup Battle School</h4>\n            <p>Most technical founders fail not because they cannot write code, but because they build in a cognitive echo chamber\u2014optimizing an elegant system for a problem nobody urgently pays to solve. In <em>COGSCI 198</em>, we treat venture building as applied cognitive science: understanding how human buyers perceive risk, switch habits, and delegate decisions to AI systems.</p>\n            <p>Just as Ender Wiggin treated simulation and AI tactical displays as force multipliers while questioning every hidden assumption of the game, a Lean AGI founder uses AI copilots to compress months of market research, prototyping, and financial modeling into days\u2014while keeping human judgment strictly on customer truth.</p>\n            <h4>1.2 The Four Stages of a Venture (And Why Skipping Stage 2 Is Fatal)</h4>\n            <table>\n                <thead><tr><th>Stage</th><th>Primary Goal</th><th>Fatal Mistake</th></tr></thead>\n                <tbody>\n                    <tr><td><strong>1. Problem &amp; Thesis</strong></td><td>Isolate an urgent, budgeted pain in a specific persona</td><td>Starting with \"a cool LLM agent\" and hunting for a user</td></tr>\n                    <tr><td><strong>2. Customer Validation</strong></td><td>15+ structured discovery conversations proving willingness to pay</td><td>Asking friends \"would you use this?\" instead of auditing current spend</td></tr>\n                    <tr><td><strong>3. Manual / Concierge Sales</strong></td><td>Close first 3\u201310 design partners personally</td><td>Buying ads or hiring marketers before closing a single human sale</td></tr>\n                    <tr><td><strong>4. Scalable GTM &amp; Capital</strong></td><td>Repeatable LTV/CAC &ge; 3x + institutional seed/accelerator raise</td><td>Premature scaling (\"Jumping the Shark\") on leaky retention</td></tr>\n                </tbody>\n            </table>\n            <h4>1.3 Cohort Case Study \u2014 How Evardi Evolved From BASICS to Y Combinator</h4>\n            <p>When UC Berkeley co-founders <strong>Diva Shah</strong> and <strong>Aarya Borele</strong> entered BASICS, they did not pitch generic \"AI for energy.\" Through relentless operator interviews, they isolated a severe bottleneck inside electric utilities: grid planning engineers drowning in static network models as data-center &amp; EV load surged. Focusing on live network models + workflow agents took them from COGSCI 198 straight into <strong>Y Combinator</strong>.</p>\n        ",
    "video_id": "XVYVPxashIM",
    "video_caption": "Case Study Video: Watch BASICS alum Evardi's 3-minute Demo Day pitch before completing the check below.",
    "quiz": [
      {
        "q": "Why does Startup Battle School prohibit spending on paid marketing in Weeks 1\u20133?",
        "options": [
          "Because founders must validate an urgent problem and prove they can close sales personally before amplifying with marketing spend.",
          "Because enterprise software companies never use marketing.",
          "Because VCs forbid marketing budgets in SAFE rounds."
        ],
        "correct": 0
      },
      {
        "q": "What separates a defensible AI venture from a thin 'AI wrapper'?",
        "options": [
          "Training a custom foundation model from scratch before talking to users.",
          "Deep integration into a high-stakes domain workflow, proprietary customer telemetry/data loops, and measurable ROI.",
          "Adding more chat prompts to the landing page."
        ],
        "correct": 1
      }
    ],
    "deliverable_label": "Team Deliverable (Unlocks After Reading & Quiz): State your specific target buyer persona, the painful status-quo workflow they pay to endure today, and your initial 3-hypothesis venture thesis.",
    "deliverable_placeholder": "Example: Regional electric utility grid-interconnection engineers currently spend 6 weeks manually running power-flow studies per queue request..."
  },
  {
    "id": "s2",
    "session": "Module 2 \u00b7 Session 2",
    "title": "The Problem, Beachhead Segmentation & Bottom-Up TAM",
    "est_time": "30 min lesson + quiz + TAM simulator",
    "objectives": [
      "Segment a broad market into a narrow, winnable Beachhead Market where word-of-mouth spreads among peers.",
      "Compute a rigorous Bottom-Up TAM / SAM / SOM (Reachable Buyers \u00d7 Annual Contract Value) rather than lazy top-down percentages.",
      "Run unbiased customer discovery interviews that uncover real budget and frequency of pain."
    ],
    "lesson_html": "\n            <h4>2.1 Top-Down vs. Bottom-Up TAM (Why VCs Instantly Reject \"1% of a $50B Market\")</h4>\n            <p>Writing <em>\"The global logistics market is $100B; if we capture 1%, we make $1B\"</em> signals amateur guesswork. Institutional investors and serious operators calculate market size <strong>bottom-up</strong>:</p>\n            <p style=\"background:rgba(0,0,0,0.3);padding:10px 14px;border-left:3px solid #FDB515;border-radius:6px;\">\n                <code>Bottom-Up SAM = (# of Verified Target Accounts Matching Persona) &times; (Realistic Annual Contract Value [ACV])</code>\n            </p>\n            <h4>2.2 Defining Your Beachhead Customer Profile</h4>\n            <ul>\n                <li><strong>Economic Buyer vs. End User:</strong> Who feels the daily pain at 2:00 PM on a Tuesday, and whose budget line actually signs the PO?</li>\n                <li><strong>Trigger Event:</strong> What regulatory deadline, cost spike, or staffing bottleneck forces them to act <em>this quarter</em> instead of \"someday\"?</li>\n                <li><strong>Discovery Rule:</strong> Never pitch your solution in the first 15 minutes of a discovery call. Ask: <em>\"Walk me through the last time [problem X] happened. What did it cost you? What workaround are you paying for right now?\"</em></li>\n            </ul>\n        ",
    "simulator": "tam_ltv",
    "quiz": [
      {
        "q": "Which of the following is a valid Bottom-Up market sizing statement?",
        "options": [
          "Global healthcare IT is $400B, and capturing 0.5% gives us $2B ARR.",
          "There are 3,200 U.S. municipal & coop electric utilities; at a $45,000/yr seat+model license, our U.S. beachhead SAM is $144M/yr.",
          "Everyone with a smartphone is a potential user."
        ],
        "correct": 1
      },
      {
        "q": "In a customer discovery interview, what is the strongest signal of real demand?",
        "options": [
          "The interviewee says 'That sounds super cool, keep me posted!'",
          "The interviewee is already spending money, headcount, or painful manual hours on a broken workaround today.",
          "Your co-founder likes the UI mockup."
        ],
        "correct": 1
      }
    ],
    "deliverable_label": "Team Deliverable: Document your exact Beachhead Persona, your Bottom-Up TAM/SAM/SOM calculation, and findings from your first 10\u201315 customer interviews.",
    "deliverable_placeholder": "1. Beachhead Persona & Economic Buyer:\n2. Bottom-Up Calculation (N accounts x $ACV):\n3. Top 3 verbatim takeaways from customer interviews:"
  },
  {
    "id": "s3",
    "session": "Module 3 \u00b7 Session 3",
    "title": "Product Design, User Stories & Primary Market Research",
    "est_time": "25 min lesson + quiz + roadmap artifact",
    "objectives": [
      "Translate messy interview transcripts into rigorous User Story syntax tied to measurable customer value.",
      "Scope a 2-week Minimum Lovable Prototype that tests the single riskiest value assumption.",
      "Instrument quantitative usage & time-saved metrics from Day 1."
    ],
    "lesson_html": "\n            <h4>3.1 Canonical User Story Syntax</h4>\n            <p>Every feature in your MVP must earn its existence through a falsifiable user story:</p>\n            <p style=\"background:rgba(0,0,0,0.3);padding:10px 14px;border-left:3px solid #FDB515;border-radius:6px;\">\n                <code>As a [Specific Role], I want to [Action / Workflow] so that [Quantified Time, Revenue, or Risk Outcome].</code>\n            </p>\n            <h4>3.2 Scoping the Minimum Lovable Product (MLP)</h4>\n            <p>Do not build settings pages, billing portals, or custom auth before proving core workflow magic. If an AI copilot + human-in-the-loop wizard-of-oz backend can deliver the exact output a customer pays $2,000/month for within 24 hours, test value delivery <em>this week</em> and automate the bottleneck second.</p>\n        ",
    "quiz": [
      {
        "q": "What belongs in Week 1 of your product build?",
        "options": [
          "Dark/light mode toggles, OAuth for 6 providers, and a custom billing engine.",
          "The single core workflow loop that delivers measurable value to 3 design-partner users.",
          "A 40-page architecture whitepaper with zero user tests."
        ],
        "correct": 1
      },
      {
        "q": "Why must every user story end with 'so that [quantified outcome]'?",
        "options": [
          "Because customers buy measurable time saved, revenue gained, or risk eliminated\u2014not feature checkboxes.",
          "To make Jira tickets longer.",
          "Because engineers prefer longer sentences."
        ],
        "correct": 0
      }
    ],
    "deliverable_label": "Team Deliverable: List your top 3 validated User Stories, your live prototype/repo URL, and the #1 metric proving a user got value.",
    "deliverable_placeholder": "User Story 1:\nUser Story 2:\nPrototype URL & measured user outcome:"
  },
  {
    "id": "s4",
    "session": "Module 4 \u00b7 Session 4",
    "title": "Sales, Growth, Unit Economics & Partnership Need Matrix",
    "est_time": "30 min lesson + quiz + LTV/CAC & outreach lab",
    "objectives": [
      "Master the founder-led sales funnel: Lead Sourcing -> Qualification -> Pilot/Close -> Expansion.",
      "Calculate CAC, Churn, LTV, and LTV/CAC (>= 3.0x target) before spending $1 on marketing.",
      "Build a Partner Need Matrix so channel partners accelerate distribution without product distraction."
    ],
    "lesson_html": "\n            <h4>4.1 Core Law: \"Know You Can Make Sales Before You Spend on Marketing!\"</h4>\n            <p>That is why Session 4 (Sales) intentionally comes <em>before</em> Session 5 (Marketing) in COGSCI 198. If founders cannot convince 5 target buyers face-to-face or over targeted 1-to-1 outreach, pouring money into ads only burns cash faster.</p>\n            <h4>4.2 Essential Sales &amp; Retention Unit Economics</h4>\n            <table>\n                <thead><tr><th>Metric</th><th>Formula</th><th>Healthy Benchmark</th></tr></thead>\n                <tbody>\n                    <tr><td><strong>CAC</strong> (Customer Acquisition Cost)</td><td>Total Sales &amp; Marketing Spend &divide; New Customers Won</td><td>Payback &le; 12 months</td></tr>\n                    <tr><td><strong>LTV</strong> (Lifetime Value)</td><td>(Annual Contract Value &times; Gross Margin %) &divide; Annual Logo Churn %</td><td>&ge; 3&times; CAC</td></tr>\n                    <tr><td><strong>LTV : CAC Ratio</strong></td><td>LTV &divide; CAC</td><td><strong>3.0x \u2013 5.0x+</strong></td></tr>\n                </tbody>\n            </table>\n            <h4>4.3 Strategic Partnerships &amp; The Partner Need Matrix</h4>\n            <p>Great startups pair with established incumbents who already own customer trust but lack agile AI software (zero product overlap). Map every prospective partner across: <em>(1) What Customer Access They Have, (2) What Gap Our Product Fills for Them, and (3) Concrete Co-Sell / Pilot Next Step</em>.</p>\n        ",
    "simulator": "tam_ltv",
    "quiz": [
      {
        "q": "If your startup charges $12,000 ACV at 80% gross margin with 20% annual churn, and CAC is $12,000, what is your LTV:CAC ratio?",
        "options": [
          "1.0x ($12,000 / $12,000)",
          "4.0x (LTV = $9,600 / 0.20 = $48,000; $48,000 / $12,000 = 4.0x)",
          "0.2x"
        ],
        "correct": 1
      },
      {
        "q": "What makes an ideal early channel/technology partner?",
        "options": [
          "A direct competitor building the exact same software.",
          "A company that already sells to your exact buyer persona, has zero product overlap with you, and wins bigger deals by bundling your capability.",
          "A company in a completely unrelated industry with no shared buyers."
        ],
        "correct": 1
      }
    ],
    "deliverable_label": "Team Deliverable: Paste your outbound sales funnel conversion metrics (prospects contacted -> calls -> pilots/LOIs) + 2 high-fit partners in your Partner Need Matrix.",
    "deliverable_placeholder": "Outbound Funnel (Contacted / Replied / Meetings / Pilots):\nLTV & CAC Estimate:\nTop 2 Channel Partners:"
  },
  {
    "id": "s5",
    "session": "Module 5 \u00b7 Session 5",
    "title": "AI-Powered Marketing & Avoiding 'Jumping the Shark'",
    "est_time": "20 min lesson + quiz + experiment plan",
    "objectives": [
      "Design low-cost, high-signal digital acquisition experiments with clear falsification thresholds.",
      "Match growth velocity to operational & retention readiness so you never 'Jump the Shark' by scaling a leaky bucket."
    ],
    "lesson_html": "\n            <h4>5.1 Experiment-Driven Growth</h4>\n            <p>Once founder-led sales prove repeatability, marketing turns 1-to-1 messaging into 1-to-many leverage. Treat every channel (technical content, product-led viral loops, targeted communities, outbound sequences) as a scientific experiment: pre-declare hypothesis, spend cap ($100\u2013$500), target conversion rate, and implied CAC.</p>\n            <h4>5.2 Not \"Jumping the Shark\"</h4>\n            <p>Scaling top-of-funnel traffic when onboarding breaks or 30-day retention is &lt;20% poisons word-of-mouth in tight B2B/campus ecosystems. Sustainable growth compounds from high Net Dollar Retention (NDR &gt; 100%) + disciplined channel payback.</p>\n        ",
    "quiz": [
      {
        "q": "What does 'Jumping the Shark' mean in startup growth?",
        "options": [
          "Aggressively scaling marketing spend before retention and onboarding actually work, burning reputation and cash.",
          "Presenting to venture capitalists on Demo Day.",
          "Charging annual upfront contracts."
        ],
        "correct": 0
      },
      {
        "q": "Before running a growth experiment, what three numbers should a founder write down?",
        "options": [
          "Logo color, font family, and domain extension.",
          "Budget cap, target conversion rate, and maximum acceptable CAC.",
          "Series C valuation target."
        ],
        "correct": 1
      }
    ],
    "deliverable_label": "Team Deliverable: Specify 2 concrete acquisition experiments, their hypotheses, and measured conversion / CAC results.",
    "deliverable_placeholder": "Experiment 1 (Channel, Hypothesis, Result):\nExperiment 2 (Channel, Hypothesis, Result):"
  },
  {
    "id": "s6",
    "session": "Module 6 \u00b7 Session 6",
    "title": "Finance Essentials, Accounting & 24-Month Pro-Forma",
    "est_time": "25 min lesson + quiz + financial model check",
    "objectives": [
      "Read and connect the Balance Sheet (Assets = Liabilities + Equity), Income Statement, and Cash Flow Statement.",
      "Distinguish Gross Margin (after inference/cloud/COGS) from operating margin (EBIT / EBITDA).",
      "Build an honest 18\u201324 month burn, runway, and hiring pro-forma."
    ],
    "lesson_html": "\n            <h4>6.1 The Numbers Every Technical Founder Must Know Cold</h4>\n            <ul>\n                <li><strong>Fundamental Accounting Identity:</strong> <code>Assets = Liabilities + Stockholders' Equity</code></li>\n                <li><strong>Gross Margin % (Crucial for AI Startups!):</strong> <code>(Revenue &minus; LLM API / GPU Inference / Hosting COGS) &divide; Revenue</code>. If an AI app charges $20/mo and spends $18/mo on frontier API tokens, it has a 10% gross margin\u2014not an 80% SaaS margin!</li>\n                <li><strong>Net Burn &amp; Runway:</strong> <code>Runway (Months) = Cash Balance &divide; Monthly Net Cash Burn</code>. Always raise when you have &ge;9 months of runway, never 6 weeks.</li>\n            </ul>\n        ",
    "quiz": [
      {
        "q": "An AI startup earns $50,000 MRR and pays $15,000/month in cloud GPU & model API inference costs directly serving customers, plus $25,000/month in engineering salaries. What is its Gross Margin?",
        "options": [
          "20% ($10,000 / $50,000)",
          "70% (($50,000 - $15,000) / $50,000)",
          "100%"
        ],
        "correct": 1
      },
      {
        "q": "Which equation must always balance on a company's Balance Sheet?",
        "options": [
          "Revenue = Expenses + Taxes",
          "Assets = Liabilities + Equity",
          "ARR = 12 \u00d7 CAC"
        ],
        "correct": 1
      }
    ],
    "deliverable_label": "Team Deliverable: Summarize your Gross Margin structure (including AI inference COGS), monthly burn, and 18-month milestone plan.",
    "deliverable_placeholder": "Pricing & Gross Margin % after AI COGS:\nMonthly Burn & Runway Plan:\nKey Milestones Unlocked by Pre-Seed Capital:"
  },
  {
    "id": "s7",
    "session": "Module 7 \u00b7 Session 7",
    "title": "Venture Capital Math, Post-Money SAFEs & Deal Memos",
    "est_time": "30 min lesson + quiz + SAFE dilution simulator",
    "objectives": [
      "Understand VC fund math (power-law fund returners) and calibrate both emotional and analytical pitch narratives.",
      "Calculate exact founder dilution on a Post-Money YC SAFE (Investor % = Raise / Post-Money Valuation Cap).",
      "Write a crisp 1-Page Executive Summary & understand how VCs write internal Investment Memos."
    ],
    "lesson_html": "\n            <h4>7.1 Venture Capital Power-Law Math</h4>\n            <p>A $100M seed fund must return $300M+ to be top-quartile. If the fund owns 10% of your startup at seed, a \"$30M exit\" returns only $3M (3% of the fund\u2014barely moving the needle), whereas a $1B outcome returns $100M (1.0x the entire fund!). When pitching VCs, show both <strong>grounded immediate wedge traction</strong> AND <strong>credible expansion into a category-defining platform</strong>.</p>\n            <h4>7.2 Post-Money YC SAFE Math (No Surprises on Your Cap Table)</h4>\n            <p style=\"background:rgba(0,0,0,0.3);padding:10px 14px;border-left:3px solid #FDB515;border-radius:6px;\">\n                <code>SAFE Investor Ownership % = Investment Amount &divide; Post-Money Valuation Cap</code><br>\n                <em>Example:</em> Raising $1.5M on a $15M Post-Money SAFE sells exactly <strong>10.0%</strong> of the company prior to the Series A option-pool shuffle. Stacking three separate SAFEs ($500K @ $10M = 5%, $1M @ $12.5M = 8%, $1M @ $20M = 5%) sells <strong>18.0% total</strong>.\n            </p>\n        ",
    "simulator": "safe_sim",
    "quiz": [
      {
        "q": "You raise $1,200,000 on a $12,000,000 Post-Money YC SAFE, plus another $500,000 on a $10,000,000 Post-Money YC SAFE. How much total ownership have those SAFE investors locked in?",
        "options": [
          "10.0%",
          "15.0% (10.0% + 5.0%)",
          "17.0%"
        ],
        "correct": 1
      },
      {
        "q": "Why do BASICS syndicates use a single-line SPV (e.g., via Sydecar) when pooling 20 alumni angels?",
        "options": [
          "So the startup keeps a clean cap table with 1 entity signature instead of chasing 20 separate wires and signatures.",
          "To avoid building a product.",
          "To replace customer revenue."
        ],
        "correct": 0
      }
    ],
    "deliverable_label": "Team Deliverable: Draft your 1-Page BASICS Executive Summary (Problem, Solution, Traction, Business Model, Team, Target Raise) & link your data room.",
    "deliverable_placeholder": "1-Page Executive Summary / Deck Link:\nTarget Pre-Seed Raise & Use of Funds:"
  },
  {
    "id": "s8_15",
    "session": "Module 8 \u00b7 Sessions 8\u201315",
    "title": "Powerful Presentations, Mentor Madness & Ready-Gate Sign-Off",
    "est_time": "Final Pitch & 100-Pt Ready-Gate Audit",
    "objectives": [
      "Deliver a crystal-clear 3-minute Demo Day pitch combining undeniable customer proof, product live motion, and founder authority.",
      "Incorporate candid feedback from Mentor Madness 1-on-1 sessions.",
      "Clear >= 80/100 on the BASICS Ready-Gate to unlock curated Berkeley Investor Syndicate & YC introductions."
    ],
    "lesson_html": "\n            <h4>8.1 The BASICS Ready-Gate Standard (100-Point Rubric)</h4>\n            <p>BASICS never blasts raw student pitches to Berkeley VCs. Our entire network reputation rests on one rule: <strong>nobody unlocks investor intros until they clear &ge;80/100 across the five course pillars</strong> and pass human instructor/mentor review:</p>\n            <ul>\n                <li><strong>Startup Concept &amp; Market Thesis:</strong> 30 pts</li>\n                <li><strong>Customer Discovery &amp; Verified Feedback:</strong> 20 pts</li>\n                <li><strong>Cohort &amp; Mentor Madness Participation:</strong> 20 pts</li>\n                <li><strong>Go-To-Market &amp; Early Sales Proof:</strong> 20 pts</li>\n                <li><strong>Investor Pitch &amp; 1-Page Executive Summary:</strong> 10 pts</li>\n            </ul>\n        ",
    "quiz": [
      {
        "q": "What unlocks curated introductions to the BASICS Berkeley Investor Network?",
        "options": [
          "Simply enrolling on Day 1.",
          "Completing the curriculum deliverables, clearing >=80/100 on the Ready-Gate rubric, and passing human staff/mentor sign-off.",
          "Cold-emailing 2,000 investors without a working prototype."
        ],
        "correct": 1
      },
      {
        "q": "In a 3-minute Demo Day pitch, what carries the highest persuasive weight?",
        "options": [
          "Real customer traction/LOIs, a crisp live product demonstration, and bottom-up unit economics.",
          "10 slides of buzzwords with no product screen.",
          "Reading 400 words off a slide."
        ],
        "correct": 0
      }
    ],
    "deliverable_label": "Final Ready-Gate Submission: Paste your 3-Minute Demo Video URL, Final Pitch Deck URL, and 1-Page Executive Summary URL for Instructor & Mentor Sign-Off.",
    "deliverable_placeholder": "Demo Video URL:\nPitch Deck URL:\n1-Page Executive Summary URL:"
  }
],
};

module.exports = async function handler(req, res) {
  const cookies = parseCookies(req);
  const claims = verifyPayload(cookies.basics_founder_session);
  if (!claims || claims.typ !== 'founder_session') {
    return res.status(401).json({ error: 'Registered @berkeley.edu login required.' });
  }
  return res.status(200).json({ user: claims, curriculum: CURRICULUM });
};
