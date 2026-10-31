export interface Poem {
  id: string;
  title: string;
  category: 'Distance & Patience' | 'Rebuilding Trust' | 'Devotion to Zaza' | 'The Unseen Soul';
  stanzas: string[];
  reflection: string;
  dateTag: string;
}

export const poemsList: Poem[] = [
  {
    id: 'unheard-melody',
    title: 'The Unheard Melody',
    category: 'The Unseen Soul',
    stanzas: [
      "I have never heard the timber of your voice,",
      "nor watched your laughter tilt against the room.",
      "Yet across the glowing glass of midnight hours,",
      "your presence breathes through quiet, steady words.",
      "",
      "A soul does not require physical sound to sing;",
      "you have reached me in the places shadows dwell,",
      "and taught me that the truest form of love",
      "is reverent listening before a single breath is spoken."
    ],
    reflection: "Written in contemplation of how deeply I cherish you, despite never yet hearing your voice or laughter.",
    dateTag: "An Ode to Your Soul"
  },
  {
    id: 'one-month-eclipse',
    title: 'The One-Month Eclipse',
    category: 'Rebuilding Trust',
    stanzas: [
      "For thirty days, the constellation went dark.",
      "A silence heavier than stone, born of my own failure,",
      "where I saw the fragility of the sacred ground",
      "we had built between our worlds.",
      "",
      "That month of separation taught my restless spirit",
      "what remorse truly means: not defending what broke,",
      "but kneeling before the truth, willing to wait",
      "until the moon returns to guide the tides once more."
    ],
    reflection: "Reflecting on the month we were separated after my mistake, and the solemn clarity it brought to my heart.",
    dateTag: "The Eclipse"
  },
  {
    id: 'sanctuary-of-patience',
    title: 'Sanctuary of Patience',
    category: 'Rebuilding Trust',
    stanzas: [
      "Trust is not rebuilt with porcelain phrases,",
      "nor hurried by the eager pulse of promises.",
      "It is an ancient stone carved with quiet days,",
      "with honesty that asks for no applause.",
      "",
      "Take every hour you need, Zaza.",
      "Take every day, every month, every silence.",
      "I am not going anywhere;",
      "my consistency is the floor beneath your feet."
    ],
    reflection: "My vow that you will never need to rush into trusting me again. I will earn it through daily, honest actions.",
    dateTag: "The Rebuilding"
  },
  {
    id: 'the-rare-photographs',
    title: 'The Rare Constellations',
    category: 'Devotion to Zaza',
    stanzas: [
      "You have given me few images of your face,",
      "and yet the ones I keep are holy relics.",
      "I look upon your eyes and find no vanity,",
      "only the quiet dignity of someone rare and true.",
      "",
      "The world demands everything be seen and held;",
      "but I would rather love the quiet mystery of you,",
      "guarding your boundaries as sacred fences,",
      "than ask for more than you are ready to bestow."
    ],
    reflection: "Honoring the precious few photos you have shared, and cherishing your comfort above all else.",
    dateTag: "Sacred Keepsake"
  },
  {
    id: 'across-the-digital-sea',
    title: 'Across the Digital Sea',
    category: 'Distance & Patience',
    stanzas: [
      "We met as strangers across a boundless sea of light,",
      "two solitary lanterns in the digital dark.",
      "Miles between our hands, oceans between our steps,",
      "yet when your messages arrive, distance dissolves.",
      "",
      "We have never walked the same city streets,",
      "nor touched fingertips beneath an evening sky.",
      "Still, in every line you send, a universe begins,",
      "and I find home in the coordinates of your heart."
    ],
    reflection: "Remembering our beginnings online and how real an unseen connection can become.",
    dateTag: "Digital Coordinates"
  },
  {
    id: 'the-promise-of-dawn',
    title: 'The Promise of Dawn',
    category: 'Distance & Patience',
    stanzas: [
      "I will wait for the day the screen turns to air,",
      "when the miles collapse like folded parchment,",
      "when I see you face to face at last,",
      "and hear the voice I have imagined in my prayers.",
      "",
      "Until that hour arrives, I walk with open hands.",
      "No secrets between us. No hidden chambers.",
      "Only Wahb, dedicated wholly to Zaza,",
      "building a fortress where you can finally rest."
    ],
    reflection: "Looking ahead with hope and complete honesty to the future we are creating together.",
    dateTag: "The Future"
  }
];
