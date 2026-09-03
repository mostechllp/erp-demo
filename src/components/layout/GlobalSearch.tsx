import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from 'lucide-react';
import { CUSTOMERS, SALES_ORDERS } from '../../data/sales';
import { PURCHASE_ORDERS, SUPPLIERS } from '../../data/procurement';
import { PRODUCTS } from '../../data/inventory';
import { PROJECTS, JOBS } from '../../data/projects';
import { WORK_ORDERS } from '../../data/production';
import { JOB_CARDS } from '../../data/workshop';
import { EMPLOYEES } from '../../data/hr';
import { AR_INVOICES } from '../../data/sales';
import { cx } from '../../utils/format';

interface Hit {
  id: string;
  label: string;
  group: string;
  to: string;
}

function buildIndex(): Hit[] {
  return [
  ...CUSTOMERS.map((c) => ({ id: c.id, label: `${c.id} · ${c.name}`, group: 'Customers', to: `/sales/customers/${c.id}` })),
  ...SUPPLIERS.map((s) => ({ id: s.id, label: `${s.id} · ${s.name}`, group: 'Suppliers', to: '/procurement/suppliers' })),
  ...PRODUCTS.map((p) => ({ id: p.id, label: `${p.sku} · ${p.name}`, group: 'Products', to: '/inventory/products' })),
  ...SALES_ORDERS.map((o) => ({ id: o.id, label: `${o.id} · ${o.customer}`, group: 'Sales Orders', to: `/sales/orders/${o.id}` })),
  ...PURCHASE_ORDERS.map((o) => ({ id: o.id, label: `${o.id} · ${o.supplier}`, group: 'Purchase Orders', to: `/procurement/orders/${o.id}` })),
  ...AR_INVOICES.map((i) => ({ id: i.id, label: `${i.id} · ${i.party}`, group: 'Invoices', to: '/sales/invoices' })),
  ...PROJECTS.map((p) => ({ id: p.id, label: `${p.id} · ${p.name}`, group: 'Projects', to: `/projects/${p.id}` })),
  ...JOBS.map((j) => ({ id: j.id, label: `${j.id} · ${j.project}`, group: 'Jobs', to: `/projects/jobs/${j.id}` })),
  ...WORK_ORDERS.map((w) => ({ id: w.id, label: `${w.id} · ${w.product}`, group: 'Work Orders', to: '/production/work-orders' })),
  ...JOB_CARDS.map((j) => ({ id: j.id, label: `${j.id} · ${j.customer}`, group: 'Workshop Jobs', to: `/workshop/jobs/${j.id}` })),
  ...EMPLOYEES.map((e) => ({ id: e.id, label: `${e.id} · ${e.name}`, group: 'Employees', to: `/hr/employees/${e.id}` }))];

}

export function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const index = useMemo(buildIndex, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDoc);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDoc);
    };
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index.filter((h) => h.label.toLowerCase().includes(q)).slice(0, 12);
  }, [query, index]);

  const grouped = results.reduce<Record<string, Hit[]>>((acc, hit) => {
    ;(acc[hit.group] ||= []).push(hit);
    return acc;
  }, {});

  return (
    <div className="relative w-full max-w-md" ref={ref}>
      <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Search orders, customers, products, projects…"
        aria-label="Global search"
        className="h-8 w-full rounded border border-slate-300 bg-slate-50 pl-8 pr-14 text-[13px] placeholder:text-slate-400 transition-colors duration-150 ease-erp hover:border-slate-400 focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100" />
      
      <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-slate-300 bg-white px-1 py-0.5 text-[10px] font-medium text-slate-400">
        ⌘K
      </kbd>

      {open && query.trim() !== '' &&
      <div className="erp-scroll absolute left-0 top-full z-50 mt-1 max-h-[420px] w-full overflow-y-auto rounded border border-slate-200 bg-white py-1 shadow-overlay">
          {results.length === 0 ?
        <p className="px-3 py-6 text-center text-xs text-slate-500">
              No records match “{query}”. Try a document number, name or SKU.
            </p> :

        Object.entries(grouped).map(([group, hits]) =>
        <div key={group}>
                <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{group}</p>
                {hits.map((hit) =>
          <button
            key={hit.group + hit.id}
            type="button"
            onClick={() => {
              navigate(hit.to);
              setOpen(false);
              setQuery('');
            }}
            className={cx(
              'block w-full truncate px-3 py-1.5 text-left text-[13px] text-slate-700',
              'transition-colors duration-100 ease-erp hover:bg-slate-100'
            )}>
            
                    {hit.label}
                  </button>
          )}
              </div>
        )
        }
        </div>
      }
    </div>);

}