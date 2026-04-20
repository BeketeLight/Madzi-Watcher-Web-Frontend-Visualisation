// src/features/statistics/components/TrendChart.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { TrendingUp, PieChart as PieIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const COLORS = ['#10b981', '#3b82f6', '#a855f7', '#f59e0b', '#ef4444'];

export default function TrendChart({ 
  trendStats,           // daily/weekly data
  classification,       // classification data for pie
  fetchTrendLineData,   // from hook
  loading = false,
  className 
}) {
  const [activeTab, setActiveTab] = useState('line');
  const [selectedPeriod, setSelectedPeriod] = useState('last_30_days');

  // Auto fetch when period changes
  useEffect(() => {
    fetchTrendLineData(selectedPeriod);
  }, [selectedPeriod, fetchTrendLineData]);

  // Prepare data for Line Chart
  const lineData = Array.isArray(trendStats) ? trendStats.map(item => ({
    date: item.date || item.month || item.year || 'N/A',
    pH: Number(item.avgPH?.toFixed(2)) || 0,
    TDS: Number(item.avgTDS?.toFixed(0)) || 0,
    Turbidity: Number(item.avgTurbidity?.toFixed(2)) || 0,
    Conductivity: Number(item.avgConductivity?.toFixed(0)) || 0,
    WQI: Number(item.avgWQI?.toFixed(1)) || 0,
  })) : [];

  // Pie Chart Data (WQI Classification)
  const pieData = classification?.distribution || [
    { name: 'Excellent', value: 45, color: '#10b981' },
    { name: 'Good', value: 35, color: '#3b82f6' },
    { name: 'Poor', value: 15, color: '#eab308' },
    { name: 'Unsafe', value: 5, color: '#ef4444' },
  ];

  return (
    <Card className={cn("bg-[#0a2540] border border-[#1e3a5f] shadow-xl", className)}>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle className="text-white flex items-center gap-3">
            <TrendingUp className="h-6 w-6" />
            Trend Analysis
          </CardTitle>

          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-64 bg-[#112b4f] border-[#1e3a5f] text-white">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last_7_days">Last 7 Days</SelectItem>
              <SelectItem value="last_30_days">Last 30 Days</SelectItem>
              <SelectItem value="last_90_days">Last 90 Days</SelectItem>
              <SelectItem value="this_year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#112b4f]">
            <TabsTrigger value="line" className="flex gap-2">
              <TrendingUp className="h-4 w-4" /> Line Trends
            </TabsTrigger>
            <TabsTrigger value="pie" className="flex gap-2">
              <PieIcon className="h-4 w-4" /> WQI Distribution
            </TabsTrigger>
          </TabsList>

          {/* LINE CHART */}
          {activeTab === 'line' && (
            <div className="h-[480px] mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0a2540', 
                      border: '1px solid #1e3a5f',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Line type="monotone" dataKey="pH" stroke="#10b981" name="pH" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="TDS" stroke="#a855f7" name="TDS" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="Turbidity" stroke="#22d3ee" name="Turbidity" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="Conductivity" stroke="#f59e0b" name="Conductivity" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="WQI" stroke="#ef4444" name="WQI" strokeWidth={3.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* PIE CHART */}
          {activeTab === 'pie' && (
            <div className="flex justify-center py-10">
              <ResponsiveContainer width={420} height={420}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={95}
                    outerRadius={155}
                    dataKey="value"
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={50} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}