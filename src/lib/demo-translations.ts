/**
 * Fallback demo data for all LINGUA API routes.
 * Used when the AI backend is unavailable or in demo mode.
 */

export const demoTranslation = {
  sourceLanguage: "es",
  targetLanguage: "en",
  sourceText:
    "Mi amor, cada momento que paso contigo es un regalo del cielo. Tu sonrisa ilumina mis días más oscuros, y tu voz es la melodía que mi corazón necesita para seguir latiendo. Te amo con toda mi alma, hoy y siempre.",
  translatedText:
    "My love, every moment I spend with you is a gift from heaven. Your smile illuminates my darkest days, and your voice is the melody that my heart needs to keep beating. I love you with all my soul, today and always.",
  emotionalAnnotations: [
    {
      phrase: "regalo del cielo",
      emotion: "warm",
      note: "Literally 'gift from heaven' — a common Spanish endearment that carries more spiritual weight than the English equivalent. In Latin American culture, invoking heaven in love letters is not religious hyperbole but a sincere expression of gratitude.",
    },
    {
      phrase: "ilumina mis días más oscuros",
      emotion: "joyful",
      note: "The light/dark metaphor is universal, but in Spanish romantic tradition, attributing this power to the beloved's smile specifically (not just their presence) emphasizes the visual, face-to-face nature of Latin love.",
    },
    {
      phrase: "Te amo con toda mi alma",
      emotion: "warm",
      note: "'I love you with all my soul' — in Spanish, 'te amo' is reserved for deep romantic love (unlike 'te quiero' for lighter affection). Adding 'con toda mi alma' (with all my soul) is the strongest possible declaration.",
    },
  ],
  culturalNotes: [
    "Spanish love letters tend to be more openly passionate and poetic than English ones — this level of emotional intensity is culturally normative, not excessive.",
    "The formal structure (opening endearment, poetic metaphors, closing declaration) follows traditional Hispanic epistolary romance conventions.",
  ],
  intent:
    "A deeply sincere romantic declaration expressing enduring love and emotional dependence. The writer is communicating not just affection but a spiritual bond. This letter would be appropriate between long-term partners or in a marriage context.",
};

export const demoSignTranslation = {
  phrase: "Thank you",
  signLanguage: "ASL",
  steps: [
    {
      step: 1,
      instruction: "Start with your dominant hand open, fingers together and straight (flat B handshape).",
      position: "Touch your fingertips to your chin.",
      detail: "Your palm should be facing you, fingers pointing upward.",
    },
    {
      step: 2,
      instruction: "Move your hand forward and slightly downward away from your chin.",
      position: "Hand moves to about 6 inches in front of your face.",
      detail: "The motion is smooth and gentle — as if you are blowing a kiss of gratitude.",
    },
    {
      step: 3,
      instruction: "As your hand moves forward, let it naturally rotate so your palm faces slightly upward.",
      position: "End with your hand at chest level, palm up.",
      detail: "The palm-up orientation at the end symbolizes offering gratitude outward.",
    },
  ],
  culturalContext:
    "In ASL, facial expression is as important as hand movement. When signing 'thank you,' your face should express genuine gratitude — a slight smile and a small nod. Without the facial expression, the sign feels mechanical and insincere to Deaf viewers.",
  commonMistakes: [
    "Moving the hand too quickly — the sign should feel deliberate, not rushed.",
    "Forgetting the facial expression — Deaf culture considers the face part of the sign itself.",
    "Starting from the forehead instead of the chin — that would be closer to the sign for 'good.'",
  ],
};

export const demoLearningConversation = {
  language: "es",
  level: "beginner",
  topic: "Family",
  exchanges: [
    {
      speaker: "tutor",
      text: "Hola, me llamo María. ¿Cómo te llamas?",
      translation: "Hello, my name is María. What is your name?",
      grammarNote: "'Me llamo' literally means 'I call myself' — this is the standard way to introduce yourself in Spanish.",
    },
    {
      speaker: "student",
      text: "Hola María, me llamo Alex. ¿Cómo estás?",
      translation: "Hello María, my name is Alex. How are you?",
      grammarNote: "'¿Cómo estás?' uses the informal 'tú' form — appropriate for peers and casual settings.",
    },
    {
      speaker: "tutor",
      text: "Estoy bien, gracias. ¿Tienes familia aquí?",
      translation: "I'm fine, thank you. Do you have family here?",
      grammarNote: "'Tienes' = you have (informal). 'Aquí' = here.",
    },
    {
      speaker: "student",
      text: "Sí, tengo una hermana y dos hermanos.",
      translation: "Yes, I have one sister and two brothers.",
      grammarNote: "'Hermana' = sister, 'hermanos' = brothers. In Spanish, the masculine plural can refer to siblings of mixed gender.",
    },
    {
      speaker: "tutor",
      text: "¡Qué bien! ¿Y tus padres?",
      translation: "How nice! And your parents?",
      grammarNote: "'Padres' = parents (literally 'fathers'). 'Tus' = your (plural informal).",
    },
    {
      speaker: "student",
      text: "Mis padres viven en otra ciudad.",
      translation: "My parents live in another city.",
      grammarNote: "'Viven' = they live (vivir conjugated). 'Otra ciudad' = another city.",
    },
  ],
  vocabularyIntroduced: [
    { word: "familia", translation: "family", partOfSpeech: "noun" },
    { word: "hermana", translation: "sister", partOfSpeech: "noun" },
    { word: "hermano", translation: "brother", partOfSpeech: "noun" },
    { word: "padres", translation: "parents", partOfSpeech: "noun" },
    { word: "vivir", translation: "to live", partOfSpeech: "verb" },
    { word: "ciudad", translation: "city", partOfSpeech: "noun" },
  ],
};

export const demoAncientTranslation = {
  language: "Akkadian",
  source: "Epic of Gilgamesh, Tablet I",
  original: "ša nagba imuru išdi māti",
  transliteration: "sha nag-ba i-mu-ru ish-di ma-ti",
  translation: "He who saw the Deep, the foundation of the land",
  wordByWord: [
    { original: "ša", translation: "he who / the one who", grammaticalRole: "relative pronoun" },
    { original: "nagba", translation: "the Deep / the totality", grammaticalRole: "noun (accusative)", note: "Refers to the cosmic underground waters, source of all wisdom" },
    { original: "imuru", translation: "saw / experienced", grammaticalRole: "verb (preterite, 3rd masc. sing.)" },
    { original: "išdi", translation: "foundation / base", grammaticalRole: "noun (construct state)" },
    { original: "māti", translation: "of the land / of the country", grammaticalRole: "noun (genitive)" },
  ],
  historicalContext:
    "This opening line introduces Gilgamesh as a hero of unparalleled wisdom. The 'Deep' (nagbu) is the primordial underground ocean — to have 'seen' it means to have attained the deepest possible knowledge. This sets up the epic's central theme: the quest for wisdom through suffering.",
  pronunciationGuide:
    "Akkadian was stressed on the penultimate syllable. Vowels are pronounced as in Italian. The 'š' is 'sh', and doubled consonants are held slightly longer.",
};

export const demoHealthTranslation = {
  sourceLanguage: "es",
  targetLanguage: "en",
  context: "Emergency room patient intake",
  sourceText:
    "Doctor, tengo un dolor muy fuerte en el pecho desde esta mañana. Me cuesta respirar y siento que el brazo izquierdo se me duerme. También estoy sudando mucho.",
  translatedText:
    "Doctor, I have had a very strong pain in my chest since this morning. I am having difficulty breathing and I feel that my left arm is going numb. I am also sweating a lot.",
  medicalAnnotations: [
    {
      phrase: "dolor muy fuerte en el pecho",
      medicalTerm: "Severe chest pain (angina pectoris possible)",
      urgency: "critical",
      note: "Chest pain is a cardinal symptom of myocardial infarction. 'Muy fuerte' (very strong) indicates high severity.",
    },
    {
      phrase: "Me cuesta respirar",
      medicalTerm: "Dyspnea",
      urgency: "critical",
      note: "'Me cuesta' literally means 'it costs me' — a common Spanish expression for difficulty. Dyspnea combined with chest pain requires immediate cardiac evaluation.",
    },
    {
      phrase: "brazo izquierdo se me duerme",
      medicalTerm: "Left arm numbness/paresthesia",
      urgency: "critical",
      note: "'Se me duerme' literally 'falls asleep on me.' Left arm numbness with chest pain is a classic presentation of acute myocardial infarction (heart attack).",
    },
    {
      phrase: "sudando mucho",
      medicalTerm: "Diaphoresis",
      urgency: "critical",
      note: "Profuse sweating (diaphoresis) is another classic MI symptom. The triad of chest pain + left arm numbness + diaphoresis demands immediate cardiac protocol.",
    },
  ],
  triageRecommendation:
    "IMMEDIATE CARDIAC EVALUATION REQUIRED. Patient presents with classic acute MI triad. Initiate STEMI protocol. ECG and troponin levels stat.",
  disclaimer:
    "This translation is provided for communication support only and does not constitute medical advice. All clinical decisions must be made by qualified healthcare professionals.",
};

export const demoConversation = {
  participants: [
    { name: "Carlos", language: "es" },
    { name: "Yuki", language: "ja" },
  ],
  exchanges: [
    {
      speaker: "Carlos",
      original: "¡Hola Yuki! ¿Cómo va tu día?",
      translations: {
        en: "Hi Yuki! How is your day going?",
        ja: "こんにちは、ユキ！今日はどう？",
      },
    },
    {
      speaker: "Yuki",
      original: "元気ですよ！新しいプロジェクトが始まりました。",
      translations: {
        en: "I'm doing well! A new project has started.",
        es: "¡Estoy bien! Un nuevo proyecto ha comenzado.",
      },
    },
    {
      speaker: "Carlos",
      original: "¡Qué emocionante! ¿De qué se trata?",
      translations: {
        en: "How exciting! What is it about?",
        ja: "わくわくしますね！何についてですか？",
      },
    },
    {
      speaker: "Yuki",
      original: "言語学習アプリのデザインです。カルロスさんの意見を聞きたいです。",
      translations: {
        en: "It's the design of a language learning app. I'd like to hear your opinion, Carlos.",
        es: "Es el diseño de una aplicación para aprender idiomas. Me gustaría escuchar tu opinión, Carlos.",
      },
    },
  ],
};

export const demoCaveAnalysis = {
  site: "Lascaux",
  panel: "Hall of the Bulls",
  analysis: {
    overview:
      "The Hall of the Bulls at Lascaux is a masterwork of Paleolithic art, featuring four massive aurochs (wild bulls) rendered in black manganese dioxide paint, reaching up to 5.2 meters in length — the largest known cave art figures. They are accompanied by horses, deer, and the enigmatic 'unicorn' figure.",
    technique:
      "The artists used several sophisticated techniques: outlining with manganese black, filling with blown ochre pigment, creating shading through varied paint thickness, and exploiting natural rock contours for three-dimensional effect. Scaffolding marks suggest they built platforms to reach high areas.",
    symbolism: [
      "The aurochs may represent seasonal constellations — their arrangement roughly corresponds to the night sky in the Upper Paleolithic.",
      "The animals are all depicted in profile, a convention suggesting they represent archetypes rather than individual animals.",
      "The grouping of species (bulls, horses, deer) may reflect a cosmological classification system — sky, earth, and underworld animals.",
    ],
    questions: [
      "Why are there no reindeer depicted, despite reindeer being the primary food source of the people who painted here?",
      "What was the function of the 'unicorn' figure — the only unidentifiable animal in the cave?",
      "Were the paintings created all at once or accumulated over centuries?",
    ],
  },
};

export const demoScriptDecode = {
  script: "Egyptian Hieroglyphs",
  inputDescription: "A royal cartouche containing five hieroglyphic signs",
  analysis: {
    signs: [
      { glyph: "𓇳", reading: "Ra", meaning: "Sun god Ra", type: "logogram" },
      { glyph: "𓅭", reading: "ms", meaning: "born of", type: "biliteral" },
      { glyph: "𓋴", reading: "s", meaning: "phonetic complement", type: "uniliteral" },
      { glyph: "𓊃", reading: "s", meaning: "phonetic complement", type: "uniliteral" },
    ],
    reading: "Ra-mes-s(es)",
    translation: "Ramesses — 'Born of Ra'",
    explanation:
      "This cartouche reads 'Ramesses' — one of the most famous names in Egyptian history. The sun disk at the top reads 'Ra,' followed by the child-on-lap sign reading 'ms' (born of), with two 's' phonetic complements confirming the reading. Eleven pharaohs bore this name, from Ramesses I (c. 1295 BCE) through Ramesses XI (c. 1077 BCE).",
    historicalNote:
      "Cartouches — the oval enclosures around royal names — were the key to Champollion's decipherment. By identifying the names Ptolemy and Cleopatra in cartouches, he established the phonetic values of individual hieroglyphs.",
  },
};

export const demoCipherAnalysis = {
  ciphertext: "GUVF VF N FRPERG ZRFFNTR RAPBQRQ JVGU N FVZCYR PNRFNE PVCURE",
  analysisSteps: [
    {
      step: "Frequency Analysis",
      result:
        "The most frequent letter is 'R' (appearing 7 times, 12.5%). In English, the most frequent letter is 'E' (12.7%). This suggests R = E.",
    },
    {
      step: "Pattern Recognition",
      result:
        "The three-letter word 'GUR' appears once. If R = E, then GUR could be 'THE' (G=T, U=H, R=E). This is the most common three-letter word in English.",
    },
    {
      step: "Cipher Identification",
      result:
        "Testing ROT-13 (Caesar shift of 13): every letter maps perfectly. This is a simple Caesar cipher with shift 13.",
    },
    {
      step: "Decryption",
      result:
        "Plaintext: THIS IS A SECRET MESSAGE ENCODED WITH A SIMPLE CAESAR CIPHER",
    },
  ],
  cipherType: "Caesar (ROT-13)",
  shift: 13,
  plaintext: "THIS IS A SECRET MESSAGE ENCODED WITH A SIMPLE CAESAR CIPHER",
};

export const demoResurrection = {
  language: "Sumerian",
  pronunciationSample: {
    phrase: "lugal-e e-mu-na-ni-ib-gi4-gi4",
    pronunciation: "LOO-gal-eh EH-moo-nah-nee-ib-gee-gee",
    translation: "The king kept answering him/her repeatedly",
    confidence: "moderate",
    notes:
      "Sumerian pronunciation is reconstructed from Akkadian phonetic glosses and loanwords. Vowel quality is approximate. The reduplication (gi4-gi4) indicates repeated or continuous action — a common Sumerian grammatical device.",
  },
  conversationSample: [
    {
      sumerian: "u4-da an-na-me-en",
      pronunciation: "OOD-dah AHN-nah-meh-en",
      translation: "Today you are truly...",
      grammaticalNote: "Copular sentence with emphatic particle -me-en",
    },
    {
      sumerian: "nam-lu2-ulu3 nig2-nam zu-zu",
      pronunciation: "NAHM-loo-oo-loo NEEG-nahm ZOO-zoo",
      translation: "Humanity knows all things",
      grammaticalNote: "Abstract noun (nam-) + reduplication for emphasis (zu-zu = 'to know thoroughly')",
    },
  ],
  reconstructionMethod:
    "Sumerian pronunciation is primarily reconstructed from: (1) Akkadian scribal glosses that phonetically spell out Sumerian words in the better-understood Akkadian script, (2) Sumerian loanwords preserved in Akkadian, (3) cuneiform sign values established through cross-referencing thousands of texts.",
};

export const demoJungle = {
  scenario:
    "First contact with an uncontacted community. You begin by establishing basic vocabulary through gesture and demonstration.",
  vocabularyBuilding: [
    {
      round: 1,
      method: "Pointing and naming",
      established: [
        { gesture: "Point to water, drink", localWord: "[tika]", english: "water" },
        { gesture: "Point to sun", localWord: "[uma]", english: "sun" },
        { gesture: "Point to self", localWord: "[na]", english: "I / me" },
        { gesture: "Point to other", localWord: "[ka]", english: "you" },
      ],
      notes:
        "Basic nouns and pronouns are typically the first vocabulary established in first-contact scenarios. Pointing is nearly universal as a communicative gesture.",
    },
    {
      round: 2,
      method: "Action demonstration",
      established: [
        { gesture: "Walk and point to feet", localWord: "[pulu]", english: "walk / go" },
        { gesture: "Eat food, chewing motion", localWord: "[maka]", english: "eat" },
        { gesture: "Offer food, open palm", localWord: "[kima]", english: "give / share" },
        { gesture: "Smile and nod", localWord: "[saya]", english: "good / yes" },
      ],
      notes:
        "Verbs require demonstration. Note: 'give' and 'share' may be the same concept — many indigenous languages do not distinguish between the two.",
    },
    {
      round: 3,
      method: "Combining words",
      established: [
        { gesture: "Point to self + walk", localWord: "na pulu", english: "I go" },
        { gesture: "Point to other + eat", localWord: "ka maka", english: "you eat" },
        { gesture: "Point to water + good", localWord: "tika saya", english: "good water / clean water" },
      ],
      notes:
        "Establishing word order is a critical early step. This community appears to use Subject-Verb order, which is common in about 35% of the world's languages.",
    },
  ],
  ethicalGuidelines: [
    "Never approach an uncontacted community without their clear invitation or established protocols.",
    "Respect their right to remain uncontacted — this is a protected right under international law.",
    "Never introduce diseases — uncontacted peoples have no immunity to common viruses.",
    "This scenario is a simulation for educational purposes only.",
  ],
};
