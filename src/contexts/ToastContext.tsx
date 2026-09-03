import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangleIcon, CheckCircle2Icon, InfoIcon, XCircleIcon, XIcon } from 'lucide-react';
import type { Tone } from '../types/erp';

interface Toast {
  id: number;
  tone: Tone;
  title: string;
  body?: string;
}

interface ToastApi {
  push: (t: Omit<Toast, 'id'>) => void;
}

const ToastContext = createContext<ToastApi>({ push: () => undefined });

export function useToast(): ToastApi {
  return useContext(ToastContext);
}

const ICONS: Partial<Record<Tone, React.ComponentType<{className?: string;}>>> = {
  success: CheckCircle2Icon,
  warning: AlertTriangleIcon,
  danger: XCircleIcon,
  info: InfoIcon
};

const ACCENT: Record<Tone, string> = {
  success: 'text-emerald-600',
  warning: 'text-amber-600',
  danger: 'text-red-600',
  info: 'text-sky-600',
  neutral: 'text-slate-500',
  brand: 'text-brand-700'
};

export function ToastProvider({ children }: {children: React.ReactNode;}) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((t: Omit<Toast, 'id'>) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { ...t, id }]);
    window.setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 4000);
  }, []);

  const api = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="pointer-events-none fixed bottom-5 right-5 z-[90] flex w-80 flex-col gap-2">
        <AnimatePresence initial={false}>
          {toasts.map((t) => {
            const Icon = ICONS[t.tone] ?? InfoIcon;
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="pointer-events-auto flex items-start gap-2.5 rounded border border-slate-200 bg-white px-3 py-2.5 shadow-overlay">
                
                <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${ACCENT[t.tone]}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-slate-900">{t.title}</p>
                  {t.body && <p className="mt-0.5 text-xs text-slate-500">{t.body}</p>}
                </div>
                <button
                  type="button"
                  aria-label="Dismiss notification"
                  onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
                  className="rounded p-0.5 text-slate-400 transition-colors duration-150 ease-erp hover:bg-slate-100 hover:text-slate-700">
                  
                  <XIcon className="h-3.5 w-3.5" />
                </button>
              </motion.div>);

          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>);

}