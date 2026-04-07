import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const ClassificationDistribution = ({ classification, className, ...props }) => {
  const distribution = classification?.data?.distribution || [];
  const overall = classification?.data?.overall || {};

  const total = distribution.reduce((sum, cat) => sum + (cat.count || 0), 0);

  const getBarColor = (category) => {
    switch(category) {
      case 'Excellent': return 'bg-green-500';
      case 'Good': return 'bg-blue-500';
      case 'Poor': return 'bg-yellow-500';
      case 'Unsafe': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTextColor = (category) => {
    switch(category) {
      case 'Excellent': return 'text-green-400';
      case 'Good': return 'text-blue-400';
      case 'Poor': return 'text-yellow-400';
      case 'Unsafe': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Card className={cn("bg-[#0a2540] border border-[#1e3a5f] shadow-lg", className)} {...props}>
      <CardHeader>
        <CardTitle className="text-white text-lg">Water Quality Distribution</CardTitle>
        <p className="text-blue-400 text-sm">Classification of all recorded readings</p>
      </CardHeader>
      <CardContent>
        {overall.avgWQI && (
          <div className="mb-6 p-4 bg-[#112b4a] rounded-lg text-center">
            <p className="text-blue-300 text-sm mb-1">Overall Average WQI</p>
            <p className="text-3xl font-bold text-white">{overall.avgWQI?.toFixed(1)}</p>
            <p className={cn("text-sm font-medium mt-1 inline-block px-3 py-1 rounded-full", getTextColor(overall.classification))}>
              {overall.classification || 'N/A'}
            </p>
          </div>
        )}

        <div className="space-y-4">
          {distribution.map((item, idx) => {
            const percentage = total > 0 ? (item.count / total * 100).toFixed(1) : 0;
            return (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span className={cn("font-medium", getTextColor(item.category))}>{item.category}</span>
                  <span className="text-blue-300">{item.count} readings ({percentage}%)</span>
                </div>
                <div className="w-full bg-[#0a2540] rounded-full h-2">
                  <div className={cn("h-2 rounded-full", getBarColor(item.category))} style={{ width: `${percentage}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        {distribution.length === 0 && (
          <div className="text-center py-8">
            <p className="text-blue-400">No classification data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClassificationDistribution;