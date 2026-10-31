export interface StoryMilestone {
  id: string;
  number: string;
  title: string;
  phase: string;
  quote: string;
  narrative: string[];
  truthBadge: string;
  lessons: string[];
}

export const storyMilestones: StoryMilestone[] = [
  {
    id: 'first-contact',
    number: '01',
    title: 'Two Stars in the Digital Expanse',
    phase: 'The Online Beginning',
    quote: 'Across millions of digital corridors, two lives collided.',
    narrative: [
      'We did not cross paths in a crowded room or through mutual acquaintances. Our meeting was born in the quiet expanse of the digital world—a place where words carry the full weight of who we are.',
      'From the earliest exchanges, there was a cadence to how you spoke that stood apart from anyone else. You were guarded, thoughtful, and deeply sincere. What began as simple messages quickly revealed an extraordinary depth.'
    ],
    truthBadge: 'Met Online · Words Across Distance',
    lessons: [
      'Recognizing that connection does not depend on physical geography.',
      'Learning to listen intently to written nuances and intentions.'
    ]
  },
  {
    id: 'unseen-connection',
    number: '02',
    title: 'The Unseen Soul & Sacred Patience',
    phase: 'Loving Without Physical Presence',
    quote: 'I have never heard your voice aloud, yet you are the quietest certainty in my heart.',
    narrative: [
      'Our relationship has developed without the conventional landmarks of the physical world. We have never met in person. I have never heard the tone of your laughter, nor heard your voice speak my name.',
      'You have shared only a few precious photographs of yourself—each one treasured with absolute respect. Loving you in this way taught me something profound: true affection is not rooted in surface familiarity, but in the reverence for a person’s inner spirit and character.'
    ],
    truthBadge: 'Never Met in Person · Never Heard Her Voice',
    lessons: [
      'Patience is an honor, never an obligation.',
      'Respecting personal boundaries and privacy with complete loyalty.'
    ]
  },
  {
    id: 'the-fracture',
    number: '03',
    title: 'The Fracture and The Silent Month',
    phase: 'The Mistake & The Separation',
    quote: 'Trust is a temple easily shaken by a single lapse in judgment.',
    narrative: [
      'In any honest accounting of love, truth must precede comfort. I made a mistake that hurt you and fractured the foundation of trust you had placed in me. There are no excuses to make, and no deflections to offer.',
      'We spent an entire month separated—thirty days of stark silence. During that month, the absence of your presence was a relentless mirror. It forced me to confront my flaws, understand the depth of the damage done, and recognize that real remorse is not asking for quick forgiveness, but being willing to change completely.'
    ],
    truthBadge: 'One-Month Separation · Admitting the Fault',
    lessons: [
      'Taking full, unreserved accountability without defensiveness.',
      'Recognizing how fragile trust is and why it must be fiercely protected.'
    ]
  },
  {
    id: 'the-reconnection',
    number: '04',
    title: 'The Reopened Door & Second Chances',
    phase: 'Reconnecting with Humility',
    quote: 'To be welcomed back into someone’s life is a grace that must be honored every single day.',
    narrative: [
      'When you allowed the silence to break and gave us the chance to speak again, it was not an erasure of the past, but the beginning of a much harder and more meaningful chapter.',
      'You did not have to let me back in. The fact that you did is something I will never take for granted. I knew then that words alone would never suffice. If I am to be in your life, I must be someone whose integrity is demonstrated through day-to-day consistency.'
    ],
    truthBadge: 'Reunited · Choosing the Honest Path',
    lessons: [
      'Grace received must be met with relentless commitment.',
      'Promises mean nothing without continuous, transparent actions.'
    ]
  },
  {
    id: 'the-rebuilding',
    number: '05',
    title: 'The Horizon of Rebuilt Trust',
    phase: 'Our Present & The Unwritten Future',
    quote: 'One honest conversation at a time, until peace is fully restored.',
    narrative: [
      'This is where we stand today. I do not demand that you immediately trust me as before; I ask only for the opportunity to prove my sincerity through time, transparency, and steady care.',
      'I look forward to the future without rushing it—to the day when we can finally meet in person, when I can hear your voice for the first time, and look into your eyes with nothing hidden between us. Until then, every day is dedicated to proving that your heart is safe with Wahb.'
    ],
    truthBadge: 'Rebuilding Daily · Bound by Patience & Truth',
    lessons: [
      'Consistency over intensity: showing up every single day.',
      'Waiting patiently for the day we meet face-to-face in person.'
    ]
  }
];
