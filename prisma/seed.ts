import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const templates = [
  {
    slug: "essay",
    name: "Essay",
    description: "Standard academic essay with thesis, body paragraphs, and conclusion",
    category: "Academic",
    structure: {
      sections: [
        { heading: "Introduction", wordBudgetPercent: 15, points: ["Hook", "Background", "Thesis statement", "Roadmap"] },
        { heading: "Body Paragraph 1", wordBudgetPercent: 20, points: ["Topic sentence", "Evidence", "Analysis", "Transition"] },
        { heading: "Body Paragraph 2", wordBudgetPercent: 20, points: ["Topic sentence", "Evidence", "Analysis", "Transition"] },
        { heading: "Body Paragraph 3", wordBudgetPercent: 20, points: ["Topic sentence", "Evidence", "Analysis", "Transition"] },
        { heading: "Counter-argument", wordBudgetPercent: 10, points: ["Opposing view", "Refutation", "Reinforcement"] },
        { heading: "Conclusion", wordBudgetPercent: 15, points: ["Restate thesis", "Summarize main points", "Final thought", "Call to action/implication"] },
      ],
    },
  },
  {
    slug: "research_paper",
    name: "Research Paper",
    description: "Full research structure with literature review and methodology",
    category: "Academic",
    structure: {
      sections: [
        { heading: "Abstract", wordBudgetPercent: 5, points: ["Background", "Methods", "Results", "Conclusions"] },
        { heading: "Introduction", wordBudgetPercent: 10, points: ["Problem statement", "Research questions", "Significance", "Structure overview"] },
        { heading: "Literature Review", wordBudgetPercent: 20, points: ["Theoretical framework", "Key studies", "Gaps in research", "Positioning"] },
        { heading: "Methodology", wordBudgetPercent: 15, points: ["Research design", "Data collection", "Analysis methods", "Limitations"] },
        { heading: "Results", wordBudgetPercent: 15, points: ["Key findings", "Data presentation", "Statistical analysis"] },
        { heading: "Discussion", wordBudgetPercent: 20, points: ["Interpretation", "Comparison with literature", "Implications", "Limitations"] },
        { heading: "Conclusion", wordBudgetPercent: 10, points: ["Summary", "Contributions", "Future research"] },
        { heading: "References", wordBudgetPercent: 5, points: [] },
      ],
    },
  },
  {
    slug: "lab_report",
    name: "Lab Report",
    description: "IMRaD structure for scientific experiments",
    category: "Academic",
    structure: {
      sections: [
        { heading: "Title Page", wordBudgetPercent: 0, points: ["Title", "Name", "Course", "Date", "Instructor"] },
        { heading: "Abstract", wordBudgetPercent: 5, points: ["Purpose", "Methods", "Key results", "Conclusion"] },
        { heading: "Introduction", wordBudgetPercent: 15, points: ["Background", "Hypothesis", "Objectives", "Theory"] },
        { heading: "Materials & Methods", wordBudgetPercent: 20, points: ["Equipment", "Procedures", "Variables", "Safety"] },
        { heading: "Results", wordBudgetPercent: 25, points: ["Data tables", "Graphs", "Observations", "Statistics"] },
        { heading: "Discussion", wordBudgetPercent: 20, points: ["Interpretation", "Error analysis", "Comparison", "Improvements"] },
        { heading: "Conclusion", wordBudgetPercent: 10, points: ["Summary", "Hypothesis verdict", "Future work"] },
        { heading: "References", wordBudgetPercent: 5, points: [] },
      ],
    },
  },
  {
    slug: "case_study",
    name: "Case Study",
    description: "Problem-solution analysis with real-world context",
    category: "Academic",
    structure: {
      sections: [
        { heading: "Executive Summary", wordBudgetPercent: 10, points: ["Key problem", "Approach", "Main findings", "Recommendation"] },
        { heading: "Introduction", wordBudgetPercent: 10, points: ["Context", "Problem statement", "Objectives", "Scope"] },
        { heading: "Background", wordBudgetPercent: 15, points: ["Organization/setting", "Key players", "Historical context"] },
        { heading: "Problem Analysis", wordBudgetPercent: 20, points: ["Root causes", "Impact", "Stakeholder perspectives", "Data evidence"] },
        { heading: "Alternative Solutions", wordBudgetPercent: 15, points: ["Options", "Pros/cons", "Feasibility", "Criteria"] },
        { heading: "Recommended Solution", wordBudgetPercent: 15, points: ["Detailed plan", "Implementation", "Resources", "Timeline"] },
        { heading: "Conclusion", wordBudgetPercent: 10, points: ["Summary", "Lessons learned", "Broader implications"] },
        { heading: "References & Appendices", wordBudgetPercent: 5, points: [] },
      ],
    },
  },
  {
    slug: "literature_review",
    name: "Literature Review",
    description: "Synthesize and critique existing research",
    category: "Academic",
    structure: {
      sections: [
        { heading: "Introduction", wordBudgetPercent: 10, points: ["Topic scope", "Review objectives", "Organization", "Inclusion criteria"] },
        { heading: "Thematic Section 1", wordBudgetPercent: 20, points: ["Theme definition", "Key studies", "Synthesis", "Gaps"] },
        { heading: "Thematic Section 2", wordBudgetPercent: 20, points: ["Theme definition", "Key studies", "Synthesis", "Gaps"] },
        { heading: "Thematic Section 3", wordBudgetPercent: 20, points: ["Theme definition", "Key studies", "Synthesis", "Gaps"] },
        { heading: "Critical Evaluation", wordBudgetPercent: 15, points: ["Methodological strengths/weaknesses", "Theoretical coherence", "Contradictions"] },
        { heading: "Conclusion", wordBudgetPercent: 10, points: ["Summary of findings", "Research gaps", "Future directions"] },
        { heading: "References", wordBudgetPercent: 5, points: [] },
      ],
    },
  },
  {
    slug: "business_report",
    name: "Business Report",
    description: "Professional business format with executive summary",
    category: "Professional",
    structure: {
      sections: [
        { heading: "Title Page", wordBudgetPercent: 0, points: [] },
        { heading: "Executive Summary", wordBudgetPercent: 15, points: ["Purpose", "Key findings", "Recommendations", "Bottom line"] },
        { heading: "Table of Contents", wordBudgetPercent: 0, points: [] },
        { heading: "Introduction", wordBudgetPercent: 10, points: ["Background", "Purpose", "Scope", "Methodology"] },
        { heading: "Findings/Analysis", wordBudgetPercent: 35, points: ["Data presentation", "Analysis", "Key insights", "Visualizations"] },
        { heading: "Recommendations", wordBudgetPercent: 20, points: ["Specific actions", "Priority", "Rationale", "Resources needed"] },
        { heading: "Implementation Plan", wordBudgetPercent: 10, points: ["Timeline", "Milestones", "Responsibilities", "Risks"] },
        { heading: "Conclusion", wordBudgetPercent: 5, points: [] },
        { heading: "Appendices", wordBudgetPercent: 5, points: [] },
      ],
    },
  },
  {
    slug: "presentation",
    name: "Presentation Outline",
    description: "Slide deck structure with speaker notes",
    category: "Professional",
    structure: {
      sections: [
        { heading: "Title Slide", wordBudgetPercent: 0, points: ["Title", "Presenter", "Date", "Event"] },
        { heading: "Agenda/Overview", wordBudgetPercent: 5, points: [] },
        { heading: "Problem/Opportunity", wordBudgetPercent: 10, points: ["Context", "Pain points", "Why now"] },
        { heading: "Solution/Approach", wordBudgetPercent: 20, points: ["Core idea", "How it works", "Differentiation"] },
        { heading: "Evidence/Case Study", wordBudgetPercent: 20, points: ["Data", "Results", "Testimonials"] },
        { heading: "Implementation/Next Steps", wordBudgetPercent: 15, points: ["Timeline", "Resources", "Milestones"] },
        { heading: "Investment/Ask", wordBudgetPercent: 10, points: ["What you need", "ROI", "Terms"] },
        { heading: "Closing/Q&A", wordBudgetPercent: 10, points: ["Key takeaway", "Contact", "Call to action"] },
        { heading: "Appendix Slides", wordBudgetPercent: 10, points: [] },
      ],
    },
  },
  {
    slug: "reflection",
    name: "Reflection Paper",
    description: "Personal learning reflection with critical analysis",
    category: "Academic",
    structure: {
      sections: [
        { heading: "Introduction", wordBudgetPercent: 15, points: ["Experience context", "Learning objectives", "Thesis: key insight"] },
        { heading: "Description of Experience", wordBudgetPercent: 20, points: ["What happened", "Your role", "Key moments", "Context"] },
        { heading: "Analysis & Interpretation", wordBudgetPercent: 30, points: ["What you learned", "Connections to theory", "Surprises", "Challenges"] },
        { heading: "Critical Reflection", wordBudgetPercent: 20, points: ["Assumptions challenged", "Biases recognized", "Alternative perspectives"] },
        { heading: "Future Application", wordBudgetPercent: 10, points: ["Behavior changes", "Skill development", "Goals"] },
        { heading: "Conclusion", wordBudgetPercent: 5, points: ["Summary insight", "Final thought"] },
      ],
    },
  },
  {
    slug: "technical_report",
    name: "Technical Report",
    description: "Engineering/technical documentation structure",
    category: "Professional",
    structure: {
      sections: [
        { heading: "Title Page", wordBudgetPercent: 0, points: [] },
        { heading: "Abstract", wordBudgetPercent: 5, points: ["Problem", "Approach", "Key results", "Conclusions"] },
        { heading: "Introduction", wordBudgetPercent: 10, points: ["Background", "Problem statement", "Objectives", "Scope"] },
        { heading: "System Design/Methodology", wordBudgetPercent: 25, points: ["Architecture", "Components", "Algorithms", "Data structures"] },
        { heading: "Implementation", wordBudgetPercent: 20, points: ["Tools", "Code structure", "Key modules", "Challenges"] },
        { heading: "Testing & Results", wordBudgetPercent: 20, points: ["Test cases", "Performance", "Benchmarks", "Issues"] },
        { heading: "Conclusion", wordBudgetPercent: 10, points: ["Summary", "Limitations", "Future work"] },
        { heading: "References", wordBudgetPercent: 5, points: [] },
        { heading: "Appendices", wordBudgetPercent: 5, points: ["Code listings", "Diagrams", "Data sheets"] },
      ],
    },
  },
  {
    slug: "code_docs",
    name: "Code Documentation",
    description: "Software project documentation with examples",
    category: "Professional",
    structure: {
      sections: [
        { heading: "Project Overview", wordBudgetPercent: 10, points: ["Purpose", "Tech stack", "Architecture diagram", "Status"] },
        { heading: "Getting Started", wordBudgetPercent: 15, points: ["Prerequisites", "Installation", "Configuration", "Quick start"] },
        { heading: "Architecture", wordBudgetPercent: 15, points: ["High-level design", "Data flow", "Key decisions", "Patterns"] },
        { heading: "API Reference", wordBudgetPercent: 25, points: ["Endpoints", "Parameters", "Responses", "Examples"] },
        { heading: "Code Structure", wordBudgetPercent: 15, points: ["Directory layout", "Core modules", "Dependencies", "Conventions"] },
        { heading: "Testing", wordBudgetPercent: 10, points: ["Test types", "Running tests", "Coverage", "CI/CD"] },
        { heading: "Deployment", wordBudgetPercent: 10, points: ["Environments", "Build process", "Configuration", "Rollback"] },
        { heading: "Contributing", wordBudgetPercent: 5, points: ["Guidelines", "PR process", "Code style", "Issues"] },
        { heading: "Changelog/License", wordBudgetPercent: 5, points: [] },
      ],
    },
  },
  {
    slug: "thesis_proposal",
    name: "Thesis Proposal",
    description: "Research proposal with objectives and methodology",
    category: "Academic",
    structure: {
      sections: [
        { heading: "Title Page", wordBudgetPercent: 0, points: [] },
        { heading: "Abstract", wordBudgetPercent: 5, points: ["Research problem", "Approach", "Expected contributions"] },
        { heading: "Introduction", wordBudgetPercent: 10, points: ["Background", "Problem statement", "Research questions", "Significance"] },
        { heading: "Literature Review", wordBudgetPercent: 20, points: ["Theoretical framework", "Key studies", "Research gaps", "Positioning"] },
        { heading: "Research Objectives", wordBudgetPercent: 10, points: ["Primary objectives", "Secondary objectives", "Hypotheses"] },
        { heading: "Methodology", wordBudgetPercent: 20, points: ["Research design", "Data collection", "Analysis plan", "Validity/reliability"] },
        { heading: "Timeline", wordBudgetPercent: 10, points: ["Milestones", "Deliverables", "Gantt chart"] },
        { heading: "Expected Contributions", wordBudgetPercent: 10, points: ["Theoretical", "Practical", "Methodological"] },
        { heading: "References", wordBudgetPercent: 5, points: [] },
        { heading: "Appendices", wordBudgetPercent: 5, points: ["Instruments", "Ethics approval", "Pilot data"] },
      ],
    },
  },
  {
    slug: "resume",
    name: "Resume/Cover Letter",
    description: "Professional application documents",
    category: "Professional",
    structure: {
      sections: [
        { heading: "Header", wordBudgetPercent: 5, points: ["Name", "Contact", "LinkedIn", "Portfolio"] },
        { heading: "Professional Summary", wordBudgetPercent: 10, points: ["Years experience", "Key skills", "Value proposition"] },
        { heading: "Core Competencies", wordBudgetPercent: 10, points: ["Technical skills", "Soft skills", "Tools", "Certifications"] },
        { heading: "Professional Experience", wordBudgetPercent: 40, points: ["Role", "Company", "Dates", "Achievements (STAR)", "Metrics"] },
        { heading: "Education", wordBudgetPercent: 10, points: ["Degrees", "Institutions", "Honors", "Relevant coursework"] },
        { heading: "Projects/Publications", wordBudgetPercent: 15, points: ["Project name", "Role", "Technologies", "Impact"] },
        { heading: "Cover Letter", wordBudgetPercent: 10, points: ["Opening hook", "Why this role", "Why you", "Call to action"] },
      ],
    },
  },
];

async function main() {
  console.log("Seeding templates...");

  for (const template of templates) {
    await prisma.template.upsert({
      where: { slug: template.slug },
      update: template,
      create: template,
    });
    console.log(`✓ ${template.name}`);
  }

  console.log("Done!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });