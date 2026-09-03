import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileQuestionIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-full items-center justify-center p-10">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded border border-slate-200 bg-white">
          <FileQuestionIcon className="h-5 w-5 text-slate-400" />
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">Error 404</p>
        <h1 className="mt-1 text-lg font-semibold text-slate-900">This record or page does not exist</h1>
        <p className="mt-2 text-[13px] text-slate-500">
          The document may have been deleted, archived, or moved to another branch you cannot access.
        </p>
        <div className="mt-5 flex justify-center gap-2">
          <Button onClick={() => navigate(-1)}>Go back</Button>
          <Link to="/dashboard">
            <Button variant="primary">Return to dashboard</Button>
          </Link>
        </div>
      </div>
    </div>);

}