import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export const TimeSeriesStats = ({ dailyData, weeklyData, monthlyData, yearlyData, loading, className, ...props }) => {
  const [timeRange, setTimeRange] = useState('daily');

  const getCurrentData = () => {
    switch(timeRange) {
      case 'daily': return dailyData || [];
      case 'weekly': return weeklyData || [];
      case 'monthly': return monthlyData || [];
      case 'yearly': return yearlyData || [];
      default: return dailyData || [];
    }
  };

  const currentData = getCurrentData();

  if (loading) {
    return (
      <Card className={cn("bg-[#0a2540] border border-[#1e3a5f] shadow-lg", className)} {...props}>
        <CardContent className="py-8 text-center">
          <p className="text-blue-300">Loading time series data...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("bg-[#0a2540] border border-[#1e3a5f] shadow-lg", className)} {...props}>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <CardTitle className="text-white text-lg">Time Series Analysis</CardTitle>
          <Tabs value={timeRange} onValueChange={setTimeRange} className="w-auto">
            <TabsList className="bg-[#112b4a]">
              <TabsTrigger value="daily" className="text-blue-300 data-[state=active]:bg-blue-600">Daily</TabsTrigger>
              <TabsTrigger value="weekly" className="text-blue-300 data-[state=active]:bg-blue-600">Weekly</TabsTrigger>
              <TabsTrigger value="monthly" className="text-blue-300 data-[state=active]:bg-blue-600">Monthly</TabsTrigger>
              <TabsTrigger value="yearly" className="text-blue-300 data-[state=active]:bg-blue-600">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        {currentData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-blue-300 uppercase bg-[#112b4a]">
                <tr>
                  <th className="px-4 py-3 font-medium">{timeRange === 'daily' ? 'Date' : timeRange === 'weekly' ? 'Week' : 'Period'}</th>
                  <th className="px-4 py-3 font-medium">Avg pH</th>
                  <th className="px-4 py-3 font-medium">Avg TDS (ppm)</th>
                  <th className="px-4 py-3 font-medium">Avg Turbidity (NTU)</th>
                  <th className="px-4 py-3 font-medium">Avg Conductivity</th>
                  <th className="px-4 py-3 font-medium">Avg WQI</th>
                  <th className="px-4 py-3 font-medium">Readings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e3a5f]">
                {currentData.slice(0, 10).map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#112b4a] transition-colors">
                    <td className="px-4 py-3 text-blue-300">
                      {timeRange === 'daily' ? item.date : 
                       timeRange === 'weekly' ? `${item.week?.start} to ${item.week?.end}` : 
                       item.month || item.year}
                    </td>
                    <td className="px-4 py-3 text-white">{item.avgPH?.toFixed(2) || item.avgPH?.toFixed(2) || '—'}</td>
                    <td className="px-4 py-3 text-white">{item.avgTDS?.toFixed(0) || item.avgTDS?.toFixed(0) || '—'}</td>
                    <td className="px-4 py-3 text-white">{item.avgTurbidity?.toFixed(2) || item.avgTurbidity?.toFixed(2) || '—'}</td>
                    <td className="px-4 py-3 text-white">{item.avgConductivity?.toFixed(0) || item.avgConductivity?.toFixed(0) || '—'}</td>
                    <td className="px-4 py-3 font-semibold text-white">{item.avgWQI?.toFixed(1) || item.avgWQI?.toFixed(1) || '—'}</td>
                    <td className="px-4 py-3 text-blue-300">{item.readings || item.count || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {currentData.length > 10 && (
              <p className="text-blue-400 text-xs text-center mt-4">+ {currentData.length - 10} more records</p>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-blue-400">No time series data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TimeSeriesStats;