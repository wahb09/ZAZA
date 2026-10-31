export interface PromiseVow {
  id: string;
  num: string;
  title: string;
  vow: string;
  explanation: string;
  tag: string;
}

export const promisesList: PromiseVow[] = [
  {
    id: 'vow-truth',
    num: 'I',
    title: 'The Vow of Absolute Truth',
    vow: 'I promise to speak to you with total, unvarnished honesty—even when the truth is difficult, uncomfortable, or humbling.',
    explanation: 'A second chance is meaningless if built on anything less than transparency. You will never have to guess my intentions or wonder what lies beneath my words.',
    tag: 'Honesty as Foundation'
  },
  {
    id: 'vow-patience',
    num: 'II',
    title: 'The Vow of Infinite Patience',
    vow: 'I promise never to rush your healing or demand that trust be restored before your heart feels truly safe.',
    explanation: 'The timeline belongs entirely to you. Whether it takes months or years, my posture will remain calm, steady, and patient, free of entitlement or pressure.',
    tag: 'No Demands, Only Time'
  },
  {
    id: 'vow-boundaries',
    num: 'III',
    title: 'The Vow of Reverent Boundaries',
    vow: 'I promise to honor your comfort and boundaries, cherishing whatever you choose to share without demanding more.',
    explanation: 'From the rare photographs you share to the pacing of our conversations, your peace of mind is my priority. Your privacy is respected and protected with absolute loyalty.',
    tag: 'Reverence & Privacy'
  },
  {
    id: 'vow-consistency',
    num: 'IV',
    title: 'The Vow of Consistent Actions',
    vow: 'I promise that my remorse will be spoken through sustained daily conduct, not empty poetic declarations.',
    explanation: 'Mistakes cannot be erased with apologies; they are redeemed through reliable, continuous character. I will show you who I am through what I do, day in and day out.',
    tag: 'Living Proof'
  },
  {
    id: 'vow-steadfastness',
    num: 'V',
    title: 'The Vow of Steadfast Presence',
    vow: 'I promise that when difficult moments or doubts arise, I will not pull away, become defensive, or run into silence.',
    explanation: 'The thirty days of separation showed me how painful distance can be. In whatever storms we face, I will stand rooted with gentle humility, ready to listen and understand.',
    tag: 'Unshakable Loyalty'
  },
  {
    id: 'vow-meeting',
    num: 'VI',
    title: 'The Vow of the Future Meeting',
    vow: 'I promise to wait with an open heart for the day we meet face-to-face in person, and I finally hear your voice.',
    explanation: 'Until that day arrives, I cherish the connection we have across this digital realm. And when that day comes, I will look at you with the exact same sincerity that wrote these words.',
    tag: 'The Hope of Tomorrow'
  }
];
