import React from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon, ChevronRightIcon } from 'lucide-react';
import { cx } from '../../utils/format';

export interface WorkflowStep {
  label: string;
  state: 'done' | 'current' | 'todo' | 'blocked';
  meta?: string;
  to?: string;
}

interface WorkflowStepperProps {
  steps: WorkflowStep[];
  className?: string;
  compact?: boolean;
}

export function WorkflowStepper({ steps, className, compact }: WorkflowStepperProps) {
  return (
    <ol className={cx('erp-scroll flex min-w-max items-center gap-1 overflow-x-auto', className)}>
      {steps.map((step, i) => {
        const content =
        <span
          className={cx(
            'inline-flex items-center gap-1.5 rounded border px-2.5 py-1.5 text-xs font-medium transition-colors duration-150 ease-erp',
            step.state === 'done' && 'border-emerald-200 bg-emerald-50 text-emerald-800',
            step.state === 'current' && 'border-brand-600 bg-brand-700 text-white',
            step.state === 'todo' && 'border-slate-200 bg-white text-slate-500',
            step.state === 'blocked' && 'border-red-200 bg-red-50 text-red-700',
            step.to && 'hover:brightness-95'
          )}>
          
            {step.state === 'done' ?
          <CheckIcon className="h-3 w-3" /> :

          <span
            className={cx(
              'inline-flex h-3.5 w-3.5 items-center justify-center rounded-full text-[9px] font-bold tnum',
              step.state === 'current' ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500'
            )}>
            
                {i + 1}
              </span>
          }
            {step.label}
            {!compact && step.meta &&
          <span className={cx('font-normal', step.state === 'current' ? 'text-white/70' : 'text-slate-400')}>
                · {step.meta}
              </span>
          }
          </span>;

        return (
          <li key={step.label} className="flex items-center gap-1">
            {step.to ? <Link to={step.to}>{content}</Link> : content}
            {i < steps.length - 1 && <ChevronRightIcon className="h-3.5 w-3.5 shrink-0 text-slate-300" />}
          </li>);

      })}
    </ol>);

}