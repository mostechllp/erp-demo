import type { Tone } from '../types/erp';

const MAP: Record<string, Tone> = {
  // generic
  active: 'success',
  approved: 'success',
  completed: 'success',
  closed: 'neutral',
  delivered: 'success',
  received: 'info',
  paid: 'success',
  posted: 'success',
  accepted: 'success',
  passed: 'success',
  ready: 'success',
  confirmed: 'success',
  'fully received': 'success',
  reconciled: 'success',
  invoiced: 'info',

  draft: 'neutral',
  inactive: 'neutral',
  archived: 'neutral',
  planned: 'neutral',
  new: 'neutral',
  unassigned: 'neutral',

  pending: 'warning',
  'pending approval': 'warning',
  'awaiting approval': 'warning',
  submitted: 'warning',
  'on hold': 'warning',
  paused: 'warning',
  'waiting for parts': 'warning',
  'partially received': 'warning',
  'partially delivered': 'warning',
  'partially paid': 'warning',
  returned: 'warning',
  'low stock': 'warning',
  'material shortage': 'warning',
  probation: 'warning',
  'quality check': 'warning',
  inspection: 'warning',
  scheduled: 'warning',

  rejected: 'danger',
  cancelled: 'danger',
  overdue: 'danger',
  delayed: 'danger',
  failed: 'danger',
  'out of stock': 'danger',
  blocked: 'danger',
  'over budget': 'danger',
  urgent: 'danger',
  critical: 'danger',

  'in progress': 'info',
  processing: 'info',
  released: 'info',
  sent: 'info',
  'sent to supplier': 'info',
  'in transit': 'info',
  dispatched: 'info',
  packed: 'info',
  'out for delivery': 'info',
  assigned: 'info',
  open: 'info',
  qualified: 'info',
  'on leave': 'info',
  'in review': 'info'
};

export function toneFor(status: string): Tone {
  return MAP[status.trim().toLowerCase()] ?? 'neutral';
}

export const TONE_CLASSES: Record<Tone, string> = {
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  warning: 'bg-amber-50 text-amber-800 ring-amber-600/20',
  danger: 'bg-red-50 text-red-700 ring-red-600/20',
  info: 'bg-sky-50 text-sky-700 ring-sky-600/20',
  neutral: 'bg-slate-100 text-slate-600 ring-slate-500/20',
  brand: 'bg-brand-50 text-brand-700 ring-brand-600/20'
};

export const TONE_DOT: Record<Tone, string> = {
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
  info: 'bg-sky-500',
  neutral: 'bg-slate-400',
  brand: 'bg-brand-600'
};