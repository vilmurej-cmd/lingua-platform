/**
 * Caesar cipher encryption.
 * Shifts each letter by the given amount, wrapping around the alphabet.
 */
export function caesarEncrypt(text: string, shift: number): string {
  const normalizedShift = ((shift % 26) + 26) % 26;
  return text
    .split("")
    .map((char) => {
      if (char >= "A" && char <= "Z") {
        return String.fromCharCode(
          ((char.charCodeAt(0) - 65 + normalizedShift) % 26) + 65
        );
      }
      if (char >= "a" && char <= "z") {
        return String.fromCharCode(
          ((char.charCodeAt(0) - 97 + normalizedShift) % 26) + 97
        );
      }
      return char;
    })
    .join("");
}

/**
 * Caesar cipher decryption (reverse shift).
 */
export function caesarDecrypt(text: string, shift: number): string {
  return caesarEncrypt(text, -shift);
}

/**
 * Substitution cipher encryption using a key alphabet.
 * The key is a 26-character string mapping a-z to the substitution alphabet.
 */
export function substitutionEncrypt(
  text: string,
  key: string
): string {
  if (key.length !== 26) {
    throw new Error("Substitution key must be exactly 26 characters");
  }
  const lowerKey = key.toLowerCase();
  return text
    .split("")
    .map((char) => {
      if (char >= "A" && char <= "Z") {
        return lowerKey[char.charCodeAt(0) - 65].toUpperCase();
      }
      if (char >= "a" && char <= "z") {
        return lowerKey[char.charCodeAt(0) - 97];
      }
      return char;
    })
    .join("");
}

/**
 * Substitution cipher decryption (reverse mapping).
 */
export function substitutionDecrypt(
  text: string,
  key: string
): string {
  if (key.length !== 26) {
    throw new Error("Substitution key must be exactly 26 characters");
  }
  const lowerKey = key.toLowerCase();
  // Build reverse mapping
  const reverseKey = new Array(26);
  for (let i = 0; i < 26; i++) {
    reverseKey[lowerKey.charCodeAt(i) - 97] = String.fromCharCode(97 + i);
  }
  return text
    .split("")
    .map((char) => {
      if (char >= "A" && char <= "Z") {
        return reverseKey[char.charCodeAt(0) - 65].toUpperCase();
      }
      if (char >= "a" && char <= "z") {
        return reverseKey[char.charCodeAt(0) - 97];
      }
      return char;
    })
    .join("");
}

/**
 * Frequency analysis of a text.
 * Returns a map of each letter to its frequency (percentage).
 */
export function frequencyAnalysis(
  text: string
): Record<string, number> {
  const counts: Record<string, number> = {};
  let total = 0;

  for (const char of text.toLowerCase()) {
    if (char >= "a" && char <= "z") {
      counts[char] = (counts[char] || 0) + 1;
      total++;
    }
  }

  const frequencies: Record<string, number> = {};
  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(97 + i);
    frequencies[letter] = total > 0
      ? Math.round(((counts[letter] || 0) / total) * 10000) / 100
      : 0;
  }

  return frequencies;
}

/**
 * English letter frequency reference (approximate percentages).
 */
export const englishFrequency: Record<string, number> = {
  a: 8.17, b: 1.49, c: 2.78, d: 4.25, e: 12.70, f: 2.23,
  g: 2.02, h: 6.09, i: 6.97, j: 0.15, k: 0.77, l: 4.03,
  m: 2.41, n: 6.75, o: 7.51, p: 1.93, q: 0.10, r: 5.99,
  s: 6.33, t: 9.06, u: 2.76, v: 0.98, w: 2.36, x: 0.15,
  y: 1.97, z: 0.07,
};

/**
 * Vigenere cipher encryption.
 * Uses a keyword to determine the shift for each letter.
 */
export function vigenereEncrypt(text: string, keyword: string): string {
  if (!keyword || keyword.length === 0) {
    throw new Error("Keyword must not be empty");
  }
  const key = keyword.toLowerCase().replace(/[^a-z]/g, "");
  if (key.length === 0) {
    throw new Error("Keyword must contain at least one letter");
  }

  let keyIndex = 0;
  return text
    .split("")
    .map((char) => {
      if (char >= "A" && char <= "Z") {
        const shift = key.charCodeAt(keyIndex % key.length) - 97;
        keyIndex++;
        return String.fromCharCode(
          ((char.charCodeAt(0) - 65 + shift) % 26) + 65
        );
      }
      if (char >= "a" && char <= "z") {
        const shift = key.charCodeAt(keyIndex % key.length) - 97;
        keyIndex++;
        return String.fromCharCode(
          ((char.charCodeAt(0) - 97 + shift) % 26) + 97
        );
      }
      return char;
    })
    .join("");
}

/**
 * Vigenere cipher decryption.
 */
export function vigenereDecrypt(text: string, keyword: string): string {
  if (!keyword || keyword.length === 0) {
    throw new Error("Keyword must not be empty");
  }
  const key = keyword.toLowerCase().replace(/[^a-z]/g, "");
  if (key.length === 0) {
    throw new Error("Keyword must contain at least one letter");
  }

  let keyIndex = 0;
  return text
    .split("")
    .map((char) => {
      if (char >= "A" && char <= "Z") {
        const shift = key.charCodeAt(keyIndex % key.length) - 97;
        keyIndex++;
        return String.fromCharCode(
          ((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65
        );
      }
      if (char >= "a" && char <= "z") {
        const shift = key.charCodeAt(keyIndex % key.length) - 97;
        keyIndex++;
        return String.fromCharCode(
          ((char.charCodeAt(0) - 97 - shift + 26) % 26) + 97
        );
      }
      return char;
    })
    .join("");
}

/**
 * Attempt to detect Caesar cipher shift by comparing frequency to English.
 * Returns the most likely shift values (top 3).
 */
export function detectCaesarShift(ciphertext: string): number[] {
  const freq = frequencyAnalysis(ciphertext);
  const scores: { shift: number; score: number }[] = [];

  for (let shift = 0; shift < 26; shift++) {
    let score = 0;
    for (let i = 0; i < 26; i++) {
      const cipherLetter = String.fromCharCode(97 + i);
      const plainLetter = String.fromCharCode(97 + ((i - shift + 26) % 26));
      score += Math.abs(
        (freq[cipherLetter] || 0) - (englishFrequency[plainLetter] || 0)
      );
    }
    scores.push({ shift, score });
  }

  scores.sort((a, b) => a.score - b.score);
  return scores.slice(0, 3).map((s) => s.shift);
}
