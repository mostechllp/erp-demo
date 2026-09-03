import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDownIcon, ChevronsLeftIcon, ChevronsRightIcon, HexagonIcon } from 'lucide-react';
import { NAV } from '../../data/navigation';
import { COMPANY, ROLE_MODULES } from '../../data/org';
import { useApp } from '../../contexts/AppContext';
import { Tooltip } from '../ui/Tooltip';
import { cx } from '../../utils/format';

export function Sidebar() {
  const { collapsed, setCollapsed, role, pendingApprovals, unreadCount, branch } = useApp();
  const location = useLocation();
  const [open, setOpen] = useState<string[]>([]);

  const allowed = ROLE_MODULES[role.id];
  const sections = useMemo(
    () =>
    NAV.map((s) => ({
      ...s,
      items: s.items.filter((i) => allowed.includes('*') || allowed.includes(i.id))
    })).filter((s) => s.items.length > 0),
    [allowed]
  );

  // Auto-expand the group that owns the current route.
  useEffect(() => {
    const match = NAV.flatMap((s) => s.items).find((i) =>
    i.children?.some((c) => location.pathname.startsWith(c.to))
    );
    if (match) setOpen((prev) => prev.includes(match.id) ? prev : [...prev, match.id]);
  }, [location.pathname]);

  const isActive = (to: string) =>
  to === '/dashboard' ? location.pathname === to : location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <aside
      className={cx(
        'flex h-full shrink-0 flex-col border-r border-slate-800 bg-[#12172b] transition-[width] duration-200 ease-erp',
        collapsed ? 'w-[60px]' : 'w-[248px]'
      )}>
      
      <div className={cx('flex items-center gap-2.5 border-b border-slate-800 px-3 py-3', collapsed && 'justify-center px-0')}>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-brand-600 text-white">
          <HexagonIcon className="h-4 w-4" />
        </span>
        {!collapsed &&
        <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-white">{COMPANY.name}</p>
            <p className="truncate text-[11px] text-slate-400">{branch.name}</p>
          </div>
        }
      </div>

      <nav className="erp-scroll flex-1 overflow-y-auto px-2 py-3" aria-label="Main navigation">
        {sections.map((section) =>
        <div key={section.label} className="mb-4 last:mb-0">
            {!collapsed &&
          <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                {section.label}
              </p>
          }
            <ul className="space-y-0.5">
              {section.items.map((item) => {
              const Icon = item.icon;
              const badge =
              item.badgeKey === 'approvals' ? pendingApprovals : item.badgeKey === 'notifications' ? unreadCount : 0;
              const groupActive = item.children?.some((c) => isActive(c.to));
              const expanded = open.includes(item.id);

              if (item.to) {
                const link =
                <Link
                  to={item.to}
                  className={cx(
                    'group flex items-center gap-2.5 rounded px-2 py-1.5 text-[13px] transition-colors duration-150 ease-erp',
                    collapsed && 'justify-center px-0',
                    isActive(item.to) ?
                    'bg-brand-600 font-medium text-white' :
                    'text-slate-300 hover:bg-slate-800 hover:text-white'
                  )}>
                  
                      <Icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                      {!collapsed && badge > 0 &&
                  <span className="rounded bg-amber-500 px-1.5 text-[10px] font-bold tnum text-slate-900">
                          {badge}
                        </span>
                  }
                    </Link>;

                return (
                  <li key={item.id}>
                      {collapsed ?
                    <Tooltip label={item.label} side="right" className="w-full">
                          {link}
                        </Tooltip> :

                    link
                    }
                    </li>);

              }

              return (
                <li key={item.id}>
                    {collapsed ?
                  <Tooltip label={item.label} side="right" className="w-full">
                        <Link
                      to={item.children![0].to}
                      className={cx(
                        'flex w-full items-center justify-center rounded py-1.5 transition-colors duration-150 ease-erp',
                        groupActive ? 'bg-brand-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      )}>
                      
                          <Icon className="h-4 w-4" />
                        </Link>
                      </Tooltip> :

                  <>
                        <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() =>
                      setOpen((prev) =>
                      prev.includes(item.id) ? prev.filter((x) => x !== item.id) : [...prev, item.id]
                      )
                      }
                      className={cx(
                        'flex w-full items-center gap-2.5 rounded px-2 py-1.5 text-[13px] transition-colors duration-150 ease-erp',
                        groupActive ? 'text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      )}>
                      
                          <Icon className="h-4 w-4 shrink-0" />
                          <span className="flex-1 truncate text-left">{item.label}</span>
                          <ChevronDownIcon
                        className={cx(
                          'h-3.5 w-3.5 shrink-0 text-slate-500 transition-transform duration-150 ease-erp',
                          expanded && 'rotate-180'
                        )} />
                      
                        </button>
                        {expanded &&
                    <ul className="ml-[18px] mt-0.5 space-y-px border-l border-slate-800 pl-2.5">
                            {item.children!.map((child) =>
                      <li key={child.to}>
                                <Link
                          to={child.to}
                          className={cx(
                            'block truncate rounded px-2 py-1.5 text-[12.5px] transition-colors duration-150 ease-erp',
                            isActive(child.to) ?
                            'bg-slate-800 font-medium text-white' :
                            'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
                          )}>
                          
                                  {child.label}
                                </Link>
                              </li>
                      )}
                          </ul>
                    }
                      </>
                  }
                  </li>);

            })}
            </ul>
          </div>
        )}
      </nav>

      <div className="border-t border-slate-800 p-2">
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className={cx(
            'flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs text-slate-400 transition-colors duration-150 ease-erp hover:bg-slate-800 hover:text-white',
            collapsed && 'justify-center px-0'
          )}>
          
          {collapsed ? <ChevronsRightIcon className="h-4 w-4" /> : <ChevronsLeftIcon className="h-4 w-4" />}
          {!collapsed && 'Collapse sidebar'}
        </button>
      </div>
    </aside>);

}