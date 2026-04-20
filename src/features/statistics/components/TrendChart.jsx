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
    <h1> Trend Chart .... Grace make sure you use recharts for trend visualization</h1>
  );
}