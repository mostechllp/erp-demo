import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlertIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useApp } from '../../contexts/AppContext';

export function Forbidden() {
  const { role } = useApp();
  return (
    <div className="flex min-h-full items-center justify-center p-10">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded border border-amber-200 bg-amber-50">
          <ShieldAlertIcon className="h-5 w-5 text-amber-600" />
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">Error 403</p>
        <h1 className="mt-1 text-lg font-semibold text-slate-900">You do not have permission for this module</h1>
        <p className="mt-2 text-[13px] text-slate-500">
          Your role <span className="font-medium text-slate-700">{role.name}</span> covers {role.scope.toLowerCase()}.
          Ask an administrator to grant access, or switch to a role that includes it.
        </p>
        <div className="mt-5 flex justify-center gap-2">
          <Link to="/dashboard">
            <Button variant="primary">Return to dashboard</Button>
          </Link>
          <Link to="/admin/roles">
            <Button>Review permissions</Button>
          </Link>
        </div>
      </div>
    </div>);

}