export const literacy = [
    {
        id: 1,
        title: "Active Reading Strategies",
        content: "Active reading involves engaging with text through questioning, predicting, and summarizing. Use the SQ3R method: Survey (preview), Question (ask what you'll learn), Read (actively), Recite (summarize in your own words), Review (check understanding). This technique improves comprehension by 40% compared to passive reading.",
        created: "2025-01-10",
        reviewCount: 0,
        nextReview: "2025-01-11",
        mastered: false,
        test: {
            questions: [
                {
                    question: "What is the first step in active reading?",
                    options: ["Taking notes", "Previewing text structure", "Summarizing", "Asking questions"],
                    correct: 1,
                    explanation: "Previewing text structure helps you understand the organization and main ideas before diving into details."
                },
                {
                    question: "Why is questioning important in active reading?",
                    options: ["It slows you down", "It helps engagement and comprehension", "It's required", "It makes reading harder"],
                    correct: 1,
                    explanation: "Questioning keeps you actively engaged with the material and improves understanding and retention."
                },
                {
                    question: "What does the 'S' in SQ3R stand for?",
                    options: ["Study", "Survey", "Summarize", "Search"],
                    correct: 1,
                    explanation: "Survey means to preview the text before reading"
                },
                {
                    question: "Active reading improves comprehension by approximately:",
                    options: ["20%", "30%", "40%", "50%"],
                    correct: 2,
                    explanation: "Studies show active reading techniques improve comprehension by about 40%"
                },
                {
                    question: "Which is NOT part of the SQ3R method?",
                    options: ["Question", "Read", "Memorize", "Review"],
                    correct: 2,
                    explanation: "SQ3R involves Survey, Question, Read, Recite, Review - not memorization"
                }
            ]
        },
        scores: []
    },
    {
        id: 2,
        title: "Character Analysis Framework",
        content: "Analyze characters using STEAL method: Speech (what they say), Thoughts (internal dialogue), Effect (impact on others), Actions (what they do), Looks (physical description). Create character maps showing relationships, motivations, and development arcs. This systematic approach helps identify themes and literary devices.",
        created: "2025-01-10",
        reviewCount: 2,
        nextReview: "2025-01-17",
        mastered: false,
        test: {
            questions: [
                {
                    question: "What does the 'E' in STEAL represent?",
                    options: ["Emotions", "Effect", "Energy", "Expression"],
                    correct: 1,
                    explanation: "Effect refers to the character's impact on other characters"
                },
                {
                    question: "Which STEAL element focuses on physical appearance?",
                    options: ["Speech", "Thoughts", "Actions", "Looks"],
                    correct: 3,
                    explanation: "Looks examines the character's physical description and appearance"
                },
                {
                    question: "Character maps help identify:",
                    options: ["Plot only", "Themes and literary devices", "Setting details", "Author biography"],
                    correct: 1,
                    explanation: "Character analysis reveals themes and literary devices through character development"
                }
            ]
        },
        scores: [85, 92]
    },
    {
        id: 3,
        title: "Essay Structure: Five-Paragraph Format",
        content: "Structure essays with: Introduction (hook, background, thesis), Body Paragraph 1 (topic sentence, evidence, analysis), Body Paragraph 2 (topic sentence, evidence, analysis), Body Paragraph 3 (topic sentence, evidence, analysis), Conclusion (restate thesis, summarize points, call to action). Each paragraph should be 100-150 words.",
        created: "2025-01-09",
        reviewCount: 1,
        nextReview: "2025-01-13",
        mastered: false,
        test: {
            questions: [
                {
                    question: "What are the three main components of an introduction?",
                    options: ["Hook, evidence, conclusion", "Hook, background, thesis", "Topic, evidence, analysis", "Introduction, body, conclusion"],
                    correct: 1,
                    explanation: "An introduction needs a hook (attention grabber), background (context), and thesis (main argument)"
                },
                {
                    question: "How long should each paragraph typically be?",
                    options: ["50-100 words", "100-150 words", "150-200 words", "200-250 words"],
                    correct: 1,
                    explanation: "Each paragraph should be 100-150 words to maintain focus and readability"
                }
            ]
        },
        scores: [88]
    },
    {
    id: 2,
    title: "Grammar Fundamentals",
    content: "Understanding sentence structure is crucial for clear communication. A complete sentence must have a subject and predicate. Common errors include run-on sentences, fragments, and comma splices. Practice identifying these patterns in your writing.",
    created: "2024-01-16",
    reviewCount: 1,
    nextReview: "2024-01-19",
    mastered: false,
    scores: [85],
    test: {
      questions: [
        {
          question: "What are the two essential parts of a complete sentence?",
          options: ["Noun and verb", "Subject and predicate", "Article and noun", "Verb and object"],
          correct: 1,
          explanation: "A complete sentence must have both a subject (who or what) and a predicate (what the subject does)."
        }
      ]
    }
  }
];

export const mechanics = [
    {
        id: 100,
        title: "Newton's Laws in Real Life",
        content: "Newton's 1st Law: A book on a table stays put until you push it (inertia). 2nd Law: Harder push = faster acceleration (F=ma). Bigger book = harder to push (more mass). 3rd Law: Push a wall, it pushes back equally (action-reaction). Think of walking: you push ground backward, ground pushes you forward. These laws explain everything from car crashes to rocket launches.",
        created: "2025-01-10",
        reviewCount: 0,
        nextReview: "2025-01-11",
        mastered: false,
        test: {
            questions: [
                {
                    question: "When you walk, what pushes you forward?",
                    options: ["Your muscles", "The ground", "Air resistance", "Gravity"],
                    correct: 1,
                    explanation: "You push ground backward, ground pushes you forward (Newton's 3rd Law)"
                },
                {
                    question: "A heavier car requires more force to accelerate because:",
                    options: ["It has more friction", "It has more mass", "It's slower", "It's bigger"],
                    correct: 1,
                    explanation: "F=ma - more mass requires more force for same acceleration"
                },
                {
                    question: "A book sliding on a table will eventually stop due to:",
                    options: ["Newton's 1st Law", "Friction force", "Gravity", "Air pressure"],
                    correct: 1,
                    explanation: "Friction acts as an external force that stops the motion"
                }
            ]
        },
        scores: []
    },
    {
        id: 101,
        title: "Force and Motion Basics",
        content: "Force = push or pull measured in Newtons (N). Velocity = speed with direction (30 mph north). Acceleration = change in velocity over time. Key insight: Force doesn't create motion, it creates acceleration (change in motion). A car cruising at constant speed has zero acceleration, even though it's moving. Think of force as the 'changer' not the 'mover'.",
        created: "2025-01-09",
        reviewCount: 1,
        nextReview: "2025-01-13",
        mastered: false,
        test: {
            questions: [
                {
                    question: "A car driving at constant 60 mph has:",
                    options: ["High acceleration", "Zero acceleration", "Negative acceleration", "Variable acceleration"],
                    correct: 1,
                    explanation: "Constant velocity means no change in motion, so acceleration = 0"
                },
                {
                    question: "Force is measured in:",
                    options: ["Pounds", "Newtons", "Meters", "Joules"],
                    correct: 1,
                    explanation: "The Newton (N) is the SI unit for force"
                },
                {
                    question: "What's the difference between speed and velocity?",
                    options: ["No difference", "Velocity includes direction", "Speed is faster", "Velocity is in metric"],
                    correct: 1,
                    explanation: "Velocity is speed with direction (vector vs scalar)"
                }
            ]
        },
        scores: [78]
    },
    {
        id: 102,
        title: "Work, Energy, and Power",
        content: "Work = Force × Distance (measured in Joules). You do work when you lift a box up stairs. Energy = ability to do work. Kinetic energy = moving objects, Potential energy = stored energy (ball on a cliff). Power = how fast you do work (measured in Watts). A 100W light bulb uses 100 Joules per second. Remember: Work requires movement in direction of force.",
        created: "2025-01-08",
        reviewCount: 3,
        nextReview: "2025-01-22",
        mastered: false,
        test: {
            questions: [
                {
                    question: "Pushing a wall with 100N force for 10 seconds does how much work?",
                    options: ["1000 J", "100 J", "10 J", "0 J"],
                    correct: 3,
                    explanation: "No work done because wall doesn't move (Work = Force × Distance)"
                },
                {
                    question: "A ball at the top of a hill has:",
                    options: ["Only kinetic energy", "Only potential energy", "Both energies", "No energy"],
                    correct: 1,
                    explanation: "Stationary ball at height has gravitational potential energy"
                },
                {
                    question: "Power is measured in:",
                    options: ["Joules", "Newtons", "Watts", "Meters"],
                    correct: 2,
                    explanation: "Watts measure power (energy per unit time)"
                }
            ]
        },
        scores: [88, 91, 85]
    }
];

export const mechanics_materials = [
    {
        id: 200,
        title: "Stress and Strain Basics",
        content: "Stress = Force per unit area (like pressure). Imagine standing on snow with boots vs snowshoes - same weight, different stress. Strain = how much material deforms (stretches or compresses). Elastic materials return to original shape; plastic materials stay deformed. Steel is elastic up to its yield point, then becomes plastic. Think of stress as 'push intensity' and strain as 'shape change'.",
        created: "2025-01-10",
        reviewCount: 0,
        nextReview: "2025-01-11",
        mastered: false,
        test: {
            questions: [
                {
                    question: "What's the difference between stress and strain?",
                    options: ["No difference", "Stress is force/area, strain is deformation", "Strain is stronger", "Stress is in materials only"],
                    correct: 1,
                    explanation: "Stress is applied force per area; strain is resulting deformation"
                },
                {
                    question: "A rubber band that returns to original length after stretching is:",
                    options: ["Plastic", "Elastic", "Brittle", "Ductile"],
                    correct: 1,
                    explanation: "Elastic materials return to original shape after load removal"
                },
                {
                    question: "Snowshoes reduce stress on snow by:",
                    options: ["Reducing weight", "Increasing area", "Changing material", "Adding insulation"],
                    correct: 1,
                    explanation: "Larger area means same force spread over more area = less stress"
                }
            ]
        },
        scores: []
    },
    {
        id: 201,
        title: "Material Properties: Strength Types",
        content: "Tensile strength = resistance to pulling apart (rope strength). Compressive strength = resistance to crushing (concrete strength). Shear strength = resistance to sliding/cutting. Different materials excel at different strengths: concrete great in compression, terrible in tension. Steel excellent in both. This is why reinforced concrete uses steel rebar - steel handles tension, concrete handles compression.",
        created: "2025-01-09",
        reviewCount: 1,
        nextReview: "2025-01-13",
        mastered: false,
        test: {
            questions: [
                {
                    question: "Why is steel rebar used in concrete?",
                    options: ["Concrete is too expensive", "Steel handles tension forces", "Steel is lighter", "Steel prevents cracking"],
                    correct: 1,
                    explanation: "Concrete is weak in tension; steel rebar provides tensile strength"
                },
                {
                    question: "A material's resistance to being pulled apart is called:",
                    options: ["Compressive strength", "Tensile strength", "Shear strength", "Yield strength"],
                    correct: 1,
                    explanation: "Tensile strength measures resistance to pulling/stretching forces"
                },
                {
                    question: "Concrete is strongest under which type of loading?",
                    options: ["Tension", "Compression", "Shear", "Bending"],
                    correct: 1,
                    explanation: "Concrete has excellent compressive strength but poor tensile strength"
                }
            ]
        },
        scores: [82]
    },
    {
        id: 202,
        title: "Beams and Bending",
        content: "When a beam bends, top fibers compress, bottom fibers stretch. The middle (neutral axis) doesn't change length. Bending moment = tendency to bend, highest at center of simply supported beam. Beam deflection depends on load, span, material stiffness, and cross-section shape. I-beams are efficient because material is far from neutral axis where stress is highest.",
        created: "2025-01-08",
        reviewCount: 2,
        nextReview: "2025-01-16",
        mastered: false,
        test: {
            questions: [
                {
                    question: "In a bending beam, where is the neutral axis?",
                    options: ["Top surface", "Bottom surface", "Middle section", "Varies with load"],
                    correct: 2,
                    explanation: "Neutral axis is the middle section that doesn't change length during bending"
                },
                {
                    question: "Why are I-beams efficient structural shapes?",
                    options: ["They're lightweight", "Material is far from neutral axis", "Easy to manufacture", "They look good"],
                    correct: 1,
                    explanation: "I-beams place material where bending stress is highest (far from neutral axis)"
                },
                {
                    question: "When a beam bends downward, the bottom fibers are in:",
                    options: ["Compression", "Tension", "Shear", "Neutral state"],
                    correct: 1,
                    explanation: "Bottom fibers stretch (tension) when beam bends downward"
                }
            ]
        },
        scores: [89, 94]
    },
    {
        id: 203,
        title: "Factor of Safety",
        content: "Factor of Safety = Ultimate Strength ÷ Working Stress. If steel fails at 400 MPa and you use 200 MPa, Factor of Safety = 2. Higher factors for unpredictable loads (earthquake = 4-6), lower for well-known loads (building = 2-3). It's like having extra margin - you wouldn't fill a 1000-lb capacity truck with exactly 1000 lbs. Engineers build in safety margins for real-world uncertainties.",
        created: "2025-01-07",
        reviewCount: 4,
        nextReview: "2025-02-07",
        mastered: true,
        test: {
            questions: [
                {
                    question: "If a cable breaks at 1000 N and you use 250 N, what's the factor of safety?",
                    options: ["2", "4", "250", "1000"],
                    correct: 1,
                    explanation: "Factor of Safety = 1000 ÷ 250 = 4"
                },
                {
                    question: "Which application needs the highest factor of safety?",
                    options: ["Office building", "Earthquake structure", "Bicycle frame", "Desk lamp"],
                    correct: 1,
                    explanation: "Earthquake loads are unpredictable and catastrophic, requiring higher safety factors"
                },
                {
                    question: "Why don't engineers use factor of safety = 1?",
                    options: ["Too expensive", "Real-world uncertainties", "Legal requirements", "Easier calculations"],
                    correct: 1,
                    explanation: "Factor of safety accounts for material variations, unexpected loads, and safety margins"
                }
            ]
        },
        scores: [91, 88, 93, 87]
    }
];

export const mathematics = [
    {
        id: 4,
        title: "Quadratic Formula",
        content: "The quadratic formula x = (-b ± √(b²-4ac)) / 2a solves equations in form ax² + bx + c = 0. Remember: 'a' is coefficient of x², 'b' is coefficient of x, 'c' is constant. The discriminant (b²-4ac) determines solutions: positive = 2 real solutions, zero = 1 solution, negative = no real solutions. Practice with ax² + bx + c = 0 format first.",
        created: "2025-01-10",
        reviewCount: 0,
        nextReview: "2025-01-11",
        mastered: false,
        test: {
            questions: [
                {
                    question: "For equation 2x² + 3x - 1 = 0, what is the value of 'a'?",
                    options: ["2", "3", "-1", "0"],
                    correct: 0,
                    explanation: "'a' is the coefficient of x², which is 2"
                },
                {
                    question: "If the discriminant b²-4ac is negative, how many real solutions are there?",
                    options: ["0", "1", "2", "3"],
                    correct: 0,
                    explanation: "Negative discriminant means no real solutions (complex solutions only)"
                },
                {
                    question: "What does the discriminant tell us?",
                    options: ["The value of x", "The number of solutions", "The value of a", "The graph's width"],
                    correct: 1,
                    explanation: "The discriminant determines the number and type of solutions"
                }
            ]
        },
        scores: []
    },
    {
        id: 5,
        title: "Derivative Rules",
        content: "Basic derivative rules: Power rule: d/dx(xⁿ) = nx^(n-1). Product rule: d/dx(uv) = u'v + uv'. Chain rule: d/dx(f(g(x))) = f'(g(x))·g'(x). Constant rule: d/dx(c) = 0. Sum rule: d/dx(f+g) = f' + g'. Practice each rule separately before combining them.",
        created: "2025-01-09",
        reviewCount: 3,
        nextReview: "2025-01-23",
        mastered: false
    },
    {
        id: 6,
        title: "Fraction Operations",
        content: "Addition/Subtraction: Find common denominator, add/subtract numerators. Multiplication: Multiply numerators, multiply denominators. Division: Multiply by reciprocal (flip second fraction). Simplification: Find GCD of numerator and denominator, divide both by GCD. Always check if answer can be simplified further.",
        created: "2025-01-08",
        reviewCount: 4,
        nextReview: "2025-02-08",
        mastered: true
    }
];

export const science = [
    {
        id: 7,
        title: "Cell Division: Mitosis",
        content: "Mitosis has 4 phases: Prophase (chromosomes condense, nuclear envelope breaks), Metaphase (chromosomes align at cell center), Anaphase (sister chromatids separate), Telophase (nuclear envelopes reform, chromosomes decondense). Result: 2 identical diploid cells. Remember PMAT acronym. Each phase has specific checkpoints to ensure proper division.",
        created: "2025-01-10",
        reviewCount: 1,
        nextReview: "2025-01-13",
        mastered: false
    },
    {
        id: 8,
        title: "Periodic Table Trends",
        content: "Atomic radius decreases across period (left to right), increases down group. Ionization energy increases across period, decreases down group. Electronegativity increases across period, decreases down group. These trends result from nuclear charge increasing across periods and electron shells increasing down groups. Practice with first 20 elements.",
        created: "2025-01-09",
        reviewCount: 2,
        nextReview: "2025-01-16",
        mastered: false
    },
    {
        id: 9,
        title: "Newton's Three Laws",
        content: "1st Law (Inertia): Object at rest stays at rest, object in motion stays in motion unless acted upon by force. 2nd Law: F = ma (Force equals mass times acceleration). 3rd Law: For every action, there's an equal and opposite reaction. These laws explain all mechanical motion. Practice identifying which law applies to different scenarios.",
        created: "2025-01-08",
        reviewCount: 4,
        nextReview: "2025-02-08",
        mastered: true
    }
];
export const communications = [
    {
        id: 10,
        title: "Public Speaking: PREP Method",
        content: "Structure presentations using PREP: Point (main message), Reason (why it matters), Example (specific illustration), Point (restate main message). This creates clear, memorable presentations. Practice: State point in 15 seconds, give reason in 30 seconds, provide example in 45 seconds, restate point in 15 seconds. Total: 1 minute 45 seconds.",
        created: "2025-01-10",
        reviewCount: 0,
        nextReview: "2025-01-11",
        mastered: false
    },
    {
        id: 11,
        title: "Active Listening Techniques",
        content: "Active listening involves: Maintaining eye contact, nodding to show understanding, asking clarifying questions ('Can you explain...?'), paraphrasing ('So you're saying...'), avoiding interruptions. Use the 80/20 rule: listen 80% of time, speak 20%. This builds rapport and ensures accurate understanding in all communication contexts.",
        created: "2025-01-09",
        reviewCount: 2,
        nextReview: "2025-01-16",
        mastered: false
    },
    {
        id: 12,
        title: "Written Communication: Email Etiquette",
        content: "Professional emails need: Clear subject line, proper greeting, concise body (3 paragraphs max), specific call to action, professional closing. Structure: 1) Purpose statement, 2) Details/context, 3) Next steps. Use formal language, proofread before sending, respond within 24 hours. Keep paragraphs under 3 sentences for readability.",
        created: "2025-01-08",
        reviewCount: 3,
        nextReview: "2025-01-22",
        mastered: false
    },
    {
        id: 13,
        title: "Poetry Analysis: Literary Devices",
        content: "Key literary devices: Metaphor (direct comparison), Simile (comparison using 'like' or 'as'), Personification (giving human qualities to non-human things), Alliteration (repeated consonant sounds), Imagery (descriptive language appealing to senses), Symbolism (objects representing ideas). Practice identifying these in poems and explaining their effect on meaning and mood.",
        created: "2025-01-08",
        reviewCount: 0,
        nextReview: "2025-01-11",
        mastered: false,
        test: {
            questions: [
                {
                    question: "What's the difference between metaphor and simile?",
                    options: ["No difference", "Metaphor uses 'like' or 'as'", "Simile uses 'like' or 'as'", "Metaphor is longer"],
                    correct: 2,
                    explanation: "Similes use 'like' or 'as' for comparison, while metaphors make direct comparisons"
                },
                {
                    question: "When a poem describes 'the wind whispered', this is an example of:",
                    options: ["Metaphor", "Simile", "Personification", "Alliteration"],
                    correct: 2,
                    explanation: "Personification gives human qualities (whispering) to non-human things (wind)"
                }
            ]
        },
        scores: []
    },
    {
        id: 14,
        title: "Grammar: Sentence Types and Structure",
        content: "Four sentence types: Simple (one independent clause), Compound (two independent clauses joined by conjunction), Complex (independent + dependent clause), Compound-Complex (multiple independent + dependent clauses). Use variety for engaging writing. Common conjunctions: and, but, or, so, yet, for, nor (FANBOYS). Dependent clauses start with words like because, although, when, if.",
        created: "2025-01-07",
        reviewCount: 1,
        nextReview: "2025-01-12",
        mastered: false,
        test: {
            questions: [
                {
                    question: "What type of sentence is: 'I studied hard, but I still felt nervous about the test.'?",
                    options: ["Simple", "Compound", "Complex", "Compound-Complex"],
                    correct: 1,
                    explanation: "Two independent clauses joined by 'but' makes this a compound sentence"
                },
                {
                    question: "Which word is NOT a FANBOYS conjunction?",
                    options: ["And", "Because", "But", "Or"],
                    correct: 1,
                    explanation: "FANBOYS are: For, And, Nor, But, Or, Yet, So. 'Because' starts dependent clauses"
                }
            ]
        },
        scores: [91]
    }
];

export default {
    literacy,
    mechanics,
    mechanics_materials,
    mathematics,
    science,
    communications,
};
