import React from 'react';
import { DownloadIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { AUDIT_LOG } from '../../data/governance';
import type { AuditEntry, Tone } from '../../types/erp';

const ACTION_TONE: Record<string, Tone> = {
  Approve: 'success',
  Reject: 'danger',
  Create: 'brand',
  Update: 'info',
  Post: 'neutral'
};

export function AuditLogs() {
  return (
    <ListPage<AuditEntry>
      title="Audit Logs"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Administration' }, { label: 'Audit Logs' }]}
      description="Immutable record of every create, update, approval and posting across the system."
      actions={
      <Button variant="primary" icon={DownloadIcon}>
          Export log
        </Button>
      }
      rows={AUDIT_LOG}
      rowKey={(a) => a.id}
      searchText={(a) => `${a.id} ${a.user} ${a.module} ${a.action} ${a.record} ${a.description}`}
      dense
      statusTabs={[
      { id: 'all', label: 'All activity', match: () => true },
      { id: 'approvals', label: 'Approvals', match: (a) => ['Approve', 'Reject'].includes(a.action) },
      { id: 'creates', label: 'Created records', match: (a) => a.action === 'Create' },
      { id: 'system', label: 'System', match: (a) => a.user === 'System' }]
      }
      filters={[
      { id: 'module', label: 'Module', options: [...new Set(AUDIT_LOG.map((a) => a.module))] },
      { id: 'user', label: 'User', options: [...new Set(AUDIT_LOG.map((a) => a.user))] },
      { id: 'action', label: 'Action', options: [...new Set(AUDIT_LOG.map((a) => a.action))] }]
      }
      filterValue={(a, id) => id === 'module' ? a.module : id === 'user' ? a.user : a.action}
      columns={[
      { key: 'at', header: 'Date & time', render: (a) => <span className="tnum text-slate-600">{a.at}</span>, sortValue: (a) => a.at },
      { key: 'user', header: 'User', render: (a) => <span className="font-medium text-slate-900">{a.user}</span>, sortValue: (a) => a.user },
      { key: 'module', header: 'Module', render: (a) => a.module, sortValue: (a) => a.module },
      { key: 'action', header: 'Action', render: (a) => <Badge tone={ACTION_TONE[a.action] ?? 'neutral'}>{a.action}</Badge> },
      { key: 'record', header: 'Record', render: (a) => <span className="font-mono text-xs text-brand-700">{a.record}</span> },
      { key: 'ip', header: 'IP address', render: (a) => <span className="font-mono text-xs text-slate-500">{a.ip}</span>, optional: true },
      { key: 'description', header: 'Description', render: (a) => <span className="text-slate-600">{a.description}</span> }]
      } />);


}