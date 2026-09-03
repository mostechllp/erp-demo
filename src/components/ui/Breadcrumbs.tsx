import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: {items: Crumb[];}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 text-xs text-slate-500">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label + i} className="flex items-center gap-1">
              {item.to && !last ?
              <Link
                to={item.to}
                className="rounded px-0.5 transition-colors duration-150 ease-erp hover:text-brand-700 hover:underline">
                
                  {item.label}
                </Link> :

              <span className={last ? 'font-medium text-slate-700' : undefined} aria-current={last ? 'page' : undefined}>
                  {item.label}
                </span>
              }
              {!last && <ChevronRightIcon className="h-3 w-3 text-slate-300" />}
            </li>);

        })}
      </ol>
    </nav>);

}