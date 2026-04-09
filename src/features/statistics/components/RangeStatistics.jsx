import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const RangeStatistics = ({ dashboardStats, minMaxStats, className, ...props }) => {
  const ranges = [
    { name: 'pH', min: dashboardStats?.min?.pH?.toFixed(2) || minMaxStats?.pH?.min?.toFixed(2) || '—', max: dashboardStats?.max?.pH?.toFixed(2) || minMaxStats?.pH?.max?.toFixed(2) || '—', ideal: '6.5 - 8.5' },
    { name: 'Turbidity (NTU)', min: dashboardStats?.min?.turbidity?.toFixed(2) || minMaxStats?.turbidity?.min?.toFixed(2) || '—', max: dashboardStats?.max?.turbidity?.toFixed(2) || minMaxStats?.turbidity?.max?.toFixed(2) || '—', ideal: '< 5 NTU' },
    { name: 'TDS (ppm)', min: dashboardStats?.min?.tds?.toFixed(0) || minMaxStats?.tds?.min?.toFixed(0) || '—', max: dashboardStats?.max?.tds?.toFixed(0) || minMaxStats?.tds?.max?.toFixed(0) || '—', ideal: '< 500 ppm' },
    { name: 'Conductivity (µS/cm)', min: dashboardStats?.min?.electricalConductivity?.toFixed(0) || minMaxStats?.electricalConductivity?.min?.toFixed(0) || '—', max: dashboardStats?.max?.electricalConductivity?.toFixed(0) || minMaxStats?.electricalConductivity?.max?.toFixed(0) || '—', ideal: '< 1000 µS/cm' },
    { name: 'WQI', min: dashboardStats?.min?.wqi?.toFixed(0) || minMaxStats?.waterQualityIndex?.min?.toFixed(0) || '—', max: dashboardStats?.max?.wqi?.toFixed(0) || minMaxStats?.waterQualityIndex?.max?.toFixed(0) || '—', ideal: '> 70' },
  ];

  return (
    <Card className={cn("bg-[#0a2540] border border-[#1e3a5f] shadow-lg", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-white text-lg">Range Statistics</CardTitle>
        <p className="text-blue-400 text-sm">Minimum and maximum values recorded</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-blue-300 uppercase bg-[#112b4a]">
              <tr>
                <th className="px-6 py-4 font-medium">Parameter</th>
                <th className="px-6 py-4 font-medium">Minimum</th>
                <th className="px-6 py-4 font-medium">Maximum</th>
                <th className="px-6 py-4 font-medium">Ideal Range</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e3a5f]">
              {ranges.map((range, idx) => (
                <tr key={idx} className="hover:bg-[#112b4a] transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{range.name}</td>
                  <td className="px-6 py-4 text-blue-300">{range.min}</td>
                  <td className="px-6 py-4 text-blue-300">{range.max}</td>
                  <td className="px-6 py-4 text-blue-400">{range.ideal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RangeStatistics;