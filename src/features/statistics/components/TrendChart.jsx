// src/features/statistics/components/TrendChart.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';           // ← Make sure this exists
import { RefreshCw, TrendingUp } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils';

const C = {
  pageBg: '#081627', cardBg: '#0d2137', cardBg2: '#102840',
  border: '#16354f', divider: '#1a3f5c', muted: '#4a7a9b',
  subtext: '#7aadc8', text: '#ddeef8',
  teal: '#10b981', blue: '#3b82f6', purple: '#a855f7',
  amber: '#f59e0b', red: '#ef4444', cyan: '#06b6d4',
};

const PERIOD_OPTIONS = [
  { value: 'today', label: 'Today' },
  { value: 'last_7_days', label: 'Last 7 Days' },
  { value: 'last_30_days', label: 'Last 30 Days' },
  { value: 'this_month', label: 'This Month' },
  { value: 'this_year', label: 'This Year' },
];

const METRIC_META = {
  pH: { color: C.teal, label: 'pH Level', unit: '' },
  TDS: { color: C.blue, label: 'TDS', unit: ' ppm' },
  Turbidity: { color: C.purple, label: 'Turbidity', unit: ' NTU' },
  Conductivity: { color: C.amber, label: 'Conductivity', unit: ' μS/cm' },
  WQI: { color: C.cyan, label: 'Water Quality Index', unit: '' },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#081e30] border border-[#16354f] rounded-lg p-3 shadow-xl z-50">
      <p className="text-[#7aadc8] text-xs mb-1 font-semibold">{label}</p>
      {payload.map((p, idx) => (
        <div key={idx} className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-[#7aadc8]">{METRIC_META[p.dataKey]?.label || p.name}:</span>
          <span className="text-white font-bold">
            {p.value !== null ? p.value : 'No Data'}
            {METRIC_META[p.dataKey]?.unit || ''}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function TrendChart({
  trendStats = [],
  fetchTrendLineData,
  loading = false,
  onPeriodChange,
  className,
}) {
  const [selectedPeriod, setSelectedPeriod] = useState('last_30_days');
  const [activeMetrics, setActiveMetrics] = useState(Object.keys(METRIC_META));
  const [isRefreshing, setIsRefreshing] = useState(false);

  const lineData = useMemo(() => {
    if (!Array.isArray(trendStats) || trendStats.length === 0) return [];
    return trendStats.map(item => ({
      date: item.date || 'N/A',
      pH: item.avgPH !== null ? Number(item.avgPH) : null,
      TDS: item.avgTDS !== null ? Number(item.avgTDS) : null,
      Turbidity: item.avgTurbidity !== null ? Number(item.avgTurbidity) : null,
      Conductivity: item.avgConductivity !== null ? Number(item.avgConductivity) : null,
      WQI: item.avgWQI !== null ? Number(item.avgWQI) : null,
    }));
  }, [trendStats]);

  const handlePeriodChange = (newPeriod) => {
    setSelectedPeriod(newPeriod);
    if (onPeriodChange) onPeriodChange(newPeriod);
  };

  const handleRefresh = async () => {
    if (!fetchTrendLineData) return;
    
    setIsRefreshing(true);
    try {
      await fetchTrendLineData(selectedPeriod);
    } catch (error) {
      console.error("Refresh failed:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTrendLineData?.(selectedPeriod);
  }, [selectedPeriod, fetchTrendLineData]);

  const toggleMetric = (k) => {
    setActiveMetrics(prev =>
      prev.includes(k) ? prev.filter(x => x !== k) : [...prev, k]
    );
  };

const getTickFormatter = (value) => {
  if (!value) return '';
  
  if (selectedPeriod === 'today') {
    return `${value}:00`;           // Shows "03:00", "04:00" etc.
  }

  if (['last_7_days', 'last_30_days'].includes(selectedPeriod)) {
    const date = new Date(value);
    return isNaN(date) ? value : date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  }

  if (selectedPeriod === 'this_month') return `Day ${value}`;

  if (selectedPeriod === 'this_year') {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months[parseInt(value) - 1] || value;
  }
  return value;
};

  const getInterval = () => {
    if (selectedPeriod === 'last_30_days') return 2;
    if (selectedPeriod === 'this_month') return 2;
    return 0;
  };

  if (loading && !isRefreshing) {
    return (
      <Card className="bg-[#0d2137] border-[#16354f]">
        <CardContent className="py-24 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-500 border-r-transparent" />
          <p className="mt-4 text-[#4a7a9b]">Fetching trend data...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Top Bar with Refresh + Period Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-white text-xl font-semibold flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-teal-500" />
          Trend Analysis
        </h2>

        <div className="flex items-center gap-3">
          <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              variant="outline"
              size="sm"
              className="bg-[#0d2137] border-[#16354f] text-[#7aadc8] 
                        hover:bg-[#1e3a5f] 
                        hover:border-[#38bdf8] 
                        hover:text-[#38bdf8] 
                        transition-all duration-200"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>

          <Select value={selectedPeriod} onValueChange={handlePeriodChange}>
            <SelectTrigger className="w-[160px] bg-[#0d2137] border-[#16354f] text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#0d2137] border-[#16354f]">
              {PERIOD_OPTIONS.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Chart Card */}
      <Card className="bg-[#0d2137] border-[#16354f]">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-lg">Parameter Trends Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.entries(METRIC_META).map(([key, { color, label }]) => (
              <button
                key={key}
                onClick={() => toggleMetric(key)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium transition-all border",
                  activeMetrics.includes(key) ? "text-white" : "text-[#4a7a9b] border-[#16354f]"
                )}
                style={{
                  backgroundColor: activeMetrics.includes(key) ? color : 'transparent',
                  borderColor: color
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={340}>
            <AreaChart data={lineData} margin={{ top: 10, right: 30, left: 10, bottom: 60 }}>
              <defs>
                {Object.entries(METRIC_META).map(([key, { color }]) => (
                  <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.35} />
                    <stop offset="95%" stopColor={color} stopOpacity={0.05} />
                  </linearGradient>
                ))}
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke={C.divider} vertical={false} />

              <XAxis
                dataKey="date"
                tick={{ fill: C.muted, fontSize: 11 }}
                axisLine={false}
                tickFormatter={getTickFormatter}
                interval={getInterval()}
                angle={['last_30_days', 'this_month'].includes(selectedPeriod) ? -45 : 0}
                textAnchor={['last_30_days', 'this_month'].includes(selectedPeriod) ? 'end' : 'middle'}
                height={70}
              />

              <YAxis tick={{ fill: C.muted, fontSize: 11 }} axisLine={false} />

              <Tooltip content={<CustomTooltip />} />

              {Object.entries(METRIC_META).map(([key, { color }]) =>
                activeMetrics.includes(key) && (
                  <Area
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={color}
                    strokeWidth={2.5}
                    fill={`url(#grad-${key})`}
                    dot={false}
                    connectNulls={false}
                    isAnimationActive={false}
                  />
                )
              )}
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}