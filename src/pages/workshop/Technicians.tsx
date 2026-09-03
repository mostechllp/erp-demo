import React from 'react';
import { StarIcon } from 'lucide-react';
import { ListPage } from '../../components/patterns/ListPage';
import { Progress } from '../../components/ui/Progress';
import { TECHNICIANS } from '../../data/workshop';

type Row = (typeof TECHNICIANS)[number];

export function Technicians() {
  return (
    <ListPage<Row>
      title="Technicians"
      crumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Workshop' }, { label: 'Technicians' }]}
      description="Workshop capacity, skills coverage and workload balance."
      rows={TECHNICIANS}
      rowKey={(t) => t.id}
      searchText={(t) => `${t.id} ${t.name} ${t.skill} ${t.branch}`}
      filters={[
      { id: 'branch', label: 'Branch', options: [...new Set(TECHNICIANS.map((t) => t.branch))] },
      { id: 'skill', label: 'Skill', options: [...new Set(TECHNICIANS.map((t) => t.skill))] }]
      }
      filterValue={(t, id) => id === 'branch' ? t.branch : t.skill}
      rowActions={() => [{ label: 'View schedule' }, { label: 'Assign job' }, { label: 'Performance review' }]}
      columns={[
      { key: 'id', header: 'Code', render: (t) => <span className="font-mono text-xs text-brand-700">{t.id}</span> },
      { key: 'name', header: 'Technician', render: (t) => <span className="font-medium text-slate-900">{t.name}</span>, sortValue: (t) => t.name },
      { key: 'skill', header: 'Primary skill', render: (t) => t.skill },
      { key: 'branch', header: 'Branch', render: (t) => t.branch, optional: true },
      { key: 'openJobs', header: 'Open jobs', align: 'right', render: (t) => t.openJobs, sortValue: (t) => t.openJobs },
      { key: 'hoursWeek', header: 'Hours (week)', align: 'right', render: (t) => t.hoursWeek, sortValue: (t) => t.hoursWeek },
      {
        key: 'utilisation',
        header: 'Utilisation',
        width: '170px',
        sortValue: (t) => t.utilisation,
        render: (t) => <Progress value={t.utilisation} tone={t.utilisation > 90 ? 'danger' : t.utilisation > 75 ? 'warning' : 'success'} showValue label={`${t.name} utilisation`} />
      },
      {
        key: 'rating',
        header: 'Rating',
        align: 'right',
        sortValue: (t) => t.rating,
        render: (t) =>
        <span className="inline-flex items-center gap-1 tnum">
              <StarIcon className="h-3 w-3 fill-amber-400 text-amber-400" />
              {t.rating.toFixed(1)}
            </span>

      }]
      } />);


}