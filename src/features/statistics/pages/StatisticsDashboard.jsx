import React, { useEffect } from 'react';
import { useStatistics } from '../hooks/useStatistics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  RefreshCw, 
  Activity, 
  Droplets, 
  Beaker, 
  Gauge,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  Clock,
  MapPin,
  ShieldCheck,
  Zap,
  Table as TableIcon
} from 'lucide-react';

export default function StatisticsDashboard() {
  const {
    dashboardStats,
    meanStats,
    minMaxStats,
    classification,
    loading,
    error,
    fetchAllBasicStats,
  } = useStatistics();

  useEffect(() => {
    fetchAllBasicStats();
  }, [fetchAllBasicStats]);

  // Extract data from response structure
  const dashboardData = dashboardStats?.data || {};
  const meanData = meanStats?.data || {};
  const minMaxData = minMaxStats?.data || {};
  const classificationData = classification?.data || {};
  const latestReading = dashboardData.latestReading;

  const getClassificationColor = (classification) => {
    switch(classification) {
      case 'Excellent': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'Good': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'Poor': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'Unsafe': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getWQIStatus = (wqi) => {
    if (wqi <= 25) return { label: 'Excellent', color: 'text-green-400 bg-green-400/10' };
    if (wqi <= 50) return { label: 'Good', color: 'text-blue-400 bg-blue-400/10' };
    if (wqi <= 75) return { label: 'Fair', color: 'text-yellow-400 bg-yellow-400/10' };
    return { label: 'Poor', color: 'text-red-400 bg-red-400/10' };
  };

  if (loading && !dashboardStats) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-[#0a2540]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-[#2C7BE5] mx-auto mb-6"></div>
          <p className="text-blue-300 text-lg mb-2">Loading statistics...</p>
          <p className="text-blue-400 text-sm">Fetching water quality data</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-[#0a2540]">
        <div className="text-center bg-red-900/20 p-8 rounded-2xl border border-red-500">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <p className="text-red-400 text-lg mb-4">Error Loading Statistics</p>
          <p className="text-red-300 text-sm mb-6">{error}</p>
          <Button onClick={fetchAllBasicStats} className="bg-[#2C7BE5] hover:bg-blue-600 text-white">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const qualityCards = [
    { 
      title: 'Turbidity', 
      value: dashboardData.mean?.turbidity?.toFixed(2) || meanData.turbidity?.toFixed(2) || '—', 
      unit: 'NTU', 
      icon: Droplets, 
      color: 'bg-blue-600' 
    },
    { 
      title: 'Water pH', 
      value: dashboardData.mean?.pH?.toFixed(1) || meanData.pH?.toFixed(1) || '—', 
      unit: '', 
      icon: Beaker, 
      color: 'bg-emerald-600' 
    },
    { 
      title: 'TDS', 
      value: dashboardData.mean?.tds?.toFixed(0) || meanData.tds?.toFixed(0) || '—', 
      unit: 'ppm', 
      icon: TableIcon, 
      color: 'bg-indigo-600' 
    },
    { 
      title: 'Conductivity', 
      value: dashboardData.mean?.electricalConductivity?.toFixed(0) || meanData.electricalConductivity?.toFixed(0) || '—', 
      unit: 'µS/cm', 
      icon: Zap, 
      color: 'bg-orange-600' 
    },
    { 
      title: 'Quality Index', 
      value: dashboardData.mean?.wqi?.toFixed(0) || meanData.waterQualityIndex?.toFixed(0) || '—', 
      unit: 'WQI', 
      icon: ShieldCheck, 
      color: 'bg-[#2C7BE5]' 
    },
  ];

  const status = latestReading ? getWQIStatus(latestReading.waterQualityIndex) : null;

  return (
    <div className="space-y-8 p-6 bg-[#0a2540] min-h-screen">
      {/* Header Section */}
      <div className="bg-[#0a2540] border border-[#1e3a5f] rounded-3xl p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-2xl bg-[#2C7BE5] flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white tracking-tight">
                Statistics Dashboard
              </h1>
            </div>
            <p className="text-blue-300 text-lg">
              Comprehensive water quality analytics and statistical insights
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#112b4a] border border-[#2C7BE5]/30 px-6 py-3 rounded-2xl">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <div>
              <p className="text-green-400 font-medium text-sm">DATA ANALYTICS</p>
              <p className="text-blue-400 text-xs">Statistical analysis</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Monitoring Section - Water Quality Metric Cards */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Live Monitoring</h2>
        <p className="text-blue-400 text-sm mb-4">Real-time data from IoT Sensor Node</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {qualityCards.map((card, idx) => (
            <Card key={idx} className="bg-[#0a2540] border border-[#1e3a5f] shadow-lg overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-blue-300">{card.title}</CardTitle>
                  <div className={cn("p-2 rounded-lg", card.color)}>
                    <card.icon className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-bold text-white">{card.value}</div>
                  {card.unit && <div className="text-sm text-blue-400">{card.unit}</div>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Latest Reading Card */}
      {latestReading && (
        <Card className="bg-[#0a2540] border border-[#1e3a5f] shadow-lg">
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
                <p className="text-white text-lg font-semibold">{latestReading.turbidity?.toFixed(2) || '—'} <span className="text-xs text-blue-400">NTU</span></p>
              </div>
              <div className="text-center p-3 bg-[#112b4a] rounded-lg">
                <Beaker className="h-4 w-4 text-emerald-400 mx-auto mb-2" />
                <p className="text-blue-400 text-xs">pH</p>
                <p className="text-white text-lg font-semibold">{latestReading.pH?.toFixed(1) || '—'}</p>
              </div>
              <div className="text-center p-3 bg-[#112b4a] rounded-lg">
                <TableIcon className="h-4 w-4 text-purple-400 mx-auto mb-2" />
                <p className="text-blue-400 text-xs">TDS</p>
                <p className="text-white text-lg font-semibold">{latestReading.tds?.toFixed(0) || '—'} <span className="text-xs text-blue-400">ppm</span></p>
              </div>
              <div className="text-center p-3 bg-[#112b4a] rounded-lg">
                <Zap className="h-4 w-4 text-orange-400 mx-auto mb-2" />
                <p className="text-blue-400 text-xs">Conductivity</p>
                <p className="text-white text-lg font-semibold">{latestReading.electricalConductivity?.toFixed(0) || '—'} <span className="text-xs text-blue-400">µS/cm</span></p>
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
              {status && (
                <span className={cn("px-3 py-1 rounded-full text-xs font-medium", status.color)}>
                  {status.label}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Range Statistics */}
      <Card className="bg-[#0a2540] border border-[#1e3a5f] shadow-lg">
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
                <tr className="hover:bg-[#112b4a] transition-colors">
                  <td className="px-6 py-4 font-medium text-white">pH</td>
                  <td className="px-6 py-4 text-blue-300">{dashboardData.min?.pH?.toFixed(2) || minMaxData.pH?.min?.toFixed(2) || '—'}</td>
                  <td className="px-6 py-4 text-blue-300">{dashboardData.max?.pH?.toFixed(2) || minMaxData.pH?.max?.toFixed(2) || '—'}</td>
                  <td className="px-6 py-4 text-blue-400">6.5 - 8.5</td>
                </tr>
                <tr className="hover:bg-[#112b4a] transition-colors">
                  <td className="px-6 py-4 font-medium text-white">Turbidity (NTU)</td>
                  <td className="px-6 py-4 text-blue-300">{dashboardData.min?.turbidity?.toFixed(2) || minMaxData.turbidity?.min?.toFixed(2) || '—'}</td>
                  <td className="px-6 py-4 text-blue-300">{dashboardData.max?.turbidity?.toFixed(2) || minMaxData.turbidity?.max?.toFixed(2) || '—'}</td>
                  <td className="px-6 py-4 text-blue-400">&lt; 5 NTU</td>
                </tr>
                <tr className="hover:bg-[#112b4a] transition-colors">
                  <td className="px-6 py-4 font-medium text-white">TDS (ppm)</td>
                  <td className="px-6 py-4 text-blue-300">{dashboardData.min?.tds?.toFixed(0) || minMaxData.tds?.min?.toFixed(0) || '—'}</td>
                  <td className="px-6 py-4 text-blue-300">{dashboardData.max?.tds?.toFixed(0) || minMaxData.tds?.max?.toFixed(0) || '—'}</td>
                  <td className="px-6 py-4 text-blue-400">&lt; 500 ppm</td>
                </tr>
                <tr className="hover:bg-[#112b4a] transition-colors">
                  <td className="px-6 py-4 font-medium text-white">Conductivity (µS/cm)</td>
                  <td className="px-6 py-4 text-blue-300">{dashboardData.min?.electricalConductivity?.toFixed(0) || minMaxData.electricalConductivity?.min?.toFixed(0) || '—'}</td>
                  <td className="px-6 py-4 text-blue-300">{dashboardData.max?.electricalConductivity?.toFixed(0) || minMaxData.electricalConductivity?.max?.toFixed(0) || '—'}</td>
                  <td className="px-6 py-4 text-blue-400">&lt; 1000 µS/cm</td>
                </tr>
                <tr className="hover:bg-[#112b4a] transition-colors">
                  <td className="px-6 py-4 font-medium text-white">WQI</td>
                  <td className="px-6 py-4 text-blue-300">{dashboardData.min?.wqi?.toFixed(0) || minMaxData.waterQualityIndex?.min?.toFixed(0) || '—'}</td>
                  <td className="px-6 py-4 text-blue-300">{dashboardData.max?.wqi?.toFixed(0) || minMaxData.waterQualityIndex?.max?.toFixed(0) || '—'}</td>
                  <td className="px-6 py-4 text-blue-400">&gt; 70</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Stability Statistics */}
      <Card className="bg-[#0a2540] border border-[#1e3a5f] shadow-lg">
        <CardHeader>
          <CardTitle className="text-white text-lg">Stability Analysis</CardTitle>
          <p className="text-blue-400 text-sm">Standard deviation - lower values indicate more stable water quality</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-[#112b4a] rounded-lg">
              <p className="text-blue-300 text-sm mb-1">pH Stability</p>
              <p className="text-white text-lg font-semibold">±{dashboardData.stdDev?.pH?.toFixed(3) || '—'}</p>
              <p className="text-blue-400 text-xs mt-1">
                {dashboardData.stdDev?.pH < 0.3 ? '✓ Very Stable' : dashboardData.stdDev?.pH < 0.5 ? '⚠️ Stable' : '❌ Variable'}
              </p>
            </div>
            <div className="p-3 bg-[#112b4a] rounded-lg">
              <p className="text-blue-300 text-sm mb-1">Turbidity Stability</p>
              <p className="text-white text-lg font-semibold">±{dashboardData.stdDev?.turbidity?.toFixed(3) || '—'} NTU</p>
              <p className="text-blue-400 text-xs mt-1">
                {dashboardData.stdDev?.turbidity < 0.5 ? '✓ Very Stable' : dashboardData.stdDev?.turbidity < 1 ? '⚠️ Stable' : '❌ Variable'}
              </p>
            </div>
            <div className="p-3 bg-[#112b4a] rounded-lg">
              <p className="text-blue-300 text-sm mb-1">TDS Stability</p>
              <p className="text-white text-lg font-semibold">±{dashboardData.stdDev?.tds?.toFixed(2) || '—'} ppm</p>
              <p className="text-blue-400 text-xs mt-1">
                {dashboardData.stdDev?.tds < 20 ? '✓ Very Stable' : dashboardData.stdDev?.tds < 50 ? '⚠️ Stable' : '❌ Variable'}
              </p>
            </div>
            <div className="p-3 bg-[#112b4a] rounded-lg">
              <p className="text-blue-300 text-sm mb-1">WQI Stability</p>
              <p className="text-white text-lg font-semibold">±{dashboardData.stdDev?.wqi?.toFixed(3) || '—'}</p>
              <p className="text-blue-400 text-xs mt-1">
                {dashboardData.stdDev?.wqi < 5 ? '✓ Very Stable' : dashboardData.stdDev?.wqi < 10 ? '⚠️ Stable' : '❌ Variable'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Water Quality Classification Distribution */}
      <Card className="bg-[#0a2540] border border-[#1e3a5f] shadow-lg">
        <CardHeader>
          <CardTitle className="text-white text-lg">Water Quality Distribution</CardTitle>
          <p className="text-blue-400 text-sm">Classification of all recorded readings</p>
        </CardHeader>
        <CardContent>
          {classificationData.overall?.avgWQI && (
            <div className="mb-6 p-4 bg-[#112b4a] rounded-lg text-center">
              <p className="text-blue-300 text-sm mb-1">Overall Average WQI</p>
              <p className="text-3xl font-bold text-white">{classificationData.overall?.avgWQI?.toFixed(1)}</p>
              <p className={cn("text-sm font-medium mt-1 inline-block px-3 py-1 rounded-full", getClassificationColor(classificationData.overall?.classification))}>
                {classificationData.overall?.classification || 'N/A'}
              </p>
            </div>
          )}

          <div className="space-y-4">
            {(classificationData.distribution || []).map((item, idx) => {
              const total = classificationData.distribution.reduce((sum, cat) => sum + (cat.count || 0), 0);
              const percentage = total > 0 ? (item.count / total * 100).toFixed(1) : 0;
              let barColor = '';
              if (item.category === 'Excellent') barColor = 'bg-green-500';
              else if (item.category === 'Good') barColor = 'bg-blue-500';
              else if (item.category === 'Poor') barColor = 'bg-yellow-500';
              else barColor = 'bg-red-500';
              
              return (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={cn("font-medium", 
                      item.category === 'Excellent' ? 'text-green-400' : 
                      item.category === 'Good' ? 'text-blue-400' : 
                      item.category === 'Poor' ? 'text-yellow-400' : 'text-red-400'
                    )}>{item.category}</span>
                    <span className="text-blue-300">{item.count} readings ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-[#0a2540] rounded-full h-2">
                    <div className={cn("h-2 rounded-full", barColor)} style={{ width: `${percentage}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          {(!classificationData.distribution || classificationData.distribution.length === 0) && (
            <div className="text-center py-8">
              <p className="text-blue-400">No classification data available</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Footer */}
      {dashboardData.totalReadings > 0 && (
        <div className="bg-[#112b4a] rounded-xl p-4 text-center">
          <p className="text-blue-300 text-sm">
            Based on {dashboardData.totalReadings.toLocaleString()} sensor readings
          </p>
        </div>
      )}

      {/* Refresh Button Floating */}
      <div className="fixed bottom-6 right-6">
        <Button
          onClick={fetchAllBasicStats}
          className="bg-[#2C7BE5] hover:bg-blue-600 text-white rounded-full shadow-lg px-4 py-2"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>
    </div>
  );
}