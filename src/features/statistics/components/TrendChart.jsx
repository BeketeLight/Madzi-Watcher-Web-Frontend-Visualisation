
// src/features/statistics/components/TrendChart.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell,
  BarChart, Bar, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, AreaChart, Area,
} from 'recharts';
import { TrendingUp, PieChart as PieIcon, BarChart2, Activity, Zap, Sigma } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Colours ──────────────────────────────────────────────────────────────────
const C = {
  pageBg:  '#081627',
  cardBg:  '#0d2137',
  cardBg2: '#102840',
  border:  '#16354f',
  divider: '#1a3f5c',
  muted:   '#4a7a9b',
  subtext: '#7aadc8',
  text:    '#ddeef8',
  teal:    '#10b981',
  blue:    '#3b82f6',
  purple:  '#a855f7',
  amber:   '#f59e0b',
  red:     '#ef4444',
  cyan:    '#06b6d4',
};

const PERIOD_OPTIONS = [
  { value: 'today',        label: 'Today' },
  { value: 'last_7_days',  label: 'Last 7 Days' },
  { value: 'last_30_days', label: 'Last 30 Days' },
  { value: 'this_month',   label: 'This Month' },
  { value: 'this_year',    label: 'This Year' },
  { value: 'all',          label: 'All Time' },
];

const METRIC_META = {
  pH:           { color: C.teal,   label: 'pH Level',            unit: ''       },
  TDS:          { color: C.blue,   label: 'TDS',                 unit: ' ppm'   },
  Turbidity:    { color: C.purple, label: 'Turbidity',           unit: ' NTU'   },
  Conductivity: { color: C.amber,  label: 'Conductivity',        unit: ' μS/cm' },
  WQI:          { color: C.cyan,   label: 'Water Quality Index', unit: ''       },
};

const PIE_DEFAULT = [
  { name: 'Excellent', value: 0, color: C.teal   },
  { name: 'Good',      value: 0, color: C.blue   },
  { name: 'Poor',      value: 0, color: C.amber  },
  { name: 'Unsafe',    value: 0, color: C.red    },
];

// ─── DUMMY DATA (used when no real data) ─────────────────────────────────────
const DUMMY_LINE_DATA = [
  { date: 'Day 1', pH: 7.2, TDS: 320, Turbidity: 2.5, Conductivity: 850, WQI: 85 },
  { date: 'Day 2', pH: 7.3, TDS: 315, Turbidity: 2.3, Conductivity: 845, WQI: 86 },
  { date: 'Day 3', pH: 7.4, TDS: 310, Turbidity: 2.1, Conductivity: 840, WQI: 87 },
  { date: 'Day 4', pH: 7.3, TDS: 312, Turbidity: 2.2, Conductivity: 842, WQI: 86 },
  { date: 'Day 5', pH: 7.5, TDS: 308, Turbidity: 2.0, Conductivity: 838, WQI: 88 },
  { date: 'Day 6', pH: 7.4, TDS: 305, Turbidity: 1.9, Conductivity: 835, WQI: 89 },
  { date: 'Day 7', pH: 7.6, TDS: 300, Turbidity: 1.8, Conductivity: 830, WQI: 90 },
];

const DUMMY_PIE_DATA = [
  { name: 'Excellent', value: 15, color: C.teal },
  { name: 'Good', value: 25, color: C.blue },
  { name: 'Poor', value: 8, color: C.amber },
  { name: 'Unsafe', value: 2, color: C.red },
];

const DUMMY_HIST_DATA = [
  { range: '0–20', count: 2, color: C.red },
  { range: '21–40', count: 5, color: C.amber },
  { range: '41–60', count: 8, color: '#eab308' },
  { range: '61–80', count: 20, color: C.blue },
  { range: '81–100', count: 15, color: C.teal },
];

const DUMMY_RADAR_DATA = [
  { metric: 'pH', Latest: 7.4, Average: 7.3 },
  { metric: 'TDS', Latest: 310, Average: 315 },
  { metric: 'Turbidity', Latest: 2.1, Average: 2.3 },
  { metric: 'Conductivity', Latest: 840, Average: 845 },
  { metric: 'WQI', Latest: 87, Average: 86 },
];

const DUMMY_STATS = [
  { name: 'Average', value: 75.5, color: C.teal },
  { name: 'Std Dev', value: 12.3, color: C.blue },
  { name: 'Variance', value: 151.3, color: C.purple },
  { name: 'Range', value: 45.0, color: C.amber },
];

function buildHistogram(data, key) {
  const buckets = [
    { range: '0–20',   min: 0,  max: 20,  count: 0, color: C.red    },
    { range: '21–40',  min: 21, max: 40,  count: 0, color: C.amber  },
    { range: '41–60',  min: 41, max: 60,  count: 0, color: '#eab308'},
    { range: '61–80',  min: 61, max: 80,  count: 0, color: C.blue   },
    { range: '81–100', min: 81, max: 100, count: 0, color: C.teal   },
  ];
  data.forEach(d => {
    const b = buckets.find(b => d[key] >= b.min && d[key] <= b.max);
    if (b) b.count += 1;
  });
  return buckets;
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#081e30] border border-[#16354f] rounded-lg p-3 shadow-xl">
      <p className="text-[#7aadc8] text-xs mb-1 font-semibold">{label}</p>
      {payload.map((p, idx) => (
        <div key={idx} className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-[#7aadc8]">{METRIC_META[p.dataKey]?.label || p.name}:</span>
          <span className="text-white font-bold">{p.value}{METRIC_META[p.dataKey]?.unit || ''}</span>
        </div>
      ))}
    </div>
  );
};

// ─── Donut Chart Component ───────────────────────────────────────────────────
function DonutChart({ data, size = 220 }) {
  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.38;
  const r = size * 0.25;
  const total = data.reduce((s, d) => s + d.value, 0);
  const [hovered, setHovered] = useState(null);

  if (total === 0) {
    return (
      <div className="flex justify-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.divider} strokeWidth={2} strokeDasharray="8 4" />
          <text x={cx} y={cy} textAnchor="middle" fill={C.muted} fontSize={size * 0.08} fontWeight={500}>No Data</text>
        </svg>
      </div>
    );
  }

  let startAngle = -Math.PI / 2;
  const slices = data.map((d, i) => {
    const angle = (d.value / total) * 2 * Math.PI;
    const endAngle = startAngle + angle;
    const gap = 0.04;
    const s = startAngle + gap / 2;
    const e = endAngle - gap / 2;
    const x1 = cx + R * Math.cos(s);
    const y1 = cy + R * Math.sin(s);
    const x2 = cx + R * Math.cos(e);
    const y2 = cy + R * Math.sin(e);
    const x3 = cx + r * Math.cos(e);
    const y3 = cy + r * Math.sin(e);
    const x4 = cx + r * Math.cos(s);
    const y4 = cy + r * Math.sin(s);
    const large = angle > Math.PI ? 1 : 0;
    const path = `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${r} ${r} 0 ${large} 0 ${x4} ${y4} Z`;
    startAngle = endAngle;
    return { ...d, path, pct: ((d.value / total) * 100).toFixed(1), index: i };
  });

  return (
    <div className="flex justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {slices.map((s) => (
          <path
            key={s.index}
            d={s.path}
            fill={s.color}
            opacity={hovered === null || hovered === s.index ? 1 : 0.4}
            style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}
            onMouseEnter={() => setHovered(s.index)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
        <text x={cx} y={cy - 6} textAnchor="middle" fill={C.text} fontSize={size * 0.1} fontWeight={800}>{total}</text>
        <text x={cx} y={cy + size * 0.065} textAnchor="middle" fill={C.muted} fontSize={size * 0.055} letterSpacing={1}>TOTAL</text>
        {hovered !== null && (
          <>
            <text x={cx} y={cy - 6} textAnchor="middle" fill={slices[hovered].color} fontSize={size * 0.09} fontWeight={800}>{slices[hovered].pct}%</text>
            <text x={cx} y={cy + size * 0.065} textAnchor="middle" fill={C.subtext} fontSize={size * 0.052}>{slices[hovered].name}</text>
          </>
        )}
      </svg>
    </div>
  );
}

// ─── Stats Donut Chart ───────────────────────────────────────────────────────
function StatsDonutChart({ data, size = 200 }) {
  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.38;
  const r = size * 0.25;
  const total = data.reduce((s, d) => s + d.value, 0);
  const [hovered, setHovered] = useState(null);

  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.divider} strokeWidth={2} strokeDasharray="8 4" />
          <text x={cx} y={cy} textAnchor="middle" fill={C.muted} fontSize={size * 0.08} fontWeight={500}>No Data</text>
        </svg>
        <p className="text-[#4a7a9b] text-xs mt-2">Select a parameter</p>
      </div>
    );
  }

  let startAngle = -Math.PI / 2;
  const slices = data.map((d, i) => {
    const angle = (d.value / total) * 2 * Math.PI;
    const endAngle = startAngle + angle;
    const gap = 0.04;
    const s = startAngle + gap / 2;
    const e = endAngle - gap / 2;
    const x1 = cx + R * Math.cos(s);
    const y1 = cy + R * Math.sin(s);
    const x2 = cx + R * Math.cos(e);
    const y2 = cy + R * Math.sin(e);
    const x3 = cx + r * Math.cos(e);
    const y3 = cy + r * Math.sin(e);
    const x4 = cx + r * Math.cos(s);
    const y4 = cy + r * Math.sin(s);
    const large = angle > Math.PI ? 1 : 0;
    const path = `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${r} ${r} 0 ${large} 0 ${x4} ${y4} Z`;
    startAngle = endAngle;
    return { ...d, path, pct: ((d.value / total) * 100).toFixed(1), index: i };
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {slices.map((s) => (
          <path
            key={s.index}
            d={s.path}
            fill={s.color}
            opacity={hovered === null || hovered === s.index ? 1 : 0.4}
            style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}
            onMouseEnter={() => setHovered(s.index)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
        <text x={cx} y={cy - 4} textAnchor="middle" fill={C.text} fontSize={size * 0.09} fontWeight={800}>
          {hovered !== null ? slices[hovered].pct + '%' : ''}
        </text>
      </svg>
      <div className="flex flex-wrap justify-center gap-3 mt-3">
        {slices.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="text-[#7aadc8] text-xs">{s.name}</span>
            <span className="text-white text-xs font-semibold">{s.value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function TrendChart({
  trendStats,
  classification,
  fetchTrendLineData,
  loading = false,
  className,
}) {
  const [selectedPeriod, setSelectedPeriod] = useState('last_30_days');
  const [activeMetrics, setActiveMetrics] = useState(Object.keys(METRIC_META));
  const [selectedStatParam, setSelectedStatParam] = useState('WQI');
  const [statMetrics, setStatMetrics] = useState([]);

  // Check if we have real data
  const hasRealData = trendStats && Array.isArray(trendStats) && trendStats.length > 0;

  useEffect(() => {
    fetchTrendLineData?.(selectedPeriod);
  }, [selectedPeriod, fetchTrendLineData]);

  // Use real data or dummy data
  const lineData = hasRealData
    ? trendStats.map(item => ({
        date: item.date || item.month || item.year || 'N/A',
        pH: Number(item.avgPH?.toFixed(2)) || Number(item.pH?.toFixed(2)) || 0,
        TDS: Number(item.avgTDS?.toFixed(0)) || Number(item.TDS?.toFixed(0)) || 0,
        Turbidity: Number(item.avgTurbidity?.toFixed(2)) || Number(item.Turbidity?.toFixed(2)) || 0,
        Conductivity: Number(item.avgConductivity?.toFixed(0)) || Number(item.Conductivity?.toFixed(0)) || 0,
        WQI: Number(item.avgWQI?.toFixed(1)) || Number(item.WQI?.toFixed(1)) || 0,
      }))
    : DUMMY_LINE_DATA;

  // Pie Data
  const rawDistribution = classification?.data?.distribution || classification?.distribution;
  const pieData = (rawDistribution && Array.isArray(rawDistribution) && rawDistribution.length > 0)
    ? rawDistribution.map(item => ({
        name: item.category || item.name,
        value: item.count || item.value,
        color: item.category === 'Excellent' ? C.teal :
               item.category === 'Good' ? C.blue :
               item.category === 'Poor' ? C.amber : C.red
      }))
    : (hasRealData ? PIE_DEFAULT : DUMMY_PIE_DATA);

  // Histogram Data
  const histData = hasRealData && lineData.length > 0
    ? buildHistogram(lineData, 'WQI')
    : DUMMY_HIST_DATA;

  // Radar Data
  const latest = lineData[lineData.length - 1] || {};
  const avgVal = (key) => lineData.length
    ? lineData.reduce((sum, d) => sum + (d[key] || 0), 0) / lineData.length
    : 0;

  const radarData = (hasRealData && lineData.length > 0)
    ? Object.entries(METRIC_META).map(([key, { label }]) => ({
        metric: label === 'Water Quality Index' ? 'WQI' : label.replace(' Level', ''),
        Latest: latest[key] || 0,
        Average: avgVal(key),
      }))
    : DUMMY_RADAR_DATA;

  // Statistical Metrics
  useEffect(() => {
    if (!lineData.length) {
      setStatMetrics(hasRealData ? [] : DUMMY_STATS);
      return;
    }
    const values = lineData.map(d => d[selectedStatParam]).filter(v => v > 0);
    if (values.length === 0) {
      setStatMetrics([]);
      return;
    }
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
    const stdDev = Math.sqrt(variance);
    const range = Math.max(...values) - Math.min(...values);
    setStatMetrics([
      { name: 'Average', value: mean, color: C.teal },
      { name: 'Std Dev', value: stdDev, color: C.blue },
      { name: 'Variance', value: variance, color: C.purple },
      { name: 'Range', value: range, color: C.amber },
    ]);
  }, [selectedStatParam, lineData]);

  const total = pieData.reduce((s, d) => s + d.value, 0);

  const toggleMetric = (k) => {
    setActiveMetrics(prev => prev.includes(k) ? prev.filter(x => x !== k) : [...prev, k]);
  };

  const handlePeriodChange = (val) => {
    setSelectedPeriod(val);
    fetchTrendLineData?.(val);
  };

  if (loading) {
    return (
      <Card className="bg-[#0d2137] border-[#16354f]">
        <CardContent className="py-12 text-center">
          <p className="text-[#4a7a9b]">Loading chart data…</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Period Filter */}
      <div className="flex justify-end">
        <Select value={selectedPeriod} onValueChange={handlePeriodChange}>
          <SelectTrigger className="w-[150px] bg-[#0d2137] border-[#16354f] text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#0d2137] border-[#16354f]">
            {PERIOD_OPTIONS.map(opt => (
              <SelectItem key={opt.value} value={opt.value} className="text-white hover:bg-[#1a3f5c] focus:bg-[#1a3f5c]">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Chart 1: Area Trend */}
      <Card className="bg-[#0d2137] border-[#16354f]">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#10b981]" />
            <CardTitle className="text-white text-lg">Parameter Trends Over Time</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.entries(METRIC_META).map(([key, { color, label }]) => (
              <button
                key={key}
                onClick={() => toggleMetric(key)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium transition-all",
                  activeMetrics.includes(key)
                    ? "text-white"
                    : "text-[#4a7a9b] border border-[#16354f] bg-transparent"
                )}
                style={{
                  backgroundColor: activeMetrics.includes(key) ? color : 'transparent',
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={lineData} margin={{ top: 8, right: 12, left: -8, bottom: 0 }}>
              <defs>
                {Object.entries(METRIC_META).map(([key, { color }]) => (
                  <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.35} />
                    <stop offset="90%" stopColor={color} stopOpacity={0.02} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke={C.divider} strokeOpacity={0.7} />
              <XAxis dataKey="date" tick={{ fill: C.muted, fontSize: 11 }} stroke={C.divider} />
              <YAxis tick={{ fill: C.muted, fontSize: 11 }} stroke={C.divider} />
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
                    activeDot={{ r: 5, strokeWidth: 0, fill: color }}
                  />
                )
              )}
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Chart 2: WQI Classification - Donut Chart */}
      <Card className="bg-[#0d2137] border-[#16354f]">
        <CardHeader>
          <div className="flex items-center gap-2">
            <PieIcon className="h-4 w-4 text-[#3b82f6]" />
            <CardTitle className="text-white text-lg">WQI Classification Breakdown</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <DonutChart data={pieData} size={220} />
          <div className="flex flex-col gap-2 mt-4">
            {pieData.map((e, i) => {
              const pct = total > 0 ? ((e.value / total) * 100).toFixed(1) : '0';
              return (
                <div key={i} className="flex items-center gap-3 p-2 bg-[#0a2540] rounded-lg border border-[#16354f]">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: e.color }} />
                  <span className="text-[#7aadc8] text-sm flex-1">{e.name}</span>
                  <div className="flex-1 h-1.5 bg-[#1a3f5c] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: e.color }} />
                  </div>
                  <span className="text-white text-sm font-semibold min-w-[40px] text-right">{pct}%</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Chart 3: WQI Score Distribution - Histogram */}
      <Card className="bg-[#0d2137] border-[#16354f]">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4 text-[#a855f7]" />
            <CardTitle className="text-white text-lg">WQI Score Distribution</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            {histData.map((b, i) => (
              <div key={i} className="flex-1 text-center p-2 bg-[#0a2540] rounded-lg border border-[#16354f]">
                <div className="text-lg font-bold" style={{ color: b.color }}>{b.count}</div>
                <div className="text-[#4a7a9b] text-xs">{b.range}</div>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={histData} margin={{ top: 4, right: 8, left: -18, bottom: 0 }} barCategoryGap="28%">
              <CartesianGrid strokeDasharray="4 4" stroke={C.divider} strokeOpacity={0.7} />
              <XAxis dataKey="range" tick={{ fill: C.muted, fontSize: 11 }} stroke={C.divider} />
              <YAxis tick={{ fill: C.muted, fontSize: 11 }} stroke={C.divider} allowDecimals={false} />
              <Tooltip contentStyle={{ backgroundColor: '#081e30', border: `1px solid ${C.border}`, borderRadius: 10, color: C.text }} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {histData.map((e, i) => <Cell key={i} fill={e.color} fillOpacity={0.9} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Chart 4: pH vs WQI - Grouped Bar Chart */}
      <Card className="bg-[#0d2137] border-[#16354f]">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-[#f59e0b]" />
            <CardTitle className="text-white text-lg">pH vs WQI Daily Comparison</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={lineData} margin={{ top: 8, right: 8, left: -18, bottom: 0 }} barGap={2} barCategoryGap="32%">
              <CartesianGrid strokeDasharray="4 4" stroke={C.divider} strokeOpacity={0.7} />
              <XAxis dataKey="date" tick={{ fill: C.muted, fontSize: 11 }} stroke={C.divider} interval={Math.max(0, Math.floor(lineData.length / 6) - 1)} />
              <YAxis tick={{ fill: C.muted, fontSize: 11 }} stroke={C.divider} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: C.subtext }} iconType="circle" iconSize={8} />
              <Bar dataKey="pH" fill={C.teal} radius={[4, 4, 0, 0]} maxBarSize={14} name="pH Level" />
              <Bar dataKey="WQI" fill={C.cyan} radius={[4, 4, 0, 0]} maxBarSize={14} name="WQI Score" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Chart 5: Latest vs Average - Radar Chart */}
      <Card className="bg-[#0d2137] border-[#16354f]">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-[#ef4444]" />
            <CardTitle className="text-white text-lg">Latest Reading vs Period Average</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData} cx="50%" cy="48%" outerRadius={85}>
              <PolarGrid stroke={C.divider} strokeOpacity={0.9} />
              <PolarAngleAxis dataKey="metric" tick={{ fill: C.subtext, fontSize: 10, fontWeight: 500 }} />
              <PolarRadiusAxis tick={{ fill: C.muted, fontSize: 9 }} stroke={C.divider} axisLine={false} />
              <Radar name="Latest" dataKey="Latest" stroke={C.teal} fill={C.teal} fillOpacity={0.2} strokeWidth={2.5} dot={{ fill: C.teal, r: 3, strokeWidth: 0 }} />
              <Radar name="Average" dataKey="Average" stroke={C.blue} fill={C.blue} fillOpacity={0.1} strokeWidth={2} dot={{ fill: C.blue, r: 3, strokeWidth: 0 }} />
              <Legend wrapperStyle={{ fontSize: 11, color: C.subtext }} iconType="circle" iconSize={8} />
              <Tooltip contentStyle={{ backgroundColor: '#081e30', border: `1px solid ${C.border}`, borderRadius: 10, color: C.text }} />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Chart 6: TDS & Turbidity Correlation */}
      <Card className="bg-[#0d2137] border-[#16354f]">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#a855f7]" />
            <CardTitle className="text-white text-lg">TDS & Turbidity Correlation</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 mb-4">
            <div className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <span className="text-[#4a7a9b] text-xs">Avg TDS:</span>
              <span className="text-blue-400 font-bold ml-1">{(lineData.reduce((s, d) => s + d.TDS, 0) / (lineData.length || 1)).toFixed(0)} ppm</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30">
              <span className="text-[#4a7a9b] text-xs">Avg Turbidity:</span>
              <span className="text-purple-400 font-bold ml-1">{(lineData.reduce((s, d) => s + d.Turbidity, 0) / (lineData.length || 1)).toFixed(2)} NTU</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData} margin={{ top: 8, right: 26, left: -8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke={C.divider} strokeOpacity={0.7} />
              <XAxis dataKey="date" tick={{ fill: C.muted, fontSize: 11 }} stroke={C.divider} />
              <YAxis yAxisId="tds" tick={{ fill: C.muted, fontSize: 11 }} stroke={C.divider} orientation="left" />
              <YAxis yAxisId="turbidity" tick={{ fill: C.muted, fontSize: 11 }} stroke={C.divider} orientation="right" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: C.subtext }} iconType="circle" iconSize={8} />
              <Line yAxisId="tds" type="monotone" dataKey="TDS" stroke={C.blue} strokeWidth={2.5} dot={false} activeDot={{ r: 5, strokeWidth: 0 }} name="TDS" />
              <Line yAxisId="turbidity" type="monotone" dataKey="Turbidity" stroke={C.purple} strokeWidth={2.5} dot={false} activeDot={{ r: 5, strokeWidth: 0 }} name="Turbidity" strokeDasharray="5 3" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Chart 7: Statistical Metrics */}
      <Card className="bg-[#0d2137] border-[#16354f]">
        <CardHeader>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Sigma className="h-4 w-4 text-[#06b6d4]" />
              <CardTitle className="text-white text-lg">Statistical Metrics Analysis</CardTitle>
            </div>
            <Select value={selectedStatParam} onValueChange={setSelectedStatParam}>
              <SelectTrigger className="w-[140px] bg-[#0a2540] border-[#16354f] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0d2137] border-[#16354f]">
                {Object.entries(METRIC_META).map(([key, meta]) => (
                  <SelectItem key={key} value={key} className="text-white hover:bg-[#1a3f5c] focus:bg-[#1a3f5c]">
                    {meta.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <StatsDonutChart data={statMetrics} size={200} />
          <div className="mt-6 p-3 bg-[#0a2540] rounded-lg">
            <p className="text-[#7aadc8] text-xs mb-2">📊 What these metrics tell you:</p>
            <ul className="text-[#4a7a9b] text-xs space-y-1">
              <li><span className="text-[#10b981]">Average</span> - Typical value over the period</li>
              <li><span className="text-[#3b82f6]">Std Dev</span> - How much values fluctuate (lower = more stable)</li>
              <li><span className="text-[#a855f7]">Variance</span> - Spread of data points</li>
              <li><span className="text-[#f59e0b]">Range</span> - Difference between highest and lowest</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}