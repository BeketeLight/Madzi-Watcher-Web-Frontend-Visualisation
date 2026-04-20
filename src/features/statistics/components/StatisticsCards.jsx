// src/features/statistics/components/StatisticsCards.jsx
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Activity, Droplets, Beaker, Gauge, BarChart3, TrendingUp, Target, Minus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const StatisticsCards = ({
  title = "Average",                    // Main title (e.g. "Average", "Variance", "Min/Max", etc.)
  statsData,                            // The main stats object (meanStats, varianceStats, etc.)
  statType = "mean",                    // "mean" | "variance" | "stdDev" | "minMax" | "median" | "movingAvg" | "correlation"
  onPeriodChange,
  className,
  ...props
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPeriod = searchParams.get('period') || 'all';

  // Define cards dynamically based on statType
  const getCardsConfig = () => {
    switch (statType) {
      case 'variance':
        return [
          { key: 'pH', label: 'pH Variance', unit: '', icon: Activity, color: 'bg-orange-600' },
          { key: 'tds', label: 'TDS Variance', unit: '', icon: Gauge, color: 'bg-purple-600' },
          { key: 'turbidity', label: 'Turbidity Variance', unit: 'NTU²', icon: Droplets, color: 'bg-cyan-600' },
          { key: 'electricalConductivity', label: 'Conductivity Variance', unit: '', icon: Target, color: 'bg-emerald-600' },
          { key: 'waterQualityIndex', label: 'WQI Variance', unit: '', icon: TrendingUp, color: 'bg-rose-600' },
        ];

      case 'stdDev':
        return [
          { key: 'pH', label: 'pH Std Dev', unit: '', icon: Activity, color: 'bg-orange-600' },
          { key: 'tds', label: 'TDS Std Dev', unit: '', icon: Gauge, color: 'bg-purple-600' },
          { key: 'turbidity', label: 'Turbidity Std Dev', unit: 'NTU', icon: Droplets, color: 'bg-cyan-600' },
          { key: 'electricalConductivity', label: 'Conductivity Std Dev', unit: '', icon: Target, color: 'bg-emerald-600' },
          { key: 'waterQualityIndex', label: 'WQI Std Dev', unit: '', icon: TrendingUp, color: 'bg-rose-600' },
        ];

      case 'minMax':
        return [
          { key: 'pH', label: 'pH (Min/Max)', unit: '', icon: Activity, color: 'bg-blue-600', isRange: true },
          { key: 'tds', label: 'TDS (Min/Max)', unit: 'ppm', icon: Gauge, color: 'bg-purple-600', isRange: true },
          { key: 'turbidity', label: 'Turbidity (Min/Max)', unit: 'NTU', icon: Droplets, color: 'bg-cyan-600', isRange: true },
          { key: 'electricalConductivity', label: 'Conductivity (Min/Max)', unit: '', icon: Target, color: 'bg-emerald-600', isRange: true },
          { key: 'waterQualityIndex', label: 'WQI (Min/Max)', unit: '', icon: TrendingUp, color: 'bg-rose-600', isRange: true },
        ];

      case 'median':
        return [
          { key: 'pH', label: 'Median pH', unit: '', icon: Activity, color: 'bg-blue-600' },
          { key: 'tds', label: 'Median TDS', unit: 'ppm', icon: Gauge, color: 'bg-purple-600' },
          { key: 'turbidity', label: 'Median Turbidity', unit: 'NTU', icon: Droplets, color: 'bg-cyan-600' },
          { key: 'electricalConductivity', label: 'Median Conductivity', unit: '', icon: Target, color: 'bg-emerald-600' },
          { key: 'waterQualityIndex', label: 'Median WQI', unit: '', icon: TrendingUp, color: 'bg-rose-600' },
        ];

      // Default = Mean / Average
      default:
        return [
          {
            key: 'pH',
            label: 'pH Level',
            unit: '',
            icon: Activity,
            color: 'bg-emerald-600'
          },
          {
            key: 'tds',
            label: 'TDS',
            unit: 'ppm',
            icon: Gauge,
            color: 'bg-purple-600'
          },
          {
            key: 'turbidity',
            label: 'Turbidity',
            unit: 'NTU',
            icon: Droplets,
            color: 'bg-cyan-600'
          },
          {
            key: 'electricalConductivity',
            label: 'Electrical Conductivity',
            unit: '',
            icon: Target,
            color: 'bg-blue-600'
          },
          {
            key: 'waterQualityIndex',
            label: 'Water Quality Index',
            unit: 'WQI',
            icon: TrendingUp,
            color: 'bg-rose-600',
            hasClassification: true
          },
        ];
    }
  };

  const cardsConfig = getCardsConfig();

  const getClassificationColor = (classification) => {
    switch (classification) {
      case 'Excellent': return 'text-green-400 bg-green-400/10';
      case 'Good': return 'text-blue-400 bg-blue-400/10';
      case 'Poor': return 'text-yellow-400 bg-yellow-400/10';
      case 'Unsafe': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const filterOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'this_week', label: 'This Week' },
    { value: 'last_7_days', label: 'Last 7 Days' },
    { value: 'this_month', label: 'This Month' },
    { value: 'last_30_days', label: 'Last 30 Days' },
    { value: 'this_year', label: 'This Year' },
    { value: 'range', label: 'Custom Range' },
  ];

  const handlePeriodChange = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set('period', value);
    if (value !== 'range') {
      params.delete('startDate');
      params.delete('endDate');
    }
    setSearchParams(params);

    if (onPeriodChange) {
      onPeriodChange(value);
    }
  };

  return (
    <div className={cn("space-y-4", className)} {...props}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-blue-400 mt-1">{title}</h2>
        </div>

        <div className="w-60">
          <Select value={currentPeriod} onValueChange={handlePeriodChange}>
            <SelectTrigger className="bg-[#0a2540] border border-[#1e3a5f] text-white text-sm h-10 hover:border-blue-500 transition-colors">
              <SelectValue placeholder="Select time filter" />
            </SelectTrigger>
            <SelectContent className="bg-[#0a2540] border-[#1e3a5f]">
              {filterOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-white hover:bg-[#1e3a5f] cursor-pointer focus:bg-[#1e3a5f]"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {cardsConfig.map((card, idx) => {
          let value = '—';
          if (statType === 'minMax' && statsData?.[card.key]) {
            const min = statsData[card.key]?.min?.toFixed(2) || statsData[card.key]?.min;
            const max = statsData[card.key]?.max?.toFixed(2) || statsData[card.key]?.max;
            value = `${min} - ${max}`;
          } else if (statsData?.[card.key] !== undefined) {
            value = typeof statsData[card.key] === 'number' 
              ? statsData[card.key].toFixed(2) 
              : statsData[card.key];
          }

          return (
            <Card
              key={idx}
              className="bg-[#0a2540] border border-[#1e3a5f] shadow-lg overflow-hidden"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-blue-300">
                    {card.label}
                  </CardTitle>
                  <div className={cn("p-2 rounded-lg", card.color)}>
                    <card.icon className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <div className="text-2xl font-bold text-white">{value}</div>
                  {card.unit && <div className="text-sm text-blue-400">{card.unit}</div>}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StatisticsCards;