/**
 * Quipu knot encoding system data.
 *
 * Quipus (khipus) were recording devices used by the Inca Empire and
 * earlier Andean civilizations. Made of cotton or camelid fiber strings,
 * they used a decimal positional system encoded through knots.
 */

/**
 * How each digit (0-9) is represented with knots on a quipu cord.
 */
export const quipuDigits: Record<number, string> = {
  0: "No knot (empty position — the absence of knots on a cord section represents zero)",
  1: "Single overhand knot (one simple knot at the appropriate position on the cord)",
  2: "Long knot with 2 turns (the cord is wrapped around itself twice before pulling through)",
  3: "Long knot with 3 turns (three wraps — the number of turns equals the digit)",
  4: "Long knot with 4 turns (four wraps of the cord through the loop)",
  5: "Long knot with 5 turns (five wraps — becoming quite bulky and tactile)",
  6: "Long knot with 6 turns (six wraps through the loop)",
  7: "Long knot with 7 turns (seven wraps — easily distinguishable by touch alone)",
  8: "Long knot with 8 turns (eight wraps — approaching the practical maximum)",
  9: "Long knot with 9 turns (nine wraps — the largest single-digit knot)",
};

/**
 * Cord colors and their proposed meanings.
 * Note: color interpretations are scholarly proposals, not certainties.
 * The Inca did not leave a written key to their color code.
 */
export const quipuColors: { color: string; meaning: string }[] = [
  {
    color: "White",
    meaning: "Silver, peace, or government/administrative records. May also represent the concept of 'nothing' or an unmarked/default category.",
  },
  {
    color: "Red",
    meaning: "War, military counts, or the Inca ruler (the Sapa Inca). In some contexts, blood/sacrifice or the number of warriors.",
  },
  {
    color: "Yellow/Gold",
    meaning: "Gold, corn/maize, or the sun god Inti. Often associated with harvest counts and tribute in precious metals.",
  },
  {
    color: "Green",
    meaning: "Coca leaves, agriculture, or conquered/subject peoples. May indicate living things or fertility.",
  },
  {
    color: "Black",
    meaning: "Time, illness, or death. In some interpretations, black cords tracked periods of time or recorded unfavorable events.",
  },
  {
    color: "Brown",
    meaning: "Potatoes, earth, or common goods. The most 'everyday' color, used for routine agricultural accounting.",
  },
  {
    color: "Blue",
    meaning: "Water, lakes, rivers, or religious/ceremonial significance. Rarer than other colors, suggesting special-purpose use.",
  },
  {
    color: "Variegated/Multicolor",
    meaning: "Mixed categories, transitions, or special status. Two-tone cords may indicate sub-categories within a larger group.",
  },
];

/**
 * Interesting facts about quipus.
 */
export const quipuFacts: string[] = [
  "The Inca Empire administered 10 million people across 4,000 km of territory without a writing system — quipus were their primary information technology, used for census data, tax records, military logistics, and historical narratives.",

  "Quipukamayuqs (quipu keepers) were specially trained officials who could encode and decode complex information. They held a position of immense responsibility — a mistake in a tax quipu could mean life or death for entire communities.",

  "The largest known quipu contains 1,500 pendant cords. Most quipus are much smaller (10-50 cords), but the complexity suggests they could encode far more information than simple numbers.",

  "Spanish conquistadors systematically destroyed quipus as 'instruments of the devil,' yet approximately 900 survive in museums worldwide. This mass destruction is considered one of history's greatest losses of indigenous knowledge.",

  "Modern research suggests some quipus may encode narrative information, not just numbers — making them potentially a true writing system. A 2017 study found patterns consistent with place names encoded in binary-like sequences of knot types.",

  "The decimal positional number system used in quipus was more advanced than Roman numerals (which were still in widespread use in Europe at the time of the Spanish conquest). Quipus could represent zero — a concept Europe had only recently adopted from Arabic mathematics.",

  "Some Andean communities maintained quipu traditions into the 20th century. In the village of San Cristobal de Rapaz, Peru, a set of 263 quipus was still being used for community record-keeping when documented by anthropologists.",

  "Quipus were often burned with their keepers upon death, suggesting the information was considered personal or that each quipukamayuq had their own encoding variations — similar to handwriting or personal shorthand.",

  "The Inca road system (Qhapaq Nan) had relay stations called chasquis where runners carried quipus as messages. A quipu message could travel 240 km per day through the relay system — faster than any European postal system of the same era.",

  "Attempts to fully decode quipus are ongoing. Machine learning and computational linguistics are being applied to the surviving examples, and researchers are optimistic that the combination of statistical analysis and newly discovered quipus may eventually crack the code.",
];

/**
 * Structure of a quipu for educational display.
 */
export interface QuipuStructure {
  element: string;
  description: string;
}

export const quipuStructure: QuipuStructure[] = [
  {
    element: "Primary cord",
    description:
      "The main horizontal cord from which all other cords hang. Usually thicker than pendant cords. Represents the top-level category or entity being recorded.",
  },
  {
    element: "Pendant cords",
    description:
      "Cords hanging down from the primary cord. Each represents a data field or sub-category. Their order (left to right) is significant.",
  },
  {
    element: "Subsidiary cords",
    description:
      "Smaller cords attached to pendant cords, representing sub-sub-categories. A pendant cord for 'llamas' might have subsidiaries for 'male,' 'female,' 'young.'",
  },
  {
    element: "Top cords",
    description:
      "Cords that loop over the primary cord and hang on the opposite side from pendant cords. Often contain sum totals of the pendant cords they are associated with.",
  },
  {
    element: "Knot clusters",
    description:
      "Groups of knots on a cord, spaced at intervals. Each cluster represents a decimal place: units closest to the bottom, tens above, hundreds above that, etc.",
  },
  {
    element: "Dangle end",
    description:
      "The unadorned end of a cord below the last knot. Its length may or may not carry meaning — this is debated.",
  },
];
