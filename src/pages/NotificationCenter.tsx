import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCheckIcon } from 'lucide-react';
import { PageHeader } from '../components/patterns/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { useToast } from '../contexts/ToastContext';
import { NOTIFICATIONS } from '../data/governance';
import { toneFor } from '../utils/status';
import { cx } from '../utils/format';

const TABS = [
{ id: 'all', label: 'All' },
{ id: 'unread', label: 'Unread' },
{ id: 'approval', label: 'Approvals' },
{ id: 'finance', label: 'Finance' },
{ id: 'inventory', label: 'Inventory' },
{ id: 'production', label: 'Production' },
{ id: 'workshop', label: 'Workshop' },
{ id: 'projects', label: 'Projects' },
{ id: 'hr', label: 'HR' }];


export function NotificationCenter() {
  const { push } = useToast();
  const [tab, setTab] = useState('all');
  const [read, setRead] = useState<string[]>(NOTIFICATIONS.filter((n) => n.read).map((n) => n.id));

  const isRead = (id: string) => read.includes(id);
  const visible = NOTIFICATIONS.filter((n) => {
    if (tab === 'all') return true;
    if (tab === 'unread') return !isRead(n.id);
    return n.category.toLowerCase() === tab;
  });

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader
        title="Notifications"
        crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Notifications' }]}
        description="Approval requests, exceptions and system events across every module."
        meta={<Badge tone="brand">{NOTIFICATIONS.filter((n) => !isRead(n.id)).length} unread</Badge>}
        actions={
        <Button
          icon={CheckCheckIcon}
          onClick={() => {
            setRead(NOTIFICATIONS.map((n) => n.id));
            push({ tone: 'success', title: 'All notifications marked as read' });
          }}>
          
            Mark all as read
          </Button>
        }
        tabs={<Tabs tabs={TABS} active={tab} onChange={setTab} />} />
      

      <div className="flex-1 p-6">
        <Card padded={false}>
          {visible.length === 0 ?
          <EmptyState title="Nothing here" description="You have no notifications in this category." /> :

          <ul className="divide-y divide-slate-100">
              {visible.map((n) =>
            <li key={n.id} className={cx('flex items-start gap-3 px-4 py-3', !isRead(n.id) && 'bg-brand-50/40')}>
                  <span
                aria-hidden
                className={cx(
                  'mt-1.5 h-2 w-2 shrink-0 rounded-full',
                  isRead(n.id) ? 'bg-slate-300' : 'bg-brand-600'
                )} />
              
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className={cx('text-[13px]', isRead(n.id) ? 'text-slate-700' : 'font-semibold text-slate-900')}>
                        {n.title}
                      </p>
                      <Badge tone={toneFor(n.priority)}>{n.priority}</Badge>
                      <Badge tone="neutral">{n.category}</Badge>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-500">{n.body}</p>
                    <div className="mt-1.5 flex items-center gap-3 text-xs">
                      <span className="text-slate-400">{n.time}</span>
                      <span className="font-mono text-slate-400">{n.record}</span>
                      <Link to={n.href} className="font-medium text-brand-700 hover:underline">
                        Open record
                      </Link>
                      {!isRead(n.id) &&
                  <button
                    type="button"
                    className="text-slate-500 hover:text-slate-800"
                    onClick={() => setRead((prev) => [...prev, n.id])}>
                    
                          Mark as read
                        </button>
                  }
                    </div>
                  </div>
                </li>
            )}
            </ul>
          }
        </Card>
      </div>
    </div>);

}