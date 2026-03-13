import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const RecentReadingsTable = ({ readings }) => {
  const getWQIStatus = (waterQualityIndex) => {
    if (waterQualityIndex >= 90) return { label: 'Excellent', color: 'text-green-600 bg-green-50' };
    if (waterQualityIndex >= 70) return { label: 'Good', color: 'text-blue-600 bg-blue-50' };
    if (waterQualityIndex >= 50) return { label: 'Fair', color: 'text-yellow-600 bg-yellow-50' };
    return { label: 'Poor', color: 'text-red-600 bg-red-50' };
  };

  return (
    <Card className="border-none shadow-md overflow-hidden">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100">
        <CardTitle className="text-lg font-semibold">Recent Sensor Readings</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-100 uppercase bg-slate-50/50">
              <tr>
                <th className="px-6 py-4 font-medium">Time</th>
                <th className="px-6 py-4 font-medium">Turbidity (NTU)</th>
                <th className="px-6 py-4 font-medium">pH</th>
                <th className="px-6 py-4 font-medium">TDS (ppm)</th>
                <th className="px-6 py-4 font-medium">EC (µS/cm)</th>
                <th className="px-6 py-4 font-medium">WQI</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {readings.map((reading, idx) => {
                const status = getWQIStatus(reading.waterQualityIndex);
                return (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-300">{reading.timestamp}</td>
                    <td className="px-6 py-4 text-slate-300">{reading.turbidity.toFixed(2)}</td>
                    <td className="px-6 py-4 text-slate-300">{reading.pH.toFixed(2)}</td>
                    <td className="px-6 py-4 text-slate-300">{reading.tds.toFixed(0)}</td>
                    <td className="px-6 py-4 text-slate-300">{reading.electricalConductivity.toFixed(0)}</td>
                    <td className="px-6 py-4 font-semibold text-slate-300">{reading.waterQualityIndex.toFixed(1)}</td>
                    <td className="px-6 py-4">
                      <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold", status.color)}>
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
