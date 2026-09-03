import React from 'react';
import { cx } from '../../utils/format';
import type { Tone } from '../../types/erp';
import { TONE_DOT } from '../../utils/status';

export interface TimelineEvent {
  id: string;
  title: string;
  detail?: string;
  actor?: string;
  at: string;
  tone?: Tone;
}

export function Timeline({ events, className }: {events: TimelineEvent[];className?: string;}) {
  return (
    <ol className={cx('relative', className)}>
      {events.map((e, i) =>
      <li key={e.id} className="relative flex gap-3 pb-4 last:pb-0">
          <div className="relative flex flex-col items-center">
            <span className={cx('mt-1 h-2 w-2 shrink-0 rounded-full ring-4 ring-white', TONE_DOT[e.tone ?? 'neutral'])} />
            {i < events.length - 1 && <span className="mt-0.5 w-px flex-1 bg-slate-200" />}
          </div>
          <div className="min-w-0 flex-1 -mt-0.5">
            <p className="text-[13px] font-medium text-slate-800">{e.title}</p>
            {e.detail && <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{e.detail}</p>}
            <p className="mt-0.5 text-[11px] text-slate-400">
              {e.actor && <span className="font-medium text-slate-500">{e.actor}</span>}
              {e.actor && ' · '}
              {e.at}
            </p>
          </div>
        </li>
      )}
    </ol>);

}