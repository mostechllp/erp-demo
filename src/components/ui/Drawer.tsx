import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { cx } from '../../utils/format';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
  children: React.ReactNode;
}

export function Drawer({ open, onClose, title, subtitle, footer, width = 'w-[520px]', children }: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-[70]">
          <motion.div
          className="absolute inset-0 bg-slate-900/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
          onClick={onClose} />
        
          <motion.aside
          role="dialog"
          aria-modal="true"
          aria-label={title}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className={cx(
            'absolute right-0 top-0 flex h-full max-w-full flex-col border-l border-slate-200 bg-white shadow-overlay',
            width
          )}>
          
            <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-3.5">
              <div className="min-w-0">
                <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
                {subtitle && <div className="mt-0.5 text-xs text-slate-500">{subtitle}</div>}
              </div>
              <button
              type="button"
              onClick={onClose}
              aria-label="Close panel"
              className="rounded p-1 text-slate-400 transition-colors duration-150 ease-erp hover:bg-slate-100 hover:text-slate-700">
              
                <XIcon className="h-4 w-4" />
              </button>
            </header>
            <div className="erp-scroll flex-1 overflow-y-auto px-5 py-4">{children}</div>
            {footer &&
          <footer className="flex items-center justify-end gap-2 border-t border-slate-200 bg-slate-50 px-5 py-3">
                {footer}
              </footer>
          }
          </motion.aside>
        </div>
      }
    </AnimatePresence>);

}