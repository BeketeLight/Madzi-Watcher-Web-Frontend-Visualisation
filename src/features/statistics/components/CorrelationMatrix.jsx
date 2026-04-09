import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Link } from 'lucide-react';

export const CorrelationMatrix = ({ correlations, loading, className, ...props }) => {
  if (loading) {
    return (
      <Card className={cn("bg-[#0a2540] border border-[#1e3a5f] shadow-lg", className)} {...props}>
        <CardContent className="py-8 text-center">
          <p className="text-blue-300">Loading correlation data...</p>
        </CardContent>
      </Card>
    );
  }

  const getCorrelationStrength = (correlation) => {
    const abs = Math.abs(correlation);
    if (abs >= 0.7) return { text: 'Strong', color: 'text-green-400' };
    if (abs >= 0.4) return { text: 'Moderate', color: 'text-yellow-400' };
    return { text: 'Weak', color: 'text-gray-400' };
  };

  const getCorrelationColor = (correlation) => {
    if (correlation > 0.5) return 'bg-green-500/20 border-green-500/50';
    if (correlation > 0) return 'bg-blue-500/20 border-blue-500/50';
    if (correlation > -0.5) return 'bg-yellow-500/20 border-yellow-500/50';
    return 'bg-red-500/20 border-red-500/50';
  };

  const correlationPairs = correlations ? Object.entries(correlations) : [];

  return (
    <Card className={cn("bg-[#0a2540] border border-[#1e3a5f] shadow-lg", className)} {...props}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Link className="h-5 w-5 text-blue-400" />
          <CardTitle className="text-white text-lg">Parameter Correlations</CardTitle>
        </div>
        <p className="text-blue-400 text-sm">How different parameters relate to each other</p>
      </CardHeader>
      <CardContent>
        {correlationPairs.length > 0 ? (
          <div className="space-y-3">
            {correlationPairs.map(([pair, correlation]) => {
              const strength = getCorrelationStrength(correlation);
              const displayName = pair.replace(/_/g, ' → ').toUpperCase();
              return (
                <div key={pair} className={cn("p-3 rounded-lg border", getCorrelationColor(correlation))}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm font-medium">{displayName}</p>
                      <p className="text-blue-400 text-xs">Correlation coefficient</p>
                    </div>
                    <div className="text-right">
                      <p className={cn("text-xl font-bold", strength.color)}>
                        {correlation > 0 ? '+' : ''}{correlation.toFixed(3)}
                      </p>
                      <p className={cn("text-xs", strength.color)}>{strength.text} correlation</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-[#0a2540] rounded-full h-1">
                      <div 
                        className={cn("h-1 rounded-full", 
                          correlation > 0 ? 'bg-green-500' : correlation < 0 ? 'bg-red-500' : 'bg-gray-500'
                        )}
                        style={{ width: `${Math.abs(correlation) * 100}%` }}
                      />
                    </div>
                    <p className="text-blue-400 text-xs mt-1">
                      {correlation > 0 
                        ? 'Positive correlation (when one increases, the other tends to increase)'
                        : correlation < 0
                        ? 'Negative correlation (when one increases, the other tends to decrease)'
                        : 'No correlation'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-blue-400">No correlation data available</p>
            <p className="text-blue-500 text-xs mt-2">Need at least 2 data points for correlation analysis</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CorrelationMatrix;