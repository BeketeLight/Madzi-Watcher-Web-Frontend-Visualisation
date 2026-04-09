
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const TrendChart = ({ trends, loading, className, ...props }) => {
  const [selectedParameter, setSelectedParameter] = useState('wqi');

  if (loading) {
    return (
      <Card className={cn("bg-[#0a2540] border border-[#1e3a5f] shadow-lg", className)} {...props}>
        <CardContent className="py-8 text-center">
          <p className="text-blue-300">Loading trend data...</p>
        </CardContent>
      </Card>
    );
  }

  const trendData = trends?.trends || {};
  
  const parameters = [
    { key: 'pH', name: 'pH Level', unit: '', color: 'text-emerald-400' },
    { key: 'tds', name: 'TDS', unit: 'ppm', color: 'text-purple-400' },
    { key: 'turbidity', name: 'Turbidity', unit: 'NTU', color: 'text-cyan-400' },
    { key: 'wqi', name: 'Water Quality Index', unit: 'WQI', color: 'text-blue-400' },
  ];

  const getTrendIcon = (direction) => {
    if (direction === 'increasing') return <TrendingUp className="h-4 w-4 text-red-400" />;
    if (direction === 'decreasing') return <TrendingDown className="h-4 w-4 text-green-400" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const getTrendColor = (direction, parameter) => {
    if (parameter === 'wqi') {
      if (direction === 'increasing') return 'text-red-400';
      if (direction === 'decreasing') return 'text-green-400';
    } else {
      if (direction === 'increasing') return 'text-red-400';
      if (direction === 'decreasing') return 'text-green-400';
    }
    return 'text-gray-400';
  };

  const currentParam = parameters.find(p => p.key === selectedParameter);
  const currentTrend = trendData[selectedParameter];

  return (
    <Card className={cn("bg-[#0a2540] border border-[#1e3a5f] shadow-lg", className)} {...props}>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <CardTitle className="text-white text-lg">Trend Analysis</CardTitle>
          <div className="flex flex-wrap gap-2">
            {parameters.map((param) => (
              <Button
                key={param.key}
                variant="outline"
                size="sm"
                onClick={() => setSelectedParameter(param.key)}
                className={cn(
                  "text-xs border-[#1e3a5f] bg-transparent",
                  selectedParameter === param.key 
                    ? "text-white border-blue-500 bg-blue-500/20" 
                    : "text-blue-400"
                )}
              >
                {param.name}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {currentTrend ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-[#112b4a] rounded-lg">
                <p className="text-blue-300 text-sm mb-2">Start Value</p>
                <p className="text-2xl font-bold text-white">
                  {currentTrend.start?.toFixed(2) || '—'}
                  {currentParam?.unit && <span className="text-sm text-blue-400 ml-1">{currentParam.unit}</span>}
                </p>
              </div>
              <div className="text-center p-4 bg-[#112b4a] rounded-lg">
                <p className="text-blue-300 text-sm mb-2">Current Value</p>
                <p className="text-2xl font-bold text-white">
                  {currentTrend.end?.toFixed(2) || '—'}
                  {currentParam?.unit && <span className="text-sm text-blue-400 ml-1">{currentParam.unit}</span>}
                </p>
              </div>
              <div className="text-center p-4 bg-[#112b4a] rounded-lg">
                <p className="text-blue-300 text-sm mb-2">Change</p>
                <div className="flex items-center justify-center gap-2">
                  {getTrendIcon(currentTrend.direction)}
                  <p className={cn("text-2xl font-bold", getTrendColor(currentTrend.direction, selectedParameter))}>
                    {currentTrend.change > 0 ? '+' : ''}{currentTrend.change?.toFixed(2) || '0'}
                    {currentParam?.unit && <span className="text-sm ml-1">{currentParam.unit}</span>}
                  </p>
                </div>
                <p className="text-blue-400 text-xs mt-1 capitalize">
                  {currentTrend.direction}
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#112b4a] rounded-lg">
              <p className="text-blue-300 text-sm mb-2">Interpretation</p>
              {selectedParameter === 'wqi' ? (
                <p className="text-white">
                  {currentTrend.direction === 'decreasing' 
                    ? '✓ Water quality is improving! The WQI is decreasing toward better quality.' 
                    : currentTrend.direction === 'increasing'
                    ? '⚠️ Water quality is worsening. The WQI is increasing.'
                    : 'Water quality is stable.'}
                </p>
              ) : (
                <p className="text-white">
                  {currentTrend.direction === 'decreasing' 
                    ? '✓ Parameter values are decreasing, which is generally positive.'
                    : currentTrend.direction === 'increasing'
                    ? '⚠️ Parameter values are increasing. Monitor closely.'
                    : 'Parameter values are stable.'}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-blue-400">No trend data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrendChart;
