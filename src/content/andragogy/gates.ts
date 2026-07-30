export type PhaseId = 1 | 2 | 3 | 4;

export type PhaseGateItem = {
  key: string;
  label: string;
};

export type PhaseGate = {
  week: number;
  items: PhaseGateItem[];
};

export const PHASE_GATES: Record<PhaseId, PhaseGate> = {
  1: {
    week: 4,
    items: [
      { key: "adult-learning-analysis-framework", label: "Adult learning analysis framework" },
      { key: "foundation-case-audit", label: "Foundation case audit notes" },
      { key: "theory-grounded-redesign", label: "Theory-grounded redesign recommendation" },
      { key: "phase-1-gate-quiz", label: "Phase 1 gate quiz score at or above threshold" },
    ],
  },
  2: {
    week: 8,
    items: [
      { key: "agency-support-map", label: "Agency support architecture map" },
      { key: "learner-support-case", label: "Learner support case analysis" },
      { key: "advising-persistence-toolkit", label: "Advising and persistence toolkit" },
      { key: "phase-2-gate-quiz", label: "Phase 2 gate quiz score at or above threshold" },
    ],
  },
  3: {
    week: 12,
    items: [
      { key: "evaluation-evidence-map", label: "Evaluation evidence map" },
      { key: "performance-assessment-rubric", label: "Performance assessment and rubric" },
      { key: "integrated-learning-blueprint", label: "Integrated adult learning blueprint" },
      { key: "phase-3-gate-quiz", label: "Phase 3 gate quiz score at or above threshold" },
    ],
  },
  4: {
    week: 16,
    items: [
      { key: "capstone-evidence-packet", label: "Final capstone evidence packet" },
      { key: "expert-defense-notes", label: "Capstone defense notes and revision decisions" },
      { key: "practice-agenda", label: "90-day andragogy practice agenda" },
      { key: "phase-4-gate-quiz", label: "Phase 4 gate quiz score at or above threshold" },
      { key: "expert-threshold-review", label: "Expert threshold review at or above threshold" },
    ],
  },
};
