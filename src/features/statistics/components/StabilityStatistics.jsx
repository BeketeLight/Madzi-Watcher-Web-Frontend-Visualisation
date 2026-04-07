import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const StabilityStatistics = ({ dashboardStats, stdDevStats, className, ...props }) => {
  const stabilityData = [
    { name: 'pH Stability', value: dashboardStats?.stdDev?.pH?.toFixed(3) || stdDevStats?.pH?.toFixed(3) || '—', stable: dashboardStats?.stdDev?.pH < 0.3 },
    { name: 'Turbidity Stability', value: dashboardStats?.stdDev?.turbidity?.toFixed(3) || stdDevStats?.turbidity?.toFixed(3) || '—', unit: 'NTU', stable: dashboardStats?.stdDev?.turbidity < 0.5 },
    { name: 'TDS Stability', value: dashboardStats?.stdDev?.tds?.toFixed(2) || stdDevStats?.tds?.toFixed(2) || '—', unit: 'ppm', stable: dashboardStats?.stdDev?.tds < 20 },
    { name: 'WQI Stability', value: dashboardStats?.stdDev?.wqi?.toFixed(3) || stdDevStats?.waterQualityIndex?.toFixed(3) || '—', stable: dashboardStats?.stdDev?.wqi < 5 },
  ];

  return (
    <Card className={cn("bg-[#0a2540] border border-[#1e3a5f] shadow-lg", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-white text-lg">Stability Analysis</CardTitle>
        <p className="text-blue-400 text-sm">Standard deviation - lower values indicate more stable water quality</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stabilityData.map((item, idx) => (
            <div key={idx} className="p-3 bg-[#112b4a] rounded-lg">
              <p className="text-blue-300 text-sm mb-1">{item.name}</p>
              <p className="text-white text-lg font-semibold">
                ±{item.value}{item.unit || ''}
              </p>
              <p className={cn("text-xs mt-1", item.stable ? 'text-green-400' : 'text-yellow-400')}>
                {item.stable ? '✓ Stable' : '⚠️ Variable'}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StabilityStatistics;