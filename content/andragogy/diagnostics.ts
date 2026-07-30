export type PhaseId = 1 | 2 | 3 | 4;
export type ChoiceLetter = "A" | "B" | "C" | "D";

export type DiagnosticChoice = {
  letter: ChoiceLetter;
  text: string;
  correct: boolean;
};

export type DiagnosticQuestion = {
  id: string;
  skillId: string;
  stem: string;
  choices: DiagnosticChoice[];
  explanation: string;
};

export type DiagnosticPhase = {
  phase: PhaseId;
  title: string;
  baseline: DiagnosticQuestion[];
  reassessment: DiagnosticQuestion[];
};

export type Diagnostics = {
  version: 1;
  phases: DiagnosticPhase[];
};

function choices(correct: ChoiceLetter, texts: Record<ChoiceLetter, string>): DiagnosticChoice[] {
  return (["A", "B", "C", "D"] as const).map((letter) => ({
    letter,
    text: texts[letter],
    correct: letter === correct,
  }));
}

export const DIAGNOSTICS: Diagnostics = {
  version: 1,
  phases: [
    {
      phase: 1,
      title: "Adult Learning Foundations",
      baseline: [
        {
          id: "p1-b1",
          skillId: "adult-learning-foundations",
          stem: "A team says, 'Adults are self-directed, so we can remove structure.' What is the best response?",
          choices: choices("C", {
            A: "Agree because adults never need structure.",
            B: "Replace the course with readings only.",
            C: "Treat self-direction as contextual and assess what support learners need.",
            D: "Use only lectures because autonomy is risky.",
          }),
          explanation: "Adult autonomy matters, but self-direction varies by context, confidence, stakes, and prior experience.",
        },
        {
          id: "p1-b2",
          skillId: "adult-learning-foundations",
          stem: "Which evidence best informs an adult learner profile?",
          choices: choices("B", {
            A: "Age range alone.",
            B: "Goals, roles, constraints, experience, stakes, and transfer setting.",
            C: "Preferred slide design.",
            D: "The sponsor's desired launch date.",
          }),
          explanation: "Adult learner profiles should explain context and purpose, not rely on demographics alone.",
        },
        {
          id: "p1-b3",
          skillId: "adult-learning-foundations",
          stem: "What does readiness to learn usually connect to for adults?",
          choices: choices("A", {
            A: "Current roles, transitions, problems, or responsibilities.",
            B: "A fixed developmental age.",
            C: "The number of modules in the course.",
            D: "Whether content is difficult for the instructor.",
          }),
          explanation: "Adult readiness often rises when learning helps with immediate roles, transitions, and meaningful problems.",
        },
        {
          id: "p1-b4",
          skillId: "adult-learning-foundations",
          stem: "A course ignores learner experience. What risk is most likely?",
          choices: choices("D", {
            A: "Learners will have too much choice.",
            B: "Assessment will become impossible.",
            C: "The course will be too short.",
            D: "Learners may see content as irrelevant or fail to examine existing habits.",
          }),
          explanation: "Adult experience is a major resource for meaning-making and a target for reflection.",
        },
        {
          id: "p1-b5",
          skillId: "experiential-reflection",
          stem: "Which sequence best reflects experiential learning?",
          choices: choices("B", {
            A: "Read, memorize, certify, forget.",
            B: "Experience, reflect, conceptualize, experiment.",
            C: "Watch, agree, repeat, leave.",
            D: "Survey, sort, schedule, report.",
          }),
          explanation: "Kolb's cycle links concrete experience with reflection, concepts, and new experimentation.",
        },
        {
          id: "p1-b6",
          skillId: "experiential-reflection",
          stem: "What makes a reflection prompt stronger?",
          choices: choices("A", {
            A: "It asks learners to examine evidence, assumptions, consequences, and future action.",
            B: "It asks only whether learners enjoyed the activity.",
            C: "It tells learners what conclusion to reach.",
            D: "It avoids connecting experience to practice.",
          }),
          explanation: "Expert reflection prompts move beyond reaction toward analysis, critical questioning, and transfer.",
        },
        {
          id: "p1-b7",
          skillId: "experiential-reflection",
          stem: "A hands-on activity lacks debrief or retry. What is the key weakness?",
          choices: choices("C", {
            A: "It is too relevant.",
            B: "It gives learners too much evidence.",
            C: "It may create engagement without learning from experience.",
            D: "It has too much transfer support.",
          }),
          explanation: "Experience needs interpretation, feedback, abstraction, and improved action to become learning.",
        },
        {
          id: "p1-b8",
          skillId: "adult-learning-foundations",
          stem: "Which statement is most consistent with expert andragogy foundations?",
          choices: choices("D", {
            A: "One adult learning model explains every learner.",
            B: "Adults should never be challenged.",
            C: "Theory removes the need for context.",
            D: "Theory guides inquiry, and learner evidence guides decisions.",
          }),
          explanation: "Expert practice uses theory as a lens while grounding decisions in local learner evidence.",
        },
      ],
      reassessment: [
        {
          id: "p1-r1",
          skillId: "adult-learning-foundations",
          stem: "You inherit a content-heavy compliance course. What is the strongest first redesign question?",
          choices: choices("A", {
            A: "What real decisions or risks must adults handle after the course?",
            B: "How can the slide count be preserved?",
            C: "How can learners be prevented from sharing experience?",
            D: "Which theory can be cited without checking context?",
          }),
          explanation: "Adult learning foundations push designers toward real problems, context, and transfer.",
        },
        {
          id: "p1-r2",
          skillId: "adult-learning-foundations",
          stem: "A learner resists a new method because their old method worked for years. What should facilitation do?",
          choices: choices("B", {
            A: "Dismiss the learner's experience.",
            B: "Invite comparison of old and new methods against current evidence and constraints.",
            C: "Avoid the topic.",
            D: "Let experience override all standards.",
          }),
          explanation: "Experience should be respected and examined, especially when conditions or standards have changed.",
        },
        {
          id: "p1-r3",
          skillId: "adult-learning-foundations",
          stem: "Which design choice best supports adult readiness?",
          choices: choices("C", {
            A: "Begin with a long history unrelated to learner roles.",
            B: "Hide the purpose until the final assessment.",
            C: "Open with a realistic problem learners currently face.",
            D: "Remove all learner questions from the session.",
          }),
          explanation: "Readiness strengthens when adults see how learning relates to current responsibilities and problems.",
        },
        {
          id: "p1-r4",
          skillId: "adult-learning-foundations",
          stem: "Which claim needs the most evidence before design decisions are made?",
          choices: choices("D", {
            A: "Learners have time constraints.",
            B: "The program has transfer goals.",
            C: "Learners bring prior experience.",
            D: "All learners are already highly self-directed in this domain.",
          }),
          explanation: "Broad claims about learner capacity need validation because support needs differ widely.",
        },
        {
          id: "p1-r5",
          skillId: "experiential-reflection",
          stem: "What is the best evidence that reflection improved learning?",
          choices: choices("A", {
            A: "Learners revise their strategies and justify changes with evidence.",
            B: "Learners write longer paragraphs.",
            C: "Learners say the activity was fun.",
            D: "The facilitator talks less.",
          }),
          explanation: "Quality reflection becomes visible in changed reasoning, strategy, and future action.",
        },
        {
          id: "p1-r6",
          skillId: "experiential-reflection",
          stem: "A debrief asks, 'What happened, why did it happen, what assumption shaped your action, and what will you try next?' What kind of reflection is this?",
          choices: choices("B", {
            A: "Pure reaction.",
            B: "Structured analytic and critical reflection.",
            C: "Unrelated evaluation.",
            D: "Only memorization practice.",
          }),
          explanation: "The prompt moves through description, analysis, assumption testing, and transfer planning.",
        },
        {
          id: "p1-r7",
          skillId: "experiential-reflection",
          stem: "Which activity design most clearly completes an experiential loop?",
          choices: choices("C", {
            A: "A role-play with no feedback.",
            B: "A lecture followed by attendance credit.",
            C: "A scenario, debrief, principle extraction, feedback, and second attempt.",
            D: "A reading list with no application.",
          }),
          explanation: "The complete loop supports experience, reflection, conceptualization, and experimentation.",
        },
        {
          id: "p1-r8",
          skillId: "adult-learning-foundations",
          stem: "What should a foundation-level program audit avoid?",
          choices: choices("D", {
            A: "Checking relevance to adult roles.",
            B: "Looking for evidence of learner constraints.",
            C: "Examining how experience is used.",
            D: "Making generic claims about adults without local evidence.",
          }),
          explanation: "Andragogy audits should be precise, evidence-informed, and context-sensitive.",
        },
      ],
    },
    {
      phase: 2,
      title: "Motivation & Self-Direction",
      baseline: [
        {
          id: "p2-b1",
          skillId: "motivation-design",
          stem: "Which factor most directly supports adult motivation?",
          choices: choices("B", {
            A: "Unexplained difficulty.",
            B: "Clear value, confidence support, respect, and meaningful choice.",
            C: "Hidden assessment criteria.",
            D: "Mandatory discussion with no purpose.",
          }),
          explanation: "Adult motivation grows when learners see value, expect success, feel respected, and retain agency.",
        },
        {
          id: "p2-b2",
          skillId: "motivation-design",
          stem: "A relevance message says, 'This is required by policy.' What is missing?",
          choices: choices("A", {
            A: "A credible connection to learner goals, decisions, or consequences.",
            B: "More acronyms.",
            C: "A longer legal quotation.",
            D: "A threat of failure.",
          }),
          explanation: "Requirements may explain compliance, but motivation improves when learners understand authentic value.",
        },
        {
          id: "p2-b3",
          skillId: "motivation-design",
          stem: "How should designers interpret disengagement?",
          choices: choices("C", {
            A: "As proof adults do not care.",
            B: "As a reason to remove support.",
            C: "As data about value, access, confidence, identity, or context barriers.",
            D: "As unrelated to design.",
          }),
          explanation: "Disengagement should prompt inquiry into design and context conditions, not blame.",
        },
        {
          id: "p2-b4",
          skillId: "motivation-design",
          stem: "Which opening best supports motivation?",
          choices: choices("D", {
            A: "Begin with 30 definitions.",
            B: "Tell learners they are behind.",
            C: "Ask learners to wait for relevance.",
            D: "Present a meaningful problem and a quick achievable success.",
          }),
          explanation: "Early relevance and success help adults invest effort and build confidence.",
        },
        {
          id: "p2-b5",
          skillId: "self-direction-coaching",
          stem: "What is self-directed learning?",
          choices: choices("A", {
            A: "Learner capacity to diagnose needs, set goals, find resources, act, and evaluate with appropriate support.",
            B: "Learning with no instructor contact.",
            C: "Any online course.",
            D: "A personality trait that cannot develop.",
          }),
          explanation: "Self-directed learning is a capacity and process, often strengthened through staged support.",
        },
        {
          id: "p2-b6",
          skillId: "self-direction-coaching",
          stem: "A dependent learner is given total freedom and stalls. What does Grow's model suggest?",
          choices: choices("C", {
            A: "The learner is incapable of learning.",
            B: "The facilitator should remove feedback.",
            C: "The learner may need clearer structure before autonomy expands.",
            D: "Assessment should be canceled.",
          }),
          explanation: "Grow's staged model calls for matching support to readiness for self-direction.",
        },
        {
          id: "p2-b7",
          skillId: "self-direction-coaching",
          stem: "Which tool best supports agency and accountability?",
          choices: choices("B", {
            A: "A hidden grading policy.",
            B: "A learning contract with goals, evidence, resources, timeline, support, and review.",
            C: "A rule against learner questions.",
            D: "A single path with no explanation.",
          }),
          explanation: "Learning contracts clarify autonomy, commitments, evidence, and support.",
        },
        {
          id: "p2-b8",
          skillId: "self-direction-coaching",
          stem: "What is a responsible use of transformative learning?",
          choices: choices("D", {
            A: "Force learners to change beliefs.",
            B: "Use discomfort as proof of rigor.",
            C: "Avoid all challenge.",
            D: "Invite assumption testing with consent, evidence, dialogue, and support.",
          }),
          explanation: "Transformative learning requires ethical facilitation that respects autonomy and identity.",
        },
      ],
      reassessment: [
        {
          id: "p2-r1",
          skillId: "motivation-design",
          stem: "Which revision best improves a required training module?",
          choices: choices("A", {
            A: "Show a realistic consequence learners care about and let them choose a practice path.",
            B: "Add more policy excerpts.",
            C: "Remove examples to save time.",
            D: "Make the final quiz the first activity.",
          }),
          explanation: "Motivation improves when relevance and agency are visible in the learning path.",
        },
        {
          id: "p2-r2",
          skillId: "motivation-design",
          stem: "A learner says, 'I am not good at this.' What support best targets expectancy?",
          choices: choices("C", {
            A: "Ignore the comment.",
            B: "Increase stakes immediately.",
            C: "Provide a scaffolded quick win and feedback that shows controllable next steps.",
            D: "Tell the learner confidence is irrelevant.",
          }),
          explanation: "Expectancy rises when learners experience progress and see how effort changes performance.",
        },
        {
          id: "p2-r3",
          skillId: "motivation-design",
          stem: "What is the strongest sign that inclusion is supporting motivation?",
          choices: choices("B", {
            A: "All learners are forced to speak in the same way.",
            B: "Learners can participate meaningfully through multiple accessible routes.",
            C: "Dominant voices control discussion.",
            D: "The facilitator avoids names and contexts.",
          }),
          explanation: "Inclusion supports motivation when learners have dignified, accessible ways to contribute.",
        },
        {
          id: "p2-r4",
          skillId: "motivation-design",
          stem: "What should a motivation barrier analysis include?",
          choices: choices("D", {
            A: "Only the facilitator's opinion.",
            B: "Only attendance data.",
            C: "Only learner deficits.",
            D: "Value, confidence, access, identity, time, and context factors.",
          }),
          explanation: "Adult motivation is shaped by multiple interacting design and life conditions.",
        },
        {
          id: "p2-r5",
          skillId: "self-direction-coaching",
          stem: "Which coaching move builds self-direction?",
          choices: choices("A", {
            A: "Ask the learner to choose evidence of progress, then review it against criteria.",
            B: "Make every decision for the learner forever.",
            C: "Remove deadlines and feedback.",
            D: "Keep success criteria secret.",
          }),
          explanation: "Agency grows when learners make meaningful decisions within clear expectations and feedback.",
        },
        {
          id: "p2-r6",
          skillId: "self-direction-coaching",
          stem: "What is the risk of too much choice too early?",
          choices: choices("C", {
            A: "Learners become too skilled.",
            B: "Learning becomes automatically transformative.",
            C: "Learners may experience overload and lose confidence or direction.",
            D: "Facilitators have too much evidence.",
          }),
          explanation: "Choice should be scaffolded so autonomy supports learning rather than abandonment.",
        },
        {
          id: "p2-r7",
          skillId: "self-direction-coaching",
          stem: "A learner is ready for high self-direction. Which facilitator role fits best?",
          choices: choices("B", {
            A: "Constant directive control.",
            B: "Consultant who helps refine goals, resources, evidence, and reflection.",
            C: "Gatekeeper who blocks learner choices.",
            D: "Observer who refuses all feedback.",
          }),
          explanation: "Advanced self-directed learners still benefit from expert consultation and critique.",
        },
        {
          id: "p2-r8",
          skillId: "self-direction-coaching",
          stem: "What distinguishes critical reflection from ordinary reflection?",
          choices: choices("D", {
            A: "It is always negative.",
            B: "It avoids assumptions.",
            C: "It only summarizes events.",
            D: "It examines the assumptions, power, and frames shaping interpretation.",
          }),
          explanation: "Critical reflection asks learners to question underlying frames, not just describe experience.",
        },
      ],
    },
    {
      phase: 3,
      title: "Design & Facilitation for Adults",
      baseline: [
        {
          id: "p3-b1",
          skillId: "adult-program-design",
          stem: "What comes before designing adult learning activities?",
          choices: choices("B", {
            A: "Choosing slide colors.",
            B: "Understanding learner, task, context, and performance needs.",
            C: "Writing the certificate text.",
            D: "Selecting the longest reading.",
          }),
          explanation: "Needs assessment keeps learning design tied to authentic problems and constraints.",
        },
        {
          id: "p3-b2",
          skillId: "adult-program-design",
          stem: "Which outcome is strongest?",
          choices: choices("A", {
            A: "Given a client scenario, choose and justify an intervention using documented criteria.",
            B: "Understand interventions.",
            C: "Be exposed to clients.",
            D: "Appreciate criteria.",
          }),
          explanation: "Strong outcomes specify performance, conditions, and evidence.",
        },
        {
          id: "p3-b3",
          skillId: "adult-program-design",
          stem: "Which assessment best matches adult performance?",
          choices: choices("C", {
            A: "Recall disconnected terms.",
            B: "Watch a video silently.",
            C: "Complete an authentic task with criteria and feedback.",
            D: "Click through slides.",
          }),
          explanation: "Adult assessment should collect evidence of meaningful performance whenever possible.",
        },
        {
          id: "p3-b4",
          skillId: "adult-program-design",
          stem: "What supports transfer after instruction?",
          choices: choices("D", {
            A: "No follow-up.",
            B: "Only satisfaction surveys.",
            C: "Removing practice.",
            D: "Job-embedded cues, feedback, peer or manager support, and realistic practice.",
          }),
          explanation: "Transfer depends on post-learning conditions as well as instructional quality.",
        },
        {
          id: "p3-b5",
          skillId: "adult-facilitation-evaluation",
          stem: "What is the adult facilitator's core stance?",
          choices: choices("B", {
            A: "Owner of all expertise.",
            B: "Designer of conditions for inquiry, practice, reflection, and transfer.",
            C: "Entertainer only.",
            D: "Silent observer with no responsibility.",
          }),
          explanation: "Facilitators structure purposeful learning while respecting adult experience and agency.",
        },
        {
          id: "p3-b6",
          skillId: "adult-facilitation-evaluation",
          stem: "Which practice supports inclusive facilitation?",
          choices: choices("A", {
            A: "Offer multiple ways to participate and make norms explicit.",
            B: "Let dominant voices set the agenda.",
            C: "Require public disclosure of personal history.",
            D: "Avoid accessibility checks.",
          }),
          explanation: "Inclusive facilitation designs access, voice, psychological safety, and meaningful challenge.",
        },
        {
          id: "p3-b7",
          skillId: "adult-facilitation-evaluation",
          stem: "Which evidence fits Kirkpatrick behavior level?",
          choices: choices("C", {
            A: "Learners liked lunch.",
            B: "Learners remember a definition immediately.",
            C: "Learners apply the skill in their work context after the program.",
            D: "The registration page had many views.",
          }),
          explanation: "Behavior evidence concerns transfer and application outside the learning event.",
        },
        {
          id: "p3-b8",
          skillId: "adult-facilitation-evaluation",
          stem: "What should a facilitator do with misinformation shared by an experienced learner?",
          choices: choices("D", {
            A: "Ignore it to preserve harmony.",
            B: "Shame the learner.",
            C: "Let experience override evidence.",
            D: "Respectfully surface the claim, test it against evidence, and redirect learning.",
          }),
          explanation: "Adult facilitation respects experience while maintaining standards and evidence.",
        },
      ],
      reassessment: [
        {
          id: "p3-r1",
          skillId: "adult-program-design",
          stem: "A needs assessment finds a policy barrier, a tool problem, and a skill gap. What should the design recommend?",
          choices: choices("B", {
            A: "Training only.",
            B: "A combined response that includes non-training supports plus learning for the skill gap.",
            C: "No action.",
            D: "A harder final test.",
          }),
          explanation: "Expert design avoids asking training to solve non-training causes by itself.",
        },
        {
          id: "p3-r2",
          skillId: "adult-program-design",
          stem: "What makes a scenario authentic?",
          choices: choices("A", {
            A: "It includes real constraints, decisions, consequences, and standards from practice.",
            B: "It is long.",
            C: "It avoids ambiguity.",
            D: "It contains only vocabulary.",
          }),
          explanation: "Authenticity comes from resemblance to actual performance demands.",
        },
        {
          id: "p3-r3",
          skillId: "adult-program-design",
          stem: "Why pair feedback with retry?",
          choices: choices("C", {
            A: "To fill time.",
            B: "To reduce accountability.",
            C: "To let learners apply feedback and generate evidence of improved judgment.",
            D: "To avoid assessment criteria.",
          }),
          explanation: "Feedback has more value when learners can use it in another attempt.",
        },
        {
          id: "p3-r4",
          skillId: "adult-program-design",
          stem: "Which alignment is strongest?",
          choices: choices("D", {
            A: "Need: negotiation; activity: unrelated trivia; evidence: attendance.",
            B: "Need: analysis; activity: lecture only; evidence: smiles.",
            C: "Need: tool use; activity: policy reading only; evidence: registration.",
            D: "Need: client triage; activity: triage case; evidence: rubric-scored decision.",
          }),
          explanation: "Strong alignment connects need, practice, and evidence around the same performance.",
        },
        {
          id: "p3-r5",
          skillId: "adult-facilitation-evaluation",
          stem: "What is the best response to silence in an adult discussion?",
          choices: choices("B", {
            A: "Assume no one cares.",
            B: "Offer wait time, written reflection, pair discussion, or clearer prompts.",
            C: "Call out the quietest learner.",
            D: "End the course.",
          }),
          explanation: "Silence can signal processing, uncertainty, access barriers, or unclear purpose.",
        },
        {
          id: "p3-r6",
          skillId: "adult-facilitation-evaluation",
          stem: "Which evaluation plan is strongest?",
          choices: choices("A", {
            A: "Collect reaction, performance evidence, transfer indicators, and improvement decisions.",
            B: "Collect only applause.",
            C: "Skip evidence if the content is good.",
            D: "Use one survey item to claim business results.",
          }),
          explanation: "A strong evaluation plan uses multiple evidence layers and avoids overclaiming.",
        },
        {
          id: "p3-r7",
          skillId: "adult-facilitation-evaluation",
          stem: "What should a difficult-moments protocol include?",
          choices: choices("C", {
            A: "One scripted punishment.",
            B: "Avoidance of all disagreement.",
            C: "Clarify, protect, redirect, repair, deepen, and debrief options.",
            D: "A ban on learner questions.",
          }),
          explanation: "Facilitators need flexible responses that preserve dignity and learning purpose.",
        },
        {
          id: "p3-r8",
          skillId: "adult-facilitation-evaluation",
          stem: "Why check materials against accessibility standards?",
          choices: choices("D", {
            A: "Only to improve branding.",
            B: "Because adult learners never need accommodations.",
            C: "To make activities easier for everyone regardless of goals.",
            D: "To ensure learners can access, participate in, and demonstrate learning.",
          }),
          explanation: "Accessibility is part of adult learner dignity, inclusion, and valid evidence.",
        },
      ],
    },
    {
      phase: 4,
      title: "Expert Practice & Capstone",
      baseline: [
        {
          id: "p4-b1",
          skillId: "expert-consulting",
          stem: "What should an expert consultant do when evidence is incomplete?",
          choices: choices("B", {
            A: "Pretend certainty.",
            B: "Name what is known, what is hypothesized, and what evidence is needed next.",
            C: "Ignore constraints.",
            D: "Use only personal preference.",
          }),
          explanation: "Expert judgment is transparent about evidence limits and next inquiry.",
        },
        {
          id: "p4-b2",
          skillId: "expert-consulting",
          stem: "Which recommendation is most expert?",
          choices: choices("A", {
            A: "It connects diagnosis, learner value, feasibility, risks, and evidence of success.",
            B: "It follows the consultant's favorite template regardless of context.",
            C: "It promises guaranteed transformation.",
            D: "It avoids tradeoffs.",
          }),
          explanation: "Expert recommendations are actionable, contextual, evidence-linked, and honest about tradeoffs.",
        },
        {
          id: "p4-b3",
          skillId: "expert-consulting",
          stem: "What is a key ethical question in program redesign?",
          choices: choices("D", {
            A: "How can learners be blamed for every gap?",
            B: "How can evidence be hidden?",
            C: "How can critique be avoided?",
            D: "Who benefits, who bears costs, and whose voice is missing?",
          }),
          explanation: "Ethical adult learning practice examines power, access, burden, and stakeholder impact.",
        },
        {
          id: "p4-b4",
          skillId: "expert-consulting",
          stem: "Which evidence source is most local?",
          choices: choices("C", {
            A: "A general theory chapter only.",
            B: "A trend article from another industry only.",
            C: "Learner performance data and interviews from the target program.",
            D: "A personal preference for workshops.",
          }),
          explanation: "Local evidence comes from the specific learners, setting, performance, and constraints.",
        },
        {
          id: "p4-b5",
          skillId: "capstone-portfolio",
          stem: "What should a capstone portfolio demonstrate?",
          choices: choices("A", {
            A: "Diagnosis, design logic, facilitation choices, evaluation, ethics, and limits.",
            B: "Only graphic design skill.",
            C: "Only a list of readings.",
            D: "Only attendance.",
          }),
          explanation: "The portfolio should make expert judgment visible across the full adult learning cycle.",
        },
        {
          id: "p4-b6",
          skillId: "capstone-portfolio",
          stem: "What makes expert writing credible?",
          choices: choices("C", {
            A: "Dense jargon.",
            B: "Unsupported certainty.",
            C: "Clear claims tied to context, evidence, reasoning, and limitations.",
            D: "Long paragraphs without examples.",
          }),
          explanation: "Expert writing is clear, evidence-grounded, and honest about uncertainty.",
        },
        {
          id: "p4-b7",
          skillId: "capstone-portfolio",
          stem: "Why create reusable tools from a capstone?",
          choices: choices("B", {
            A: "To avoid explaining the design.",
            B: "To help others apply practices with purpose, instructions, examples, and quality criteria.",
            C: "To replace all facilitation judgment.",
            D: "To make the portfolio longer.",
          }),
          explanation: "Productized tools support transfer of expertise when they include guidance and boundaries.",
        },
        {
          id: "p4-b8",
          skillId: "expert-consulting",
          stem: "What should an expert do after a program launch?",
          choices: choices("D", {
            A: "Declare the work finished forever.",
            B: "Ignore learner evidence.",
            C: "Report only positive stories.",
            D: "Use a learning agenda to improve the program through evidence and reflection.",
          }),
          explanation: "Expert practice includes ongoing inquiry and program improvement.",
        },
      ],
      reassessment: [
        {
          id: "p4-r1",
          skillId: "expert-consulting",
          stem: "A sponsor wants a course to fix a morale problem. What should the expert do?",
          choices: choices("A", {
            A: "Diagnose whether morale is driven by learning gaps, work conditions, leadership, or incentives.",
            B: "Build the course without questions.",
            C: "Promise culture change in one session.",
            D: "Avoid talking to learners.",
          }),
          explanation: "Expert consultants diagnose the system before prescribing learning.",
        },
        {
          id: "p4-r2",
          skillId: "expert-consulting",
          stem: "Which statement handles uncertainty best?",
          choices: choices("B", {
            A: "This will definitely transform every learner.",
            B: "The evidence suggests this design should improve transfer, and the measurement plan will test that claim.",
            C: "No evidence is needed.",
            D: "If it fails, learners are responsible.",
          }),
          explanation: "Expert claims are proportionate to evidence and include plans to learn from outcomes.",
        },
        {
          id: "p4-r3",
          skillId: "expert-consulting",
          stem: "What should a success case method help identify?",
          choices: choices("C", {
            A: "Only average satisfaction.",
            B: "Only attendance.",
            C: "Where transfer succeeded or failed and what conditions made the difference.",
            D: "Only facilitator preferences.",
          }),
          explanation: "Success case inquiry looks for conditions that explain strong and weak transfer cases.",
        },
        {
          id: "p4-r4",
          skillId: "expert-consulting",
          stem: "Which ethical risk should be corrected?",
          choices: choices("D", {
            A: "Learners have multiple ways to participate.",
            B: "Evidence limits are disclosed.",
            C: "Stakeholders can question the plan.",
            D: "Data collection exposes sensitive learner information without need or consent.",
          }),
          explanation: "Evidence plans must respect privacy, consent, fairness, and learner dignity.",
        },
        {
          id: "p4-r5",
          skillId: "capstone-portfolio",
          stem: "Which portfolio caption is strongest?",
          choices: choices("A", {
            A: "This rubric was revised after task analysis showed learners needed judgment under conflicting constraints.",
            B: "This rubric looks nice.",
            C: "This artifact is included because it is long.",
            D: "This proves everything worked.",
          }),
          explanation: "Strong captions explain context, decision logic, and evidence relevance.",
        },
        {
          id: "p4-r6",
          skillId: "capstone-portfolio",
          stem: "What belongs in a capstone defense?",
          choices: choices("B", {
            A: "Only final slides.",
            B: "Problem, diagnosis, theory, design, evaluation, limitations, and next learning.",
            C: "Only learner testimonials.",
            D: "Only the budget.",
          }),
          explanation: "A defense should demonstrate integrated adult learning judgment.",
        },
        {
          id: "p4-r7",
          skillId: "capstone-portfolio",
          stem: "Why include limitations in expert work?",
          choices: choices("C", {
            A: "To weaken the work unnecessarily.",
            B: "To avoid making any recommendation.",
            C: "To show claims are disciplined and guide future evidence gathering.",
            D: "To hide design quality.",
          }),
          explanation: "Limitations strengthen credibility by matching claims to evidence and clarifying future inquiry.",
        },
        {
          id: "p4-r8",
          skillId: "capstone-portfolio",
          stem: "What is the purpose of a 90-day practice agenda?",
          choices: choices("D", {
            A: "To repeat the same course unchanged.",
            B: "To end professional learning.",
            C: "To avoid feedback.",
            D: "To continue developing expertise through projects, evidence, community, and reflection.",
          }),
          explanation: "Expert andragogy remains a continuing practice of inquiry, contribution, and improvement.",
        },
      ],
    },
  ],
};
