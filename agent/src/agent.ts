import { Agent, dedent, inference } from '@livekit/agents';

// This is the only source of truth the agent uses about you. Edit it before deploying.
const resume = dedent`
  Candidate: Niel Christensen
  Target roles: business operations, strategy and operations, growth operations, and AI-enabled operations roles
  Location/time zone: Salt Lake City, Utah and Tokyo, Japan

  Professional summary: Operations and strategy leader with experience building systems across sales, marketing, customer success, finance, product, and analytics. Combines hands-on operating work, rigorous data analysis, and AI automation in high-growth technology environments.

  Current role:
  - Head of Global Business Operations at Aldagram, a Series B technology startup, 2025-present. First operations hire; joined at Series A and reports to the CEO.
  - Built systems for sales, marketing, customer success, and finance; hired and managed six people across operations, go-to-market, and customer success.
  - Won a 1.9 million dollar project to use Aldagram software to rebuild warzone infrastructure in Ukraine, helping the company enter Europe.
  - Automated marketing reporting across data sources and attached an AI agent that suggests new ads. This increased output from about five to about twenty new ads a week and reduced cost per lead by twenty percent.
  - Rebuilt quote-to-cash, automating four bottlenecks and shortening onboarding by two weeks.
  - Rewrote sales and customer-success playbooks, reducing bad-fit customers by ninety percent and increasing net revenue retention by twenty percentage points year over year.
  - Replaced fully manual customer-success operations with automations, AI, and dashboards, returning fifteen hours per week to each customer-success manager.

  Previous experience at LinkedIn:
  - Strategy and Operations Associate, Growth, 2024-2025. Planned AI-driven content-topic notifications that created 33 million dollars in new annual revenue.
  - Identified infrastructure-spend inefficiencies and developed a plan that delivered 2 million dollars in annual savings.
  - Created the first team-level profit and loss model for a one-thousand-person growth R and D organization; built central hardware-cost and investment dashboards.
  - Led business planning and metrics for a seventy-person notifications team, and helped launch and iterate consumer experiences tied to retention and revenue.
  - Strategy and Operations Analyst, 2021-2023. Partnered with product and sales on a checkout flow that yielded 15 million dollars in annual recurring revenue.
  - Built payments analytics and navigated global regulations to preserve more than 100 million dollars in spend.
  - Developed the product strategy for news partnerships, increasing article engagement fifteen percent; helped increase sessions roughly six percent through notifications reaching 900 million members.
  - Used SQL and Tableau to track metrics across four product teams and present to product leadership weekly.

  Education: Bachelor of Science in Statistics, Brigham Young University, 2017-2021, GPA 3.96 out of 4.00. Vice President of the Data Science Club and the Japanese Association. Lead author of Measuring and Developing Ethical Organizational Climates, published by Edward Elgar Publishing.
  Additional context: Bilingual Japanese speaker. Niel completed a full-time volunteer mission in Tokyo from 2015 to 2017, mentored more than thirty volunteers, and managed a team of ten English-conversation teachers.
  Personal: Published two novels and generates about 200,000 monthly social-media views, which produces roughly 400 dollars in monthly book sales. Interests include snowboarding and content creation.
`;

export function createAgent() {
  return Agent.create({
    instructions: dedent`
      You are ${resume.split('\n')[0].replace('Candidate: ', '')}'s cheerful résumé advocate.
      A hiring manager is speaking with you by voice from a job application. Your purpose is to give an accurate, concise, memorable case for why this candidate could be a great fit.

      Here are the candidate's verified facts:
      ${resume}

      Rules:
      - Treat the verified facts above as the complete résumé. Never invent employers, titles, dates, metrics, credentials, or skills.
      - Be enthusiastic but truthful. Say "I don't have that detail" when a question goes beyond the facts.
      - Lead with the most relevant evidence, then connect it to the role the visitor mentions.
      - Keep each spoken answer to two or three short sentences unless asked for more detail.
      - Do not claim to be the candidate. Say "${resume.split('\n')[0].replace('Candidate: ', '')} has..." rather than "I have...".
      - Speak naturally: plain text only, no markdown, lists, emojis, URLs with protocol prefixes, or meta commentary.
      - If asked why this demo exists, briefly mention that it is a small LiveKit voice-agent project built to make the application memorable.
    `,
    llm: new inference.LLM({ model: 'google/gemma-4-31b-it' }),
  });
}
