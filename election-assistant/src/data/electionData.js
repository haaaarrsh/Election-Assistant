import { UserPlus, Landmark, Mail, Vote } from 'lucide-react';

/** @type {Array<{id: string, title: string, date: string, icon: React.ElementType, description: string, details: string[]}>} */
export const ELECTION_STEPS = [
  {
    id: 'register',
    title: 'Voter Registration',
    date: 'Check local deadlines',
    icon: UserPlus,
    description: 'Ensure you are eligible to vote and registered at your current address.',
    details: [
      'Check your voter registration status online.',
      "Gather necessary ID (Driver's License, State ID, SSN).",
      'Register to vote via mail, online, or in-person.',
      'Update your address if you have moved recently.',
    ],
  },
  {
    id: 'research',
    title: 'Research Candidates & Measures',
    date: 'Weeks before election',
    icon: Landmark,
    description: 'Learn about who and what is on your ballot to make informed decisions.',
    details: [
      'Find your sample ballot on your local election website.',
      'Read non-partisan voter guides.',
      'Research candidate platforms and past voting records.',
      'Understand local propositions and ballot measures.',
    ],
  },
  {
    id: 'early-vote',
    title: 'Early or Mail-In Voting',
    date: 'Usually 2-4 weeks prior',
    icon: Mail,
    description: 'Skip the lines on Election Day by voting early or by mail if eligible.',
    details: [
      'Request an absentee or mail-in ballot before the deadline.',
      'Follow instructions carefully (signatures, witness requirements).',
      'Track your ballot online to ensure it is received.',
      'Find early voting locations and their operating hours.',
    ],
  },
  {
    id: 'election-day',
    title: 'Election Day Voting',
    date: 'First Tuesday in Nov',
    icon: Vote,
    description: 'Head to the polls. Your voice matters in shaping the future.',
    details: [
      'Confirm your specific polling location (it may have changed).',
      'Bring required identification.',
      'If you are in line when polls close, STAY IN LINE. You have the right to vote.',
      'Ask poll workers for help if you have questions or need accommodations.',
    ],
  },
];

/** @type {Record<string, string>} */
export const FAQ_DATA = {
  'How do I register to vote?':
    "You can register online, by mail, or in person at your local election office or DMV. Requirements vary by state, so check your Secretary of State's website.",
  'What ID do I need?':
    "Voter ID laws vary by state. Some require a photo ID (like a driver's license or passport), while others accept utility bills or bank statements. Check your state's specific requirements.",
  'Where is my polling place?':
    'Your polling place is based on your residential address. You can look it up on your state or county election website, or by calling your local election office.',
  'Can I vote early?':
    'Most states offer some form of early voting or mail-in voting. Deadlines to request mail-in ballots are usually a week or two before Election Day.',
};
