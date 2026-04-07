import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Droplets, Beaker, Table as TableIcon, Zap, ShieldCheck } from 'lucide-react';

export const QualityMetricsCards = ({ dashboardStats, meanStats, className, ...props }) => {
  const cards = [
    {
      title: 'Turbidity',
      value: dashboardStats?.mean?.turbidity?.toFixed(2) || meanStats?.turbidity?.toFixed(2) || '—',
      unit: 'NTU',
      icon: Droplets,
      color: 'bg-blue-600',
    },
    {
      title: 'Water pH',
      value: dashboardStats?.mean?.pH?.toFixed(1) || meanStats?.pH?.toFixed(1) || '—',
      unit: '',
      icon: Beaker,
      color: 'bg-emerald-600',
    },
    {
      title: 'TDS',
      value: dashboardStats?.mean?.tds?.toFixed(0) || meanStats?.tds?.toFixed(0) || '—',
      unit: 'ppm',
      icon: TableIcon,
      color: 'bg-indigo-600',
    },
    {
      title: 'Conductivity',
      value: dashboardStats?.mean?.electricalConductivity?.toFixed(0) || meanStats?.electricalConductivity?.toFixed(0) || '—',
      unit: 'µS/cm',
      icon: Zap,
      color: 'bg-orange-600',
    },
    {
      title: 'Quality Index',
      value: dashboardStats?.mean?.wqi?.toFixed(0) || meanStats?.waterQualityIndex?.toFixed(0) || '—',
      unit: 'WQI',
      icon: ShieldCheck,
      color: 'bg-[#2C7BE5]',
    },
  ];

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6", className)} {...props}>
      {cards.map((card, idx) => (
        <Card key={idx} className="bg-[#0a2540] border border-[#1e3a5f] shadow-lg overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-blue-300">{card.title}</CardTitle>
              <div className={cn("p-2 rounded-lg", card.color)}>
                <card.icon className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold text-white">{card.value}</div>
              {card.unit && <div className="text-sm text-blue-400">{card.unit}</div>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QualityMetricsCards;