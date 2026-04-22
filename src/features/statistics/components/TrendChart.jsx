
// src/features/statistics/components/TrendChart.jsx
import React, { useState, useEffect, useMemo,useRef } from 'react';
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
  trendStats = [],
  classification = {},
  fetchTrendLineData,
  loading = false,
  onPeriodChange,
  className,
}) {
  const [selectedPeriod, setSelectedPeriod] = useState('last_30_days');
  const [activeMetrics, setActiveMetrics] = useState(Object.keys(METRIC_META));
  const [selectedStatParam, setSelectedStatParam] = useState('WQI');
  const [statMetrics, setStatMetrics] = useState([]);

  // 1. Unified Line Data Processing
  const lineData = useMemo(() => {
    if (!Array.isArray(trendStats) || trendStats.length === 0) return [];
    return trendStats.map(item => ({
      date: item.date || item.month || item.year || 'N/A',
      pH: Number((item.avgPH ?? item.pH ?? 0).toFixed(2)),
      TDS: Number((item.avgTDS ?? item.TDS ?? item.tds ?? 0).toFixed(0)),
      Turbidity: Number((item.avgTurbidity ?? item.Turbidity ?? item.turbidity ?? 0).toFixed(2)),
      Conductivity: Number((item.avgConductivity ?? item.Conductivity ?? item.conductivity ?? 0).toFixed(0)),
      WQI: Number((item.avgWQI ?? item.WQI ?? item.wqi ?? 0).toFixed(1)),
    }));
  }, [trendStats]);

  const hasRealData = lineData.length > 0;

  const handlePeriodChange = (newPeriod) => {
  setSelectedPeriod(newPeriod);
  
  // Directly trigger the parent's function
  if (onPeriodChange) {
    onPeriodChange(newPeriod);
  }
};

  // 2. Fetch data when period changes
  useEffect(() => {
    fetchTrendLineData?.(selectedPeriod);
  }, [selectedPeriod, fetchTrendLineData]);

  // 3. Process Pie Data (WQI Classification)
  const pieData = useMemo(() => {
    const rawDist = classification?.data?.distribution || classification?.distribution;
    if (rawDist && Array.isArray(rawDist)) {
      return rawDist.map(item => ({
        name: item.category || item.name,
        value: item.count || item.value,
        color: item.category === 'Excellent' ? C.teal :
               item.category === 'Good' ? C.blue :
               item.category === 'Poor' ? C.amber : C.red
      }));
    }
    return [];
  }, [classification]);

  // 4. Radar Data
  const radarData = useMemo(() => {
    if (!hasRealData) return [];
    const latest = lineData[lineData.length - 1];
    return Object.entries(METRIC_META).map(([key, { label }]) => {
      const avgVal = lineData.reduce((sum, d) => sum + (d[key] || 0), 0) / lineData.length;
      return {
        metric: label === 'Water Quality Index' ? 'WQI' : label.replace(' Level', ''),
        Latest: latest[key] || 0,
        Average: avgVal,
      };
    });
  }, [lineData, hasRealData]);

  // 5. Histogram Data
  const histData = useMemo(() => buildHistogram(lineData, 'WQI'), [lineData]);

  // 6. Statistical Analysis Calculation
  useEffect(() => {
    if (!hasRealData) {
      setStatMetrics([]);
      return;
    }
    const values = lineData.map(d => d[selectedStatParam]).filter(v => v > 0);
    if (values.length === 0) return;

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
  }, [selectedStatParam, lineData, hasRealData]);

  const toggleMetric = (k) => {
    setActiveMetrics(prev => prev.includes(k) ? prev.filter(x => x !== k) : [...prev, k]);
  };

  if (loading) {
    return (
      <Card className="bg-[#0d2137] border-[#16354f]">
        <CardContent className="py-24 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-500 border-r-transparent align-[-0.125em]" />
          <p className="mt-4 text-[#4a7a9b] font-medium animate-pulse">Fetching Real-Time Metrics...</p>
        </CardContent>
      </Card>
    );
  }

  if (!hasRealData) {
    return (
      <Card className="bg-[#0d2137] border-[#16354f]">
        <CardContent className="py-12 text-center text-[#4a7a9b]">
          No data available for the selected period ({selectedPeriod.replace(/_/g, ' ')})
        </CardContent>
      </Card>
    );
  }

  const pieTotal = pieData.reduce((s, d) => s + d.value, 0);

  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex justify-end">
        <Select value={selectedPeriod} onValueChange={handlePeriodChange}>
          <SelectTrigger className="w-[160px] bg-[#0d2137] border-[#16354f] text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#0d2137] border-[#16354f]">
            {PERIOD_OPTIONS.map(opt => (
              <SelectItem key={opt.value} value={opt.value} className="text-white hover:bg-[#1a3f5c]">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Chart 1: Area Trends */}
      <Card className="bg-[#0d2137] border-[#16354f]">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#10b981]" />
            <CardTitle className="text-white text-lg">Parameter Trends Over Time</CardTitle>
          </div>
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
                style={{ backgroundColor: activeMetrics.includes(key) ? color : 'transparent', borderColor: color }}
              >
                {label}
              </button>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={lineData}>
              <defs>
                {Object.entries(METRIC_META).map(([key, { color }]) => (
                  <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.divider} vertical={false} />
              <XAxis dataKey="date" tick={{ fill: C.muted, fontSize: 11 }} axisLine={false} />
              <YAxis tick={{ fill: C.muted, fontSize: 11 }} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              {Object.entries(METRIC_META).map(([key, { color }]) => 
                activeMetrics.includes(key) && (
                  <Area
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={color}
                    strokeWidth={2}
                    fill={`url(#grad-${key})`}
                    dot={false}
                  />
                )
              )}
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart 2: WQI Breakdown */}
        <Card className="bg-[#0d2137] border-[#16354f]">
          <CardHeader><CardTitle className="text-white text-lg flex items-center gap-2"><PieIcon className="h-4 w-4 text-blue-400" /> Classification Breakdown</CardTitle></CardHeader>
          <CardContent>
            <DonutChart data={pieData} />
            <div className="space-y-2 mt-4">
              {pieData.map((e, i) => (
                <div key={i} className="flex items-center gap-3 p-2 bg-[#0a2540] rounded-md border border-[#16354f]">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: e.color }} />
                  <span className="text-[#7aadc8] text-xs flex-1">{e.name}</span>
                  <span className="text-white text-xs font-bold">{pieTotal > 0 ? ((e.value/pieTotal)*100).toFixed(1) : 0}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chart 3: Distribution */}
        <Card className="bg-[#0d2137] border-[#16354f]">
          <CardHeader><CardTitle className="text-white text-lg flex items-center gap-2"><BarChart2 className="h-4 w-4 text-purple-400" /> WQI Distribution</CardTitle></CardHeader>
          <CardContent>
             <ResponsiveContainer width="100%" height={220}>
                <BarChart data={histData}>
                  <XAxis dataKey="range" tick={{ fill: C.muted, fontSize: 10 }} />
                  <Tooltip cursor={{fill: '#ffffff10'}} contentStyle={{backgroundColor: '#0d2137', border: '1px solid #16354f'}} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {histData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Bar>
                </BarChart>
             </ResponsiveContainer>
             <div className="grid grid-cols-5 gap-1 mt-4">
                {histData.map((b, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xs font-bold text-white">{b.count}</div>
                    <div className="text-[10px] text-[#4a7a9b]">{b.range}</div>
                  </div>
                ))}
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart 4: Radar Comparison */}
      <Card className="bg-[#0d2137] border-[#16354f]">
        <CardHeader><CardTitle className="text-white text-lg flex items-center gap-2"><Zap className="h-4 w-4 text-red-400" /> Latest vs Average</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="80%">
              <PolarGrid stroke={C.divider} />
              <PolarAngleAxis dataKey="metric" tick={{ fill: C.subtext, fontSize: 10 }} />
              <Radar name="Latest" dataKey="Latest" stroke={C.teal} fill={C.teal} fillOpacity={0.5} />
              <Radar name="Average" dataKey="Average" stroke={C.blue} fill={C.blue} fillOpacity={0.3} />
              <Legend />
              <Tooltip contentStyle={{backgroundColor: '#0d2137'}} />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Chart 5: TDS & Turbidity Correlation */}
      <Card className="bg-[#0d2137] border-[#16354f]">
        <CardHeader><CardTitle className="text-white text-lg flex items-center gap-2"><Activity className="h-4 w-4 text-amber-400" /> Parameter Correlation</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.divider} vertical={false} />
              <XAxis dataKey="date" tick={{ fill: C.muted, fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fill: C.muted, fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: C.muted, fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="TDS" stroke={C.blue} dot={false} strokeWidth={3} />
              <Line yAxisId="right" type="monotone" dataKey="Turbidity" stroke={C.purple} dot={false} strokeWidth={3} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Chart 6: Statistics */}
      <Card className="bg-[#0d2137] border-[#16354f]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white text-lg flex items-center gap-2"><Sigma className="h-4 w-4 text-cyan-400" /> Statistical Analysis</CardTitle>
          <Select value={selectedStatParam} onValueChange={setSelectedStatParam}>
            <SelectTrigger className="w-[140px] bg-[#0a2540] border-[#16354f] text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#0d2137] border-[#16354f]">
              {Object.entries(METRIC_META).map(([k, m]) => (
                <SelectItem key={k} value={k} className="text-white">{m.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <StatsDonutChart data={statMetrics} />
        </CardContent>
      </Card>
    </div>
  );
}