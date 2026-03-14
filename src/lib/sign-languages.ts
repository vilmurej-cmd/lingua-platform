export interface SignLanguageSign {
  word: string;
  description: string;
  handshape: string;
  movement: string;
  culturalNote?: string;
}

export interface SignLanguage {
  code: string;
  name: string;
  region: string;
  speakers: string;
  vocabulary: SignLanguageSign[];
}

export const signLanguages: SignLanguage[] = [
  {
    code: "ASL",
    name: "American Sign Language",
    region: "United States, Canada",
    speakers: "500,000 - 2 million",
    vocabulary: [
      { word: "Hello", description: "Open hand salute from forehead", handshape: "Open B hand", movement: "Hand moves outward from forehead in a small arc", culturalNote: "Can also be a casual wave — context matters" },
      { word: "Thank you", description: "Flat hand from chin outward", handshape: "Open B hand, fingers together", movement: "Fingertips touch chin, then hand moves forward and slightly down", culturalNote: "The motion is like blowing a kiss of gratitude" },
      { word: "Please", description: "Circular motion on chest", handshape: "Open B hand, palm flat on chest", movement: "Circular rubbing motion on the chest", culturalNote: "Also used to mean 'enjoy' in some contexts" },
      { word: "Sorry", description: "Fist circles on chest", handshape: "A hand (closed fist)", movement: "Circular motion over the heart area", culturalNote: "Facial expression of remorse is essential — the sign alone is not enough" },
      { word: "Yes", description: "Nodding fist", handshape: "S hand (fist)", movement: "Wrist bends up and down like a nodding head", culturalNote: "A simple head nod also works in casual conversation" },
      { word: "No", description: "Index and middle finger snap to thumb", handshape: "Extended index and middle fingers with thumb", movement: "Fingers snap together to thumb", culturalNote: "Headshake alone is also valid" },
      { word: "Help", description: "Fist on open palm, both lift", handshape: "Thumbs-up (A hand) resting on flat B hand", movement: "Both hands rise together", culturalNote: "The flat hand 'supports' the fist — visual metaphor for assistance" },
      { word: "Water", description: "W handshape taps chin", handshape: "W hand (index, middle, ring fingers extended)", movement: "Index finger side of W taps chin twice", culturalNote: "One of the first signs taught to deaf infants" },
      { word: "Love", description: "Crossed arms over chest", handshape: "Both hands in fist, arms crossed", movement: "Arms cross and press against chest in a hugging motion", culturalNote: "'I love you' has its own distinct one-handed sign (ILY handshape)" },
      { word: "Friend", description: "Interlocking index fingers", handshape: "X hands (hooked index fingers)", movement: "Hook together, then reverse positions and hook again", culturalNote: "The double-hook represents mutual connection" },
    ],
  },
  {
    code: "BSL",
    name: "British Sign Language",
    region: "United Kingdom",
    speakers: "150,000",
    vocabulary: [
      { word: "Hello", description: "Wave hand near face", handshape: "Open hand", movement: "Small wave near the side of the face", culturalNote: "BSL and ASL are NOT mutually intelligible despite both being English-speaking countries" },
      { word: "Thank you", description: "Flat hand from chin forward", handshape: "Open B hand", movement: "Fingertips at chin, hand moves forward", culturalNote: "Very similar to ASL's thank you" },
      { word: "Please", description: "Flat hand circular on chest", handshape: "Open hand palm on chest", movement: "Small circular motion", culturalNote: "BSL uses two-handed fingerspelling unlike ASL's one-handed" },
      { word: "Sorry", description: "Fist circular on chest", handshape: "Closed fist", movement: "Circular motion on chest", culturalNote: "Facial expression is crucial in BSL grammar" },
      { word: "Yes", description: "Fist nods", handshape: "S hand (fist)", movement: "Wrist nods forward", culturalNote: "Head nod accompanies the sign" },
      { word: "No", description: "Index finger wags side to side", handshape: "Extended index finger", movement: "Wags horizontally", culturalNote: "Often accompanied by a headshake and negative facial expression" },
      { word: "Help", description: "Thumbs up lifted by flat hand", handshape: "A hand on B hand", movement: "Both rise together", culturalNote: "BSL has regional dialects — signs can vary between cities" },
      { word: "Water", description: "W shape taps chin", handshape: "W hand", movement: "Taps lower lip/chin", culturalNote: "Some regional variants use a drinking gesture" },
      { word: "Name", description: "H hand taps forehead", handshape: "H hand (index and middle extended)", movement: "Fingertips tap side of forehead twice", culturalNote: "Deaf people in UK often have name signs given by the Deaf community" },
      { word: "Good", description: "Thumbs up", handshape: "Thumbs up (A hand with thumb extended)", movement: "Small forward motion", culturalNote: "Universally understood but technically a BSL sign" },
    ],
  },
  {
    code: "Auslan",
    name: "Australian Sign Language",
    region: "Australia",
    speakers: "20,000",
    vocabulary: [
      { word: "Hello", description: "Open hand wave", handshape: "Open 5 hand", movement: "Wave near the face", culturalNote: "Auslan derives from BSL — they share about 82% of signs" },
      { word: "Thank you", description: "Flat hand from chin", handshape: "Open B hand", movement: "From chin, moves outward", culturalNote: "Australian Deaf community is very tight-knit" },
      { word: "Please", description: "Circular motion on chest", handshape: "Flat hand", movement: "Circles on chest", culturalNote: "Similar to BSL due to shared heritage" },
      { word: "Sorry", description: "Fist circles on chest", handshape: "Closed fist", movement: "Circular motion over heart", culturalNote: "Auslan was officially recognized in 1987" },
      { word: "Yes", description: "Nodding fist", handshape: "S hand", movement: "Nods at wrist", culturalNote: "Head nod accompanies" },
      { word: "No", description: "Finger wag", handshape: "Index finger", movement: "Side to side", culturalNote: "Accompanied by headshake" },
      { word: "Help", description: "Thumbs up on flat palm", handshape: "A on B hand", movement: "Lift together", culturalNote: "Auslan uses BSL two-handed fingerspelling" },
      { word: "Water", description: "W taps chin", handshape: "W hand", movement: "Taps chin", culturalNote: "Many Auslan signs have adapted to Australian context" },
      { word: "Family", description: "Both F hands circle", handshape: "F hands", movement: "Circle in front of body", culturalNote: "The Deaf community often refers to itself as a family" },
      { word: "Australia", description: "Both hands rotate at shoulders", handshape: "Open hands, palms inward", movement: "Alternate brushing downward at shoulders", culturalNote: "Represents the motion of an Australian wave" },
    ],
  },
  {
    code: "JSL",
    name: "Japanese Sign Language",
    region: "Japan",
    speakers: "320,000",
    vocabulary: [
      { word: "Hello (Konnichiwa)", description: "Index fingers represent bowing", handshape: "Both index fingers extended", movement: "Fingers bend forward like a bow", culturalNote: "Reflects Japanese bowing culture — the depth of the finger bow can indicate formality" },
      { word: "Thank you (Arigatou)", description: "Karate chop on opposite wrist", handshape: "Flat B hand", movement: "Edge of hand chops gently on back of other wrist then rises", culturalNote: "Based on a gesture of respect and gratitude" },
      { word: "Please (Onegaishimasu)", description: "Hands press together, bow forward", handshape: "Both palms together", movement: "Slight bow of hands forward", culturalNote: "Mirrors the cultural gesture of polite request" },
      { word: "Sorry (Gomen nasai)", description: "Fingertips touch together, hands tilt", handshape: "Open hands, fingertips touching", movement: "Hands tilt forward together", culturalNote: "Can vary in intensity with facial expression" },
      { word: "Yes (Hai)", description: "Fist nods at wrist", handshape: "Closed fist", movement: "Wrist bends forward", culturalNote: "Simple and direct" },
      { word: "No (Iie)", description: "Hand waves horizontally", handshape: "Open hand", movement: "Waves side to side in front of face", culturalNote: "The Japanese hand-in-front-of-face wave for 'no' has been formalized in JSL" },
      { word: "Help (Tasukete)", description: "One hand pushes up the other", handshape: "Flat hands", movement: "One palm pushes the other hand upward", culturalNote: "The upward push metaphor for support" },
      { word: "Water (Mizu)", description: "Drinking gesture", handshape: "C hand near mouth", movement: "Tips toward mouth", culturalNote: "Iconic sign — resembles the physical action" },
      { word: "Friend (Tomodachi)", description: "Pinkies link", handshape: "Both pinkies extended", movement: "Hook together", culturalNote: "Pinky promise gesture is deeply cultural in Japan" },
      { word: "Beautiful (Kirei)", description: "Hand circles face", handshape: "Open hand", movement: "Circles around the face, then opens outward", culturalNote: "The opening motion suggests radiance" },
    ],
  },
  {
    code: "LSF",
    name: "French Sign Language",
    region: "France",
    speakers: "100,000",
    vocabulary: [
      { word: "Bonjour (Hello)", description: "Open hand moves from face outward", handshape: "Open B hand", movement: "From near face, arcs outward", culturalNote: "LSF is the ancestor of ASL — Laurent Clerc brought it to America in 1817" },
      { word: "Merci (Thank you)", description: "Hand from chin forward", handshape: "Flat hand", movement: "From chin, moves outward and down", culturalNote: "Very similar to ASL due to historical connection" },
      { word: "S'il vous plait (Please)", description: "Hand on chest circles", handshape: "Flat palm on chest", movement: "Small circles", culturalNote: "Politeness markers are very important in French Deaf culture" },
      { word: "Pardon (Sorry)", description: "Circular motion on chest with fist", handshape: "A hand", movement: "Circles on chest", culturalNote: "Expression of genuine regret accompanies" },
      { word: "Oui (Yes)", description: "Head nod with fist", handshape: "S hand", movement: "Nods at wrist", culturalNote: "Often just a head nod in casual conversation" },
      { word: "Non (No)", description: "Hand waves", handshape: "Open hand", movement: "Side to side", culturalNote: "French Deaf culture values directness" },
      { word: "Aider (Help)", description: "Fist on flat palm rises", handshape: "A on B", movement: "Both hands rise", culturalNote: "The metaphor of lifting is universal across sign languages" },
      { word: "Eau (Water)", description: "Three fingers tap chin", handshape: "3 hand", movement: "Taps chin", culturalNote: "LSF influenced many other sign languages worldwide" },
      { word: "Ami (Friend)", description: "Hooked index fingers", handshape: "X hands", movement: "Hook and reverse", culturalNote: "Identical to ASL — shared heritage" },
      { word: "France", description: "F hand twists at wrist", handshape: "F hand", movement: "Twists back and forth", culturalNote: "LSF was one of the first sign languages to be formally studied" },
    ],
  },
  {
    code: "DGS",
    name: "German Sign Language",
    region: "Germany",
    speakers: "200,000",
    vocabulary: [
      { word: "Hallo (Hello)", description: "Hand waves at side of head", handshape: "Open hand", movement: "Small wave near temple", culturalNote: "DGS has its own grammar entirely distinct from spoken German" },
      { word: "Danke (Thank you)", description: "Hand touches chin, moves out", handshape: "Flat hand", movement: "From chin outward", culturalNote: "German Deaf schools have existed since 1778" },
      { word: "Bitte (Please)", description: "Hand circles on chest", handshape: "Open palm", movement: "Circular on chest", culturalNote: "Also means 'you're welcome' in context" },
      { word: "Entschuldigung (Sorry)", description: "Fist circles heart area", handshape: "A hand", movement: "Circular on chest", culturalNote: "DGS was officially recognized in 2002" },
      { word: "Ja (Yes)", description: "Fist nods", handshape: "S hand", movement: "Forward nod at wrist", culturalNote: "Simple and direct" },
      { word: "Nein (No)", description: "Index finger wags", handshape: "1 hand", movement: "Wags side to side", culturalNote: "The German 'no' finger wag is iconic" },
      { word: "Hilfe (Help)", description: "Flat hand lifts fist", handshape: "B lifts A", movement: "Both rise", culturalNote: "Universal help metaphor" },
      { word: "Wasser (Water)", description: "W taps chin", handshape: "W hand", movement: "Taps at chin", culturalNote: "Initialized sign using German W" },
      { word: "Freund (Friend)", description: "Hands clasp", handshape: "Both open hands", movement: "Clasp together warmly", culturalNote: "The clasp represents the bond of friendship" },
      { word: "Deutschland (Germany)", description: "Index finger points up from forehead", handshape: "1 hand at forehead", movement: "Points upward from center of forehead", culturalNote: "References the pointed helmet historically associated with Germany" },
    ],
  },
  {
    code: "LSE",
    name: "Spanish Sign Language",
    region: "Spain",
    speakers: "100,000",
    vocabulary: [
      { word: "Hola (Hello)", description: "Open hand waves from face", handshape: "Open 5 hand", movement: "Wave outward from near face", culturalNote: "Spain also recognizes Catalan Sign Language (LSC)" },
      { word: "Gracias (Thank you)", description: "Hand from chin downward", handshape: "Flat B hand", movement: "From chin, moves outward and slightly down", culturalNote: "Spanish Deaf culture is vibrant with strong community ties" },
      { word: "Por favor (Please)", description: "Both hands together, small bow", handshape: "Palms together", movement: "Slight forward motion", culturalNote: "Reflects cultural courtesy" },
      { word: "Perdón (Sorry)", description: "Hand circles on chest", handshape: "Flat hand", movement: "Circular motion", culturalNote: "LSE was officially recognized in 2007" },
      { word: "Sí (Yes)", description: "Fist nods", handshape: "S hand", movement: "Nods at wrist", culturalNote: "Head nod accompanies" },
      { word: "No", description: "Index finger wags", handshape: "1 hand", movement: "Side to side", culturalNote: "Same word in Spanish and English" },
      { word: "Ayuda (Help)", description: "Fist lifted by flat hand", handshape: "A on B", movement: "Rise together", culturalNote: "Universal cross-sign-language metaphor" },
      { word: "Agua (Water)", description: "Tapping motion at chin", handshape: "Extended fingers", movement: "Tap at chin", culturalNote: "Water signs often reference drinking" },
      { word: "Amigo (Friend)", description: "Hooked fingers link", handshape: "X hands", movement: "Link and reverse", culturalNote: "Connection metaphor" },
      { word: "España (Spain)", description: "Clasp at shoulder", handshape: "Clawed hand", movement: "Clips at shoulder like a brooch", culturalNote: "References traditional Spanish capa (cloak) clasp" },
    ],
  },
  {
    code: "LIS",
    name: "Italian Sign Language",
    region: "Italy",
    speakers: "100,000",
    vocabulary: [
      { word: "Ciao (Hello)", description: "Hand waves casually", handshape: "Open hand", movement: "Casual wave", culturalNote: "Italian Deaf culture is very expressive — facial expression is grammatically essential" },
      { word: "Grazie (Thank you)", description: "Hand from chin outward", handshape: "Flat hand", movement: "Chin to outward arc", culturalNote: "LIS was recognized as a language by Italy in 2021" },
      { word: "Per favore (Please)", description: "Joined hands gesture", handshape: "Palms together", movement: "Small pleading motion", culturalNote: "The Italian 'prayer hands' gesture is formalized in LIS" },
      { word: "Scusa (Sorry)", description: "Fist on chest circles", handshape: "A hand", movement: "Circular on heart", culturalNote: "Expression must convey sincerity" },
      { word: "Sì (Yes)", description: "Fist nods forward", handshape: "S hand", movement: "Wrist nod", culturalNote: "Often minimal — an eyebrow raise can suffice" },
      { word: "No", description: "Finger wag or headshake", handshape: "Index finger", movement: "Wags", culturalNote: "Italian non-manual markers are particularly rich" },
      { word: "Aiuto (Help)", description: "One hand lifts the other", handshape: "A on B hand", movement: "Both rise", culturalNote: "Urgency conveyed through speed and expression" },
      { word: "Acqua (Water)", description: "C hand tips to mouth", handshape: "C hand", movement: "Tips toward mouth", culturalNote: "Iconic drinking gesture" },
      { word: "Amico (Friend)", description: "Fingers interlink", handshape: "Hooked index fingers", movement: "Link together", culturalNote: "Physical connection represents the bond" },
      { word: "Italia (Italy)", description: "Index traces shape on chest", handshape: "I hand", movement: "Draws boot shape of Italy in the air", culturalNote: "Geographic reference to Italy's distinctive shape" },
    ],
  },
  {
    code: "Libras",
    name: "Brazilian Sign Language",
    region: "Brazil",
    speakers: "3 million",
    vocabulary: [
      { word: "Olá (Hello)", description: "Open hand waves from forehead", handshape: "Open B hand", movement: "Outward from forehead", culturalNote: "Libras is influenced by LSF (French Sign Language) historically" },
      { word: "Obrigado (Thank you)", description: "Flat hand from chin", handshape: "B hand", movement: "Moves out from chin", culturalNote: "Brazil has one of the largest Deaf populations in the world" },
      { word: "Por favor (Please)", description: "Hand rubs chest", handshape: "Flat hand", movement: "Circular on chest", culturalNote: "Libras was officially recognized by Brazil in 2002" },
      { word: "Desculpa (Sorry)", description: "Fist circles on chest", handshape: "A hand", movement: "Circular motion", culturalNote: "Brazilian Deaf culture values warmth and community" },
      { word: "Sim (Yes)", description: "Fist nods", handshape: "S hand", movement: "Nods at wrist", culturalNote: "May be accompanied by smile and head nod" },
      { word: "Não (No)", description: "Index finger wags", handshape: "1 hand", movement: "Horizontal wag", culturalNote: "Headshake accompanies" },
      { word: "Ajuda (Help)", description: "Fist on flat palm rises", handshape: "A on B", movement: "Lift together", culturalNote: "Brazilian Portuguese influence shows in initialized signs" },
      { word: "Água (Water)", description: "W taps chin", handshape: "W hand", movement: "Taps at chin", culturalNote: "Libras has approximately 5 million users including hearing signers" },
      { word: "Amigo (Friend)", description: "Clasping handshake motion", handshape: "Both hands clasp", movement: "Warm clasp", culturalNote: "Reflects Brazilian warmth in greetings" },
      { word: "Brasil", description: "B hand traces", handshape: "B hand", movement: "Traces outline in the air", culturalNote: "Country signs often reference geography or cultural symbols" },
    ],
  },
  {
    code: "KSL",
    name: "Korean Sign Language",
    region: "South Korea",
    speakers: "300,000",
    vocabulary: [
      { word: "Annyeonghaseyo (Hello)", description: "Slight bow with hand on chest", handshape: "Flat hand on chest", movement: "Small bow forward", culturalNote: "Reflects Korean bowing culture — the hand on chest adds sincerity" },
      { word: "Gamsahamnida (Thank you)", description: "Hand from forehead outward", handshape: "Flat hand at forehead", movement: "Arcs outward and down", culturalNote: "KSL has been recognized by South Korea since 2016" },
      { word: "Butakhamnida (Please)", description: "Hands together, bow", handshape: "Palms together", movement: "Slight bow", culturalNote: "Formality levels exist in KSL as in spoken Korean" },
      { word: "Joesonghamnida (Sorry)", description: "Fist circles on chest", handshape: "A hand", movement: "Circles on heart area", culturalNote: "Degree of sorry reflected in speed and facial expression" },
      { word: "Ne (Yes)", description: "Fist nods", handshape: "S hand", movement: "Forward nod", culturalNote: "Simple and direct" },
      { word: "Aniyo (No)", description: "Open hand waves", handshape: "Open hand", movement: "Waves horizontally", culturalNote: "Can be softened with facial expression" },
      { word: "Dowajuseyo (Help)", description: "Palm lifts fist", handshape: "B under A", movement: "Rise together", culturalNote: "Help-seeking is respected in Korean Deaf culture" },
      { word: "Mul (Water)", description: "Drinking gesture", handshape: "C hand", movement: "Tips to mouth", culturalNote: "Iconic representation" },
      { word: "Chingu (Friend)", description: "Pinkies link", handshape: "Both pinkies extended", movement: "Hook together", culturalNote: "Similar to JSL — possible cultural/historical link" },
      { word: "Hanguk (Korea)", description: "K hand at temple", handshape: "K hand", movement: "Small arc at side of head", culturalNote: "Initialized with the K handshape" },
    ],
  },
  {
    code: "CSL",
    name: "Chinese Sign Language",
    region: "China",
    speakers: "20 million",
    vocabulary: [
      { word: "Ni hao (Hello)", description: "Fists bump together gently", handshape: "Both closed fists, thumbs up", movement: "Bump together at thumbs", culturalNote: "CSL is the most widely used sign language in the world by number of users" },
      { word: "Xie xie (Thank you)", description: "Hand extends from chest", handshape: "Flat hand on chest", movement: "Extends outward from chest", culturalNote: "The outward motion from the heart represents sincerity" },
      { word: "Qing (Please)", description: "Open hand gestures inward", handshape: "Open hand, palm up", movement: "Welcoming gesture inward", culturalNote: "CSL has been standardized since the 1950s" },
      { word: "Duibuqi (Sorry)", description: "Index finger scratches temple", handshape: "1 hand", movement: "Scratches near temple", culturalNote: "Represents embarrassment — a cultural expression" },
      { word: "Shi (Yes)", description: "Fist nods", handshape: "S hand", movement: "Forward nod", culturalNote: "Simple and direct" },
      { word: "Bu shi (No)", description: "Hand waves horizontally", handshape: "Open hand", movement: "Horizontal wave", culturalNote: "Often accompanied by head shake" },
      { word: "Bangzhu (Help)", description: "One fist pushes up the other", handshape: "A under A", movement: "Lower fist pushes upper fist up", culturalNote: "CSL has regional variations across China" },
      { word: "Shui (Water)", description: "Index finger draws water radical", handshape: "1 hand", movement: "Draws the Chinese water radical (氵)", culturalNote: "Many CSL signs reference Chinese character components" },
      { word: "Pengyou (Friend)", description: "Index fingers hook", handshape: "Both index fingers", movement: "Hook together twice", culturalNote: "The mutual hooking represents the bond" },
      { word: "Zhongguo (China)", description: "Index finger draws square", handshape: "1 hand", movement: "Draws a small square shape at chest level", culturalNote: "References the Chinese character 国 (country) with its box radical" },
    ],
  },
  {
    code: "ISL",
    name: "Indian Sign Language",
    region: "India",
    speakers: "6 million",
    vocabulary: [
      { word: "Namaste (Hello)", description: "Palms join at chest level", handshape: "Both palms together", movement: "Slight bow with joined hands", culturalNote: "Directly borrowed from the universal Indian greeting — one of the most iconic signs globally" },
      { word: "Dhanyavaad (Thank you)", description: "Hand from chin moves forward", handshape: "Flat B hand", movement: "From chin, arcs outward", culturalNote: "ISL serves an estimated 1.8 million Deaf Indians" },
      { word: "Kripya (Please)", description: "Joined hands with slight bow", handshape: "Palms together", movement: "Forward pleading motion", culturalNote: "India has multiple sign language varieties, but ISL is becoming standardized" },
      { word: "Maaf kijiye (Sorry)", description: "Fist circular on chest", handshape: "A hand", movement: "Circles over heart", culturalNote: "ISL is gaining recognition as India's official sign language" },
      { word: "Haan (Yes)", description: "Head wobble with fist nod", handshape: "S hand", movement: "Forward nod (note: the Indian head wobble is NOT 'no' — it means agreement)", culturalNote: "The Indian head wobble is one of the most misunderstood gestures globally" },
      { word: "Nahin (No)", description: "Index finger wags", handshape: "1 hand", movement: "Horizontal wag", culturalNote: "Clear distinction from the head wobble" },
      { word: "Madad (Help)", description: "Palm lifts fist upward", handshape: "B supports A", movement: "Rise together", culturalNote: "Community help is deeply valued in Indian Deaf culture" },
      { word: "Paani (Water)", description: "Cupped hand to mouth", handshape: "Cupped C hand", movement: "Tips toward mouth", culturalNote: "Iconic drinking gesture" },
      { word: "Dost (Friend)", description: "Hands clasp warmly", handshape: "Both open hands", movement: "Warm handshake clasp", culturalNote: "Friendship is expressed with warmth in Indian culture" },
      { word: "Bharat (India)", description: "Finger touches forehead bindi point", handshape: "Index finger", movement: "Touches center of forehead, then opens outward", culturalNote: "References the bindi — a mark of cultural significance" },
    ],
  },
];

/**
 * Get a sign language by its code.
 */
export function getSignLanguage(code: string): SignLanguage | undefined {
  return signLanguages.find((sl) => sl.code === code);
}
