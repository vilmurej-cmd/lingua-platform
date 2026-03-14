export interface SacredPassage {
  title: string;
  original: string;
  translation: string;
  commentary: string;
}

export interface SacredText {
  id: string;
  name: string;
  tradition: string;
  era: string;
  language: string;
  description: string;
  significance: string;
  passages: SacredPassage[];
  respectNote: string;
}

export const sacredTexts: SacredText[] = [
  {
    id: "dead-sea-scrolls",
    name: "Dead Sea Scrolls",
    tradition: "Judaism / Early Christianity",
    era: "c. 250 BCE – 68 CE",
    language: "Hebrew, Aramaic, Greek",
    description:
      "A collection of approximately 981 manuscripts discovered between 1947 and 1956 in caves near the Dead Sea at Qumran. They include the oldest known copies of Hebrew Bible texts, community rules, and apocalyptic literature, likely belonging to an Essene community.",
    significance:
      "The scrolls pushed back our oldest Hebrew Bible manuscripts by over a thousand years and confirmed the remarkable accuracy of the traditional text. They also revealed the diversity of Jewish thought in the centuries around the turn of the era, shedding light on the world that gave rise to both Rabbinic Judaism and Christianity.",
    passages: [
      {
        title: "The Great Isaiah Scroll (1QIsaᵃ), Chapter 40:3",
        original: "ק֣וֹל קוֹרֵ֔א בַּמִּדְבָּ֕ר פַּנּ֖וּ דֶּ֣רֶךְ יְהוָ֑ה",
        translation:
          "A voice cries out: 'In the wilderness prepare the way of the Lord.'",
        commentary:
          "This verse, central to both Jewish and Christian tradition, appears in the oldest complete copy of Isaiah (c. 125 BCE). The Qumran community read it as a prophecy about their own mission — they literally went into the wilderness to prepare for the divine. Christians later applied it to John the Baptist.",
      },
      {
        title: "Community Rule (1QS), Column VIII",
        original:
          "When these exist as a community in Israel, they shall separate themselves from the midst of the habitation of perverse men to go into the wilderness to prepare there the way of HIM.",
        translation:
          "The community understood itself as fulfilling Isaiah's prophecy by physically withdrawing to the desert to live in ritual purity and study Torah.",
        commentary:
          "This passage reveals how the Qumran community interpreted scripture as speaking directly about themselves — a hermeneutical approach called 'pesher' that was foundational to how early Christians would later read the Hebrew Bible.",
      },
    ],
    respectNote:
      "These texts are of profound significance to both Jewish and Christian communities. They are studied with deep respect for the traditions they represent and the ancient community that preserved them.",
  },
  {
    id: "nag-hammadi",
    name: "Nag Hammadi Library",
    tradition: "Early Christianity (Gnostic)",
    era: "c. 2nd – 4th century CE (copies; originals may be older)",
    language: "Coptic (translated from Greek)",
    description:
      "A collection of 13 leather-bound codices discovered in 1945 by a farmer near Nag Hammadi, Egypt. They contain Gnostic Christian texts that were suppressed by the mainstream church, including gospels, apocalypses, and philosophical treatises that present radically different versions of Christian teaching.",
    significance:
      "The Nag Hammadi texts revealed that early Christianity was far more diverse than previously known. They preserve voices that were silenced — alternative creation myths, the divine feminine, and the idea that salvation comes through direct spiritual knowledge (gnosis) rather than faith alone. The Gospel of Thomas, with its 114 sayings of Jesus, has become one of the most studied texts in biblical scholarship.",
    passages: [
      {
        title: "Gospel of Thomas, Saying 77",
        original:
          "ⲡⲉϫⲉ ⲓⲥ ϫⲉ ⲁⲛⲟⲕ ⲡⲉ ⲡⲟⲩⲟⲉⲓⲛ ⲡⲉⲧϩⲓϫⲛ ⲟⲩⲟⲛ ⲛⲓⲙ",
        translation:
          "Jesus said: 'I am the light that is above all things. I am all: from me all came forth, and to me all return. Split a piece of wood; I am there. Lift up a stone, and you will find me there.'",
        commentary:
          "This saying presents a radically immanent vision of the divine — God is not distant but present in every material thing. This pantheistic theology was suppressed by mainstream Christianity but resonates with mystical traditions across cultures. The final image of splitting wood and lifting stones is one of the most beautiful in ancient literature.",
      },
      {
        title: "Gospel of Thomas, Saying 3",
        original: "[Coptic]",
        translation:
          "Jesus said: 'If your leaders say to you, Look, the kingdom is in the sky, then the birds will get there first. If they say it is in the sea, then the fish will precede you. Rather, the kingdom is within you and it is outside you.'",
        commentary:
          "This saying rejects institutional mediation of the divine. The kingdom is not a place to reach but a state of awareness to achieve. This 'realized eschatology' — the kingdom already present — represents one of the most profound theological ideas in early Christianity.",
      },
    ],
    respectNote:
      "These texts are sacred to some Christian communities and of deep scholarly interest. They represent voices from early Christianity that were marginalized and should be engaged with respect for the diversity of human spiritual experience.",
  },
  {
    id: "oracle-bones",
    name: "Oracle Bone Inscriptions",
    tradition: "Chinese (Shang Dynasty)",
    era: "c. 1250 – 1050 BCE",
    language: "Old Chinese",
    description:
      "The earliest known Chinese writing, carved into turtle shells and ox scapulae for divination during the Shang dynasty. Questions were inscribed, the bone was heated until it cracked, and the crack pattern was interpreted as an answer from royal ancestors or the supreme deity Di.",
    significance:
      "Oracle bones prove that Chinese civilization had sophisticated writing, bureaucracy, and religious practice 3,200 years ago. The inscriptions record questions about weather, war, harvests, illness, and childbirth — an intimate window into the concerns of an ancient court. The script is directly ancestral to modern Chinese characters.",
    passages: [
      {
        title: "Divination about Rain",
        original: "癸卯卜，殻，貞：旬亡禍。王占曰：吉。",
        translation:
          "On the day guimao, [the diviner] Que cracked [the bone] and asked: 'In the next ten days, will there be no disaster?' The king read the cracks and said: 'Auspicious.'",
        commentary:
          "This formulaic inscription shows the standard divination procedure: date, diviner's name, question, and the king's interpretation. The ten-day week (xun) was the basic unit of Shang timekeeping. The king himself was the final interpreter — divination was a royal prerogative, not a priestly one.",
      },
      {
        title: "Divination about Military Campaign",
        original: "貞：王勿从望乘伐下危。",
        translation:
          "The inquiry: 'Should the king not follow Wang Cheng in attacking Xiwei?'",
        commentary:
          "Military decisions were routinely submitted to divination. The negative phrasing ('should the king NOT...') was a common technique — asking both positive and negative versions to test the oracle's consistency. This shows that even in a theocratic state, there was a systematic method to the divination process.",
      },
    ],
    respectNote:
      "Oracle bone inscriptions are foundational to Chinese cultural heritage. They represent the origins of the world's oldest continuous writing tradition and should be treated with respect for their immense historical and cultural significance.",
  },
  {
    id: "book-of-kells",
    name: "Book of Kells",
    tradition: "Christianity (Celtic/Insular)",
    era: "c. 800 CE",
    language: "Latin (with Irish notations)",
    description:
      "An illuminated manuscript of the four Gospels created by Celtic monks, probably at the monastery of Iona (Scotland) and completed at Kells (Ireland). It is considered one of the greatest artistic achievements of the European Middle Ages, containing extraordinarily intricate decorative pages, illustrations, and ornamented text.",
    significance:
      "The Book of Kells represents the pinnacle of Insular art — a fusion of Celtic, Germanic, and Mediterranean traditions that produced a uniquely Irish visual language. Its interlace patterns, spirals, and zoomorphic designs influenced art and design for centuries. It demonstrates that the monasteries of the 'Dark Ages' were in fact centers of dazzling cultural production.",
    passages: [
      {
        title: "Chi Rho Page (folio 34r)",
        original: "XPI [Christi] autem generatio",
        translation:
          "Now the birth of Christ was in this way (Matthew 1:18)",
        commentary:
          "The Chi Rho page is the most famous single page in Western manuscript art. The Greek letters Chi (X) and Rho (P) — the first two letters of 'Christ' — are expanded into a full-page composition of dizzying complexity. Hidden within the interlace are moths, cats catching mice, and an otter eating a fish — an entire ecosystem embedded in the name of Christ.",
      },
      {
        title: "Tunc Crucifixerant Page (folio 124r)",
        original: "Tunc crucifixerant XPI cum eo duos latrones",
        translation:
          "Then they crucified Christ with him two thieves (Matthew 27:38)",
        commentary:
          "The monks lavished their greatest artistic efforts on the most spiritually significant moments. This page, describing the Crucifixion, uses particularly dense decoration — every letter is an opportunity for meditation. The beauty of the lettering transforms an account of violence into an object of contemplation.",
      },
    ],
    respectNote:
      "The Book of Kells is a sacred Christian manuscript and a national treasure of Ireland. It is housed at Trinity College Dublin, where it has been displayed to the public for over 150 years. It should be appreciated as both a masterwork of art and an object of deep religious devotion.",
  },
  {
    id: "vedas",
    name: "Rigveda (excerpt)",
    tradition: "Hinduism",
    era: "c. 1500 – 1200 BCE",
    language: "Vedic Sanskrit",
    description:
      "The oldest of the four Vedas and among the oldest religious texts still in use. The Rigveda is a collection of 1,028 hymns (suktas) addressed to various deities, organized into ten books (mandalas). It was composed and transmitted orally for centuries before being written down.",
    significance:
      "The Rigveda provides the foundation of Hinduism and is a priceless source for understanding Indo-European religion, mythology, and society. Its sophisticated oral transmission system, using multiple redundant recitation patterns, preserved the text with remarkable fidelity over three millennia — one of humanity's greatest feats of memory and cultural continuity.",
    passages: [
      {
        title: "Nasadiya Sukta (Hymn of Creation), Rigveda 10.129",
        original:
          "nāsad āsīn no sad āsīt tadānīṃ\nnāsīd rajo no vyomā paro yat\nkim āvarīvaḥ kuha kasya śarmann\nambhaḥ kim āsīd gahanaṃ gabhīram",
        translation:
          "There was neither non-existence nor existence then;\nthere was neither the realm of space nor the sky which is beyond.\nWhat stirred? Where? In whose protection?\nWas there water, bottomless, deep?",
        commentary:
          "This hymn, composed over 3,000 years ago, asks questions about the origin of existence with a philosophical sophistication that still resonates. It ends with the remarkable admission that perhaps even the highest deity does not know the answer — an expression of intellectual humility almost unique in ancient religious literature.",
      },
      {
        title: "Nasadiya Sukta, final verse",
        original:
          "iyaṃ visṛṣṭir yata ābabhūva\nyadi vā dadhe yadi vā na\nyo asyādhyakṣaḥ parame vyoman\nso aṅga veda yadi vā na veda",
        translation:
          "From where this creation arose,\nwhether he made it or whether he did not —\nhe who surveys it from the highest heaven,\nhe alone knows. Or perhaps he does not know.",
        commentary:
          "The final line — 'or perhaps he does not know' — is one of the most extraordinary statements in all of religious literature. It suggests that the mystery of existence may be beyond even divine comprehension. This intellectual honesty, expressed 3,200 years ago, demonstrates the depth of Vedic philosophical inquiry.",
      },
    ],
    respectNote:
      "The Vedas are among the most sacred texts in Hinduism, still recited in rituals today. They should be approached with deep respect for their continuing religious significance to over a billion people. The oral tradition of Vedic recitation is recognized by UNESCO as an Intangible Cultural Heritage of Humanity.",
  },
  {
    id: "gilgamesh",
    name: "Epic of Gilgamesh",
    tradition: "Mesopotamian",
    era: "c. 2100 BCE (earliest versions) – c. 1200 BCE (Standard Babylonian version)",
    language: "Sumerian, Akkadian",
    description:
      "The oldest surviving great work of literature — a Mesopotamian epic poem about Gilgamesh, king of Uruk, who embarks on a quest for immortality after the death of his beloved friend Enkidu. The story explores friendship, mortality, the meaning of civilization, and the limits of human ambition.",
    significance:
      "Gilgamesh is the foundation of world literature. It predates Homer's Iliad by at least a millennium and contains themes — the journey, the loss of a companion, the confrontation with death, the acceptance of mortality — that remain central to literature today. Its flood narrative (Tablet XI) bears striking parallels to the biblical story of Noah.",
    passages: [
      {
        title: "Tablet I: Opening Lines (Standard Babylonian version)",
        original:
          "ša nagba imuru išdi māti\nša kullat idû kališ mimmû\nnūka ša gimrat napḫar šūturat elû\niktašdam padāna rūqa\nḫanšiš illikam-ma anḫussu ipuš\nibni narâm kališ amaššu",
        translation:
          "He who saw the Deep, the foundation of the land,\nwho knew all things, experienced everything.\nHe was wise in all matters, learned in all things.\nHe traveled a long road, weary, worn out.\nHe came home and engraved on a stone tablet all his labors.",
        commentary:
          "The epic begins with its end — Gilgamesh returning home to write down his story. The 'Deep' (nagbu) refers to the cosmic underground waters, source of all wisdom. The frame narrative tells us from the start that this is a story about what is gained through suffering — not immortality, but the wisdom to tell the tale.",
      },
      {
        title: "Tablet X: The Alewife's Counsel",
        original:
          "Gilgameš attā ša tallaku\nbalāṭam ša tašaʾʾalu lā tutta\nilū ina epēš amēlūti\nmūta ištaknū ana amēlūti\nbalāṭam ina qātišunu ukinnu",
        translation:
          "Gilgamesh, where are you wandering?\nThe life you seek you will never find.\nWhen the gods created mankind,\nthey appointed death for mankind,\nand held life in their own keeping.",
        commentary:
          "Siduri the alewife gives Gilgamesh the epic's central wisdom: mortality is the human condition. She advises him to enjoy life's simple pleasures instead — food, clean clothes, a child's hand, a loving spouse. This carpe diem philosophy, 4,000 years old, remains one of literature's most beautiful expressions of how to live with the knowledge of death.",
      },
    ],
    respectNote:
      "The Epic of Gilgamesh belongs to the cultural heritage of Iraq and all humanity. While the civilization that produced it no longer exists as a living tradition, the text continues to speak across millennia about universal human experiences. It should be treated with the reverence due to humanity's oldest story.",
  },
];

/**
 * Get a sacred text by ID.
 */
export function getSacredText(id: string): SacredText | undefined {
  return sacredTexts.find((t) => t.id === id);
}
