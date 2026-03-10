import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const WaterQualityCard = ({ title, value, unit, icon: Icon, color }) => {
  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={cn("p-3 rounded-xl", color)}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <div className="flex items-baseline gap-1">
            <h3 className="text-3xl font-bold text-slate-300">{value}</h3>
            <span className="text-sm font-medium text-slate-400">{unit}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
