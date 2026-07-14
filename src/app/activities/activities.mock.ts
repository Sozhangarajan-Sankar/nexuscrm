import { Activity } from './activity.model';

export const ACTIVITIES: Activity[] = [
  {
    id: 1,
    type: 'call',
    subject: 'Call with James Wilson',
    description: 'Discussed enterprise package pricing and implementation timeline.',
    relatedTo: { type: 'customer', id: 1 },
    performedBy: 1,
    createdAt: new Date('2024-07-15T10:30:00')
  },
  {
    id: 2,
    type: 'email',
    subject: 'Proposal sent to Globex',
    description: 'Sent SaaS subscription proposal with custom pricing.',
    relatedTo: { type: 'deal', id: 2 },
    performedBy: 2,
    createdAt: new Date('2024-07-14T14:00:00')
  },
  {
    id: 3,
    type: 'meeting',
    subject: 'Acme Corp - Contract Review',
    description: 'Met with legal team to review contract terms.',
    relatedTo: { type: 'customer', id: 1 },
    performedBy: 1,
    createdAt: new Date('2024-07-13T11:00:00')
  },
  {
    id: 4,
    type: 'note',
    subject: 'Initech - Technical Requirements',
    description: 'Noted requirements for startup plan. Need cloud hosting and API access.',
    relatedTo: { type: 'customer', id: 3 },
    performedBy: 3,
    createdAt: new Date('2024-07-12T09:00:00')
  },
  {
    id: 5,
    type: 'task',
    subject: 'Task completed: Review Globex proposal',
    description: 'Final review completed and proposal sent.',
    relatedTo: { type: 'deal', id: 2 },
    performedBy: 2,
    createdAt: new Date('2024-07-14T16:00:00')
  },
  {
    id: 6,
    type: 'deal',
    subject: 'Deal closed: Umbrella Corp Marketing Suite',
    description: 'Contract signed. Implementation starting next week.',
    relatedTo: { type: 'deal', id: 4 },
    performedBy: 2,
    createdAt: new Date('2024-06-01T15:00:00')
  },
  {
    id: 7,
    type: 'invoice',
    subject: 'Invoice INV-2024-0001 paid',
    description: 'Acme Corp paid invoice in full.',
    relatedTo: { type: 'invoice', id: 1 },
    performedBy: 1,
    createdAt: new Date('2024-04-10T12:00:00')
  },
  {
    id: 8,
    type: 'call',
    subject: 'Call with Linda Martinez',
    description: 'Follow-up on proposal feedback. She has some questions on pricing.',
    relatedTo: { type: 'customer', id: 2 },
    performedBy: 2,
    createdAt: new Date('2024-07-11T10:00:00')
  },
  {
    id: 9,
    type: 'email',
    subject: 'Cyberdyne - Technical specs sent',
    description: 'Sent detailed technical specifications for AI integration.',
    relatedTo: { type: 'deal', id: 6 },
    performedBy: 3,
    createdAt: new Date('2024-07-10T13:00:00')
  },
  {
    id: 10,
    type: 'meeting',
    subject: 'MegaCorp - Initial Discovery',
    description: 'Discovery meeting with MegaCorp IT team. Identified key requirements.',
    relatedTo: { type: 'deal', id: 14 },
    performedBy: 1,
    createdAt: new Date('2024-07-09T14:00:00')
  },
  {
    id: 11,
    type: 'note',
    subject: 'Massive Dynamic - Pricing notes',
    description: 'Need executive approval for 15% discount on enterprise deal.',
    relatedTo: { type: 'deal', id: 10 },
    performedBy: 1,
    createdAt: new Date('2024-07-08T11:00:00')
  },
  {
    id: 12,
    type: 'call',
    subject: 'Call with Michelle Wright',
    description: 'Onboarding call. Discussed implementation timeline.',
    relatedTo: { type: 'customer', id: 18 },
    performedBy: 3,
    createdAt: new Date('2024-07-07T15:00:00')
  },
  {
    id: 13,
    type: 'email',
    subject: 'Nimbus Data - Follow-up',
    description: 'Sent follow-up email with additional information.',
    relatedTo: { type: 'customer', id: 12 },
    performedBy: 3,
    createdAt: new Date('2024-07-06T09:00:00')
  },
  {
    id: 14,
    type: 'task',
    subject: 'Task completed: Send invoice to LexCorp',
    description: 'Invoice sent and acknowledged.',
    relatedTo: { type: 'invoice', id: 3 },
    performedBy: 1,
    createdAt: new Date('2024-07-12T17:00:00')
  },
  {
    id: 15,
    type: 'deal',
    subject: 'Deal won: DataLake IO Data Pipeline',
    description: 'Closed deal. Implementation to begin immediately.',
    relatedTo: { type: 'deal', id: 15 },
    performedBy: 3,
    createdAt: new Date('2024-06-22T10:00:00')
  },
  {
    id: 16,
    type: 'invoice',
    subject: 'Invoice INV-2024-0005 overdue',
    description: 'Payment overdue for Globex subscription.',
    relatedTo: { type: 'invoice', id: 5 },
    performedBy: 2,
    createdAt: new Date('2024-06-02T08:00:00')
  },
  {
    id: 17,
    type: 'call',
    subject: 'Call with Thomas Harris',
    description: 'Introductory call. Discussed their needs and timeline.',
    relatedTo: { type: 'customer', id: 11 },
    performedBy: 1,
    createdAt: new Date('2024-07-05T11:00:00')
  },
  {
    id: 18,
    type: 'meeting',
    subject: 'Team standup - Weekly sync',
    description: 'Weekly team sync. Reviewed pipeline and targets.',
    performedBy: 2,
    createdAt: new Date('2024-07-15T09:00:00')
  },
  {
    id: 19,
    type: 'note',
    subject: 'Sprockets - Follow-up strategy',
    description: 'Plan to follow up with demo after initial contact.',
    relatedTo: { type: 'customer', id: 14 },
    performedBy: 1,
    createdAt: new Date('2024-07-04T14:00:00')
  },
  {
    id: 20,
    type: 'email',
    subject: 'WayneCorp - Proposal sent',
    description: 'Sent logistics platform proposal.',
    relatedTo: { type: 'deal', id: 7 },
    performedBy: 2,
    createdAt: new Date('2024-07-03T16:00:00')
  },
  {
    id: 21,
    type: 'call',
    subject: 'Call with Rachel Adams',
    description: 'Initial call. Partner introduction. Set up meeting for next week.',
    relatedTo: { type: 'customer', id: 20 },
    performedBy: 1,
    createdAt: new Date('2024-07-02T10:00:00')
  },
  {
    id: 22,
    type: 'task',
    subject: 'Task completed: Call Nimbus Data follow-up',
    description: 'Follow-up call completed successfully.',
    relatedTo: { type: 'customer', id: 12 },
    performedBy: 3,
    createdAt: new Date('2024-07-14T12:00:00')
  },
  {
    id: 23,
    type: 'meeting',
    subject: 'LexCorp - Implementation Review',
    description: 'Reviewed implementation progress with LexCorp team.',
    relatedTo: { type: 'customer', id: 8 },
    performedBy: 1,
    createdAt: new Date('2024-07-01T13:00:00')
  },
  {
    id: 24,
    type: 'note',
    subject: 'Frobozz - Deal notes',
    description: 'Small but smooth deal. Great customer experience.',
    relatedTo: { type: 'customer', id: 13 },
    performedBy: 2,
    createdAt: new Date('2024-06-11T09:00:00')
  },
  {
    id: 25,
    type: 'deal',
    subject: 'Deal lost: Stark Industries Renewal',
    description: 'Lost to competitor due to budget constraints.',
    relatedTo: { type: 'deal', id: 5 },
    performedBy: 1,
    createdAt: new Date('2024-04-15T17:00:00')
  }
];
