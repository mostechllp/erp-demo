import React, { createContext, useContext, useMemo, useState } from 'react';
import { BRANCHES, ROLES } from '../data/org';
import { NOTIFICATIONS } from '../data/governance';
import { APPROVALS } from '../data/governance';
import type { Branch, Role, RoleId } from '../types/erp';

interface AppState {
  role: Role;
  setRoleId: (id: RoleId) => void;
  branch: Branch;
  setBranchId: (id: string) => void;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  unreadCount: number;
  markAllRead: () => void;
  readIds: string[];
  toggleRead: (id: string) => void;
  pendingApprovals: number;
}

const AppContext = createContext<AppState | null>(null);

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}

export function AppProvider({ children }: {children: React.ReactNode;}) {
  const [roleId, setRoleId] = useState<RoleId>('super-admin');
  const [branchId, setBranchId] = useState<string>(BRANCHES[0].id);
  const [collapsed, setCollapsed] = useState(false);
  const [readIds, setReadIds] = useState<string[]>(NOTIFICATIONS.filter((n) => n.read).map((n) => n.id));

  const value = useMemo<AppState>(() => {
    const unread = NOTIFICATIONS.filter((n) => !readIds.includes(n.id));
    return {
      role: ROLES.find((r) => r.id === roleId) ?? ROLES[0],
      setRoleId,
      branch: BRANCHES.find((b) => b.id === branchId) ?? BRANCHES[0],
      setBranchId,
      collapsed,
      setCollapsed,
      unreadCount: unread.length,
      markAllRead: () => setReadIds(NOTIFICATIONS.map((n) => n.id)),
      readIds,
      toggleRead: (id: string) =>
      setReadIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]),
      pendingApprovals: APPROVALS.filter((a) => a.status === 'Pending').length
    };
  }, [roleId, branchId, collapsed, readIds]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}