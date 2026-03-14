export interface AncientLanguage {
  id: string;
  name: string;
  era: string;
  region: string;
  script: string;
  status: "deciphered" | "partially" | "undeciphered";
  description: string;
  uniqueFeature: string;
  demoText: {
    original: string;
    translation: string;
    source: string;
    context: string;
  };
  pronunciationConfidence: "high" | "moderate" | "speculative";
}

export const ancientLanguages: AncientLanguage[] = [
  {
    id: "sumerian",
    name: "Sumerian",
    era: "c. 3100 BCE – 2000 BCE",
    region: "Mesopotamia (modern Iraq)",
    script: "Cuneiform",
    status: "deciphered",
    description:
      "The oldest known written language, Sumerian is a language isolate with no known relatives. Developed by the civilization that invented writing, cities, and complex agriculture in the fertile crescent between the Tigris and Euphrates rivers.",
    uniqueFeature:
      "Ergative-absolutive alignment — the subject of an intransitive verb is marked the same as the object of a transitive verb, unlike any modern European language.",
    demoText: {
      original: "šar-ru-gi šar kiššatim šar māt Šumerim u Akkadim",
      translation:
        "Sargon, king of the world, king of the land of Sumer and Akkad",
      source: "Royal inscription of Sargon of Akkad",
      context:
        "This inscription represents one of the first imperial declarations in human history. Sargon unified Sumer and Akkad around 2334 BCE, creating what many consider the world's first empire.",
    },
    pronunciationConfidence: "moderate",
  },
  {
    id: "akkadian",
    name: "Akkadian",
    era: "c. 2500 BCE – 100 CE",
    region: "Mesopotamia (modern Iraq, Syria)",
    script: "Cuneiform",
    status: "deciphered",
    description:
      "The lingua franca of the ancient Near East for nearly two millennia. Akkadian is the earliest attested Semitic language, ancestor to Babylonian and Assyrian dialects. It was used for diplomacy from Egypt to Persia.",
    uniqueFeature:
      "The Akkadian syllabary adapted Sumerian cuneiform signs to represent a completely different language family — one of history's first script borrowings.",
    demoText: {
      original:
        "ša nagba imuru išdi māti\nša kullat idû kališ mimmû\nnūka ša gimrat napḫar šūturat elû",
      translation:
        "He who saw the Deep, the foundation of the land,\nwho knew everything, experienced all things.\nWisdom, which surpassed everything—he acquired it all.",
      source: "Epic of Gilgamesh, Tablet I, Opening Lines",
      context:
        "The Epic of Gilgamesh is the oldest surviving great work of literature, predating Homer by at least a millennium. This opening introduces Gilgamesh as a hero of unparalleled wisdom who journeyed to the ends of the earth.",
    },
    pronunciationConfidence: "high",
  },
  {
    id: "egyptian",
    name: "Ancient Egyptian",
    era: "c. 3200 BCE – 400 CE",
    region: "Nile Valley (modern Egypt)",
    script: "Hieroglyphs / Hieratic / Demotic",
    status: "deciphered",
    description:
      "One of the longest-attested languages in human history, spanning over 3,500 years from the earliest hieroglyphic inscriptions to Coptic. Deciphered by Jean-François Champollion in 1822 using the Rosetta Stone.",
    uniqueFeature:
      "Hieroglyphic writing combines logographic and alphabetic elements — some signs represent whole words, others represent sounds, and determinatives indicate the category of meaning.",
    demoText: {
      original:
        "ḏd mdw in Wsir ḥnt-imntiw nṯr ꜥꜣ nb ꜣbḏw",
      translation:
        "Words spoken by Osiris, foremost of the Westerners, great god, lord of Abydos.",
      source: "Funerary formula from the Book of the Dead",
      context:
        "This formulaic opening appears in countless Egyptian funerary texts. 'Foremost of the Westerners' refers to the dead, since the west (where the sun sets) was associated with the afterlife.",
    },
    pronunciationConfidence: "moderate",
  },
  {
    id: "mayan",
    name: "Classical Mayan",
    era: "c. 200 – 900 CE",
    region: "Mesoamerica (modern Mexico, Guatemala, Belize, Honduras)",
    script: "Maya Glyphs",
    status: "deciphered",
    description:
      "The only fully developed writing system of the pre-Columbian Americas. Maya script combines logographic and syllabic elements in elaborate glyph blocks. Its decipherment in the late 20th century was one of the greatest intellectual achievements in linguistics.",
    uniqueFeature:
      "Scribes deliberately varied their glyph spellings for aesthetic beauty — the same word could be written multiple ways, mixing logograms and syllabograms, making decipherment extraordinarily difficult.",
    demoText: {
      original:
        "tzʼak-aj u-baah K'inich Janaab Pakal k'uhul B'aakal ajaw",
      translation:
        "He was enthroned: K'inich Janaab Pakal, holy lord of Palenque.",
      source: "Temple of the Inscriptions, Palenque",
      context:
        "K'inich Janaab Pakal (Pacal the Great) ruled Palenque from 615 to 683 CE. His elaborately carved sarcophagus lid, discovered in 1952, is one of the most famous artifacts of the ancient Americas.",
    },
    pronunciationConfidence: "high",
  },
  {
    id: "aramaic",
    name: "Aramaic",
    era: "c. 1100 BCE – present (in dialects)",
    region: "Near East (modern Syria, Iraq, Turkey, Iran)",
    script: "Aramaic (ancestor of Hebrew and Arabic scripts)",
    status: "deciphered",
    description:
      "The lingua franca of the ancient Near East, spoken by Jesus of Nazareth. Aramaic replaced Akkadian as the common language of the region and was the administrative language of the Persian Empire. Several dialects survive today.",
    uniqueFeature:
      "Aramaic script gave rise to nearly every alphabet used from Morocco to Mongolia — Hebrew, Arabic, Syriac, Nabataean, Palmyrene, and through Nabataean, even the Mongol and Manchu scripts.",
    demoText: {
      original:
        "אבון דבשמיא. נתקדש שמך. תיתא מלכותך. נהוא צביינך. איכנא דבשמיא אף בארעא",
      translation:
        "Our Father who art in heaven, hallowed be thy name. Thy kingdom come. Thy will be done, on earth as it is in heaven.",
      source: "The Lord's Prayer (Peshitta version)",
      context:
        "This prayer, taught by Jesus to his disciples, was originally spoken in Aramaic. The Peshitta is the standard Syriac (Eastern Aramaic) translation of the Bible, dating to the 2nd century CE.",
    },
    pronunciationConfidence: "high",
  },
  {
    id: "ancient-greek",
    name: "Ancient Greek",
    era: "c. 800 BCE – 300 CE",
    region: "Greece, Asia Minor, Mediterranean",
    script: "Greek alphabet",
    status: "deciphered",
    description:
      "The language of Homer, Plato, Aristotle, and the New Testament. Ancient Greek gave the Western world its foundational vocabulary in philosophy, science, mathematics, medicine, and politics. The Greek alphabet was the first to systematically represent vowels.",
    uniqueFeature:
      "Pitch accent system — unlike modern stress accent, Ancient Greek used changes in vocal pitch to distinguish words, similar to tonal languages like Mandarin but applied differently.",
    demoText: {
      original:
        "μῆνιν ἄειδε θεὰ Πηληϊάδεω Ἀχιλῆος\nοὐλομένην, ἣ μυρί᾽ Ἀχαιοῖς ἄλγε᾽ ἔθηκε",
      translation:
        "Sing, O goddess, the anger of Achilles, son of Peleus,\nthe accursed anger that brought countless sorrows upon the Greeks.",
      source: "Homer, Iliad, Book I, Lines 1-2",
      context:
        "The opening of the Iliad is perhaps the most famous beginning in Western literature. The word 'mēnin' (wrath) is placed first for emphasis — the entire epic is about the consequences of one man's anger.",
    },
    pronunciationConfidence: "high",
  },
  {
    id: "latin",
    name: "Classical Latin",
    era: "c. 75 BCE – 200 CE",
    region: "Roman Empire (Mediterranean, Western Europe)",
    script: "Latin alphabet",
    status: "deciphered",
    description:
      "The language of the Roman Empire, and through it, the foundation of French, Spanish, Portuguese, Italian, and Romanian. Latin remained the language of European scholarship, law, and the Catholic Church for over a millennium after Rome fell.",
    uniqueFeature:
      "Free word order — thanks to its case system, Latin allows nearly any word order while preserving meaning. Poets exploited this for dramatic effect, placing words at the beginning and end of lines for emphasis.",
    demoText: {
      original:
        "Gallia est omnis divisa in partes tres, quarum unam incolunt Belgae, aliam Aquitani, tertiam qui ipsorum lingua Celtae, nostra Galli appellantur.",
      translation:
        "All Gaul is divided into three parts, one of which the Belgae inhabit, another the Aquitani, and the third those who in their own language are called Celts, in ours Gauls.",
      source: "Julius Caesar, De Bello Gallico, Book I, Chapter 1",
      context:
        "This famous opening line is often the first Latin sentence students encounter. Caesar wrote this account of his conquest of Gaul (58-50 BCE) in clear, direct prose that remains a model of expository writing.",
    },
    pronunciationConfidence: "high",
  },
  {
    id: "old-norse",
    name: "Old Norse",
    era: "c. 700 – 1300 CE",
    region: "Scandinavia, Iceland, British Isles, Normandy, Kievan Rus",
    script: "Runic (Elder/Younger Futhark) / Latin",
    status: "deciphered",
    description:
      "The language of the Vikings, preserved most fully in the Icelandic sagas and Eddas. Old Norse spread across an enormous territory through Viking expansion and trade. Modern Icelandic remains remarkably similar to Old Norse.",
    uniqueFeature:
      "Kennings — compound poetic metaphors that substitute for common nouns. 'Whale-road' means sea, 'battle-sweat' means blood, 'wound-hoe' means sword. Skaldic poets competed to create the most elaborate kennings.",
    demoText: {
      original:
        "Hljóðs bið ek allar helgar kindir,\nmeiri ok minni mögu Heimdallar;\nviltu at ek, Valföðr, vel fyr telja\nforn spjöll fira, þau er fremst of man.",
      translation:
        "I ask for a hearing of all the holy races,\ngreater and lesser, kinsmen of Heimdall.\nDo you want me, Allfather, to well recount\nthe ancient tales of men, the earliest I remember?",
      source: "Völuspá (Prophecy of the Seeress), Poetic Edda, Stanzas 1",
      context:
        "The Völuspá is the first and most famous poem in the Poetic Edda. A seeress (völva) recounts the creation of the world and prophesies its end in Ragnarök. This stanza uses the formal 'hearing request' convention of Norse oral poetry.",
    },
    pronunciationConfidence: "high",
  },
  {
    id: "sanskrit",
    name: "Sanskrit",
    era: "c. 1500 BCE – present (liturgical)",
    region: "South Asia",
    script: "Devanagari (modern) / Brahmi (ancient)",
    status: "deciphered",
    description:
      "The sacred language of Hinduism and classical language of India. Sanskrit is the oldest attested member of the Indo-European language family and the key to understanding the historical relationships between languages from Iceland to Bangladesh.",
    uniqueFeature:
      "Pāṇini's grammar (c. 400 BCE) described Sanskrit in 3,959 rules with a precision that anticipated modern formal language theory by over two millennia. It remains the most complete grammar of any language ever written.",
    demoText: {
      original:
        "asato mā sadgamaya\ntamaso mā jyotirgamaya\nmṛtyormā amṛtaṃ gamaya",
      translation:
        "From the unreal lead me to the real,\nfrom darkness lead me to light,\nfrom death lead me to immortality.",
      source: "Bṛhadāraṇyaka Upaniṣad 1.3.28",
      context:
        "This prayer from one of the oldest Upanishads (c. 700 BCE) encapsulates the core aspiration of Vedic philosophy — the journey from ignorance to knowledge, from mortality to the eternal. It remains one of the most recited mantras in Hinduism.",
    },
    pronunciationConfidence: "high",
  },
  {
    id: "old-english",
    name: "Old English",
    era: "c. 450 – 1100 CE",
    region: "England",
    script: "Runic (Futhorc) / Latin",
    status: "deciphered",
    description:
      "The earliest form of English, brought to Britain by Anglo-Saxon settlers. Old English is so different from modern English that it is mutually unintelligible. It was a fully inflected Germanic language with grammatical gender, five cases, and complex verb conjugations.",
    uniqueFeature:
      "Alliterative verse — Old English poetry used repeated initial sounds (not rhyme) as its organizing principle. The first stressed syllable of the second half-line alliterates with one or both stressed syllables in the first half-line.",
    demoText: {
      original:
        "Hwæt! Wē Gār-Dena in gēar-dagum,\nþēod-cyninga, þrym gefrūnon,\nhū ðā æþelingas ellen fremedon.",
      translation:
        "Listen! We have heard of the glory in bygone days\nof the folk-kings of the Spear-Danes,\nhow those noble lords performed courageous deeds.",
      source: "Beowulf, Lines 1-3",
      context:
        "Beowulf is the longest surviving Old English poem and the foundation of English literature. The famous opening 'Hwæt!' (often translated as 'Lo!' or 'Listen!') is an attention-grabber that signals the beginning of an oral performance. The poem survives in a single manuscript from c. 1000 CE.",
    },
    pronunciationConfidence: "high",
  },
];

/**
 * Get an ancient language by ID.
 */
export function getAncientLanguage(id: string): AncientLanguage | undefined {
  return ancientLanguages.find((l) => l.id === id);
}
