import React from 'react';
import { useWaterSocket } from '@/features/waterQuality/hooks/useWaterSocket';
import { WaterQualityCard } from '@/features/waterQuality/components/WaterQualityCard';
import { TurbidityChart } from '@/features/waterQuality/components/TurbidityChart';
import { RecentReadingsTable } from '@/features/waterQuality/components/RecentReadingsTable';
import { 
  Droplets, 
  Activity, 
  Table as TableIcon, 
  Zap, 
  ShieldCheck 
} from 'lucide-react';

export default function LiveWaterDashboard() {
  const { data, history, isConnected, error } = useWaterSocket();

  // Loading / Error States
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-red-400">
        <div className="text-center">
          <p className="text-xl">Connection Error</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (!isConnected || !data) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center py-12">
      <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-[#2C7BE5] mx-auto mb-6"></div>
      <p className="text-blue-300 text-lg mb-2">Connecting to real-time server...</p>
      <p className="text-blue-400 text-sm mb-6">Waiting for sensor data</p>
      
      <button 
        onClick={() => window.location.reload()} 
        className="px-8 py-3 bg-[#2C7BE5] hover:bg-blue-600 text-white rounded-2xl font-medium transition-colors"
      >
        Reconnect Now
      </button>
    </div>
  );
}

  return (
    <div className="space-y-8">
      {/* Header */}
    <div className="bg-[#0a2540] border-b border-[#1e3a5f] rounded-3xl p-8 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-2xl bg-[#2C7BE5] flex items-center justify-center text-white">
              💧
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Live Water Quality Dashboard
            </h1>
          </div>
          <p className="text-blue-300 text-lg">
            Real-time monitoring from IoT sensors • Updated instantly
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#112b4a] border border-[#2C7BE5]/30 px-6 py-3 rounded-2xl">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </div>
          <div>
            <p className="text-green-400 font-medium text-sm">LIVE • CONNECTED</p>
            <p className="text-blue-400 text-xs">Real-time data streaming</p>
          </div>
        </div>
      </div>
    </div>

      {/* Water Quality Metric Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <WaterQualityCard 
          title="Turbidity" 
          value={data.turbidity?.toFixed(2) ?? '—'} 
          unit="NTU" 
          icon={Droplets} 
          color="bg-blue-600" 
        />
        <WaterQualityCard 
          title="pH Level" 
          value={data.pH?.toFixed(1) ?? '—'} 
          unit="" 
          icon={Activity} 
          color="bg-emerald-600" 
        />
        <WaterQualityCard 
          title="TDS" 
          value={data.tds?.toFixed(0) ?? '—'} 
          unit="ppm" 
          icon={TableIcon} 
          color="bg-indigo-600" 
        />
        <WaterQualityCard 
          title="Conductivity" 
          value={data.electricalConductivity?.toFixed(0) ?? '—'} 
          unit="µS/cm" 
          icon={Zap} 
          color="bg-orange-600" 
        />
        <WaterQualityCard 
          title="Quality Index" 
          value={data.waterQualityIndex?.toFixed(0) ?? '—'} 
          unit="WQI" 
          icon={ShieldCheck} 
          color="bg-[#2C7BE5]" 
        />
      </div>

      {/* Charts Section */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Trends</h2>
        <TurbidityChart history={history} />
      </div>

      {/* Recent Readings */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Recent Sensor Readings</h2>
        <RecentReadingsTable readings={[...history].reverse().slice(0, 10)} />
      </div>
    </div>
  );
}