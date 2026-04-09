import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Clock, MapPin, Droplets, Beaker, Table as TableIcon, Zap, ShieldCheck } from 'lucide-react';

export const LatestReadingCard = ({ latestReading, className, ...props }) => {
  if (!latestReading) {
    return (
      <Card className={cn("bg-[#0a2540] border border-[#1e3a5f] shadow-lg", className)} {...props}>
        <CardContent className="py-8 text-center">
          <p className="text-blue-400">No readings available</p>
        </CardContent>
      </Card>
    );
  }

  const getWQIStatus = (wqi) => {
    if (wqi <= 25) return { label: 'Excellent', color: 'text-green-400 bg-green-400/10' };
    if (wqi <= 50) return { label: 'Good', color: 'text-blue-400 bg-blue-400/10' };
    if (wqi <= 75) return { label: 'Fair', color: 'text-yellow-400 bg-yellow-400/10' };
    return { label: 'Poor', color: 'text-red-400 bg-red-400/10' };
  };

  const status = getWQIStatus(latestReading.waterQualityIndex);

  return (
    <Card className={cn("bg-[#0a2540] border border-[#1e3a5f] shadow-lg", className)} {...props}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-lg">Latest Sensor Reading</CardTitle>
          <div className="flex items-center gap-2 text-blue-400 text-xs">
            <Clock className="h-3 w-3" />
            {new Date(latestReading.createdAt).toLocaleString()}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
          <div className="text-center p-3 bg-[#112b4a] rounded-lg">
            <Droplets className="h-4 w-4 text-cyan-400 mx-auto mb-2" />
            <p className="text-blue-400 text-xs">Turbidity</p>
            <p className="text-white text-lg font-semibold">
              {latestReading.turbidity?.toFixed(2) || '—'}
              <span className="text-xs text-blue-400 ml-1">NTU</span>
            </p>
          </div>
          <div className="text-center p-3 bg-[#112b4a] rounded-lg">
            <Beaker className="h-4 w-4 text-emerald-400 mx-auto mb-2" />
            <p className="text-blue-400 text-xs">pH</p>
            <p className="text-white text-lg font-semibold">{latestReading.pH?.toFixed(1) || '—'}</p>
          </div>
          <div className="text-center p-3 bg-[#112b4a] rounded-lg">
            <TableIcon className="h-4 w-4 text-purple-400 mx-auto mb-2" />
            <p className="text-blue-400 text-xs">TDS</p>
            <p className="text-white text-lg font-semibold">
              {latestReading.tds?.toFixed(0) || '—'}
              <span className="text-xs text-blue-400 ml-1">ppm</span>
            </p>
          </div>
          <div className="text-center p-3 bg-[#112b4a] rounded-lg">
            <Zap className="h-4 w-4 text-orange-400 mx-auto mb-2" />
            <p className="text-blue-400 text-xs">Conductivity</p>
            <p className="text-white text-lg font-semibold">
              {latestReading.electricalConductivity?.toFixed(0) || '—'}
              <span className="text-xs text-blue-400 ml-1">µS/cm</span>
            </p>
          </div>
          <div className="text-center p-3 bg-[#112b4a] rounded-lg">
            <ShieldCheck className="h-4 w-4 text-blue-400 mx-auto mb-2" />
            <p className="text-blue-400 text-xs">WQI</p>
            <p className="text-white text-lg font-semibold">{latestReading.waterQualityIndex?.toFixed(0) || '—'}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#1e3a5f]">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-400" />
            <span className="text-blue-300 text-sm">
              {latestReading.location?.district || 'Unknown'}
              {latestReading.location?.treatmentPlantId && ` (${latestReading.location.treatmentPlantId})`}
            </span>
          </div>
          <span className={cn("px-3 py-1 rounded-full text-xs font-medium", status.color)}>
            {status.label}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default LatestReadingCard;