import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding demo project...");

  // Find or create a demo user
  let demoUser = await prisma.user.findUnique({
    where: { email: "demo@assignpro.example" },
  });

  if (!demoUser) {
    demoUser = await prisma.user.create({
      data: {
        email: "demo@assignpro.example",
        name: "Demo User",
        plan: "pro",
      },
    });
    console.log("Created demo user");
  }

  // Create the demo project
  const project = await prisma.project.upsert({
    where: { id: "demo-project-remote-work" },
    update: {},
    create: {
      id: "demo-project-remote-work",
      userId: demoUser.id,
      title: "Impact of Remote Work on Employee Productivity",
      subject: "Business Management",
      topic: "Impact of remote work on employee productivity in technology companies",
      type: "research_paper",
      level: "undergraduate",
      wordCount: 1500,
      tone: "analytical",
      citation: "apa",
      status: "complete",
    },
  });
  console.log("Created demo project");

  // Create outline
  await prisma.outline.upsert({
    where: { projectId: project.id },
    update: {},
    create: {
      projectId: project.id,
      data: {
        sections: [
          {
            heading: "Introduction",
            wordBudget: 200,
            points: [
              "Background on remote work adoption post-COVID-19",
              "Research question: How does remote work affect productivity in tech?",
              "Thesis: Remote work has nuanced effects — positive for deep work, negative for collaboration",
              "Roadmap of paper structure",
            ],
          },
          {
            heading: "Literature Review",
            wordBudget: 350,
            points: [
              "Pre-pandemic studies on telecommuting (Bloom et al., 2015)",
              "Pandemic-era productivity research (Brynjolfsson et al., 2020; Emanuel et al., 2023)",
              "Theoretical frameworks: Job Demands-Resources model, Self-Determination Theory",
              "Key debate: Productivity vs. innovation vs. well-being trade-offs",
            ],
          },
          {
            heading: "Methodology",
            wordBudget: 200,
            points: [
              "Mixed-methods: Survey (n=342 software engineers) + 18 semi-structured interviews",
              "Productivity measures: Self-reported output, manager ratings, Git commit analysis",
              "Control variables: Role seniority, team size, prior remote experience",
              "Limitations: Self-selection bias, single industry",
            ],
          },
          {
            heading: "Results",
            wordBudget: 350,
            points: [
              "Quantitative: 12% increase in individual task completion, 8% decrease in cross-team PR review speed",
              "Qualitative: Deep work gains offset by coordination costs; isolation effects vary by personality",
              "Moderators: Autonomy support, communication norms, home office quality",
              "Subgroup analysis: Senior engineers benefit more; juniors struggle with mentorship access",
            ],
          },
          {
            heading: "Discussion",
            wordBudget: 250,
            points: [
              "Interpretation: Net positive for mature teams with strong async culture",
              "Practical implications: Hybrid 3/2 model optimal; invest in async tooling",
              "Theoretical contribution: Extends JD-R model to remote knowledge work context",
              "Limitations & future work: Longitudinal effects, cross-cultural generalizability",
            ],
          },
          {
            heading: "Conclusion",
            wordBudget: 150,
            points: [
              "Remote work's impact is context-dependent, not universally positive or negative",
              "Organizations should design intentional hybrid policies, not default to office return",
              "Future research should examine career progression and innovation pipeline effects",
            ],
          },
        ],
      },
    },
  });
  console.log("Created demo outline");

  // Create sections with content
  const sections = [
    {
      order: 1,
      heading: "Introduction",
      content: `The COVID-19 pandemic accelerated the adoption of remote work across industries at an unprecedented scale. What began as a crisis response has evolved into a permanent feature of the modern labor market, with 58% of knowledge workers now operating in hybrid or fully remote arrangements (McKinsey Global Institute, 2023). This transformation has reignited a decades-old debate: does remote work enhance or diminish employee productivity?

Early telecommuting research suggested modest productivity gains from eliminated commute time and reduced office distractions (Bloom et al., 2015). However, these studies examined voluntary, self-selected remote arrangements — not the mandatory, organization-wide shifts observed during the pandemic. More recent evidence presents a complex picture. Brynjolfsson et al. (2020) found stable overall output but significant redistribution of work patterns, while Emanuel et al. (2023) documented a 19% decline in feedback and mentoring interactions for junior employees.

This paper investigates the impact of remote work on employee productivity specifically within technology companies, where digital-native workflows might be expected to translate most smoothly to distributed environments. Using a mixed-methods approach combining survey data (n = 342 software engineers) with semi-structured interviews (n = 18), we examine not only aggregate productivity effects but also the mechanisms, moderators, and distributional consequences across role seniority and team structures.

Our findings reveal a nuanced reality: remote work yields a net 12% increase in individual task completion rates but an 8% decrease in cross-team collaboration velocity. These effects are moderated by organizational communication norms, autonomy support, and home office quality. Critically, benefits accrue disproportionately to senior engineers, while junior developers report significant challenges with mentorship access and implicit learning. We conclude with practical recommendations for hybrid work policy design and identify priority areas for future research.`,
      wordBudget: 200,
    },
    {
      order: 2,
      heading: "Literature Review",
      content: `Pre-pandemic research on telecommuting established a modest positive correlation with productivity. Bloom et al. (2015) conducted a randomized controlled trial at Ctrip, a Chinese travel agency, finding a 13% performance increase among call-center workers assigned to work from home, driven by quieter environments and fewer breaks. However, this study focused on routine, easily measurable tasks — not the complex, collaborative knowledge work characteristic of technology roles.

The pandemic created a natural experiment. Barrero et al. (2021) documented a persistent shift in working-from-home days, from 5% pre-pandemic to 30% post-pandemic. Productivity effects varied significantly by study design. Gibbs et al. (2023) analyzed metadata from 10,000+ employees at a large Asian IT services firm, finding stable lines of code per hour but increased work hours (+18%) and decreased focus time. Conversely, Choudhury et al. (2020) studied a U.S. patent office's work-from-anywhere policy and found 4.4% productivity gains with no quality decline.

Theoretical frameworks help explain these mixed results. The Job Demands-Resources model (Bakker & Demerouti, 2017) suggests remote work simultaneously reduces demands (commute, interruptions) and resources (social support, feedback). Self-Determination Theory (Ryan & Deci, 2000) predicts that autonomy gains enhance intrinsic motivation, but only when competence and relatedness needs are also met. The pandemic context — with its blurred boundaries, caregiving demands, and social isolation — likely disrupted this balance for many workers.

A critical gap in the literature concerns differential effects by career stage. Emanuel et al. (2023) provided the first causal evidence that proximity enables mentorship: junior engineers sitting near seniors received 23% more feedback. Remote work severs this channel. No study has yet examined how these effects interact with team-level communication norms (synchronous vs. asynchronous) or organizational support structures.`,
      wordBudget: 350,
    },
    {
      order: 3,
      heading: "Methodology",
      content: `We employed a sequential explanatory mixed-methods design (Creswell & Plano Clark, 2018). Phase 1: a cross-sectional survey of software engineers at 12 U.S.-based technology companies (n = 342, response rate 67%). Phase 2: semi-structured interviews with a purposive subsample (n = 18) stratified by seniority (junior/mid/senior), remote arrangement (hybrid 2-3 days/week, fully remote), and tenure.

Survey measures included: (a) self-reported productivity on a 7-point Likert scale for individual tasks, team collaboration, and learning; (b) manager-rated productivity (available for n = 287); (c) objective Git metrics: commits/week, PRs opened, PR review turnaround time, lines of code changed; (d) work environment: home office quality (validated scale), autonomy support (adapted from Deci et al., 2001), communication norms (synchronous/asynchronous balance); (e) demographics and controls: role, seniority, team size, prior remote experience, caregiving responsibilities.

Interview protocol explored: perceived productivity changes, specific workflow adaptations, communication challenges, mentorship experiences, and organizational support. Interviews averaged 45 minutes, were recorded and transcribed, and analyzed using thematic analysis (Braun & Clarke, 2006).

Limitations include: self-selection bias (companies with positive remote experiences may be more likely to participate); single-industry focus limits generalizability; cross-sectional design precludes causal claims about long-term effects; Git metrics capture only code-related activity, not design, planning, or coordination work.`,
      wordBudget: 200,
    },
    {
      order: 4,
      heading: "Results",
      content: `Quantitative Findings. Survey respondents reported a mean 12% increase in individual task productivity (M = 5.2/7, SD = 1.1) compared to pre-pandemic office baseline, but an 8% decrease in cross-team collaboration effectiveness (M = 4.1/7, SD = 1.4). Manager ratings correlated moderately with self-reports (r = .52, p < .001). Git data confirmed the pattern: commits/week increased 15% (p < .01), while median PR review turnaround increased from 4.2 to 6.8 hours (p < .001).

Moderation analyses revealed significant interactions. Autonomy support (β = .31, p < .001) and asynchronous communication norms (β = .24, p = .003) positively predicted individual productivity gains. Home office quality predicted both individual gains (β = .18, p = .01) and collaboration maintenance (β = .22, p = .002). Team size negatively moderated collaboration effects (β = -.19, p = .02): larger teams suffered greater coordination losses.

Subgroup analysis by seniority revealed striking differences. Senior engineers (5+ years) reported 18% individual productivity gains vs. 6% for juniors (0-2 years). Junior engineers reported 34% reduction in learning opportunities (vs. 12% for seniors) and 41% reduction in informal mentorship access (vs. 18% for seniors). These differences persisted after controlling for prior remote experience.

Qualitative Themes. Three themes emerged from interviews. First, "Deep work gains, coordination costs" — engineers described uninterrupted blocks enabling complex problem-solving, offset by synchronous meeting overload and async clarification delays. Second, "Mentorship vacuum" — juniors described losing "osmotic learning" from overhearing senior conversations and spontaneous desk-side guidance. Third, "Intentionality as differentiator" — teams with explicit communication charters (response time expectations, meeting norms, documentation standards) reported far fewer collaboration difficulties.`,
      wordBudget: 350,
    },
    {
      order: 5,
      heading: "Discussion",
      content: `Our findings suggest remote work's productivity impact in technology is not a simple positive or negative, but a redistribution: gains in deep, individual work offset by losses in collaborative and developmental activities. This aligns with the Job Demands-Resources framework — autonomy and reduced interruptions (resource gains) enhance focused output, while reduced social proximity (resource loss) impairs coordination and learning.

The seniority gradient is particularly consequential. If junior engineers experience persistent mentorship deficits, organizations risk a "lost cohort" with delayed skill acquisition and weaker professional networks. This echoes concerns about "hollowing out" of early-career development in distributed settings (Emanuel et al., 2023; Yang et al., 2022). Our data suggest hybrid arrangements (2-3 office days) may mitigate this: juniors in hybrid arrangements reported only 15% mentorship reduction vs. 41% for fully remote.

Practical implications: (1) Organizations should design intentional hybrid policies rather than defaulting to full return-to-office. A 3/2 model (3 office days for collaboration/mentorship, 2 remote for deep work) aligns with our data. (2) Invest in async tooling and documentation culture — teams with strong async norms maintained collaboration velocity. (3) Create structured mentorship programs: scheduled pair programming, virtual "office hours," explicit onboarding buddies. (4) Measure what matters: track not just output metrics but learning, innovation, and retention indicators.

Theoretically, we extend the JD-R model to remote knowledge work by identifying "proximity-mediated resources" (implicit learning, social capital, trust) as a distinct resource category depleted by distance. Future work should examine longitudinal career effects, cross-cultural variation in remote work norms, and the innovation pipeline — does reduced serendipitous interaction diminish breakthrough ideas?`,
      wordBudget: 250,
    },
    {
      order: 6,
      heading: "Conclusion",
      content: `Remote work's impact on employee productivity in technology companies is context-dependent, not universally positive or negative. Our mixed-methods study of 342 software engineers reveals a 12% gain in individual task productivity accompanied by an 8% decline in cross-team collaboration velocity. These effects are moderated by organizational communication norms, autonomy support, and home office quality. Critically, benefits accrue disproportionately to senior engineers, while junior developers face significant mentorship and learning deficits.

Organizations should not interpret these findings as an argument for full return-to-office mandates. Instead, they point toward intentional hybrid design: preserving deep-work flexibility while creating structured in-person touchpoints for collaboration, mentorship, and culture-building. The most successful teams in our study combined async-first communication, explicit documentation practices, and scheduled synchronous sessions for high-bandwidth activities.

Future research priorities include longitudinal tracking of career progression for the "pandemic cohort" of junior engineers, cross-cultural studies of remote work norms beyond U.S. technology firms, and investigation of innovation outcomes — whether reduced serendipitous interaction diminishes the breakthrough ideas that often emerge at disciplinary boundaries.`,
      wordBudget: 150,
    },
    {
      order: 7,
      heading: "References",
      content: `Bakker, A. B., & Demerouti, E. (2017). Job Demands-Resources theory: Taking stock and looking forward. *Journal of Occupational Health Psychology, 22*(3), 273–285. https://doi.org/10.1037/ocp0000056

Barrero, J. M., Bloom, N., & Davis, S. J. (2021). Why working from home will stick. *National Bureau of Economic Research Working Paper 28731*. https://doi.org/10.3386/w28731

Bloom, N., Liang, J., Roberts, J., & Ying, Z. (2015). Does working from home work? Evidence from a Chinese experiment. *The Quarterly Journal of Economics, 130*(1), 165–218. https://doi.org/10.1093/qje/qju032

Braun, V., & Clarke, V. (2006). Using thematic analysis in psychology. *Qualitative Research in Psychology, 3*(2), 77–101. https://doi.org/10.1191/1478088706qp063oa

Brynjolfsson, E., Horton, J. J., Ozimek, A., Rock, D., Sharma, G., & TuYe, H. Y. (2020). COVID-19 and remote work: An early look at US data. *National Bureau of Economic Research Working Paper 27344*. https://doi.org/10.3386/w27344

Choudhury, P., Foroughi, C., & Larson, B. (2020). Work-from-anywhere: The productivity effects of geographic flexibility. *Strategic Management Journal, 42*(4), 655–676. https://doi.org/10.1002/smj.3231

Creswell, J. W., & Plano Clark, V. L. (2018). *Designing and conducting mixed methods research* (3rd ed.). SAGE Publications.

Deci, E. L., Ryan, R. M., Gagné, M., Leone, D. R., Usunov, J., & Kornazheva, B. P. (2001). Need satisfaction, motivation, and well-being in the work organizations of a former Eastern Bloc country: A cross-cultural study of self-determination. *Personality and Social Psychology Bulletin, 27*(8), 930–942. https://doi.org/10.1177/0146167201278002

Emanuel, N., Harrington, E., & Pallais, A. (2023). The power of proximity: Office work affects long-term outcomes. *National Bureau of Economic Research Working Paper 31268*. https://doi.org/10.3386/w31268

Gibbs, M., Mengel, F., & Siemroth, C. (2023). Work from home & productivity: Evidence from personnel & analytics data on IT professionals. *Journal of Political Economy Microeconomics, 1*(2), 289–337. https://doi.org/10.1086/722887

McKinsey Global Institute. (2023). *The future of work after COVID-19*. McKinsey & Company.

Ryan, R. M., & Deci, E. L. (2000). Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being. *American Psychologist, 55*(1), 68–78. https://doi.org/10.1037/0003-066X.55.1.68

Yang, L., Holtz, D., Jaffe, S., Suri, S., Sinha, S., Weston, J., ... & Horvitz, E. (2022). The effects of remote work on collaboration among information workers. *Nature Human Behaviour, 6*, 43–54. https://doi.org/10.1038/s41562-021-01196-4`,
      wordBudget: 5,
    },
  ];

  for (const section of sections) {
    await prisma.section.upsert({
      where: {
        projectId_order: {
          projectId: project.id,
          order: section.order,
        },
      },
      update: {},
      create: {
        projectId: project.id,
        order: section.order,
        heading: section.heading,
        content: section.content,
        wordBudget: section.wordBudget,
      },
    });
  }
  console.log("Created demo sections");

  // Create demo sources
  const sources = [
    {
      projectId: project.id,
      type: "pdf",
      title: "Bloom et al. (2021) - Working from Home",
      content: "NBER Working Paper 28731...",
    },
    {
      projectId: project.id,
      type: "url",
      title: "Choudhury et al. (2020) - Geography of Work",
      url: "https://www.hbs.edu/faculty/Pages/item.aspx?num=57614",
    },
    {
      projectId: project.id,
      type: "sample",
      title: "Sample Essay - Business Management",
      content: "Example structure for reference...",
    },
  ];

  for (const source of sources) {
    await prisma.source.create({
      data: source,
    });
  }
  console.log("Created demo sources");

  console.log("Demo project seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });