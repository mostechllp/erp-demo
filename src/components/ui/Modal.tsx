import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { cx } from '../../utils/format';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  footer?: React.ReactNode;
  width?: string;
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, description, footer, width = 'max-w-lg', children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto p-6 sm:p-10">
          <motion.div
          className="fixed inset-0 bg-slate-900/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
          onClick={onClose} />
        
          <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          initial={{ opacity: 0, scale: 0.98, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 4 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className={cx('relative z-10 w-full rounded border border-slate-200 bg-white shadow-overlay', width)}>
          
            <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-3.5">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
                {description && <p className="mt-0.5 text-xs text-slate-500">{description}</p>}
              </div>
              <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="rounded p-1 text-slate-400 transition-colors duration-150 ease-erp hover:bg-slate-100 hover:text-slate-700">
              
                <XIcon className="h-4 w-4" />
              </button>
            </header>
            <div className="erp-scroll max-h-[65vh] overflow-y-auto px-5 py-4">{children}</div>
            {footer &&
          <footer className="flex items-center justify-end gap-2 border-t border-slate-200 bg-slate-50 px-5 py-3">
                {footer}
              </footer>
          }
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}