import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Activity, Droplets, Beaker, Gauge, BarChart3 } from 'lucide-react';

export const StatisticsCards = ({ dashboardStats, meanStats, className, ...props }) => {
  const cards = [
    {
      title: 'Water Quality Index',
      value: dashboardStats?.mean?.wqi?.toFixed(1) || meanStats?.waterQualityIndex?.toFixed(1) || '—',
      unit: 'WQI',
      icon: Activity,
      color: 'bg-blue-600',
      classification: dashboardStats?.wqiClassification,
    },
    {
      title: 'Turbidity',
      value: dashboardStats?.mean?.turbidity?.toFixed(2) || meanStats?.turbidity?.toFixed(2) || '—',
      unit: 'NTU',
      icon: Droplets,
      color: 'bg-cyan-600',
    },
    {
      title: 'pH Level',
      value: dashboardStats?.mean?.pH?.toFixed(1) || meanStats?.pH?.toFixed(1) || '—',
      unit: '',
      icon: Beaker,
      color: 'bg-emerald-600',
    },
    {
      title: 'TDS',
      value: dashboardStats?.mean?.tds?.toFixed(0) || meanStats?.tds?.toFixed(0) || '—',
      unit: 'ppm',
      icon: Gauge,
      color: 'bg-purple-600',
    },
    {
      title: 'Total Readings',
      value: dashboardStats?.totalReadings || 0,
      icon: BarChart3,
      color: 'bg-amber-600',
    },
  ];

  const getClassificationColor = (classification) => {
    switch(classification) {
      case 'Excellent': return 'text-green-400 bg-green-400/10';
      case 'Good': return 'text-blue-400 bg-blue-400/10';
      case 'Poor': return 'text-yellow-400 bg-yellow-400/10';
      case 'Unsafe': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6", className)} {...props}>
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
              <div className="text-2xl font-bold text-white">{card.value}</div>
              {card.unit && <div className="text-sm text-blue-400">{card.unit}</div>}
            </div>
            {card.classification && (
              <div className="mt-2">
                <span className={cn("px-2 py-1 rounded-full text-xs font-medium", getClassificationColor(card.classification))}>
                  {card.classification}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatisticsCards;