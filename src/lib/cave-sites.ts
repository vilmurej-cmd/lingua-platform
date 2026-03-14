export interface CavePanel {
  name: string;
  description: string;
  interpretation: string;
}

export interface CaveSite {
  name: string;
  location: string;
  country: string;
  age: string;
  description: string;
  significance: string;
  notablePanels: CavePanel[];
  coordinates: { lat: number; lng: number };
}

export const caveSites: CaveSite[] = [
  {
    name: "Lascaux",
    location: "Dordogne, southwestern France",
    country: "France",
    age: "~17,000 years old",
    description:
      "Discovered in 1940 by four teenagers and their dog, Lascaux contains some of the most spectacular Paleolithic art ever found. The cave system includes several chambers decorated with over 600 painted and 1,500 engraved images of animals, humans, and abstract signs.",
    significance:
      "Often called 'the Sistine Chapel of Prehistory,' Lascaux demonstrates that Upper Paleolithic humans possessed sophisticated artistic techniques including perspective, color blending, and compositional planning. The cave was closed to the public in 1963 due to deterioration from visitors' breath and body heat.",
    notablePanels: [
      {
        name: "Hall of the Bulls",
        description:
          "The largest chamber, featuring four massive black bulls (aurochs) up to 5.2 meters long — the largest known cave art figures. Surrounded by horses, deer, and the mysterious 'unicorn' figure.",
        interpretation:
          "The monumental scale suggests a gathering place for ritual or ceremony. The animals may represent seasonal cycles, celestial constellations, or totemic clan symbols. The 'unicorn' (possibly a shamanic figure in animal disguise) has defied definitive interpretation.",
      },
      {
        name: "The Shaft Scene (The Well)",
        description:
          "A dramatic scene showing a bird-headed man falling backward before a wounded bison whose intestines are spilling out. A bird on a stick stands nearby. Below, a rhinoceros walks away.",
        interpretation:
          "One of the most debated images in cave art. Theories include: a hunting accident, a shamanic trance narrative, a mythological scene, or a star map (the bird man as Orion, the bison as Taurus). It is the only known narrative scene in Lascaux.",
      },
      {
        name: "The Axial Gallery",
        description:
          "A narrow passage with walls covered in red and black paintings of horses, aurochs, ibex, and stags, creating a flowing composition that follows the contours of the rock surface.",
        interpretation:
          "The artists clearly planned the composition, using the rock's natural curves to create a sense of movement. Color choices appear deliberate — red for horses, black for aurochs — suggesting a symbolic color code.",
      },
    ],
    coordinates: { lat: 45.05, lng: 1.17 },
  },
  {
    name: "Altamira",
    location: "Cantabria, northern Spain",
    country: "Spain",
    age: "~14,000 – 36,000 years old",
    description:
      "Discovered in 1879 by Marcelino Sanz de Sautuola and his eight-year-old daughter María, who first noticed the painted bison on the ceiling. The discovery was initially dismissed as a forgery — scholars could not believe 'primitive' humans were capable of such art.",
    significance:
      "Altamira's polychrome paintings proved that Paleolithic people were capable of artistry rivaling the Renaissance. The site's vindication (after Sautuola's death) transformed our understanding of human cognitive evolution. The detailed bison paintings exploit the ceiling's natural bumps to create three-dimensional effects.",
    notablePanels: [
      {
        name: "Polychrome Ceiling",
        description:
          "The masterpiece chamber: approximately 25 bison in red, black, and ochre, many curled in resting positions. The artists used the ceiling's natural protrusions to give the animals three-dimensional form.",
        interpretation:
          "The bison may represent a herd scene during rutting season, a symbolic fertility ritual, or a calendrical record. The deliberate use of rock contour for 3D effect shows sophisticated understanding of perspective and form.",
      },
      {
        name: "The Great Hind",
        description:
          "A 2.25-meter painting of a female deer (hind), executed in a single red-ochre outline with remarkable anatomical accuracy.",
        interpretation:
          "The large scale and careful execution suggest a figure of special symbolic importance — possibly a mother/fertility figure or a seasonal marker (hinds give birth in spring).",
      },
      {
        name: "Hand Stencils and Abstract Signs",
        description:
          "Negative handprints made by blowing pigment around a hand pressed against the rock, alongside mysterious rectangular 'tectiform' signs.",
        interpretation:
          "Hand stencils are among the most personal and universal expressions in cave art — found on every inhabited continent. The tectiforms may represent structures, traps, or abstract symbols whose meaning is lost.",
      },
    ],
    coordinates: { lat: 43.38, lng: -4.12 },
  },
  {
    name: "Chauvet-Pont-d'Arc",
    location: "Ardèche, southern France",
    country: "France",
    age: "~30,000 – 36,000 years old",
    description:
      "Discovered in 1994 by speleologists Jean-Marie Chauvet, Éliette Brunel, and Christian Hillaire. Chauvet stunned the world because its art is twice as old as Lascaux yet equally (or more) sophisticated — demolishing the idea that art progressed from simple to complex.",
    significance:
      "Chauvet proved that artistic mastery appeared suddenly in the archaeological record. The cave contains the oldest known figurative art, including the only cave paintings of predators (lions, bears, hyenas) rather than prey animals. A UNESCO World Heritage Site since 2014.",
    notablePanels: [
      {
        name: "Panel of the Lions",
        description:
          "A dramatic scene of a pride of cave lions apparently stalking a herd of bison. The lions' heads are rendered with astonishing detail — individual whiskers, focused eyes, flattened ears indicating aggression.",
        interpretation:
          "Unlike most cave art which depicts prey animals, this panel focuses on apex predators. It may represent a shamanic identification with the power of predators, or an observed natural scene recorded with journalistic precision.",
      },
      {
        name: "Panel of the Horses",
        description:
          "Four horse heads arranged to create an illusion of depth and movement, with the closest horse rendered in detail and background horses more lightly sketched.",
        interpretation:
          "The deliberate use of perspective techniques (shading, size variation, overlap) 30,000 years before the Renaissance suggests these cognitive abilities are innate to our species, not learned through cultural development.",
      },
      {
        name: "The Venus and the Sorcerer",
        description:
          "A pendant-shaped rock bearing a charcoal drawing of a female lower body (vulva, legs) merged with a bison-headed figure above. One of the oldest known human-animal composite figures.",
        interpretation:
          "Possibly represents a mythological narrative or shamanic transformation. The Venus figure echoes the portable Venus figurines found across Upper Paleolithic Europe, suggesting a widespread symbolic tradition.",
      },
    ],
    coordinates: { lat: 44.39, lng: 4.42 },
  },
  {
    name: "Bhimbetka Rock Shelters",
    location: "Madhya Pradesh, central India",
    country: "India",
    age: "~30,000 years old (earliest layer) to ~1,000 years old (most recent)",
    description:
      "A vast complex of over 700 rock shelters spanning the Vindhya hills, with paintings from the Mesolithic period through the medieval era. Discovered by archaeologist V.S. Wakankar in 1957 when he spotted the shelters from a passing train.",
    significance:
      "Bhimbetka demonstrates continuous human habitation and artistic production over 30,000 years — one of the longest such records anywhere. The art documents the transition from hunting-gathering to agriculture and animal domestication in real time across millennia of paintings layered on top of each other.",
    notablePanels: [
      {
        name: "Zoo Rock",
        description:
          "A single shelter wall depicting elephants, barasingha (swamp deer), bison, horses, and various other animals in vibrant red and white pigments, creating a panoramic wildlife scene.",
        interpretation:
          "Likely served as a visual encyclopedia of local fauna, possibly for teaching young hunters about animal identification and behavior. The variety of animals suggests the region was once far more biodiverse.",
      },
      {
        name: "Hunting Scenes",
        description:
          "Dynamic figures of hunters with bows and arrows pursuing deer and bison. Some scenes show hunters in groups using coordinated tactics, including driving animals toward concealed colleagues.",
        interpretation:
          "These scenes provide direct evidence of collaborative hunting strategies and weapon technology. The dynamism of the figures — running, leaping, drawing bows — shows a sophisticated understanding of capturing motion.",
      },
      {
        name: "Communal Dance Scene",
        description:
          "A group of human figures in a circle, arms linked, in what appears to be a communal dance or ceremony. Some figures are adorned with headdresses or body decorations.",
        interpretation:
          "Evidence of social ritual, celebration, or religious ceremony. The body decorations suggest social differentiation or ceremonial dress. This is one of the earliest depictions of communal human activity in South Asian art.",
      },
    ],
    coordinates: { lat: 22.94, lng: 77.61 },
  },
  {
    name: "Drakensberg (uKhahlamba)",
    location: "KwaZulu-Natal, eastern South Africa",
    country: "South Africa",
    age: "~3,000 – 8,000 years old (some possibly older)",
    description:
      "The Drakensberg mountains contain one of the greatest concentrations of rock art in the world — over 35,000 individual paintings in 500+ cave and overhang sites, created by the San (Bushmen) people over thousands of years.",
    significance:
      "Thanks to 19th-century ethnographic records of San beliefs, Drakensberg art can be interpreted through the artists' own cultural framework — a rare gift in rock art studies. The paintings document San spiritual life, particularly the shamanic trance experience, with extraordinary vividness.",
    notablePanels: [
      {
        name: "Game Pass Shelter Trance Scene",
        description:
          "A complex scene showing human figures in various stages of trance dance — bending forward, bleeding from the nose, transforming into animal forms (therianthropes). An eland (antelope) dominates the panel.",
        interpretation:
          "San ethnography confirms this depicts a healing trance dance. The eland was the most spiritually powerful animal — its dying movements mirrored the shaman's trance behavior. Nasal bleeding is a real physiological effect of trance states. The therianthropes represent shamans 'becoming' their power animals.",
      },
      {
        name: "Battle Cave",
        description:
          "A rare combat scene showing two groups of San fighting each other with bows and arrows. Wounded figures fall, and the scene extends across a wide rock face.",
        interpretation:
          "Challenges the romantic notion that all San art is spiritual. This likely records a real inter-group conflict, possibly over territory, water sources, or social disputes. It is one of the few direct depictions of warfare in San art.",
      },
      {
        name: "Rain-Making Scenes",
        description:
          "A large rain-animal (a fantastic beast combining features of several animals) is led by human figures using ropes, surrounded by lines suggesting falling rain.",
        interpretation:
          "San rainmakers claimed to capture a 'rain-animal' in trance and lead it across the sky, causing it to bleed (rain) and die (storm). This belief system, documented in the 19th century, perfectly explains the otherwise bizarre imagery.",
      },
    ],
    coordinates: { lat: -29.48, lng: 29.27 },
  },
  {
    name: "Kakadu (Ubirr and Nourlangie)",
    location: "Northern Territory",
    country: "Australia",
    age: "~20,000+ years old (some estimates up to 40,000)",
    description:
      "Kakadu National Park contains thousands of Aboriginal rock art sites spanning tens of thousands of years, making it one of the longest continuous artistic traditions on Earth. The art ranges from early hand stencils to detailed X-ray style paintings.",
    significance:
      "Kakadu art is a living tradition — Aboriginal elders can still explain many paintings' meanings. The X-ray style (showing internal organs and skeletal structures of animals) is unique to this region and demonstrates a sophisticated anatomical knowledge used for teaching about edible portions and spiritual essence.",
    notablePanels: [
      {
        name: "Rainbow Serpent (Ubirr)",
        description:
          "A large serpentine figure painted in ochre, often repainted over centuries to maintain its power. The Rainbow Serpent is depicted with a head that combines features of multiple animals.",
        interpretation:
          "The Rainbow Serpent is one of the most important figures in Aboriginal Dreaming. It is a creator being associated with water, fertility, and the shaping of the landscape. Painting the serpent is an act of spiritual maintenance, not mere decoration.",
      },
      {
        name: "X-ray Barramundi (Nourlangie)",
        description:
          "A large barramundi fish painted in the X-ray style, showing internal backbone, intestines, and edible flesh portions in white, red, and yellow ochre.",
        interpretation:
          "X-ray art served multiple purposes: teaching anatomy for butchering, illustrating the spiritual essence within animals, and acknowledging the animal's sacrifice. The tradition of revealing what is hidden reflects a worldview where the spiritual interior is as real as the physical exterior.",
      },
      {
        name: "Contact Art (European Ships)",
        description:
          "Later paintings depicting European sailing ships, rifles, and people in Western clothing, painted in the traditional Aboriginal style.",
        interpretation:
          "Demonstrates the art tradition's living nature — Aboriginal artists recorded first contact with Europeans using the same artistic framework they used for Dreaming stories. The ships are painted alongside ancient spiritual figures, integrating the new into the old.",
      },
    ],
    coordinates: { lat: -12.40, lng: 132.95 },
  },
  {
    name: "Serra da Capivara",
    location: "Piauí, northeastern Brazil",
    country: "Brazil",
    age: "~12,000 – 25,000 years old (some claims much older)",
    description:
      "A national park containing one of the densest concentrations of prehistoric sites in the Americas — over 1,300 decorated rock shelters. The art depicts humans, animals, and scenes of daily life with remarkable energy and movement.",
    significance:
      "Serra da Capivara's rock art is unusually action-oriented — showing dancing, hunting, fighting, and even sexual scenes. Some researchers controversially claim human artifacts at the site date to 50,000 years ago, challenging the consensus that humans arrived in the Americas ~15,000 years ago.",
    notablePanels: [
      {
        name: "Toca do Boqueirão da Pedra Furada",
        description:
          "Hundreds of painted figures in red ochre showing communal scenes — group dances, hunts with coordinated beaters, and ceremonial gatherings with figures wearing elaborate headdresses.",
        interpretation:
          "The emphasis on communal activity suggests a society with complex social organization. The headdresses and body paint indicate social roles or ceremonial status. These scenes provide rare insight into prehistoric social life in the Americas.",
      },
      {
        name: "Hunting Scenes with Megafauna",
        description:
          "Panels showing human figures confronting large animals, some of which may represent now-extinct Pleistocene megafauna including giant armadillos and ground sloths.",
        interpretation:
          "If the animals are indeed megafauna (which is debated), these paintings could document human interaction with species that went extinct around the end of the last Ice Age — a visual record of a lost world.",
      },
      {
        name: "Tree of Life Panel",
        description:
          "A complex composition centered on a large tree-like figure surrounded by animals and human figures in attitudes of reverence or interaction.",
        interpretation:
          "Possibly represents a cosmological concept — a world tree or axis mundi connecting earth and sky. Similar motifs appear in rock art across South America, suggesting shared mythological traditions among early American peoples.",
      },
    ],
    coordinates: { lat: -8.83, lng: -42.55 },
  },
  {
    name: "Tassili n'Ajjer",
    location: "Sahara, southeastern Algeria",
    country: "Algeria",
    age: "~7,000 – 12,000 years old",
    description:
      "A vast plateau in the Sahara containing over 15,000 rock paintings and engravings documenting a time when the desert was a green savanna with rivers, lakes, and abundant wildlife. The art records the complete transformation of the Sahara from Eden to desert.",
    significance:
      "Tassili provides the most detailed visual record of climate change in human history. The art progresses through distinct periods: hunting wild animals on green savanna (Round Head period), herding cattle (Pastoral period), introducing horses (Horse period), and finally camels (Camel period) as the land dried. It is a 5,000-year documentary of environmental collapse.",
    notablePanels: [
      {
        name: "The Great God of Sefar",
        description:
          "A monumental figure over 3 meters tall with a round head, emanating horns or rays, surrounded by smaller human figures in attitudes of supplication. One of the oldest and most mysterious figures in Saharan art.",
        interpretation:
          "Belonging to the earliest 'Round Head' period, this figure may represent a deity, ancestral spirit, or shamanic vision. The round-headed figures are so distinct from later styles that some researchers believe they represent a different cultural tradition — possibly related to sub-Saharan African peoples before Berber populations arrived.",
      },
      {
        name: "Pastoral Scenes (Cattle Period)",
        description:
          "Detailed scenes of daily pastoral life: women milking cows, herders guiding cattle, children playing, camps with round huts. The cattle are painted with individualized markings showing specific breeds.",
        interpretation:
          "These are among the most detailed depictions of daily life in all of prehistoric art. The specific cattle markings suggest individual animals were recognized and valued — supporting evidence for early domestication and selective breeding in the Sahara.",
      },
      {
        name: "Swimming Figures (Wadi Sura II / Cave of Swimmers)",
        description:
          "Small human figures in swimming postures, surrounded by what appear to be aquatic environments. Made famous by the film 'The English Patient.'",
        interpretation:
          "Direct evidence that the Sahara once contained lakes and rivers large enough for swimming. The swimmers may also represent spiritual 'diving' into other worlds — a common shamanic metaphor. The contrast with today's hyper-arid landscape is a powerful reminder of how radically environments can change.",
      },
    ],
    coordinates: { lat: 25.50, lng: 9.00 },
  },
];

/**
 * Get a cave site by name.
 */
export function getCaveSite(name: string): CaveSite | undefined {
  return caveSites.find(
    (s) => s.name.toLowerCase() === name.toLowerCase()
  );
}
