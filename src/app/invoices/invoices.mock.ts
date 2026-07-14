import { Invoice } from './invoice.model';

export const INVOICES: Invoice[] = [
  {
    id: 1,
    invoiceNumber: 'INV-2024-0001',
    customerId: 1,
    items: [
      { description: 'Enterprise License - Q2', quantity: 1, rate: 50000, amount: 50000 },
      { description: 'Implementation Services', quantity: 40, rate: 150, amount: 6000 },
      { description: 'Training & Onboarding', quantity: 2, rate: 2000, amount: 4000 }
    ],
    subtotal: 60000,
    tax: 6000,
    total: 66000,
    status: 'paid',
    dueDate: new Date('2024-04-15'),
    notes: 'Paid in full.',
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-04-10')
  },
  {
    id: 2,
    invoiceNumber: 'INV-2024-0002',
    customerId: 4,
    items: [
      { description: 'Marketing Suite License', quantity: 1, rate: 24000, amount: 24000 },
      { description: 'Setup Fee', quantity: 1, rate: 5000, amount: 5000 }
    ],
    subtotal: 29000,
    tax: 2900,
    total: 31900,
    status: 'paid',
    dueDate: new Date('2024-05-01'),
    notes: '',
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date('2024-04-28')
  },
  {
    id: 3,
    invoiceNumber: 'INV-2024-0003',
    customerId: 8,
    items: [
      { description: 'Infrastructure License - Annual', quantity: 1, rate: 60000, amount: 60000 },
      { description: 'Professional Services', quantity: 80, rate: 175, amount: 14000 },
      { description: 'Hardware Setup', quantity: 1, rate: 8000, amount: 8000 },
      { description: 'Support Package - Gold', quantity: 1, rate: 12000, amount: 12000 }
    ],
    subtotal: 94000,
    tax: 9400,
    total: 103400,
    status: 'sent',
    dueDate: new Date('2024-07-30'),
    notes: 'Awaiting payment.',
    createdAt: new Date('2024-06-15'),
    updatedAt: new Date('2024-06-15')
  },
  {
    id: 4,
    invoiceNumber: 'INV-2024-0004',
    customerId: 6,
    items: [
      { description: 'Consulting Services - Phase 1', quantity: 60, rate: 200, amount: 12000 },
      { description: 'Software License', quantity: 1, rate: 15000, amount: 15000 }
    ],
    subtotal: 27000,
    tax: 2700,
    total: 29700,
    status: 'draft',
    dueDate: new Date('2024-08-15'),
    notes: 'Draft - not sent yet.',
    createdAt: new Date('2024-07-01'),
    updatedAt: new Date('2024-07-01')
  },
  {
    id: 5,
    invoiceNumber: 'INV-2024-0005',
    customerId: 2,
    items: [
      { description: 'SaaS Subscription - Monthly', quantity: 3, rate: 3000, amount: 9000 },
      { description: 'Premium Support', quantity: 3, rate: 1000, amount: 3000 }
    ],
    subtotal: 12000,
    tax: 1200,
    total: 13200,
    status: 'overdue',
    dueDate: new Date('2024-06-01'),
    notes: 'Past due. Send reminder.',
    createdAt: new Date('2024-05-01'),
    updatedAt: new Date('2024-06-02')
  },
  {
    id: 6,
    invoiceNumber: 'INV-2024-0006',
    customerId: 13,
    items: [
      { description: 'POS System License', quantity: 1, rate: 8000, amount: 8000 },
      { description: 'Installation', quantity: 1, rate: 2000, amount: 2000 }
    ],
    subtotal: 10000,
    tax: 1000,
    total: 11000,
    status: 'paid',
    dueDate: new Date('2024-07-01'),
    notes: 'Paid on time.',
    createdAt: new Date('2024-06-10'),
    updatedAt: new Date('2024-06-28')
  },
  {
    id: 7,
    invoiceNumber: 'INV-2024-0007',
    customerId: 9,
    items: [
      { description: 'Analytics Platform - Starter', quantity: 1, rate: 12000, amount: 12000 },
      { description: 'Data Migration', quantity: 20, rate: 150, amount: 3000 },
      { description: 'Team Training', quantity: 1, rate: 3500, amount: 3500 }
    ],
    subtotal: 18500,
    tax: 1850,
    total: 20350,
    status: 'draft',
    dueDate: new Date('2024-09-01'),
    notes: '',
    createdAt: new Date('2024-07-05'),
    updatedAt: new Date('2024-07-05')
  },
  {
    id: 8,
    invoiceNumber: 'INV-2024-0008',
    customerId: 18,
    items: [
      { description: 'Data Pipeline License', quantity: 1, rate: 18000, amount: 18000 },
      { description: 'Integration Services', quantity: 30, rate: 200, amount: 6000 }
    ],
    subtotal: 24000,
    tax: 2400,
    total: 26400,
    status: 'sent',
    dueDate: new Date('2024-08-01'),
    notes: 'Net 30 terms.',
    createdAt: new Date('2024-07-01'),
    updatedAt: new Date('2024-07-01')
  },
  {
    id: 9,
    invoiceNumber: 'INV-2024-0009',
    customerId: 11,
    items: [
      { description: 'Enterprise License - Initial', quantity: 1, rate: 75000, amount: 75000 },
      { description: 'Custom Development', quantity: 100, rate: 180, amount: 18000 },
      { description: 'Deployment & Testing', quantity: 40, rate: 150, amount: 6000 }
    ],
    subtotal: 99000,
    tax: 9900,
    total: 108900,
    status: 'sent',
    dueDate: new Date('2024-08-30'),
    notes: 'New client setup.',
    createdAt: new Date('2024-07-10'),
    updatedAt: new Date('2024-07-10')
  },
  {
    id: 10,
    invoiceNumber: 'INV-2024-0010',
    customerId: 7,
    items: [
      { description: 'Platform License - Quarterly', quantity: 1, rate: 15000, amount: 15000 },
      { description: 'Support & Maintenance', quantity: 1, rate: 5000, amount: 5000 }
    ],
    subtotal: 20000,
    tax: 2000,
    total: 22000,
    status: 'overdue',
    dueDate: new Date('2024-06-15'),
    notes: 'Second reminder sent.',
    createdAt: new Date('2024-05-15'),
    updatedAt: new Date('2024-07-01')
  },
  {
    id: 11,
    invoiceNumber: 'INV-2024-0011',
    customerId: 17,
    items: [
      { description: 'Consulting - Digital Transformation', quantity: 120, rate: 225, amount: 27000 },
      { description: 'Software Licenses', quantity: 1, rate: 35000, amount: 35000 },
      { description: 'Project Management', quantity: 40, rate: 175, amount: 7000 }
    ],
    subtotal: 69000,
    tax: 6900,
    total: 75900,
    status: 'draft',
    dueDate: new Date('2024-10-01'),
    notes: 'Proposal stage. Draft invoice.',
    createdAt: new Date('2024-07-12'),
    updatedAt: new Date('2024-07-12')
  },
  {
    id: 12,
    invoiceNumber: 'INV-2024-0012',
    customerId: 12,
    items: [
      { description: 'Storage License - Annual', quantity: 1, rate: 24000, amount: 24000 },
      { description: 'Data Transfer Fees', quantity: 1, rate: 3500, amount: 3500 },
      { description: 'Backup Services', quantity: 1, rate: 6000, amount: 6000 },
      { description: '24/7 Support', quantity: 1, rate: 8000, amount: 8000 }
    ],
    subtotal: 41500,
    tax: 4150,
    total: 45650,
    status: 'sent',
    dueDate: new Date('2024-08-15'),
    notes: 'Sent via email.',
    createdAt: new Date('2024-07-15'),
    updatedAt: new Date('2024-07-15')
  }
];
