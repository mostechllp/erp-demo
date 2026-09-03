import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HexagonIcon, LockIcon, MailIcon, ShieldCheckIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Alert } from '../../components/ui/Alert';
import { COMPANY } from '../../data/org';

type Mode = 'login' | 'forgot' | 'reset' | 'mfa';

export function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('amara.osei@meridian-ig.com');
  const [password, setPassword] = useState('••••••••••');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = () => {
    if (!email.includes('@')) {
      setError('Enter a valid work email address.');
      return;
    }
    setError('');
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      if (mode === 'login') setMode('mfa');else
      if (mode === 'mfa') navigate('/dashboard');else
      setMode('login');
    }, 600);
  };

  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden w-[45%] flex-col justify-between border-r border-slate-800 bg-[#12172b] p-10 lg:flex">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded bg-brand-600 text-white">
            <HexagonIcon className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-white">{COMPANY.name}</p>
            <p className="text-xs text-slate-400">Enterprise Resource Planning</p>
          </div>
        </div>
        <div>
          <h2 className="max-w-sm text-2xl font-semibold leading-snug text-white">
            One system for sales, production, projects and finance.
          </h2>
          <ul className="mt-6 space-y-2.5 text-[13px] text-slate-300">
            {[
            'Order-to-cash and procure-to-pay in a single ledger',
            'Work orders, job cards and project costing in real time',
            'Multi-level approvals with a complete audit trail'].
            map((line) =>
            <li key={line} className="flex items-start gap-2">
                <ShieldCheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                {line}
              </li>
            )}
          </ul>
        </div>
        <p className="text-xs text-slate-500">
          {COMPANY.legal} · {COMPANY.taxId} · ISO 9001 certified
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center bg-canvas p-6">
        <div className="w-full max-w-sm">
          <div className="mb-6 flex items-center gap-2.5 lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded bg-brand-700 text-white">
              <HexagonIcon className="h-4.5 w-4.5" />
            </span>
            <p className="text-sm font-semibold text-slate-900">{COMPANY.name}</p>
          </div>

          <div className="rounded border border-slate-200 bg-white p-6 shadow-card">
            {mode === 'login' &&
            <>
                <h1 className="text-base font-semibold text-slate-900">Sign in to the ERP</h1>
                <p className="mt-1 text-xs text-slate-500">Use your company credentials to continue.</p>
                <div className="mt-5 space-y-3.5">
                  <Input label="Work email" icon={MailIcon} value={email} onChange={(e) => setEmail(e.target.value)} required error={error} />
                  <Input label="Password" type="password" icon={LockIcon} value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-xs text-slate-600">
                      <input type="checkbox" defaultChecked className="h-3.5 w-3.5 rounded border-slate-300 text-brand-700 focus:ring-brand-600" />
                      Remember this device
                    </label>
                    <button type="button" onClick={() => setMode('forgot')} className="text-xs font-medium text-brand-700 hover:underline">
                      Forgot password?
                    </button>
                  </div>
                  <Button variant="primary" size="md" className="w-full" loading={loading} onClick={submit}>
                    Sign in
                  </Button>
                </div>
              </>
            }

            {mode === 'mfa' &&
            <>
                <h1 className="text-base font-semibold text-slate-900">Two-factor authentication</h1>
                <p className="mt-1 text-xs text-slate-500">
                  Enter the 6-digit code from your authenticator app for {email}.
                </p>
                <div className="mt-5 flex gap-2">
                  {Array.from({ length: 6 }).map((_, i) =>
                <input
                  key={i}
                  inputMode="numeric"
                  maxLength={1}
                  aria-label={`Digit ${i + 1}`}
                  className="h-11 w-full rounded border border-slate-300 text-center text-base font-semibold tnum focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100" />

                )}
                </div>
                <Button variant="primary" size="md" className="mt-4 w-full" loading={loading} onClick={submit}>
                  Verify and continue
                </Button>
                <button type="button" onClick={() => setMode('login')} className="mt-3 w-full text-xs text-slate-500 hover:underline">
                  Back to sign in
                </button>
              </>
            }

            {mode === 'forgot' &&
            <>
                <h1 className="text-base font-semibold text-slate-900">Reset your password</h1>
                <p className="mt-1 text-xs text-slate-500">We will email a secure reset link to your work address.</p>
                <div className="mt-5 space-y-3.5">
                  <Input label="Work email" icon={MailIcon} value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <Alert tone="info" title="Link expires in 30 minutes">
                    For security, reset links can only be used once and are logged in the audit trail.
                  </Alert>
                  <Button variant="primary" size="md" className="w-full" loading={loading} onClick={submit}>
                    Send reset link
                  </Button>
                  <button type="button" onClick={() => setMode('login')} className="w-full text-xs text-slate-500 hover:underline">
                    Back to sign in
                  </button>
                </div>
              </>
            }
          </div>

          <p className="mt-4 text-center text-xs text-slate-500">
            Trouble signing in?{' '}
            <a href="mailto:itsupport@meridian-ig.com" className="font-medium text-brand-700 hover:underline">
              Contact IT support
            </a>
          </p>
        </div>
      </div>
    </div>);

}