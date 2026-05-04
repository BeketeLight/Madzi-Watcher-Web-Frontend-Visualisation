import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MapPin, TrendingUp } from 'lucide-react';

export const DistrictSelector = ({ districts, onSelectDistrict, selectedDistrict, districtStats, loading, className, ...props }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (loading) {
    return (
      <Card className={cn("bg-[#0a2540] border border-[#1e3a5f] shadow-lg", className)} {...props}>
        <CardContent className="py-8 text-center">
          <p className="text-blue-300">Loading district data...</p>
        </CardContent>
      </Card>
    );
  }

  const stats = districtStats?.data?.district || {};

  return (
    <Card className={cn("bg-[#0a2540] border border-[#1e3a5f] shadow-lg", className)} {...props}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-400" />
            <CardTitle className="text-white text-lg">District Analysis</CardTitle>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="border-[#1e3a5f] text-blue-300"
          >
            {isExpanded ? 'Show Less' : 'All Districts'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-6">
          {districts?.map((district) => (
            <Button
              key={district}
              variant={selectedDistrict === district ? "default" : "outline"}
              size="sm"
              onClick={() => onSelectDistrict(district)}
              className={cn(
                selectedDistrict === district 
                  ? "bg-blue-600 text-white" 
                  : "border-[#1e3a5f] text-blue-300 hover:bg-[#112b4a]"
              )}
            >
              {district}
            </Button>
          ))}
        </div>

        {selectedDistrict && stats && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-[#112b4a] rounded-lg text-center">
                <p className="text-blue-400 text-xs">Total Readings</p>
                <p className="text-white text-xl font-bold">{stats.totalReadings || 0}</p>
              </div>
              <div className="p-3 bg-[#112b4a] rounded-lg text-center">
                <p className="text-blue-400 text-xs">Avg WQI</p>
                <p className="text-white text-xl font-bold">{stats.avgWQI?.toFixed(1) || '—'}</p>
              </div>
              <div className="p-3 bg-[#112b4a] rounded-lg text-center">
                <p className="text-blue-400 text-xs">Min WQI</p>
                <p className="text-white text-xl font-bold">{stats.minWQI?.toFixed(1) || '—'}</p>
              </div>
              <div className="p-3 bg-[#112b4a] rounded-lg text-center">
                <p className="text-blue-400 text-xs">Max WQI</p>
                <p className="text-white text-xl font-bold">{stats.maxWQI?.toFixed(1) || '—'}</p>
              </div>
            </div>

            <div className="p-3 bg-[#112b4a] rounded-lg">
              <p className="text-blue-300 text-sm mb-2">Averages by Parameter</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-blue-400 text-sm">pH:</span>
                  <span className="text-white">{stats.avgPH?.toFixed(2) || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-400 text-sm">TDS:</span>
                  <span className="text-white">{stats.avgTDS?.toFixed(0) || '—'} ppm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-400 text-sm">Turbidity:</span>
                  <span className="text-white">{stats.avgTurbidity?.toFixed(2) || '—'} NTU</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-400 text-sm">Conductivity:</span>
                  <span className="text-white">{stats.avgConductivity?.toFixed(0) || '—'} µS/cm</span>
                </div>
              </div>
            </div>

            {stats.stdDevWQI && (
              <div className="p-3 bg-[#112b4a] rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-blue-300 text-sm">WQI Stability</span>
                  <span className={cn("text-sm", stats.stdDevWQI < 10 ? 'text-green-400' : 'text-yellow-400')}>
                    ±{stats.stdDevWQI?.toFixed(2)}
                  </span>
                </div>
                <div className="w-full bg-[#0a2540] rounded-full h-1 mt-2">
                  <div 
                    className={cn("h-1 rounded-full", stats.stdDevWQI < 10 ? 'bg-green-500' : 'bg-yellow-500')}
                    style={{ width: `${Math.min(100, (stats.stdDevWQI / 20) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DistrictSelector;


