import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AlertTriangle, Eye } from 'lucide-react';

export const OutlierDetection = ({ outliers, loading, onRefresh, className, ...props }) => {
  const [selectedOutlier, setSelectedOutlier] = useState(null);

  if (loading) {
    return (
      <Card className={cn("bg-[#0a2540] border border-[#1e3a5f] shadow-lg", className)} {...props}>
        <CardContent className="py-8 text-center">
          <p className="text-blue-300">Loading outlier data...</p>
        </CardContent>
      </Card>
    );
  }

  const outlierData = outliers?.data || {};
  const outlierList = outlierData.outliers || [];

  return (
    <Card className={cn("bg-[#0a2540] border border-[#1e3a5f] shadow-lg", className)} {...props}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <CardTitle className="text-white text-lg">Outlier Detection</CardTitle>
          </div>
          <Button onClick={onRefresh} variant="outline" size="sm" className="border-[#1e3a5f] text-blue-300">
            Refresh
          </Button>
        </div>
        <p className="text-blue-400 text-sm">
          Parameter: {outlierData.parameter || 'N/A'} | 
          Mean: {outlierData.mean?.toFixed(2) || 'N/A'} | 
          Std Dev: ±{outlierData.stdDev?.toFixed(3) || 'N/A'}
        </p>
      </CardHeader>
      <CardContent>
        {outlierList.length > 0 ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-[#112b4a] rounded-lg mb-2">
              <span className="text-blue-300 text-xs">Total Outliers Found</span>
              <span className="text-yellow-400 font-bold text-lg">{outlierData.outlierCount || 0}</span>
            </div>
            
            {outlierList.slice(0, 5).map((outlier, idx) => (
              <div key={idx} className="p-3 bg-[#112b4a] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-white font-semibold">Value: {outlier.value?.toFixed(3)}</p>
                    <p className="text-blue-400 text-xs">Z-Score: {outlier.zScore?.toFixed(2)}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedOutlier(selectedOutlier === idx ? null : idx)}
                    className="text-blue-400"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
                {selectedOutlier === idx && outlier.fullReading && (
                  <div className="mt-2 pt-2 border-t border-[#1e3a5f]">
                    <p className="text-blue-300 text-xs">Full Reading:</p>
                    <div className="grid grid-cols-2 gap-1 mt-1 text-xs">
                      <span className="text-blue-400">pH:</span>
                      <span className="text-white">{outlier.fullReading.pH}</span>
                      <span className="text-blue-400">TDS:</span>
                      <span className="text-white">{outlier.fullReading.tds} ppm</span>
                      <span className="text-blue-400">Timestamp:</span>
                      <span className="text-white">{new Date(outlier.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {outlierList.length > 5 && (
              <p className="text-blue-400 text-xs text-center">+ {outlierList.length - 5} more outliers</p>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-green-400">✓ No outliers detected</p>
            <p className="text-blue-400 text-xs mt-2">All readings are within normal range</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OutlierDetection;