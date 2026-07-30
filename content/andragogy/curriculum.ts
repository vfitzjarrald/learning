export const TOTAL_WEEKS = 16;
export const DAYS_PER_WEEK = 5;

export type PhaseId = 1 | 2 | 3 | 4;
export type DayNumber = 1 | 2 | 3 | 4 | 5;

export type Source = {
  title: string;
  url: string;
  minutes: number;
};

export type Day = {
  day: DayNumber;
  title: string;
  objective: string;
  sources: Source[];
  labSteps: string[];
  deliverable: string;
  bodyMarkdown?: string;
};

export type Phase = {
  id: PhaseId;
  name: string;
  weekStart: number;
  weekEnd: number;
  summary: string;
};

export type Week = {
  week: number;
  phase: PhaseId;
  title: string;
  outcomes: string[];
  days: Day[];
};

type SourceKey = keyof typeof SOURCE_LIBRARY;
type SourceRef = { key: SourceKey; minutes: number };
type DayPlan = Omit<Day, "sources"> & { sources: SourceRef[] };
type WeekPlan = Omit<Week, "days"> & { days: DayPlan[] };

const SOURCE_LIBRARY = {
  knowlesAndragogy: {
    title: "Malcolm Knowles, Andragogy and Self-Directed Learning",
    url: "https://infed.org/malcolm-knowles-informal-adult-education-self-direction-and-andragogy/",
  },
  knowlesAdultLearner: {
    title: "ERIC: The Adult Learner: A Neglected Species",
    url: "https://eric.ed.gov/?id=ED084368",
  },
  merriamAdultLearning: {
    title: "Merriam and Bierema, Learning in Adulthood",
    url: "https://www.wiley.com/en-us/Learning+in+Adulthood%3A+A+Comprehensive+Guide%2C+4th+Edition-p-9781118130575",
  },
  toughProjects: {
    title: "Allen Tough, The Adult's Learning Projects",
    url: "https://eric.ed.gov/?id=ED057350",
  },
  brookfieldAdultLearning: {
    title: "Brookfield, Understanding and Facilitating Adult Learning",
    url: "https://www.wiley.com/en-us/Understanding+and+Facilitating+Adult+Learning-p-9781555423551",
  },
  brookfieldCriticalReflection: {
    title: "Stephen Brookfield, Becoming a Critically Reflective Teacher",
    url: "https://www.wiley.com/en-us/Becoming+a+Critically+Reflective+Teacher%2C+2nd+Edition-p-9781119049708",
  },
  mezirowTransformative: {
    title: "Mezirow, Transformative Dimensions of Adult Learning",
    url: "https://www.wiley.com/en-us/Transformative+Dimensions+of+Adult+Learning-p-9781555423391",
  },
  kolbExperiential: {
    title: "Kolb Experiential Learning Theory",
    url: "https://learningfromexperience.com/themes/experiential-learning-theory/",
  },
  growSdl: {
    title: "Grow, Teaching Learners to be Self-Directed",
    url: "https://longleaf.net/wp/wp-content/uploads/2021/06/SSDL.pdf",
  },
  wlodkowskiMotivation: {
    title: "Wlodkowski and Ginsberg, Enhancing Adult Motivation to Learn",
    url: "https://www.wiley.com/en-us/Enhancing+Adult+Motivation+to+Learn%3A+A+Comprehensive+Guide+for+Teaching+All+Adults%2C+4th+Edition-p-9781119077992",
  },
  atdInstructionalDesign: {
    title: "ATD, What Is Instructional Design?",
    url: "https://www.td.org/content/atd-blog/what-is-instructional-design",
  },
  atdNeedsAssessment: {
    title: "ATD, Needs Assessment Basics",
    url: "https://www.td.org/talent-development-glossary-terms/what-is-a-needs-assessment",
  },
  learningGuildDesign: {
    title: "The Learning Guild, Learning Experience Design Resources",
    url: "https://www.learningguild.com/insights/learning-experience-design/",
  },
  learningGuildEvaluation: {
    title: "The Learning Guild, Measurement and Evaluation Articles",
    url: "https://www.learningguild.com/insights/measurement-and-evaluation/",
  },
  kirkpatrickModel: {
    title: "Kirkpatrick Partners, The Kirkpatrick Model",
    url: "https://www.kirkpatrickpartners.com/the-kirkpatrick-model/",
  },
  castUdl: {
    title: "CAST Universal Design for Learning Guidelines",
    url: "https://udlguidelines.cast.org/",
  },
  cdcTraining: {
    title: "CDC, Training Development",
    url: "https://www.cdc.gov/training-development/",
  },
  nistNice: {
    title: "NIST NICE Framework: Competency Areas",
    url: "https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center",
  },
  harvardCaseMethod: {
    title: "Harvard Business School, The Case Method",
    url: "https://www.hbs.edu/mba/academic-experience/Pages/the-hbs-case-method.aspx",
  },
  carnegieActiveLearning: {
    title: "Carnegie Mellon, Active Learning",
    url: "https://www.cmu.edu/teaching/designteach/teach/instructionalstrategies/activelearning.html",
  },
  mitTeachingAdult: {
    title: "MIT Teaching + Learning Lab, Inclusive Teaching",
    url: "https://tll.mit.edu/teaching-resources/inclusive-classroom/",
  },
  edutopiaPbl: {
    title: "Edutopia, Project-Based Learning",
    url: "https://www.edutopia.org/project-based-learning",
  },
  communityInquiry: {
    title: "Community of Inquiry Framework",
    url: "https://www.thecommunityofinquiry.org/framework",
  },
  ncesAdultEd: {
    title: "NCES Adult Education and Lifelong Learning",
    url: "https://nces.ed.gov/surveys/ctes/tables/index.asp",
  },
  unescoLifelongLearning: {
    title: "UNESCO Institute for Lifelong Learning",
    url: "https://www.uil.unesco.org/en",
  },
  plainLanguage: {
    title: "PlainLanguage.gov, Federal Plain Language Guidelines",
    url: "https://www.plainlanguage.gov/guidelines/",
  },
  accessibilityWcag: {
    title: "W3C, Web Content Accessibility Guidelines",
    url: "https://www.w3.org/WAI/standards-guidelines/wcag/",
  },
  learningPolicyInstitutePd: {
    title: "Learning Policy Institute, Effective Teacher Professional Development",
    url: "https://learningpolicyinstitute.org/product/effective-teacher-professional-development-brief",
  },
  brinkerhoffSuccessCase: {
    title: "Brinkerhoff, Success Case Method Overview",
    url: "https://www.brinkerhoffevaluationinstitute.com/success-case-method",
  },
} as const;

function source(key: SourceKey, minutes: number): Source {
  return {
    ...SOURCE_LIBRARY[key],
    minutes,
  };
}

function day(plan: DayPlan): Day {
  return {
    ...plan,
    sources: plan.sources.map((item) => source(item.key, item.minutes)),
  };
}

export const PHASES: Phase[] = [
  {
    id: 1,
    name: "Adult Learning Foundations",
    weekStart: 1,
    weekEnd: 4,
    summary:
      "Establish the intellectual foundations of andragogy: adult learner assumptions, life experience, readiness, problem orientation, context, and the limits of applying any model without learner evidence.",
  },
  {
    id: 2,
    name: "Motivation & Self-Direction",
    weekStart: 5,
    weekEnd: 8,
    summary:
      "Build expertise in intrinsic motivation, self-directed learning, learner agency, persistence, advising, and the instructional responsibilities that change as adults gain capacity.",
  },
  {
    id: 3,
    name: "Design & Facilitation for Adults",
    weekStart: 9,
    weekEnd: 12,
    summary:
      "Translate theory into high-integrity learning experiences: needs analysis, objectives, practice architecture, facilitation moves, inclusion, transfer, and evaluation.",
  },
  {
    id: 4,
    name: "Expert Practice & Capstone",
    weekStart: 13,
    weekEnd: 16,
    summary:
      "Synthesize adult learning expertise into research-informed consulting, program governance, evidence portfolios, ethical practice, and a complete capstone design.",
  },
];

const WEEK_PLANS: WeekPlan[] = [
  {
    week: 1,
    phase: 1,
    title: "What Makes Adult Learning Distinct",
    outcomes: [
      "Distinguish pedagogy, andragogy, and lifelong learning without reducing adults to stereotypes.",
      "Explain Knowles' core assumptions and when each assumption needs verification.",
      "Create an initial adult learner profile grounded in context and purpose.",
    ],
    days: [
      {
        day: 1,
        title: "Mon Concept: Andragogy as a Practice Lens",
        objective: "Define andragogy and identify the adult learner assumptions it makes visible.",
        sources: [
          { key: "knowlesAndragogy", minutes: 25 },
          { key: "knowlesAdultLearner", minutes: 20 },
        ],
        labSteps: [
          "List five adult learning assumptions in your own words.",
          "For each assumption, write one situation where it may be true and one where it may fail.",
          "Draft a one-page learner context brief for a real adult audience.",
        ],
        deliverable: "Adult learner assumptions brief.",
        bodyMarkdown:
          "Treat andragogy as a diagnostic lens rather than a universal law. Expert practice begins by testing assumptions against learner evidence.",
      },
      {
        day: 2,
        title: "Tue Lab: Learner Context Interview",
        objective: "Practice eliciting adult goals, constraints, experience, and stakes through inquiry.",
        sources: [
          { key: "merriamAdultLearning", minutes: 20 },
          { key: "plainLanguage", minutes: 15 },
        ],
        labSteps: [
          "Write eight interview questions that avoid leading the learner.",
          "Run a 20-minute interview with an adult learner or role-play partner.",
          "Code notes for motivation, experience, constraints, and transfer conditions.",
        ],
        deliverable: "Interview protocol and coded notes.",
      },
      {
        day: 3,
        title: "Wed Design: Problem-First Learning Frame",
        objective: "Convert a topic-centered course idea into a problem-centered adult learning frame.",
        sources: [
          { key: "brookfieldAdultLearning", minutes: 25 },
          { key: "carnegieActiveLearning", minutes: 15 },
        ],
        labSteps: [
          "Choose one content-heavy lesson adults often resist.",
          "Rewrite it around a workplace, community, or personal problem.",
          "Add an opening activity that surfaces prior experience.",
        ],
        deliverable: "Problem-first lesson frame.",
      },
      {
        day: 4,
        title: "Thu Evaluate: Assumptions Audit",
        objective: "Evaluate whether a learning design respects adult identity, experience, and autonomy.",
        sources: [
          { key: "brookfieldCriticalReflection", minutes: 20 },
          { key: "mitTeachingAdult", minutes: 15 },
        ],
        labSteps: [
          "Review a course outline using the five Knowles assumptions.",
          "Mark unsupported assumptions, missing choices, and weak relevance signals.",
          "Write three redesign recommendations with evidence.",
        ],
        deliverable: "Andragogy assumptions audit.",
      },
      {
        day: 5,
        title: "Fri Review + Checkpoint: Foundations Vocabulary",
        objective: "Consolidate core vocabulary and prepare a defensible explanation of andragogy.",
        sources: [
          { key: "unescoLifelongLearning", minutes: 15 },
          { key: "ncesAdultEd", minutes: 15 },
        ],
        labSteps: [
          "Build a glossary of ten foundational terms.",
          "Record a three-minute explanation of andragogy for a skeptical stakeholder.",
          "Identify two questions to carry into Week 2.",
        ],
        deliverable: "Glossary and stakeholder explanation.",
      },
    ],
  },
  {
    week: 2,
    phase: 1,
    title: "Adult Experience, Identity, and Readiness",
    outcomes: [
      "Analyze experience as both a learning asset and a possible barrier.",
      "Connect readiness to developmental tasks, social roles, and immediate demands.",
      "Design activities that honor experience while challenging unexamined habits.",
    ],
    days: [
      {
        day: 1,
        title: "Mon Concept: Experience as Curriculum",
        objective: "Explain why adult experience changes the role of examples, discussion, and practice.",
        sources: [
          { key: "merriamAdultLearning", minutes: 25 },
          { key: "brookfieldAdultLearning", minutes: 20 },
        ],
        labSteps: [
          "Map three experience patterns learners bring to a target course.",
          "Identify where those patterns help learning and where they may mislead.",
          "Draft facilitation prompts that make experience examinable.",
        ],
        deliverable: "Experience asset-risk map.",
      },
      {
        day: 2,
        title: "Tue Lab: Prior Knowledge Probe",
        objective: "Build a low-stakes diagnostic that reveals learner experience before instruction.",
        sources: [
          { key: "carnegieActiveLearning", minutes: 20 },
          { key: "atdNeedsAssessment", minutes: 15 },
        ],
        labSteps: [
          "Create a five-item prior knowledge probe.",
          "Add two reflective prompts about past practice.",
          "Define what instructional decisions each response would trigger.",
        ],
        deliverable: "Prior knowledge diagnostic with decision rules.",
      },
      {
        day: 3,
        title: "Wed Design: Readiness-to-Learn Trigger",
        objective: "Design an activity that connects learning to a current adult role or transition.",
        sources: [
          { key: "knowlesAndragogy", minutes: 20 },
          { key: "learningPolicyInstitutePd", minutes: 15 },
        ],
        labSteps: [
          "Name the learner role, transition, or performance pressure.",
          "Write a realistic scenario that makes readiness visible.",
          "Connect the scenario to one measurable learning outcome.",
        ],
        deliverable: "Readiness trigger scenario.",
      },
      {
        day: 4,
        title: "Thu Evaluate: Experience-Inclusive Discussion",
        objective: "Assess whether a discussion plan draws from experience without privileging dominant voices.",
        sources: [
          { key: "mitTeachingAdult", minutes: 20 },
          { key: "castUdl", minutes: 15 },
        ],
        labSteps: [
          "Review a discussion plan for access, psychological safety, and power dynamics.",
          "Add participation options for speaking, writing, and asynchronous reflection.",
          "Write facilitator language for handling inaccurate but strongly held experience claims.",
        ],
        deliverable: "Inclusive discussion revision.",
      },
      {
        day: 5,
        title: "Fri Review + Checkpoint: Readiness and Experience",
        objective: "Synthesize how readiness and experience should change design decisions.",
        sources: [
          { key: "brookfieldCriticalReflection", minutes: 15 },
          { key: "knowlesAdultLearner", minutes: 15 },
        ],
        labSteps: [
          "Complete a concept map linking experience, readiness, identity, and transfer.",
          "Write one design principle for each link.",
          "Peer review another learner's principles for specificity.",
        ],
        deliverable: "Readiness and experience concept map.",
      },
    ],
  },
  {
    week: 3,
    phase: 1,
    title: "Experiential and Reflective Learning",
    outcomes: [
      "Use Kolb's cycle to structure experience, reflection, abstraction, and experimentation.",
      "Distinguish activity from learning experience.",
      "Design reflection that improves judgment rather than merely collecting feelings.",
    ],
    days: [
      {
        day: 1,
        title: "Mon Concept: Experiential Learning Cycle",
        objective: "Explain the four movements of experiential learning and common misuse of the model.",
        sources: [
          { key: "kolbExperiential", minutes: 25 },
          { key: "brookfieldAdultLearning", minutes: 20 },
        ],
        labSteps: [
          "Annotate a prior learning activity against Kolb's cycle.",
          "Identify which movement is weakest or missing.",
          "Write a correction that deepens learning rather than adding activity.",
        ],
        deliverable: "Kolb cycle activity annotation.",
      },
      {
        day: 2,
        title: "Tue Lab: Reflection Prompt Studio",
        objective: "Craft reflection prompts that move adults from experience to evidence-informed judgment.",
        sources: [
          { key: "brookfieldCriticalReflection", minutes: 25 },
          { key: "plainLanguage", minutes: 10 },
        ],
        labSteps: [
          "Write prompts for descriptive, analytic, critical, and transfer reflection.",
          "Test prompts against a recent work experience.",
          "Revise prompts to remove vague verbs and hidden assumptions.",
        ],
        deliverable: "Four-level reflection prompt set.",
      },
      {
        day: 3,
        title: "Wed Design: Practice-Reflection Loop",
        objective: "Design a short practice cycle with feedback and experimentation.",
        sources: [
          { key: "carnegieActiveLearning", minutes: 20 },
          { key: "learningGuildDesign", minutes: 15 },
        ],
        labSteps: [
          "Choose one adult performance skill.",
          "Create a practice task, reflection question, feedback cue, and retry condition.",
          "Define what evidence shows improvement after the retry.",
        ],
        deliverable: "Practice-reflection loop design.",
      },
      {
        day: 4,
        title: "Thu Evaluate: Activity Versus Experience",
        objective: "Evaluate whether an activity creates usable learning or just engagement.",
        sources: [
          { key: "atdInstructionalDesign", minutes: 15 },
          { key: "kolbExperiential", minutes: 20 },
        ],
        labSteps: [
          "Score an activity for relevance, consequence, reflection, abstraction, and transfer.",
          "Identify one fun-but-low-learning element to remove.",
          "Add one decision point that makes learner judgment visible.",
        ],
        deliverable: "Experiential learning quality review.",
      },
      {
        day: 5,
        title: "Fri Review + Checkpoint: Reflective Practitioner",
        objective: "Demonstrate how reflection strengthens adult learning and professional expertise.",
        sources: [
          { key: "brookfieldCriticalReflection", minutes: 20 },
          { key: "merriamAdultLearning", minutes: 15 },
        ],
        labSteps: [
          "Write a 500-word reflective memo on your facilitation assumptions.",
          "Name one assumption you will test in Week 4.",
          "Create a rubric row for quality reflection.",
        ],
        deliverable: "Reflective practitioner memo.",
      },
    ],
  },
  {
    week: 4,
    phase: 1,
    title: "Foundation Gate: Adult Learning Analysis",
    outcomes: [
      "Integrate adult learning assumptions, experience, readiness, and reflection.",
      "Critique a learning program using evidence-based andragogy criteria.",
      "Pass the Phase 1 gate with a defensible adult learning analysis.",
    ],
    days: [
      {
        day: 1,
        title: "Mon Concept: From Theory to Analysis",
        objective: "Combine foundational concepts into a practical analysis framework.",
        sources: [
          { key: "knowlesAndragogy", minutes: 20 },
          { key: "merriamAdultLearning", minutes: 20 },
        ],
        labSteps: [
          "Create a four-part analysis framework: assumptions, experience, readiness, reflection.",
          "Add evidence questions under each part.",
          "Apply the framework to a short course description.",
        ],
        deliverable: "Adult learning analysis framework.",
      },
      {
        day: 2,
        title: "Tue Lab: Case Audit",
        objective: "Audit a real or sample adult learning program for foundation-level strengths and gaps.",
        sources: [
          { key: "harvardCaseMethod", minutes: 15 },
          { key: "atdNeedsAssessment", minutes: 20 },
        ],
        labSteps: [
          "Select a program serving adult learners.",
          "Gather evidence from its goals, activities, learner supports, and assessments.",
          "Mark three strengths and three risks.",
        ],
        deliverable: "Foundation case audit notes.",
      },
      {
        day: 3,
        title: "Wed Design: Redesign Recommendation",
        objective: "Draft a redesign recommendation that is specific, feasible, and theory-grounded.",
        sources: [
          { key: "learningGuildDesign", minutes: 20 },
          { key: "castUdl", minutes: 15 },
        ],
        labSteps: [
          "Choose the highest-risk gap from the case audit.",
          "Write a before-and-after redesign proposal.",
          "Tie the proposal to at least two adult learning principles.",
        ],
        deliverable: "Theory-grounded redesign recommendation.",
      },
      {
        day: 4,
        title: "Thu Evaluate: Gate Evidence Review",
        objective: "Evaluate whether your analysis uses evidence rather than generic adult learner claims.",
        sources: [
          { key: "brookfieldCriticalReflection", minutes: 20 },
          { key: "kirkpatrickModel", minutes: 15 },
        ],
        labSteps: [
          "Underline every claim about learners and attach evidence or mark it as a hypothesis.",
          "Check whether recommendations would change if learner constraints changed.",
          "Revise your analysis for precision and humility.",
        ],
        deliverable: "Revised gate evidence packet.",
      },
      {
        day: 5,
        title: "Fri Review + Checkpoint: Phase 1 Gate",
        objective: "Submit a complete foundation analysis and identify growth targets for Phase 2.",
        sources: [
          { key: "knowlesAdultLearner", minutes: 15 },
          { key: "kolbExperiential", minutes: 15 },
        ],
        labSteps: [
          "Submit the case audit, redesign recommendation, and evidence packet.",
          "Complete the Phase 1 gate quiz.",
          "Write two goals for improving learner motivation and self-direction.",
        ],
        deliverable: "Phase 1 gate portfolio.",
      },
    ],
  },
  {
    week: 5,
    phase: 2,
    title: "Adult Motivation and Relevance",
    outcomes: [
      "Explain adult motivation as a function of value, confidence, inclusion, and volition.",
      "Design relevance signals that respect adult goals and constraints.",
      "Diagnose motivational barriers without blaming learners.",
    ],
    days: [
      {
        day: 1,
        title: "Mon Concept: Motivation to Learn",
        objective: "Analyze why relevance, respect, success, and choice shape adult persistence.",
        sources: [
          { key: "wlodkowskiMotivation", minutes: 25 },
          { key: "merriamAdultLearning", minutes: 15 },
        ],
        labSteps: [
          "List motivational supports in a course you know.",
          "Classify each support as value, confidence, inclusion, or volition.",
          "Identify one missing support for a high-constraint learner.",
        ],
        deliverable: "Motivation support inventory.",
      },
      {
        day: 2,
        title: "Tue Lab: Relevance Message Test",
        objective: "Create and test course relevance messages for different adult learner goals.",
        sources: [
          { key: "plainLanguage", minutes: 15 },
          { key: "atdInstructionalDesign", minutes: 15 },
        ],
        labSteps: [
          "Write three opening relevance messages for different learner personas.",
          "Ask a peer which message feels credible and why.",
          "Revise messages to connect learning with near-term decisions or performance.",
        ],
        deliverable: "Tested relevance message set.",
      },
      {
        day: 3,
        title: "Wed Design: Motivational Entry Sequence",
        objective: "Design the first 20 minutes of a course to establish value and safety.",
        sources: [
          { key: "wlodkowskiMotivation", minutes: 20 },
          { key: "mitTeachingAdult", minutes: 15 },
        ],
        labSteps: [
          "Script a welcome that respects learner expertise.",
          "Add a learner choice point in the first 20 minutes.",
          "Add a confidence-building quick win.",
        ],
        deliverable: "Motivational entry sequence.",
      },
      {
        day: 4,
        title: "Thu Evaluate: Motivation Barrier Analysis",
        objective: "Evaluate motivational barriers as design and context problems.",
        sources: [
          { key: "brookfieldAdultLearning", minutes: 20 },
          { key: "castUdl", minutes: 15 },
        ],
        labSteps: [
          "Choose a case where adults disengage.",
          "Separate value, expectancy, access, identity, and time barriers.",
          "Recommend one design change and one support change.",
        ],
        deliverable: "Motivation barrier analysis.",
      },
      {
        day: 5,
        title: "Fri Review + Checkpoint: Motivation Principles",
        objective: "Summarize adult motivation principles as practical design commitments.",
        sources: [
          { key: "wlodkowskiMotivation", minutes: 15 },
          { key: "learningGuildDesign", minutes: 15 },
        ],
        labSteps: [
          "Write five motivation design commitments.",
          "Attach an observable behavior that would show each commitment is working.",
          "Select one commitment to test next week.",
        ],
        deliverable: "Adult motivation design commitments.",
      },
    ],
  },
  {
    week: 6,
    phase: 2,
    title: "Self-Directed Learning and Learner Agency",
    outcomes: [
      "Explain self-directed learning as a learnable capacity, not a fixed trait.",
      "Use Grow's staged model to match instructional support to learner readiness.",
      "Design learner contracts and advising supports that build agency.",
    ],
    days: [
      {
        day: 1,
        title: "Mon Concept: Self-Direction as Capacity",
        objective: "Differentiate autonomous, self-directed, and unsupported learning.",
        sources: [
          { key: "growSdl", minutes: 25 },
          { key: "toughProjects", minutes: 20 },
        ],
        labSteps: [
          "Summarize Grow's four learner stages.",
          "Name facilitator responsibilities at each stage.",
          "Identify signs that a learner is being under-supported or over-directed.",
        ],
        deliverable: "Self-direction stage summary.",
      },
      {
        day: 2,
        title: "Tue Lab: Learning Contract",
        objective: "Build a learning contract that supports adult autonomy and accountability.",
        sources: [
          { key: "knowlesAndragogy", minutes: 15 },
          { key: "growSdl", minutes: 20 },
        ],
        labSteps: [
          "Draft contract fields for goal, evidence, resources, timeline, support, and review.",
          "Add decision points where the learner chooses path or artifact.",
          "Pilot the contract against one personal learning goal.",
        ],
        deliverable: "Adult learning contract template.",
      },
      {
        day: 3,
        title: "Wed Design: Scaffolding Choice",
        objective: "Design choices that build agency without overwhelming learners.",
        sources: [
          { key: "castUdl", minutes: 20 },
          { key: "learningGuildDesign", minutes: 15 },
        ],
        labSteps: [
          "Select a learning module with no meaningful learner choice.",
          "Add constrained choices for topic, practice method, or evidence artifact.",
          "Define when the facilitator should narrow or expand choice.",
        ],
        deliverable: "Choice scaffolding plan.",
      },
      {
        day: 4,
        title: "Thu Evaluate: Agency Risk Review",
        objective: "Evaluate whether a self-paced or flexible design truly supports self-direction.",
        sources: [
          { key: "growSdl", minutes: 20 },
          { key: "communityInquiry", minutes: 15 },
        ],
        labSteps: [
          "Review a self-paced course for goal clarity, feedback, social presence, and advising.",
          "Mark where flexibility becomes abandonment.",
          "Recommend two agency-building supports.",
        ],
        deliverable: "Self-direction support review.",
      },
      {
        day: 5,
        title: "Fri Review + Checkpoint: SDL Advisory Memo",
        objective: "Explain how to advise adult learners at different self-direction stages.",
        sources: [
          { key: "toughProjects", minutes: 15 },
          { key: "growSdl", minutes: 15 },
        ],
        labSteps: [
          "Write one advising script for each Grow stage.",
          "Include a question, support offer, and autonomy move in each script.",
          "Reflect on your own self-direction profile as a designer.",
        ],
        deliverable: "Self-directed learning advisory memo.",
      },
    ],
  },
  {
    week: 7,
    phase: 2,
    title: "Transformative Learning and Critical Reflection",
    outcomes: [
      "Explain perspective transformation and disorienting dilemmas responsibly.",
      "Design critical reflection that examines assumptions and power.",
      "Facilitate challenge with care, consent, and support.",
    ],
    days: [
      {
        day: 1,
        title: "Mon Concept: Transformative Learning",
        objective: "Describe transformative learning and distinguish it from ordinary insight or persuasion.",
        sources: [
          { key: "mezirowTransformative", minutes: 25 },
          { key: "brookfieldCriticalReflection", minutes: 20 },
        ],
        labSteps: [
          "Define frame of reference, premise reflection, and perspective transformation.",
          "Identify risks of forcing transformation as an instructional goal.",
          "Write ethical boundaries for using disorienting dilemmas.",
        ],
        deliverable: "Transformative learning ethics notes.",
      },
      {
        day: 2,
        title: "Tue Lab: Assumption Surfacing",
        objective: "Practice surfacing learner assumptions through evidence, dialogue, and reflection.",
        sources: [
          { key: "brookfieldCriticalReflection", minutes: 25 },
          { key: "harvardCaseMethod", minutes: 15 },
        ],
        labSteps: [
          "Choose a professional dilemma with no easy answer.",
          "Write prompts that reveal causal, prescriptive, and paradigmatic assumptions.",
          "Add evidence sources learners can use to test those assumptions.",
        ],
        deliverable: "Assumption-surfacing case prompts.",
      },
      {
        day: 3,
        title: "Wed Design: Dialogue for Perspective Taking",
        objective: "Design a structured dialogue that supports perspective taking without coercion.",
        sources: [
          { key: "communityInquiry", minutes: 20 },
          { key: "mitTeachingAdult", minutes: 15 },
        ],
        labSteps: [
          "Define dialogue norms and opt-out pathways.",
          "Add roles that distribute voice and listening responsibilities.",
          "Create a synthesis prompt that separates changed thinking from unresolved questions.",
        ],
        deliverable: "Structured transformative dialogue plan.",
      },
      {
        day: 4,
        title: "Thu Evaluate: Challenge and Safety Balance",
        objective: "Evaluate whether a challenging learning activity has adequate support and consent.",
        sources: [
          { key: "castUdl", minutes: 15 },
          { key: "brookfieldAdultLearning", minutes: 20 },
        ],
        labSteps: [
          "Audit one activity for emotional risk, identity risk, and power risk.",
          "Add preparation, choice, debrief, and follow-up supports.",
          "Write facilitator language for respectful disagreement.",
        ],
        deliverable: "Challenge-safety audit.",
      },
      {
        day: 5,
        title: "Fri Review + Checkpoint: Critical Reflection Evidence",
        objective: "Demonstrate evidence of critical reflection in learner work.",
        sources: [
          { key: "mezirowTransformative", minutes: 15 },
          { key: "brookfieldCriticalReflection", minutes: 20 },
        ],
        labSteps: [
          "Create a rubric for descriptive, analytic, critical, and transformative reflection.",
          "Score a sample reflection with the rubric.",
          "Write feedback that invites deeper examination without prescribing conclusions.",
        ],
        deliverable: "Critical reflection rubric and scored sample.",
      },
    ],
  },
  {
    week: 8,
    phase: 2,
    title: "Motivation and Self-Direction Gate",
    outcomes: [
      "Integrate motivation, self-direction, and transformative learning into learner support design.",
      "Diagnose learner agency needs and propose appropriate scaffolds.",
      "Pass the Phase 2 gate with a motivational design and advising packet.",
    ],
    days: [
      {
        day: 1,
        title: "Mon Concept: Agency Support Architecture",
        objective: "Synthesize motivation and self-direction into a coherent support architecture.",
        sources: [
          { key: "wlodkowskiMotivation", minutes: 20 },
          { key: "growSdl", minutes: 20 },
        ],
        labSteps: [
          "Map a learner journey from entry through independent performance.",
          "Add motivation, advising, feedback, and choice supports across the journey.",
          "Identify supports that should fade over time.",
        ],
        deliverable: "Agency support architecture map.",
      },
      {
        day: 2,
        title: "Tue Lab: Learner Support Case",
        objective: "Analyze a learner support case using motivation and self-direction evidence.",
        sources: [
          { key: "toughProjects", minutes: 15 },
          { key: "atdNeedsAssessment", minutes: 20 },
        ],
        labSteps: [
          "Read or construct a case of an adult learner at risk of stopping out.",
          "Identify motivational, agency, access, and confidence factors.",
          "Recommend staged supports and success indicators.",
        ],
        deliverable: "Learner support case analysis.",
      },
      {
        day: 3,
        title: "Wed Design: Advising and Persistence Toolkit",
        objective: "Build a toolkit that helps facilitators support persistence without taking over.",
        sources: [
          { key: "growSdl", minutes: 20 },
          { key: "communityInquiry", minutes: 15 },
        ],
        labSteps: [
          "Create a check-in script, learning contract review, and peer support routine.",
          "Add escalation criteria for learners needing more structure.",
          "Define what data the facilitator should collect.",
        ],
        deliverable: "Advising and persistence toolkit.",
      },
      {
        day: 4,
        title: "Thu Evaluate: Phase 2 Gate Review",
        objective: "Evaluate whether your support design is respectful, measurable, and stage-appropriate.",
        sources: [
          { key: "brookfieldCriticalReflection", minutes: 15 },
          { key: "learningGuildEvaluation", minutes: 15 },
        ],
        labSteps: [
          "Check every support against learner autonomy and evidence of need.",
          "Remove supports that infantilize adults or obscure responsibility.",
          "Add measures for persistence, confidence, and transfer progress.",
        ],
        deliverable: "Revised Phase 2 gate packet.",
      },
      {
        day: 5,
        title: "Fri Review + Checkpoint: Phase 2 Gate",
        objective: "Submit the motivation and self-direction portfolio and set goals for design practice.",
        sources: [
          { key: "wlodkowskiMotivation", minutes: 15 },
          { key: "mezirowTransformative", minutes: 15 },
        ],
        labSteps: [
          "Submit the agency map, learner support case, and advising toolkit.",
          "Complete the Phase 2 gate quiz.",
          "Identify one facilitation skill and one design skill for Phase 3.",
        ],
        deliverable: "Phase 2 gate portfolio.",
      },
    ],
  },
  {
    week: 9,
    phase: 3,
    title: "Needs Assessment and Outcomes",
    outcomes: [
      "Conduct needs assessment at learner, task, context, and organizational levels.",
      "Write outcomes that connect adult learning to authentic performance.",
      "Separate training needs from environmental, policy, or workflow problems.",
    ],
    days: [
      {
        day: 1,
        title: "Mon Concept: Needs Before Solutions",
        objective: "Explain why adult learning design starts with evidence of need and context.",
        sources: [
          { key: "atdNeedsAssessment", minutes: 25 },
          { key: "cdcTraining", minutes: 15 },
        ],
        labSteps: [
          "List stakeholders, learners, tasks, constraints, and performance gaps.",
          "Sort gaps into knowledge, skill, motivation, environment, and incentive causes.",
          "Name which gaps learning can and cannot solve.",
        ],
        deliverable: "Needs assessment cause map.",
      },
      {
        day: 2,
        title: "Tue Lab: Task and Context Analysis",
        objective: "Collect evidence about real performance conditions before writing objectives.",
        sources: [
          { key: "atdInstructionalDesign", minutes: 20 },
          { key: "nistNice", minutes: 15 },
        ],
        labSteps: [
          "Break one target performance into decisions, actions, tools, and standards.",
          "Interview or observe a practitioner if possible.",
          "Mark high-risk errors and common novices' misconceptions.",
        ],
        deliverable: "Task and context analysis worksheet.",
      },
      {
        day: 3,
        title: "Wed Design: Outcomes and Evidence",
        objective: "Write adult learning outcomes that specify performance, conditions, and evidence.",
        sources: [
          { key: "cdcTraining", minutes: 20 },
          { key: "plainLanguage", minutes: 10 },
        ],
        labSteps: [
          "Draft three measurable outcomes from your task analysis.",
          "Pair each outcome with evidence learners can produce.",
          "Check that outcomes support adult relevance and transfer.",
        ],
        deliverable: "Outcome-evidence alignment table.",
      },
      {
        day: 4,
        title: "Thu Evaluate: Is Training the Answer?",
        objective: "Evaluate whether a requested course is the right intervention.",
        sources: [
          { key: "atdNeedsAssessment", minutes: 20 },
          { key: "brinkerhoffSuccessCase", minutes: 15 },
        ],
        labSteps: [
          "Analyze a training request from the perspective of root cause.",
          "Identify non-training supports needed for performance.",
          "Write a tactful recommendation to a sponsor.",
        ],
        deliverable: "Training request evaluation memo.",
      },
      {
        day: 5,
        title: "Fri Review + Checkpoint: Needs-to-Outcomes Chain",
        objective: "Defend the chain from adult learner need to performance outcome.",
        sources: [
          { key: "learningGuildDesign", minutes: 15 },
          { key: "kirkpatrickModel", minutes: 15 },
        ],
        labSteps: [
          "Create a one-page chain from context to task to objective to evidence.",
          "Peer review for missing assumptions.",
          "Revise one outcome for stronger transfer relevance.",
        ],
        deliverable: "Needs-to-outcomes chain.",
      },
    ],
  },
  {
    week: 10,
    phase: 3,
    title: "Practice, Feedback, and Transfer Design",
    outcomes: [
      "Design practice that develops adult judgment and performance.",
      "Use feedback cycles to support transfer.",
      "Create realistic scenarios, cases, and job-embedded assignments.",
    ],
    days: [
      {
        day: 1,
        title: "Mon Concept: Practice Architecture",
        objective: "Explain how practice, feedback, spacing, and consequence build adult competence.",
        sources: [
          { key: "carnegieActiveLearning", minutes: 20 },
          { key: "kolbExperiential", minutes: 20 },
        ],
        labSteps: [
          "Identify the decisions learners must practice, not just facts they must recall.",
          "Choose practice formats for simple, complex, and adaptive performance.",
          "Add feedback timing for each practice format.",
        ],
        deliverable: "Practice architecture sketch.",
      },
      {
        day: 2,
        title: "Tue Lab: Scenario Writing",
        objective: "Write realistic adult learning scenarios with enough ambiguity to require judgment.",
        sources: [
          { key: "harvardCaseMethod", minutes: 20 },
          { key: "plainLanguage", minutes: 10 },
        ],
        labSteps: [
          "Write a scenario based on a real performance context.",
          "Include constraints, stakeholder tension, and incomplete information.",
          "Draft facilitator notes that connect decisions to outcomes.",
        ],
        deliverable: "Scenario draft with facilitator notes.",
      },
      {
        day: 3,
        title: "Wed Design: Feedback and Retry Loop",
        objective: "Design feedback that helps adults adjust strategies and try again.",
        sources: [
          { key: "learningGuildDesign", minutes: 20 },
          { key: "communityInquiry", minutes: 15 },
        ],
        labSteps: [
          "Create criteria for competent performance.",
          "Write feedback stems for strengths, risks, evidence, and next attempt.",
          "Add a retry task that changes context while preserving the core skill.",
        ],
        deliverable: "Feedback and retry loop.",
      },
      {
        day: 4,
        title: "Thu Evaluate: Transfer Conditions",
        objective: "Evaluate whether practice is likely to transfer beyond the learning setting.",
        sources: [
          { key: "kirkpatrickModel", minutes: 20 },
          { key: "learningGuildEvaluation", minutes: 15 },
        ],
        labSteps: [
          "List workplace, community, or life conditions required for transfer.",
          "Identify obstacles that may block transfer after instruction.",
          "Add manager, peer, tool, or reminder supports.",
        ],
        deliverable: "Transfer condition review.",
      },
      {
        day: 5,
        title: "Fri Review + Checkpoint: Practice Design Critique",
        objective: "Critique and refine practice using adult performance evidence.",
        sources: [
          { key: "brookfieldAdultLearning", minutes: 15 },
          { key: "carnegieActiveLearning", minutes: 15 },
        ],
        labSteps: [
          "Run a short peer critique of your scenario and feedback loop.",
          "Revise for authenticity, consequence, and transfer.",
          "Write a note explaining what changed and why.",
        ],
        deliverable: "Revised practice design package.",
      },
    ],
  },
  {
    week: 11,
    phase: 3,
    title: "Facilitation, Inclusion, and Learning Community",
    outcomes: [
      "Facilitate adult learning with respect, structure, and productive challenge.",
      "Design inclusive participation patterns and accessible materials.",
      "Manage discussion, conflict, expertise, and silence as learning resources.",
    ],
    days: [
      {
        day: 1,
        title: "Mon Concept: Facilitator Stance",
        objective: "Explain the facilitator's role as designer of conditions, not owner of all expertise.",
        sources: [
          { key: "brookfieldAdultLearning", minutes: 20 },
          { key: "communityInquiry", minutes: 20 },
        ],
        labSteps: [
          "Name the differences among instructor, facilitator, coach, and advisor.",
          "Write facilitation principles for voice, structure, challenge, and care.",
          "Identify one facilitator habit you need to practice.",
        ],
        deliverable: "Adult facilitator stance statement.",
      },
      {
        day: 2,
        title: "Tue Lab: Facilitation Moves Practice",
        objective: "Practice facilitator moves for inquiry, synthesis, redirection, and equity.",
        sources: [
          { key: "brookfieldCriticalReflection", minutes: 20 },
          { key: "mitTeachingAdult", minutes: 15 },
        ],
        labSteps: [
          "Script three inquiry moves and three synthesis moves.",
          "Role-play a discussion with dominant, silent, and skeptical participants.",
          "Collect feedback on clarity, respect, and learning focus.",
        ],
        deliverable: "Facilitation moves practice log.",
      },
      {
        day: 3,
        title: "Wed Design: Inclusive Learning Community",
        objective: "Design participation structures that support adult dignity, access, and belonging.",
        sources: [
          { key: "castUdl", minutes: 20 },
          { key: "accessibilityWcag", minutes: 15 },
        ],
        labSteps: [
          "Audit materials and activities for access barriers.",
          "Add multiple means for contribution and demonstration.",
          "Create community agreements tied to learning purpose.",
        ],
        deliverable: "Inclusive facilitation plan.",
      },
      {
        day: 4,
        title: "Thu Evaluate: Difficult Moments Protocol",
        objective: "Evaluate how to respond to conflict, misinformation, resistance, and harm.",
        sources: [
          { key: "mitTeachingAdult", minutes: 20 },
          { key: "brookfieldCriticalReflection", minutes: 20 },
        ],
        labSteps: [
          "Write response options for four difficult facilitation moments.",
          "Sort responses by goal: clarify, protect, redirect, repair, or deepen.",
          "Add a debrief protocol after a difficult exchange.",
        ],
        deliverable: "Difficult moments facilitation protocol.",
      },
      {
        day: 5,
        title: "Fri Review + Checkpoint: Facilitation Rehearsal",
        objective: "Demonstrate facilitation moves and reflect on adult learner impact.",
        sources: [
          { key: "communityInquiry", minutes: 15 },
          { key: "brookfieldAdultLearning", minutes: 15 },
        ],
        labSteps: [
          "Facilitate a 10-minute learning segment.",
          "Collect observer notes on voice, purpose, and challenge.",
          "Write a reflective improvement plan.",
        ],
        deliverable: "Facilitation rehearsal evidence.",
      },
    ],
  },
  {
    week: 12,
    phase: 3,
    title: "Evaluation Gate: Design and Facilitation",
    outcomes: [
      "Evaluate adult learning at reaction, learning, behavior, and results levels.",
      "Create an integrated design and facilitation packet.",
      "Pass the Phase 3 gate with evidence of inclusive, transfer-oriented learning design.",
    ],
    days: [
      {
        day: 1,
        title: "Mon Concept: Evaluation for Learning and Transfer",
        objective: "Explain evaluation as decision support for improvement and transfer.",
        sources: [
          { key: "kirkpatrickModel", minutes: 25 },
          { key: "learningGuildEvaluation", minutes: 15 },
        ],
        labSteps: [
          "Map one program to reaction, learning, behavior, and results evidence.",
          "Identify what decision each evidence source should support.",
          "Note risks of overclaiming impact from weak evidence.",
        ],
        deliverable: "Evaluation evidence map.",
      },
      {
        day: 2,
        title: "Tue Lab: Assessment and Rubric Build",
        objective: "Build an assessment that measures authentic adult performance.",
        sources: [
          { key: "cdcTraining", minutes: 15 },
          { key: "atdInstructionalDesign", minutes: 15 },
        ],
        labSteps: [
          "Select one outcome from Week 9.",
          "Design a performance task and analytic rubric.",
          "Check rubric criteria for observable evidence and bias risk.",
        ],
        deliverable: "Performance assessment and rubric.",
      },
      {
        day: 3,
        title: "Wed Design: Integrated Learning Experience",
        objective: "Assemble needs, outcomes, practice, facilitation, and evaluation into one design.",
        sources: [
          { key: "learningGuildDesign", minutes: 20 },
          { key: "castUdl", minutes: 15 },
        ],
        labSteps: [
          "Create a one-session or one-module design blueprint.",
          "Align outcomes, activities, materials, feedback, and evidence.",
          "Add facilitator notes and accessibility checks.",
        ],
        deliverable: "Integrated adult learning blueprint.",
      },
      {
        day: 4,
        title: "Thu Evaluate: Phase 3 Gate Review",
        objective: "Evaluate your blueprint for alignment, inclusion, transfer, and evidence quality.",
        sources: [
          { key: "brinkerhoffSuccessCase", minutes: 15 },
          { key: "kirkpatrickModel", minutes: 20 },
        ],
        labSteps: [
          "Trace each activity back to a need and outcome.",
          "Check whether practice and assessment resemble real performance.",
          "Revise evaluation claims to match the strength of evidence.",
        ],
        deliverable: "Revised Phase 3 gate blueprint.",
      },
      {
        day: 5,
        title: "Fri Review + Checkpoint: Phase 3 Gate",
        objective: "Submit the integrated design and pass the design-facilitation checkpoint.",
        sources: [
          { key: "learningGuildEvaluation", minutes: 15 },
          { key: "brookfieldCriticalReflection", minutes: 15 },
        ],
        labSteps: [
          "Submit the blueprint, assessment, rubric, and facilitation notes.",
          "Complete the Phase 3 gate quiz.",
          "Write a capstone opportunity statement for Phase 4.",
        ],
        deliverable: "Phase 3 gate portfolio.",
      },
    ],
  },
  {
    week: 13,
    phase: 4,
    title: "Expert Diagnosis and Consulting Practice",
    outcomes: [
      "Frame adult learning expertise as disciplined inquiry and ethical advising.",
      "Diagnose program problems across learner, design, facilitation, and system layers.",
      "Produce consulting recommendations that are actionable and evidence-limited.",
    ],
    days: [
      {
        day: 1,
        title: "Mon Concept: Expert Andragogy Practice",
        objective: "Define expert practice as judgment under context, constraints, and evidence limits.",
        sources: [
          { key: "merriamAdultLearning", minutes: 20 },
          { key: "brookfieldAdultLearning", minutes: 20 },
        ],
        labSteps: [
          "List the responsibilities of an andragogy expert to learners, sponsors, and evidence.",
          "Name common expert failure modes: overgeneralizing, blaming learners, and selling courses.",
          "Draft an expert practice code for your capstone.",
        ],
        deliverable: "Andragogy expert practice code.",
      },
      {
        day: 2,
        title: "Tue Lab: Multi-Layer Diagnosis",
        objective: "Diagnose adult learning issues across individual, social, design, and system layers.",
        sources: [
          { key: "atdNeedsAssessment", minutes: 20 },
          { key: "brinkerhoffSuccessCase", minutes: 15 },
        ],
        labSteps: [
          "Select a capstone program or learning problem.",
          "Map learner evidence, design evidence, facilitation evidence, and system evidence.",
          "Separate confirmed findings from hypotheses.",
        ],
        deliverable: "Capstone diagnostic evidence map.",
      },
      {
        day: 3,
        title: "Wed Design: Consulting Recommendation",
        objective: "Create recommendations that connect diagnosis, intervention, and expected evidence.",
        sources: [
          { key: "learningGuildDesign", minutes: 15 },
          { key: "kirkpatrickModel", minutes: 15 },
        ],
        labSteps: [
          "Write three possible recommendations with tradeoffs.",
          "Select one recommendation based on feasibility and learner value.",
          "Define what evidence would confirm or disconfirm success.",
        ],
        deliverable: "Evidence-limited consulting recommendation.",
      },
      {
        day: 4,
        title: "Thu Evaluate: Ethical and Stakeholder Review",
        objective: "Evaluate recommendations for learner dignity, sponsor pressure, and unintended effects.",
        sources: [
          { key: "mitTeachingAdult", minutes: 20 },
          { key: "castUdl", minutes: 15 },
        ],
        labSteps: [
          "Identify who benefits, who bears costs, and who may be unheard.",
          "Check whether recommendations preserve learner autonomy and access.",
          "Revise language to avoid unsupported certainty.",
        ],
        deliverable: "Ethical stakeholder review.",
      },
      {
        day: 5,
        title: "Fri Review + Checkpoint: Expert Diagnosis",
        objective: "Present a concise diagnosis and receive critique on evidence and judgment.",
        sources: [
          { key: "brookfieldCriticalReflection", minutes: 15 },
          { key: "learningGuildEvaluation", minutes: 15 },
        ],
        labSteps: [
          "Prepare a five-slide diagnosis presentation.",
          "Invite critique on missing evidence and assumptions.",
          "Revise your capstone problem statement.",
        ],
        deliverable: "Expert diagnosis presentation and revised problem statement.",
      },
    ],
  },
  {
    week: 14,
    phase: 4,
    title: "Research-Informed Program Improvement",
    outcomes: [
      "Use research and evaluation evidence responsibly in adult learning decisions.",
      "Create a practical measurement plan for improvement.",
      "Build a learning agenda for ongoing program refinement.",
    ],
    days: [
      {
        day: 1,
        title: "Mon Concept: Evidence-Informed Andragogy",
        objective: "Distinguish research evidence, local evidence, professional judgment, and preference.",
        sources: [
          { key: "learningGuildEvaluation", minutes: 20 },
          { key: "merriamAdultLearning", minutes: 15 },
        ],
        labSteps: [
          "Classify evidence sources available for your capstone.",
          "Rate each source for relevance, credibility, and timeliness.",
          "Identify one decision that needs better evidence.",
        ],
        deliverable: "Capstone evidence quality table.",
      },
      {
        day: 2,
        title: "Tue Lab: Literature-to-Design Translation",
        objective: "Translate adult learning literature into design claims without overclaiming.",
        sources: [
          { key: "mezirowTransformative", minutes: 15 },
          { key: "kolbExperiential", minutes: 15 },
          { key: "wlodkowskiMotivation", minutes: 15 },
        ],
        labSteps: [
          "Select three literature-backed principles relevant to your capstone.",
          "Write a design implication for each principle.",
          "Add a local test that would show whether the implication works here.",
        ],
        deliverable: "Literature-to-design translation matrix.",
      },
      {
        day: 3,
        title: "Wed Design: Measurement and Improvement Plan",
        objective: "Design a measurement plan that supports learning improvement, not vanity reporting.",
        sources: [
          { key: "kirkpatrickModel", minutes: 20 },
          { key: "brinkerhoffSuccessCase", minutes: 15 },
        ],
        labSteps: [
          "Choose leading and lagging indicators for your capstone.",
          "Define collection methods, timing, and interpretation cautions.",
          "Add one success case and one failure case question.",
        ],
        deliverable: "Measurement and improvement plan.",
      },
      {
        day: 4,
        title: "Thu Evaluate: Data Ethics and Interpretation",
        objective: "Evaluate measurement choices for privacy, fairness, burden, and validity.",
        sources: [
          { key: "accessibilityWcag", minutes: 15 },
          { key: "mitTeachingAdult", minutes: 15 },
        ],
        labSteps: [
          "Check whether data collection burdens learners or exposes sensitive information.",
          "Identify interpretation risks such as selection bias or novelty effects.",
          "Revise metrics to support fair decisions.",
        ],
        deliverable: "Data ethics and interpretation memo.",
      },
      {
        day: 5,
        title: "Fri Review + Checkpoint: Learning Agenda",
        objective: "Build a learning agenda for iterative program improvement.",
        sources: [
          { key: "learningGuildEvaluation", minutes: 15 },
          { key: "brinkerhoffSuccessCase", minutes: 15 },
        ],
        labSteps: [
          "Write three improvement questions for the next program cycle.",
          "Connect each question to data, decision, and owner.",
          "Prioritize questions by learner value and feasibility.",
        ],
        deliverable: "Capstone learning agenda.",
      },
    ],
  },
  {
    week: 15,
    phase: 4,
    title: "Portfolio, Writing, and Productization",
    outcomes: [
      "Communicate adult learning expertise through clear writing and evidence portfolios.",
      "Package designs, tools, and facilitation assets for reuse.",
      "Prepare a capstone portfolio that demonstrates expert-level judgment.",
    ],
    days: [
      {
        day: 1,
        title: "Mon Concept: Evidence Portfolio",
        objective: "Explain what expert evidence looks like in adult learning practice.",
        sources: [
          { key: "plainLanguage", minutes: 15 },
          { key: "learningGuildDesign", minutes: 15 },
        ],
        labSteps: [
          "Inventory artifacts from Weeks 1-14.",
          "Select evidence showing diagnosis, design, facilitation, evaluation, and ethics.",
          "Write captions that explain context, decision, and impact.",
        ],
        deliverable: "Portfolio artifact inventory.",
      },
      {
        day: 2,
        title: "Tue Lab: Expert Writing Sprint",
        objective: "Write concise, evidence-grounded explanations for stakeholders and peers.",
        sources: [
          { key: "plainLanguage", minutes: 20 },
          { key: "brookfieldCriticalReflection", minutes: 15 },
        ],
        labSteps: [
          "Write a 600-word capstone narrative.",
          "Cut jargon and replace abstract claims with evidence.",
          "Add limitations and next-learning statements.",
        ],
        deliverable: "Capstone narrative draft.",
      },
      {
        day: 3,
        title: "Wed Design: Reusable Product Toolkit",
        objective: "Package adult learning tools so others can apply them with fidelity.",
        sources: [
          { key: "atdInstructionalDesign", minutes: 15 },
          { key: "learningGuildDesign", minutes: 20 },
        ],
        labSteps: [
          "Select three tools from your capstone to package.",
          "Add purpose, instructions, examples, and quality criteria.",
          "Define where adaptation is allowed and where fidelity matters.",
        ],
        deliverable: "Reusable andragogy toolkit.",
      },
      {
        day: 4,
        title: "Thu Evaluate: Portfolio Review",
        objective: "Evaluate the portfolio for coherence, credibility, accessibility, and expert judgment.",
        sources: [
          { key: "accessibilityWcag", minutes: 15 },
          { key: "castUdl", minutes: 15 },
        ],
        labSteps: [
          "Review portfolio navigation, headings, captions, and accessibility.",
          "Check whether each artifact supports a claim about your expertise.",
          "Remove or revise artifacts that add volume without evidence.",
        ],
        deliverable: "Portfolio quality review checklist.",
      },
      {
        day: 5,
        title: "Fri Review + Checkpoint: Capstone Rehearsal",
        objective: "Rehearse the capstone story and identify final revisions.",
        sources: [
          { key: "learningGuildEvaluation", minutes: 15 },
          { key: "kirkpatrickModel", minutes: 15 },
        ],
        labSteps: [
          "Deliver a 10-minute capstone walkthrough.",
          "Collect feedback on problem, design logic, evidence, and limits.",
          "Create a final revision list for Week 16.",
        ],
        deliverable: "Capstone rehearsal recording or notes.",
      },
    ],
  },
  {
    week: 16,
    phase: 4,
    title: "Expert Gate and Capstone Defense",
    outcomes: [
      "Defend a complete adult learning capstone with research, design, facilitation, and evaluation evidence.",
      "Demonstrate expert judgment about context, tradeoffs, ethics, and limitations.",
      "Pass the expert gate and define a continuing practice agenda.",
    ],
    days: [
      {
        day: 1,
        title: "Mon Concept: Expert Defense Standards",
        objective: "Clarify the standards for expert-level andragogy practice and capstone defense.",
        sources: [
          { key: "brookfieldAdultLearning", minutes: 20 },
          { key: "kirkpatrickModel", minutes: 15 },
        ],
        labSteps: [
          "Review the capstone against standards for diagnosis, alignment, inclusion, transfer, and evidence.",
          "Write likely defense questions from learner, sponsor, and evaluator perspectives.",
          "Prepare concise answers that acknowledge uncertainty.",
        ],
        deliverable: "Expert defense question bank.",
      },
      {
        day: 2,
        title: "Tue Lab: Final Evidence Assembly",
        objective: "Assemble the final capstone evidence packet for expert review.",
        sources: [
          { key: "plainLanguage", minutes: 15 },
          { key: "accessibilityWcag", minutes: 15 },
        ],
        labSteps: [
          "Finalize the capstone narrative, blueprint, toolkit, and measurement plan.",
          "Check citations, artifact labels, and accessibility.",
          "Create an executive summary for a busy stakeholder.",
        ],
        deliverable: "Final capstone evidence packet.",
      },
      {
        day: 3,
        title: "Wed Design: Practice Agenda",
        objective: "Design a continuing professional practice agenda beyond the course.",
        sources: [
          { key: "unescoLifelongLearning", minutes: 15 },
          { key: "merriamAdultLearning", minutes: 15 },
        ],
        labSteps: [
          "Identify three practice domains to keep developing.",
          "Choose communities, readings, mentors, or projects for each domain.",
          "Define evidence you will collect over the next 90 days.",
        ],
        deliverable: "90-day andragogy practice agenda.",
      },
      {
        day: 4,
        title: "Thu Evaluate: Capstone Defense",
        objective: "Defend the capstone and respond to critique with evidence and professional humility.",
        sources: [
          { key: "brookfieldCriticalReflection", minutes: 15 },
          { key: "learningGuildEvaluation", minutes: 15 },
        ],
        labSteps: [
          "Present the problem, diagnosis, design, evaluation plan, and limitations.",
          "Answer questions using evidence and acknowledge unresolved issues.",
          "Record critique and decide which revisions are necessary before submission.",
        ],
        deliverable: "Capstone defense notes and revision decisions.",
      },
      {
        day: 5,
        title: "Fri Review + Checkpoint: Phase 4 and Expert Gate",
        objective: "Submit the final portfolio, complete the expert gate, and plan continued contribution.",
        sources: [
          { key: "learningGuildDesign", minutes: 15 },
          { key: "unescoLifelongLearning", minutes: 15 },
        ],
        labSteps: [
          "Submit the final capstone portfolio and evidence packet.",
          "Complete the Phase 4 gate quiz and expert threshold review.",
          "Write a final reflection on how your view of adult learning expertise changed.",
        ],
        deliverable: "Final expert gate portfolio.",
      },
    ],
  },
];

export const WEEKS: Week[] = WEEK_PLANS.map((weekPlan) => ({
  ...weekPlan,
  days: weekPlan.days.map(day),
}));
