import React, { useState } from 'react';
import { CheckIcon, PlusIcon, SaveIcon } from 'lucide-react';
import { PageHeader } from '../../components/patterns/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { useToast } from '../../contexts/ToastContext';
import { PERMISSION_ACTIONS, PERMISSION_MATRIX, PERMISSION_MODULES, ROLE_LIST, USERS } from '../../data/governance';
import { cx } from '../../utils/format';

export function RolesPermissions() {
  const { push } = useToast();
  const [role, setRole] = useState('Production Manager');
  const matrix = PERMISSION_MATRIX[role];

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader
        title="Roles & Permissions"
        crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Administration' }, { label: 'Roles & Permissions' }]}
        description="Role-based access control. Permissions drive sidebar visibility, record access and approval rights."
        actions={
        <>
            <Button variant="primary" icon={PlusIcon}>
              New role
            </Button>
            <Button icon={SaveIcon} onClick={() => push({ tone: 'success', title: 'Permissions saved', description: `${role} updated.` })}>
              Save changes
            </Button>
          </>
        } />
      

      <div className="flex-1 space-y-4 p-6">
        <div className="grid gap-4 xl:grid-cols-4">
          <Card title="Roles" description={`${ROLE_LIST.length} defined`} padded={false} className="xl:col-span-1">
            <ul className="divide-y divide-slate-100">
              {ROLE_LIST.map((r) => {
                const users = USERS.filter((u) => u.role === r).length;
                const configured = !!PERMISSION_MATRIX[r];
                return (
                  <li key={r}>
                    <button
                      type="button"
                      onClick={() => configured && setRole(r)}
                      disabled={!configured}
                      className={cx(
                        'flex w-full items-center justify-between px-4 py-2.5 text-left text-[13px] transition-colors duration-150 ease-erp',
                        role === r ? 'bg-brand-50 font-semibold text-brand-800' : 'text-slate-700 hover:bg-slate-50',
                        !configured && 'cursor-not-allowed text-slate-400 hover:bg-transparent'
                      )}>
                      
                      <span className="truncate">{r}</span>
                      <span className="shrink-0 text-xs tnum text-slate-400">{users}</span>
                    </button>
                  </li>);

              })}
            </ul>
          </Card>

          <div className="space-y-4 xl:col-span-3">
            <Alert tone="info" title={`Editing permissions for ${role}`}>
              Changes apply to every user assigned this role. Revoking View also hides the module from the sidebar and
              blocks direct URL access.
            </Alert>

            <Card title="Permission matrix" description="Module against action" padded={false}>
              <div className="erp-scroll overflow-x-auto">
                <table className="w-full min-w-max text-[13px]">
                  <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold">Module</th>
                      {PERMISSION_ACTIONS.map((a) =>
                      <th key={a} className="px-4 py-2 text-center font-semibold">
                          {a}
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {PERMISSION_MODULES.map((m) =>
                    <tr key={m} className="hover:bg-slate-50">
                        <td className="px-4 py-2.5 font-medium text-slate-900">{m}</td>
                        {PERMISSION_ACTIONS.map((a) => {
                        const allowed = matrix?.[m]?.includes(a);
                        return (
                          <td key={a} className="px-4 py-2.5 text-center">
                              <span
                              className={cx(
                                'inline-flex h-5 w-5 items-center justify-center rounded border',
                                allowed ?
                                'border-emerald-200 bg-emerald-50 text-emerald-700' :
                                'border-slate-200 bg-white text-transparent'
                              )}
                              aria-label={`${m} ${a}: ${allowed ? 'allowed' : 'denied'}`}>
                              
                                <CheckIcon className="h-3 w-3" />
                              </span>
                            </td>);

                      })}
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>);

}