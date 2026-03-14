export interface HistoricalScript {
  id: string;
  name: string;
  era: string;
  region: string;
  status: "deciphered" | "partial" | "undeciphered";
  description: string;
  symbolCount: number;
  corpusSize: string;
  deciphermentStory?: string;
  knownInfo: string;
  unknownInfo?: string;
}

export const scriptsDatabase: HistoricalScript[] = [
  {
    id: "egyptian-hieroglyphs",
    name: "Egyptian Hieroglyphs",
    era: "c. 3200 BCE – 400 CE",
    region: "Nile Valley, Egypt",
    status: "deciphered",
    description:
      "The iconic writing system of ancient Egypt, combining logographic and alphabetic elements in intricate pictorial forms. Used primarily for monumental inscriptions on temples, tombs, and official documents.",
    symbolCount: 750,
    corpusSize: "Tens of thousands of inscriptions",
    deciphermentStory:
      "Deciphered by Jean-François Champollion in 1822 using the Rosetta Stone, which contained the same decree in hieroglyphs, Demotic, and Greek. The key insight was that hieroglyphs represented sounds, not just ideas — the cartouche of Ptolemy provided the breakthrough.",
    knownInfo:
      "Fully readable. Three parallel scripts existed: hieroglyphs (formal/monumental), hieratic (cursive for daily use), and Demotic (later simplified form). The system uses determinatives — silent signs that classify the meaning category of words.",
  },
  {
    id: "sumerian-cuneiform",
    name: "Sumerian Cuneiform",
    era: "c. 3400 BCE – 75 CE",
    region: "Mesopotamia (modern Iraq)",
    status: "deciphered",
    description:
      "The earliest known writing system, originally pictographic, which evolved into wedge-shaped (cuneus = wedge) impressions in clay tablets. Adapted by the Akkadians, Babylonians, Assyrians, Hittites, and Persians.",
    symbolCount: 600,
    corpusSize: "Over 500,000 tablets discovered",
    deciphermentStory:
      "Deciphered through a combination of trilingual inscriptions (Old Persian, Elamite, Babylonian) at Behistun, Iran. Henry Rawlinson, Edward Hincks, and Jules Oppert independently decoded it in the 1850s. The Royal Asiatic Society verified by giving all three the same untranslated text.",
    knownInfo:
      "Fully readable. The system evolved from pictograms to abstract wedge-marks over 3,000 years. Signs can be logograms (whole words), syllabograms (syllables), or determinatives (category markers). The same sign can have multiple readings (polyvalence).",
  },
  {
    id: "linear-a",
    name: "Linear A",
    era: "c. 1800 – 1450 BCE",
    region: "Crete, Aegean islands",
    status: "undeciphered",
    description:
      "The writing system of the Minoan civilization, found on clay tablets, pottery, and stone vessels across Crete. Despite sharing some symbols with the deciphered Linear B, the underlying language remains unknown.",
    symbolCount: 302,
    corpusSize: "~1,400 known inscriptions (mostly short)",
    knownInfo:
      "The script is syllabic. Some sign values can be tentatively read by comparison with Linear B (which borrowed the script for writing Greek). Numerical and measurement systems are well understood. Many texts appear to be administrative records and religious dedications.",
    unknownInfo:
      "The language itself is unknown — it does not appear to be Greek, Semitic, or Indo-European. Without a bilingual text or identification of the language family, full decipherment remains elusive. The Minoan language may have no surviving relatives.",
  },
  {
    id: "linear-b",
    name: "Linear B",
    era: "c. 1400 – 1200 BCE",
    region: "Crete, mainland Greece",
    status: "deciphered",
    description:
      "Adapted from Linear A by the Mycenaean Greeks, Linear B is the earliest known form of written Greek. Found on clay tablets at Knossos (Crete) and Pylos (mainland Greece), the texts are administrative records of palatial economies.",
    symbolCount: 200,
    corpusSize: "~5,000 tablets",
    deciphermentStory:
      "Deciphered in 1952 by architect Michael Ventris, who realized the script represented an archaic form of Greek — a shocking revelation since scholars had assumed the Minoans and Mycenaeans spoke unrelated languages. Tragically, Ventris died in a car accident in 1956 at age 34.",
    knownInfo:
      "Fully readable as Mycenaean Greek. Texts record inventories of goods, livestock, and personnel — no literature, letters, or histories survive. This is the oldest known form of Greek, predating Homer by centuries.",
  },
  {
    id: "indus-valley",
    name: "Indus Valley Script",
    era: "c. 2600 – 1900 BCE",
    region: "Indus Valley (modern Pakistan, northwest India)",
    status: "undeciphered",
    description:
      "Found on thousands of seal stones, pottery, and tablets from the Harappan civilization, one of the ancient world's largest urban cultures. The brevity of inscriptions (average 5 symbols) has made decipherment extremely difficult.",
    symbolCount: 417,
    corpusSize: "~4,000 inscribed objects",
    knownInfo:
      "The script is generally written right-to-left. Many symbols appear on carved seal stones, suggesting they may represent names, titles, or administrative marks. Statistical analysis shows patterns consistent with a linguistic (not purely pictographic) system.",
    unknownInfo:
      "Whether it represents a full language or a limited proto-writing system is debated. The underlying language family is unknown — proposals include Dravidian, Indo-Aryan, and Munda, but none have achieved consensus. No bilingual inscription has ever been found.",
  },
  {
    id: "rongorongo",
    name: "Rongorongo",
    era: "c. pre-1860s (dating uncertain)",
    region: "Easter Island (Rapa Nui)",
    status: "undeciphered",
    description:
      "A system of glyphs found on wooden tablets from Rapa Nui (Easter Island). If it represents true writing independently invented, it would be one of very few independent inventions of writing in human history.",
    symbolCount: 120,
    corpusSize: "26 surviving wooden objects",
    deciphermentStory:
      "Catholic missionaries who arrived in the 1860s reportedly burned many tablets as pagan artifacts. By the time scholars became interested, no one on the island could read them. Every literate person had been killed or enslaved in Peruvian raids of 1862-63.",
    knownInfo:
      "Written in a unique boustrophedon pattern — alternating lines are upside-down relative to each other, so the reader rotates the tablet 180° at the end of each line. Some sequences appear to be related to a lunar calendar.",
    unknownInfo:
      "Whether rongorongo is true writing, proto-writing, or a mnemonic device is unknown. The language it may encode (Rapanui?) is unclear. The limited corpus and lack of any bilingual text make decipherment unlikely without new discoveries.",
  },
  {
    id: "phaistos-disc",
    name: "Phaistos Disc",
    era: "c. 1700 BCE",
    region: "Phaistos, Crete",
    status: "undeciphered",
    description:
      "A mysterious fired clay disc covered on both sides with a spiral of stamped symbols, found in the Minoan palace at Phaistos. It is unique — no other example of this script has ever been found.",
    symbolCount: 45,
    corpusSize: "1 object (241 symbol tokens)",
    knownInfo:
      "The symbols were made with pre-made stamps (punches), making this the earliest known example of 'printing' or movable type. The disc spirals from the outside inward, with dividing lines grouping symbols into 61 clusters (possible words). Some symbols are recognizably pictographic (head, fish, flower, shield).",
    unknownInfo:
      "Everything. The language, the reading direction (inward or outward), and even whether it is genuine writing or a game board. With only one specimen, statistical analysis is meaningless. Over 100 'decipherments' have been published — none widely accepted.",
  },
  {
    id: "proto-elamite",
    name: "Proto-Elamite",
    era: "c. 3100 – 2900 BCE",
    region: "Iran (Susa, and spreading east to the Iranian Plateau)",
    status: "undeciphered",
    description:
      "One of the earliest writing systems in the world, contemporary with early Sumerian writing. Found primarily on clay tablets, it appears to be an administrative/accounting system used across a wide geographic area.",
    symbolCount: 1000,
    corpusSize: "~1,600 tablets",
    knownInfo:
      "The numerical system is well understood — it uses different counting systems for different commodities (similar to our use of dozen for eggs). Some signs may be logograms for specific goods. Texts appear to be entirely administrative (inventories, accounts).",
    unknownInfo:
      "The language is unknown. The large number of signs suggests a logographic or mixed system. Errors in the original tablets (ancient scribes apparently struggled with it too) complicate analysis. The script was abandoned after only 200 years of use.",
  },
  {
    id: "voynich-manuscript",
    name: "Voynich Manuscript",
    era: "c. 1404 – 1438 CE (by radiocarbon dating)",
    region: "Central Europe (exact origin unknown)",
    status: "undeciphered",
    description:
      "A 240-page illustrated manuscript written in an unknown script and language. Filled with drawings of unidentified plants, astronomical diagrams, and mysterious bathing scenes. Named after Wilfrid Voynich, the book dealer who acquired it in 1912.",
    symbolCount: 25,
    corpusSize: "1 manuscript, ~170,000 characters",
    knownInfo:
      "Statistical analysis shows the text has properties consistent with natural language (Zipf's law, word-length distribution). The script flows left-to-right. The vellum dates to the early 15th century. The illustrations are divided into sections: botanical, astronomical, biological, cosmological, pharmaceutical, and recipes.",
    unknownInfo:
      "Whether it contains meaningful text or elaborate nonsense. Proposals include an unknown natural language, an artificial language, a cipher, a hoax, or a constructed language. No repeated bigram at the beginning and end of 'words' suggests unusual phonological properties if it is a real language.",
  },
  {
    id: "maya-glyphs",
    name: "Maya Glyphs",
    era: "c. 200 BCE – 1697 CE",
    region: "Mesoamerica",
    status: "deciphered",
    description:
      "The most sophisticated writing system of the pre-Columbian Americas, combining logographic and syllabic elements in elaborate glyph blocks. Used to record history, astronomy, ritual, and dynastic succession.",
    symbolCount: 800,
    corpusSize: "Thousands of monuments, ceramics, and codices (most codices destroyed by Spanish)",
    deciphermentStory:
      "Decipherment took over a century of false starts. The breakthrough came from Yuri Knorozov, a Russian epigrapher who in 1952 demonstrated (from behind the Iron Curtain) that the script was partly syllabic — contradicting the dominant Western view that it was purely logographic. Full decipherment accelerated from the 1970s onward.",
    knownInfo:
      "About 80% of known glyphs can now be read. The script is logo-syllabic: glyph blocks typically contain a main sign (logogram) with affixed syllabic signs for grammatical suffixes and phonetic complements. Scribes deliberately varied spellings for aesthetic beauty.",
  },
  {
    id: "elder-futhark",
    name: "Elder Futhark",
    era: "c. 150 – 800 CE",
    region: "Northern Europe (Germanic peoples)",
    status: "deciphered",
    description:
      "The oldest form of the runic alphabet, used by Germanic tribes across Scandinavia, the British Isles, and the European continent. Named 'futhark' after its first six letters (ᚠᚢᚦᚨᚱᚲ). Used for inscriptions on stone, metal, bone, and wood.",
    symbolCount: 24,
    corpusSize: "~350 inscriptions survive",
    deciphermentStory:
      "The runic alphabet was never fully lost — medieval Scandinavian scholars preserved knowledge of it. Modern understanding was built up from the 16th century onward by comparing inscriptions with known historical languages.",
    knownInfo:
      "Fully readable. Each rune has a name and associated symbolic meaning (ᚠ fehu = cattle/wealth, ᚢ uruz = aurochs/strength). The 24 runes are divided into three groups of 8 called aettir. Evolved into the Younger Futhark (16 runes) used by Vikings and the Anglo-Saxon Futhorc (expanded to 33).",
  },
  {
    id: "ogham",
    name: "Ogham",
    era: "c. 400 – 700 CE",
    region: "Ireland, western Britain",
    status: "deciphered",
    description:
      "An Early Medieval alphabet used primarily to write Primitive Irish. Consisting of groups of one to five strokes or notches cut along the edge of a stone, ogham inscriptions are found on standing stones marking boundaries and commemorating the dead.",
    symbolCount: 20,
    corpusSize: "~400 inscriptions",
    deciphermentStory:
      "Knowledge of ogham was preserved in medieval Irish manuscripts. The Book of Ballymote (1390 CE) contains a comprehensive key to the alphabet, allowing scholars to read ancient inscriptions with relative confidence.",
    knownInfo:
      "Fully readable. Letters consist of 1-5 strokes above, below, or crossing a baseline (usually the edge of a stone). The alphabet is organized into four groups of five letters (aicmi). Most inscriptions are short formulas: 'X son of Y' — funerary or territorial markers.",
  },
  {
    id: "proto-sinaitic",
    name: "Proto-Sinaitic",
    era: "c. 1800 BCE",
    region: "Sinai Peninsula, Levant",
    status: "partial",
    description:
      "Considered the ancestor of all alphabets. These crude inscriptions, found in turquoise mines at Serabit el-Khadim in Sinai, appear to be a simplified adaptation of Egyptian hieroglyphs used by Semitic-speaking miners.",
    symbolCount: 23,
    corpusSize: "~30 inscriptions (very short)",
    deciphermentStory:
      "In 1916, Alan Gardiner proposed that the symbols represent the acrophonic principle — each symbol depicts an object whose Semitic name begins with the sound the letter represents. For example, an ox head (aleph) = the glottal stop, a house (bet) = b.",
    knownInfo:
      "The acrophonic principle is widely accepted. Several letters can be read with confidence (aleph, bet, gimel, etc.). This is the bridge between Egyptian hieroglyphs and the Phoenician alphabet — and through Phoenician, the ancestor of Greek, Latin, Arabic, Hebrew, and virtually every alphabet in use today.",
    unknownInfo:
      "Many inscriptions are too damaged or short for confident reading. The exact relationship to later Canaanite/Phoenician script has gaps. Whether the script was a single invention or evolved independently at multiple sites is debated.",
  },
  {
    id: "phoenician",
    name: "Phoenician",
    era: "c. 1050 – 150 BCE",
    region: "Lebanon, Mediterranean",
    status: "deciphered",
    description:
      "The first widely adopted alphabet, spread across the Mediterranean by Phoenician traders. With only 22 consonantal letters, it was vastly simpler than cuneiform or hieroglyphs — democratizing literacy. The ancestor of Greek, Latin, Arabic, Hebrew, and most world alphabets.",
    symbolCount: 22,
    corpusSize: "~10,000 inscriptions",
    deciphermentStory:
      "Phoenician was among the first ancient scripts deciphered, thanks to bilingual inscriptions and its close relationship to Hebrew (known from the Bible). Jean-Jacques Barthélemy published a decipherment in 1758.",
    knownInfo:
      "Fully readable. Written right-to-left, consonants only (the reader supplies vowels from context). The Greeks borrowed the alphabet and added vowels, creating the first true alphabet where every significant sound has its own letter.",
  },
  {
    id: "oracle-bone-script",
    name: "Oracle Bone Script",
    era: "c. 1250 – 1050 BCE",
    region: "Anyang, China",
    status: "deciphered",
    description:
      "The earliest known form of Chinese writing, inscribed on turtle shells and ox scapulae used for divination by the Shang dynasty. Questions were carved into bone, which was then heated until it cracked — the pattern of cracks was interpreted as the answer from ancestors or spirits.",
    symbolCount: 4500,
    corpusSize: "~150,000 fragments recovered (many more were ground up as 'dragon bones' for traditional medicine before their significance was recognized)",
    deciphermentStory:
      "Discovered in 1899 when Wang Yirong, an antiquarian and chancellor of the Imperial Academy, noticed inscriptions on 'dragon bones' being sold as medicine. He recognized them as ancient Chinese characters. Systematic study began immediately.",
    knownInfo:
      "About 1,500 of the 4,500 known characters have been identified. The script is recognizably ancestral to modern Chinese characters — many can be traced directly to their modern forms. Topics include weather forecasting, military campaigns, harvests, childbirth, and ancestor worship.",
  },
];

/**
 * Get script by ID.
 */
export function getScript(id: string): HistoricalScript | undefined {
  return scriptsDatabase.find((s) => s.id === id);
}

/**
 * Get scripts by decipherment status.
 */
export function getScriptsByStatus(
  status: HistoricalScript["status"]
): HistoricalScript[] {
  return scriptsDatabase.filter((s) => s.status === status);
}
