export type AchievementCategory = "skill" | "gate" | "expert" | "bonus";
export type AchievementMotif =
  | "spark"
  | "map"
  | "teach"
  | "gate"
  | "student"
  | "research"
  | "portfolio"
  | "expert"
  | "writing"
  | "product";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  motif: AchievementMotif;
  howToEarn: string;
  requiredForExpert: boolean;
  phase: 1 | 2 | 3 | 4;
  week: number;
  skillId?: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "skill-adult-learning-foundations",
    title: "Andragogy Spark",
    description: "Explain adult learning assumptions as testable design hypotheses.",
    category: "skill",
    motif: "spark",
    howToEarn: "Complete the Week 1 learner assumptions brief and score proficient on the foundation diagnostic items.",
    requiredForExpert: true,
    phase: 1,
    week: 1,
    skillId: "adult-learning-foundations",
  },
  {
    id: "skill-experiential-reflection",
    title: "Experience Mapper",
    description: "Design experiential learning loops with structured reflection and retry.",
    category: "skill",
    motif: "map",
    howToEarn: "Submit the Week 3 practice-reflection loop and reflective practitioner memo.",
    requiredForExpert: true,
    phase: 1,
    week: 3,
    skillId: "experiential-reflection",
  },
  {
    id: "gate-phase-1",
    title: "Foundations Gate",
    description: "Demonstrate command of adult learning foundations through audit and redesign evidence.",
    category: "gate",
    motif: "gate",
    howToEarn: "Pass the Week 4 gate quiz at 80% or higher and submit the Phase 1 gate portfolio.",
    requiredForExpert: true,
    phase: 1,
    week: 4,
  },
  {
    id: "skill-motivation-design",
    title: "Motivation Steward",
    description: "Design for adult value, confidence, inclusion, and volition.",
    category: "skill",
    motif: "student",
    howToEarn: "Complete the Week 5 motivation support inventory and motivational entry sequence.",
    requiredForExpert: true,
    phase: 2,
    week: 5,
    skillId: "motivation-design",
  },
  {
    id: "skill-self-direction-coaching",
    title: "Self-Direction Coach",
    description: "Match learner agency supports to readiness for self-directed learning.",
    category: "skill",
    motif: "teach",
    howToEarn: "Submit the Week 6 learning contract, choice scaffolding plan, and SDL advisory memo.",
    requiredForExpert: true,
    phase: 2,
    week: 6,
    skillId: "self-direction-coaching",
  },
  {
    id: "gate-phase-2",
    title: "Agency Gate",
    description: "Integrate motivation, self-direction, and transformative learning supports.",
    category: "gate",
    motif: "gate",
    howToEarn: "Pass the Week 8 gate quiz at 80% or higher and submit the agency support architecture.",
    requiredForExpert: true,
    phase: 2,
    week: 8,
  },
  {
    id: "skill-adult-program-design",
    title: "Research Design Builder",
    description: "Align needs, outcomes, authentic practice, feedback, and transfer evidence.",
    category: "skill",
    motif: "research",
    howToEarn: "Complete the Week 9 needs-to-outcomes chain and Week 10 practice design package.",
    requiredForExpert: true,
    phase: 3,
    week: 10,
    skillId: "adult-program-design",
  },
  {
    id: "skill-adult-facilitation-evaluation",
    title: "Facilitation Evaluator",
    description: "Facilitate inclusive adult learning and evaluate learning evidence responsibly.",
    category: "skill",
    motif: "teach",
    howToEarn: "Submit the Week 11 facilitation rehearsal and Week 12 evaluation evidence map.",
    requiredForExpert: true,
    phase: 3,
    week: 12,
    skillId: "adult-facilitation-evaluation",
  },
  {
    id: "gate-phase-3",
    title: "Design and Facilitation Gate",
    description: "Defend an inclusive, transfer-oriented adult learning blueprint.",
    category: "gate",
    motif: "gate",
    howToEarn: "Pass the Week 12 gate quiz at 80% or higher and submit the integrated design blueprint.",
    requiredForExpert: true,
    phase: 3,
    week: 12,
  },
  {
    id: "skill-expert-consulting",
    title: "Expert Consultant",
    description: "Diagnose adult learning problems across learner, design, facilitation, and system layers.",
    category: "skill",
    motif: "expert",
    howToEarn: "Complete the Week 13 diagnostic evidence map and ethical stakeholder review.",
    requiredForExpert: true,
    phase: 4,
    week: 13,
    skillId: "expert-consulting",
  },
  {
    id: "skill-capstone-portfolio",
    title: "Portfolio Architect",
    description: "Assemble a capstone portfolio that shows expert judgment, evidence, and limitations.",
    category: "skill",
    motif: "portfolio",
    howToEarn: "Submit the Week 15 portfolio artifact inventory, capstone narrative, and quality review.",
    requiredForExpert: true,
    phase: 4,
    week: 15,
    skillId: "capstone-portfolio",
  },
  {
    id: "gate-phase-4",
    title: "Capstone Gate",
    description: "Defend a complete adult learning capstone with research, design, and evaluation evidence.",
    category: "gate",
    motif: "gate",
    howToEarn: "Pass the Week 16 phase gate quiz at 80% or higher and submit the final capstone evidence packet.",
    requiredForExpert: true,
    phase: 4,
    week: 16,
  },
  {
    id: "expert-gate",
    title: "Andragogy Expert",
    description: "Meet the expert threshold across all gates and submit a complete capstone defense.",
    category: "expert",
    motif: "expert",
    howToEarn: "Earn all required skill and gate achievements, complete the final portfolio, and score 85% or higher on the expert gate review.",
    requiredForExpert: true,
    phase: 4,
    week: 16,
  },
  {
    id: "bonus-critical-writing",
    title: "Critical Writing Badge",
    description: "Communicate adult learning judgments with clarity, evidence, and appropriate limits.",
    category: "bonus",
    motif: "writing",
    howToEarn: "Revise the Week 15 capstone narrative until every major claim includes context, evidence, and limitation language.",
    requiredForExpert: false,
    phase: 4,
    week: 15,
  },
  {
    id: "bonus-product-toolkit",
    title: "Reusable Product Badge",
    description: "Package andragogy tools for reuse with instructions, examples, and quality criteria.",
    category: "bonus",
    motif: "product",
    howToEarn: "Publish three reusable capstone tools with purpose, fidelity notes, adaptation guidance, and examples.",
    requiredForExpert: false,
    phase: 4,
    week: 15,
  },
];
