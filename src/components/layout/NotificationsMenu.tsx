import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BellIcon } from 'lucide-react';
import { NOTIFICATIONS } from '../../data/governance';
import { useApp } from '../../contexts/AppContext';
import { Badge } from '../ui/Badge';
import { cx } from '../../utils/format';
import { toneFor } from '../../utils/status';

export function NotificationsMenu() {
  const { unreadCount, readIds, markAllRead, toggleRead } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-label={`Notifications, ${unreadCount} unread`}
        onClick={() => setOpen((v) => !v)}
        className="relative rounded p-1.5 text-slate-500 transition-colors duration-150 ease-erp hover:bg-slate-100 hover:text-slate-800">
        
        <BellIcon className="h-4 w-4" />
        {unreadCount > 0 &&
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-600 px-1 text-[9px] font-bold tnum text-white">
            {unreadCount}
          </span>
        }
      </button>

      {open &&
      <div className="absolute right-0 z-50 mt-1.5 w-[380px] overflow-hidden rounded border border-slate-200 bg-white shadow-overlay">
          <header className="flex items-center justify-between border-b border-slate-200 px-3 py-2">
            <p className="text-[13px] font-semibold text-slate-900">Notifications</p>
            <button
            type="button"
            onClick={markAllRead}
            className="text-xs font-medium text-brand-700 transition-colors duration-150 ease-erp hover:underline">
            
              Mark all as read
            </button>
          </header>
          <ul className="erp-scroll max-h-[380px] divide-y divide-slate-100 overflow-y-auto">
            {NOTIFICATIONS.map((n) => {
            const read = readIds.includes(n.id);
            return (
              <li key={n.id} className={cx('px-3 py-2.5', !read && 'bg-brand-50/40')}>
                  <div className="flex items-start gap-2">
                    <span
                    className={cx(
                      'mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full',
                      read ? 'bg-transparent' : 'bg-brand-600'
                    )} />
                  
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                        to={n.href}
                        onClick={() => {
                          if (!read) toggleRead(n.id);
                          setOpen(false);
                        }}
                        className="text-[13px] font-medium text-slate-900 hover:text-brand-700 hover:underline">
                        
                          {n.title}
                        </Link>
                        <Badge tone={n.priority === 'High' ? 'danger' : toneFor(n.category) === 'neutral' ? 'neutral' : 'info'}>
                          {n.category}
                        </Badge>
                      </div>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{n.body}</p>
                      <p className="mt-1 text-[11px] text-slate-400">{n.time}</p>
                    </div>
                  </div>
                </li>);

          })}
          </ul>
          <footer className="border-t border-slate-200 px-3 py-2 text-center">
            <Link
            to="/notifications"
            onClick={() => setOpen(false)}
            className="text-xs font-medium text-brand-700 hover:underline">
            
              Open notification centre
            </Link>
          </footer>
        </div>
      }
    </div>);

}