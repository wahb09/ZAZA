export interface LittleThingItem {
  id: string;
  iconType: 'sparkle' | 'camera' | 'message' | 'mic' | 'heart' | 'moon' | 'shield' | 'feather';
  title: string;
  subtitle: string;
  description: string;
  personalThought: string;
}

export const initialLittleThings: LittleThingItem[] = [
  {
    id: 'rare-photos',
    iconType: 'camera',
    title: 'The Rare Photographs',
    subtitle: 'Sacred Glimpses in the Dark',
    description: 'You have only ever shared a handful of pictures of yourself. Because they are so few, each one is an invaluable treasure that I preserve with profound reverence.',
    personalThought: 'I never pressure you for more, because seeing even a single glimpse of your eyes reminds me of the pure soul I am striving to be worthy of.'
  },
  {
    id: 'unheard-voice',
    iconType: 'mic',
    title: 'The Anticipation of Your Voice',
    subtitle: 'A Song Yet to Be Heard',
    description: 'I have never heard the sound of your voice or the cadence of your laughter. Imagining how it might sound is one of my sweetest, quietest meditations.',
    personalThought: 'I do not rush that day. When you finally decide to speak or send a voice note, it will feel like listening to rain after a lifetime of drought.'
  },
  {
    id: 'texting-cadence',
    iconType: 'message',
    title: 'The Way You Write',
    subtitle: 'Thoughtful Nuances Across Screens',
    description: 'The way you choose your words—never careless, never flippant. Even when you are tired or reserved, your honesty shines through every single sentence.',
    personalThought: 'In a world of noise, your written messages have a gentle, calming gravity that grounds me whenever my mind wanders.'
  },
  {
    id: 'second-chance-grace',
    iconType: 'shield',
    title: 'Your Quiet Grace After the Separation',
    subtitle: 'The Greatest Gift Received',
    description: 'After the month of separation caused by my mistake, you chose to give this bond another chance. That grace is the foundation of everything I do today.',
    personalThought: 'You could have turned away forever. The fact that you let me back in is something I will spend every tomorrow honoring.'
  },
  {
    id: 'digital-presence',
    iconType: 'sparkle',
    title: 'Your Glowing Status Dot',
    subtitle: 'Comfort in Shared Time',
    description: 'Knowing that you are somewhere in the world, looking at the same digital screen, breathing under the same night sky.',
    personalThought: 'Even when we do not speak for hours, just knowing you are there brings an inexplicable peace to my life.'
  },
  {
    id: 'quiet-goodnights',
    iconType: 'moon',
    title: 'The Simple Goodnight',
    subtitle: 'A Peaceful Horizon',
    description: 'When the night ends with a simple, honest sign-off from you, the entire world feels settled and secure.',
    personalThought: 'It is a reminder that no matter the physical miles separating us, we conclude our days together in spirit.'
  },
  {
    id: 'unwavering-dignity',
    iconType: 'feather',
    title: 'Your Inner Dignity',
    subtitle: 'A Character That Inspires',
    description: 'You are someone who respects yourself, who holds healthy boundaries, and who demands truth. That standard makes me want to be the best version of myself.',
    personalThought: 'You do not accept false promises, and that is why earning your trust is the highest honor of my life.'
  },
  {
    id: 'the-online-sanctuary',
    iconType: 'heart',
    title: 'Our World Built of Words',
    subtitle: 'No Pretenses, Pure Mind',
    description: 'Without physical distractions, our connection was built purely through mind, emotion, and shared values. That makes our bond uniquely resilient.',
    personalThought: 'One day we will stand in the same room, but our foundation will always be the truth we forged in these quiet hours.'
  }
];
