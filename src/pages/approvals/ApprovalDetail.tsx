import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CheckIcon, CornerUpLeftIcon, PaperclipIcon, XIcon } from 'lucide-react';
import { PageHeader } from '../../components/patterns/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { DefinitionList } from '../../components/patterns/DefinitionList';
import { Timeline } from '../../components/patterns/Timeline';
import { ConfirmDialog } from '../../components/patterns/ConfirmDialog';
import { RecordLink } from '../../components/patterns/RecordLink';
import { NotFound } from '../errors/NotFound';
import { useToast } from '../../contexts/ToastContext';
import { APPROVALS } from '../../data/governance';
import { currency, shortDate } from '../../utils/format';
import { toneFor } from '../../utils/status';
import type { Tone } from '../../types/erp';

const STATE_TONE: Record<string, Tone> = {
  Approved: 'success',
  Pending: 'warning',
  Waiting: 'neutral',
  Rejected: 'danger',
  Returned: 'info'
};

const RECORD_LINKS: Record<string, string> = {
  Procurement: '/procurement/orders',
  Sales: '/sales/orders',
  HR: '/hr/leave',
  Inventory: '/inventory/adjustments',
  Finance: '/finance/expenses',
  Projects: '/projects',
  Production: '/production/work-orders'
};

export function ApprovalDetail() {
  const { id } = useParams();
  const { push } = useToast();
  const [confirm, setConfirm] = useState<'approve' | 'reject' | null>(null);
  const [comment, setComment] = useState('');
  const request = APPROVALS.find((a) => a.id === id);

  if (!request) return <NotFound />;

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader
        title={request.title}
        crumbs={[
        { label: 'Home', to: '/dashboard' },
        { label: 'Workflow & Approvals', to: '/approvals' },
        { label: request.id }]
        }
        meta={
        <>
            <span className="font-mono text-xs text-slate-500">{request.id}</span>
            <StatusBadge status={request.status} />
            <Badge tone={toneFor(request.priority)}>{request.priority}</Badge>
          </>
        }
        description={`${request.type} · raised by ${request.requester} (${request.department}) on ${shortDate(request.date)}`}
        actions={
        <>
            <Button icon={CornerUpLeftIcon} disabled={request.status !== 'Pending'}>
              Send back
            </Button>
            <Button icon={XIcon} disabled={request.status !== 'Pending'} onClick={() => setConfirm('reject')}>
              Reject
            </Button>
            <Button variant="primary" icon={CheckIcon} disabled={request.status !== 'Pending'} onClick={() => setConfirm('approve')}>
              Approve
            </Button>
          </>
        } />
      

      <div className="flex-1 space-y-4 p-6">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <Card title="Request information">
              <DefinitionList
                columns={3}
                items={[
                { label: 'Request type', value: request.type },
                { label: 'Source module', value: request.module },
                {
                  label: 'Linked record',
                  value:
                  <RecordLink to={RECORD_LINKS[request.module] ?? '/dashboard'}>{request.record}</RecordLink>

                },
                { label: 'Requester', value: request.requester },
                { label: 'Department', value: request.department },
                { label: 'Raised on', value: shortDate(request.date) },
                { label: 'Amount', value: request.amount === 0 ? '—' : currency(request.amount) },
                { label: 'Priority', value: request.priority },
                { label: 'Current level', value: `Level ${request.currentLevel} of ${request.levels.length}` },
                { label: 'Justification', value: request.summary, full: true }]
                } />
              
            </Card>

            <Card title="Approval levels" padded={false}>
              <table className="w-full text-[13px]">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                  <tr>
                    {['Level', 'Role', 'Approver', 'Decision', 'When', 'Note'].map((h) =>
                    <th key={h} className="px-4 py-2 text-left font-semibold">
                        {h}
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {request.levels.map((l) =>
                  <tr key={l.level} className={l.state === 'Pending' ? 'bg-amber-50/50' : 'hover:bg-slate-50'}>
                      <td className="px-4 py-2.5 tnum text-slate-500">L{l.level}</td>
                      <td className="px-4 py-2.5 font-medium text-slate-900">{l.role}</td>
                      <td className="px-4 py-2.5">{l.approver}</td>
                      <td className="px-4 py-2.5">
                        <Badge tone={STATE_TONE[l.state] ?? 'neutral'}>{l.state}</Badge>
                      </td>
                      <td className="px-4 py-2.5 text-slate-500">{l.at ?? '—'}</td>
                      <td className="max-w-[280px] px-4 py-2.5 text-slate-600">{l.note ?? '—'}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Card>

            <Card title="Add a comment">
              <Input
                label="Comment"
                placeholder="Add context for the requester or the next approver…"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                hint="Comments are visible to the requester and every approver in this chain." />
              
              <div className="mt-3 flex items-center gap-2">
                <Button
                  variant="primary"
                  onClick={() => {
                    push({ tone: 'success', title: 'Comment added', description: `Visible on ${request.id}.` });
                    setComment('');
                  }}
                  disabled={!comment.trim()}>
                  
                  Post comment
                </Button>
                <Button icon={PaperclipIcon}>Attach file</Button>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card title="Attachments">
              <ul className="divide-y divide-slate-100 text-[13px]">
                {[
                [`${request.record} document.pdf`, '412 KB'],
                ['Supporting quotation.pdf', '288 KB'],
                ['Budget justification.xlsx', '96 KB']].
                map(([name, size]) =>
                <li key={name} className="flex items-center justify-between py-2.5">
                    <span className="inline-flex items-center gap-2 text-slate-800">
                      <PaperclipIcon className="h-3.5 w-3.5 text-slate-400" />
                      {name}
                    </span>
                    <span className="text-xs text-slate-400">{size}</span>
                  </li>
                )}
              </ul>
            </Card>

            <Card title="Approval history">
              <Timeline
                events={[
                ...request.levels.
                filter((l) => l.state !== 'Waiting' && l.state !== 'Pending').
                map((l) => ({
                  id: `l${l.level}`,
                  title: `${l.state} at level ${l.level} — ${l.role}`,
                  detail: l.note,
                  actor: l.approver,
                  at: l.at ?? '',
                  tone: (l.state === 'Approved' ? 'success' : l.state === 'Rejected' ? 'danger' : 'info') as Tone
                })),
                {
                  id: 'raised',
                  title: 'Request submitted for approval',
                  detail: `${request.type} · ${request.record}`,
                  actor: request.requester,
                  at: shortDate(request.date),
                  tone: 'brand' as Tone
                }]
                } />
              
            </Card>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirm === 'approve'}
        onClose={() => setConfirm(null)}
        title={`Approve ${request.id}?`}
        description={`This records your approval at level ${request.currentLevel} and routes the request to the next approver.`}
        confirmLabel="Approve request"
        onConfirm={() => {
          setConfirm(null);
          push({ tone: 'success', title: `${request.id} approved`, description: 'Routed to the next approval level.' });
        }} />
      

      <ConfirmDialog
        open={confirm === 'reject'}
        onClose={() => setConfirm(null)}
        title={`Reject ${request.id}?`}
        description="The requester will be notified and the source document returns to draft. This cannot be undone."
        confirmLabel="Reject request"
        tone="danger"
        onConfirm={() => {
          setConfirm(null);
          push({ tone: 'danger', title: `${request.id} rejected`, description: `${request.requester} has been notified.` });
        }} />
      
    </div>);

}