export const PHASE_GATE_THRESHOLD = 80;
export const EXPERT_THRESHOLD = 85;

export type PhaseId = 1 | 2 | 3 | 4;
export type ChoiceLetter = "A" | "B" | "C" | "D";

export type QuizChoice = {
  letter: ChoiceLetter;
  text: string;
  correct: boolean;
};

export type QuizQuestion = {
  id: string;
  number: number;
  phase: PhaseId;
  stem: string;
  choices: QuizChoice[];
  explanation: string;
};

export type ScoreResult = {
  correct: number;
  total: number;
  percentage: number;
  passedPhaseGate: boolean;
  passedExpertGate: boolean;
  missed: string[];
};

const GATE_WEEKS: Record<PhaseId, number> = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "p1-q1-andragogy-assumptions",
    number: 1,
    phase: 1,
    stem: "What is the expert use of Knowles' adult learning assumptions?",
    choices: [
      { letter: "A", text: "Treat them as fixed traits that all adult learners share.", correct: false },
      { letter: "B", text: "Use them as hypotheses to investigate in a specific learner context.", correct: true },
      { letter: "C", text: "Replace assessment because adults can always judge their own mastery.", correct: false },
      { letter: "D", text: "Use them only for informal learning and never in programs.", correct: false },
    ],
    explanation:
      "Knowles' assumptions are powerful design prompts, but expert practice verifies them against learner goals, constraints, experience, and context.",
  },
  {
    id: "p1-q2-experience",
    number: 2,
    phase: 1,
    stem: "Why must adult learner experience be treated as both an asset and a possible barrier?",
    choices: [
      { letter: "A", text: "Because prior experience can provide examples while also reinforcing inaccurate habits.", correct: true },
      { letter: "B", text: "Because adults should never be asked to change established practices.", correct: false },
      { letter: "C", text: "Because experience matters only for discussion, not assessment.", correct: false },
      { letter: "D", text: "Because novices have no experience relevant to learning.", correct: false },
    ],
    explanation:
      "Adult experience supports meaning-making and relevance, but it can also encode assumptions, outdated routines, or misconceptions that need reflection and testing.",
  },
  {
    id: "p1-q3-experiential-cycle",
    number: 3,
    phase: 1,
    stem: "A simulation is engaging, but learners leave without changing how they act at work. Which design element is most likely missing?",
    choices: [
      { letter: "A", text: "More content slides before the simulation.", correct: false },
      { letter: "B", text: "A longer icebreaker.", correct: false },
      { letter: "C", text: "Structured reflection, abstraction, feedback, and retry.", correct: true },
      { letter: "D", text: "A rule that all learners complete the same role.", correct: false },
    ],
    explanation:
      "Experiential learning requires more than activity. Learners need to examine experience, form principles, receive feedback, and try improved action.",
  },
  {
    id: "p2-q1-motivation",
    number: 4,
    phase: 2,
    stem: "Which design move best reflects adult motivation principles?",
    choices: [
      { letter: "A", text: "Begin with policies learners must memorize before seeing the problem.", correct: false },
      { letter: "B", text: "Connect learning to a credible near-term problem and include a confidence-building success.", correct: true },
      { letter: "C", text: "Remove learner choice so no one feels uncertain.", correct: false },
      { letter: "D", text: "Assume disengagement means adults lack discipline.", correct: false },
    ],
    explanation:
      "Adult motivation strengthens when learners see value, experience respect and inclusion, believe success is possible, and retain meaningful agency.",
  },
  {
    id: "p2-q2-sdl",
    number: 5,
    phase: 2,
    stem: "In Grow's staged self-directed learning model, what changes as learners become more self-directed?",
    choices: [
      { letter: "A", text: "The instructor withdraws all structure immediately.", correct: false },
      { letter: "B", text: "The facilitator adjusts support from directive structure toward delegation and consultation.", correct: true },
      { letter: "C", text: "Assessment becomes unnecessary.", correct: false },
      { letter: "D", text: "Learners stop needing feedback.", correct: false },
    ],
    explanation:
      "Grow's model treats self-direction as developmental. Good facilitation matches structure, coaching, and autonomy to the learner's current capacity.",
  },
  {
    id: "p2-q3-transformative",
    number: 6,
    phase: 2,
    stem: "What makes transformative learning ethically delicate?",
    choices: [
      { letter: "A", text: "It asks learners to examine assumptions that may be tied to identity, power, and life history.", correct: true },
      { letter: "B", text: "It can only happen when learners agree with the facilitator.", correct: false },
      { letter: "C", text: "It requires eliminating all discomfort from learning.", correct: false },
      { letter: "D", text: "It avoids reflection and relies on repetition.", correct: false },
    ],
    explanation:
      "Transformative learning can challenge frames of reference. Facilitators must protect agency, consent, safety, and support while inviting critical reflection.",
  },
  {
    id: "p3-q1-needs",
    number: 7,
    phase: 3,
    stem: "A sponsor requests training because employees are not following a process, but observation shows the process conflicts with available tools. What should an expert designer do first?",
    choices: [
      { letter: "A", text: "Build the requested course immediately.", correct: false },
      { letter: "B", text: "Recommend only motivational messaging.", correct: false },
      { letter: "C", text: "Explain that the gap is not purely a learning need and identify system supports.", correct: true },
      { letter: "D", text: "Lower the assessment standard.", correct: false },
    ],
    explanation:
      "Needs assessment distinguishes knowledge and skill gaps from environmental, workflow, incentive, or tool problems that training alone cannot solve.",
  },
  {
    id: "p3-q2-practice",
    number: 8,
    phase: 3,
    stem: "Which practice task is strongest for adult transfer?",
    choices: [
      { letter: "A", text: "A recall quiz on definitions only.", correct: false },
      { letter: "B", text: "A realistic scenario requiring decisions under authentic constraints, followed by feedback and retry.", correct: true },
      { letter: "C", text: "A passive video with no application.", correct: false },
      { letter: "D", text: "A generic worksheet unrelated to work or life use.", correct: false },
    ],
    explanation:
      "Transfer improves when practice resembles the real performance context and includes feedback that helps learners improve future attempts.",
  },
  {
    id: "p3-q3-evaluation",
    number: 9,
    phase: 3,
    stem: "Why is it risky to claim program impact from learner satisfaction scores alone?",
    choices: [
      { letter: "A", text: "Satisfaction can support improvement decisions but does not prove learning, behavior change, or results.", correct: true },
      { letter: "B", text: "Satisfaction data is never useful.", correct: false },
      { letter: "C", text: "Adult learners cannot report reactions accurately.", correct: false },
      { letter: "D", text: "Evaluation should happen only before instruction.", correct: false },
    ],
    explanation:
      "Reaction data is one evidence layer. Stronger claims require aligned evidence of learning, behavior, transfer, and results.",
  },
  {
    id: "p4-q1-expertise",
    number: 10,
    phase: 4,
    stem: "What best characterizes expert andragogy practice?",
    choices: [
      { letter: "A", text: "Applying a favorite model to every adult learning problem.", correct: false },
      { letter: "B", text: "Balancing theory, local evidence, learner dignity, constraints, and ethical judgment.", correct: true },
      { letter: "C", text: "Promising measurable impact before evidence exists.", correct: false },
      { letter: "D", text: "Avoiding stakeholder disagreement by keeping recommendations vague.", correct: false },
    ],
    explanation:
      "Expertise appears in disciplined judgment: using theory and evidence while naming uncertainty, tradeoffs, ethics, and context.",
  },
  {
    id: "p4-q2-evidence",
    number: 11,
    phase: 4,
    stem: "Which capstone evidence statement is strongest?",
    choices: [
      { letter: "A", text: "Adults like relevant training, so this will work.", correct: false },
      { letter: "B", text: "The design aligns a documented task gap with scenario practice, rubric feedback, and a transfer measurement plan.", correct: true },
      { letter: "C", text: "The course is modern because it includes discussion.", correct: false },
      { letter: "D", text: "The facilitator believes learners improved.", correct: false },
    ],
    explanation:
      "Strong evidence links diagnosed need, design choices, authentic performance evidence, and a plan for observing transfer.",
  },
  {
    id: "p4-q3-portfolio",
    number: 12,
    phase: 4,
    stem: "What should an expert portfolio do beyond collecting artifacts?",
    choices: [
      { letter: "A", text: "Show coherent judgment by explaining context, decisions, evidence, limitations, and future learning.", correct: true },
      { letter: "B", text: "Include every worksheet produced regardless of quality.", correct: false },
      { letter: "C", text: "Hide unresolved questions to appear certain.", correct: false },
      { letter: "D", text: "Prioritize visual polish over evidence.", correct: false },
    ],
    explanation:
      "An expert portfolio demonstrates thinking and evidence, not volume. It should make professional judgment visible and critique-ready.",
  },
];

export function gateWeekForPhase(phase: PhaseId): number {
  return GATE_WEEKS[phase];
}

export function isGateWeek(week: number): boolean {
  return Object.values(GATE_WEEKS).includes(week);
}

export function questionsForScope(scope: "all" | PhaseId | { phase?: PhaseId; gateWeek?: number } = "all"): QuizQuestion[] {
  if (scope === "all") {
    return QUIZ_QUESTIONS;
  }

  if (typeof scope === "number") {
    return QUIZ_QUESTIONS.filter((question) => question.phase === scope);
  }

  if (scope.phase !== undefined) {
    return QUIZ_QUESTIONS.filter((question) => question.phase === scope.phase);
  }

  if (scope.gateWeek !== undefined) {
    const phase = (Object.entries(GATE_WEEKS).find(([, week]) => week === scope.gateWeek)?.[0] ?? undefined) as
      | `${PhaseId}`
      | undefined;
    return phase === undefined ? [] : QUIZ_QUESTIONS.filter((question) => question.phase === Number(phase));
  }

  return QUIZ_QUESTIONS;
}

export function scoreAnswers(answers: Record<string, ChoiceLetter>, questions: QuizQuestion[] = QUIZ_QUESTIONS): ScoreResult {
  const missed: string[] = [];
  const correct = questions.reduce((count, question) => {
    const correctChoice = question.choices.find((choice) => choice.correct);
    const isCorrect = correctChoice?.letter === answers[question.id];

    if (!isCorrect) {
      missed.push(question.id);
    }

    return count + (isCorrect ? 1 : 0);
  }, 0);
  const total = questions.length;
  const percentage = total === 0 ? 0 : Math.round((correct / total) * 100);

  return {
    correct,
    total,
    percentage,
    passedPhaseGate: percentage >= PHASE_GATE_THRESHOLD,
    passedExpertGate: percentage >= EXPERT_THRESHOLD,
    missed,
  };
}
