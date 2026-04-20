// src/features/statistics/pages/StatisticsDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useStatistics } from '../hooks/useStatistics';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  RefreshCw, 
  AlertCircle,
  TrendingUp,
  Link as LinkIcon,
  AlertTriangle,
  MapPin,
  Calendar
} from 'lucide-react';

// Import components
import StatisticsCards from '../components/StatisticsCards';
import QualityMetricsCards from '../components/QualityMetricsCards';
import LatestReadingStatistics from '../components/LatestReadingStatistics';
import RangeStatistics from '../components/RangeStatistics';
import StabilityStatistics from '../components/StabilityStatistics';
import ClassificationDistribution from '../components/ClassificationDistribution';
import TrendChart from '../components/TrendChart';
import CorrelationMatrix from '../components/CorrelationMatrix';
import OutlierDetection from '../components/OutlierDetection';
import TimeSeriesStats from '../components/TimeSeriesStats';
import DistrictSelector from '../components/DistrictSelector';

export default function StatisticsDashboard() {
  const {
    dashboardStats,
    meanStats,
    varianceStats,
    stdDevStats,
    medianStats,
    minMaxStats,
    dailyStats,
    weeklyStats,
    monthlyStats,
    trendStats,
    correlation,
    
    outliers,
    classification,
    loading,
    error,
    // trendStats,
    // dailyStats,
    fetchAllBasicStats,
    fetchTrendLineData,
    fetchTrendAnalysis,
    fetchParameterCorrelation,
    fetchOutliers,
    fetchDailyStatistics,
    fetchWeeklyStatistics,
    fetchMonthlyStatistics,
  } = useStatistics();

  // Local state for tabs
  const [activeTab, setActiveTab] = useState('overview');
  const [advancedLoading, setAdvancedLoading] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [districtStats, setDistrictStats] = useState(null);

  const dashboardData = dashboardStats?.data || dashboardStats || {};
  const meanData = meanStats?.data || meanStats || {};

  // Handle period change from StatisticsCards
  const handlePeriodChange = (period) => {
    fetchAllBasicStats(period);
  };

  // Fetch advanced analytics using the hook (no direct API calls)
  const fetchAdvancedAnalytics = async () => {
    setAdvancedLoading(true);
    try {
      await Promise.all([
        fetchTrendAnalysis({ period: 'last_30_days' }),           // or whatever params you want
        fetchParameterCorrelation(),
        fetchOutliers({ parameter: 'turbidity', threshold: 3 }),
        fetchDailyStatistics({ days: 30 }),
        fetchWeeklyStatistics({ weeks: 12 }),
        fetchMonthlyStatistics({ months: 12 }),
      ]);

      // Districts logic from daily stats
      const uniqueDistricts = [...new Set(
        (dailyStats || []).map(item => item?.district || item?._id?.district).filter(Boolean)
      )];

      if (uniqueDistricts.length > 0) {
        setDistricts(uniqueDistricts);
        if (!selectedDistrict) setSelectedDistrict(uniqueDistricts[0]);
      }
    } catch (err) {
      console.error('Failed to fetch advanced analytics:', err);
    } finally {
      setAdvancedLoading(false);
    }
  };

  // Refresh everything
  const refreshAllData = () => {
    fetchAllBasicStats('all');
    fetchAdvancedAnalytics();
  };

  // Initial load
  useEffect(() => {
    fetchAdvancedAnalytics();
     
    fetchTrendAnalysis(30); //new
  }, []);

  // Fetch district stats when selected
  useEffect(() => {
    if (selectedDistrict) {
      // You can add fetchDistrictStatistics to the hook later if needed
      console.log(`Selected district: ${selectedDistrict}`);
    }
  }, [selectedDistrict]);

  if (loading && !dashboardStats) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-[#2C7BE5] mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg mb-2">Loading statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center bg-red-50 p-8 rounded-2xl border border-red-200">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 text-lg mb-4">Error Loading Statistics</p>
          <p className="text-red-500 text-sm mb-6">{error}</p>
          <Button onClick={refreshAllData} className="bg-[#2C7BE5] hover:bg-blue-600 text-white">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'trends', name: 'Trends & Analytics', icon: TrendingUp },
    // { id: 'correlations', name: 'Correlations', icon: LinkIcon },
    // { id: 'outliers', name: 'Outliers', icon: AlertTriangle },
    // { id: 'time-series', name: 'Time Series', icon: Calendar },
    // { id: 'districts', name: 'Districts', icon: MapPin },
  ];

  return (
    <div className="space-y-8 p-6 bg-white min-h-screen relative">
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

          {/* DATA ANALYTICS badge */}
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

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-gray-100 w-full justify-start overflow-x-auto">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="data-[state=active]:bg-[#2C7BE5] data-[state=active]:text-white"
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Overview Tab - Contains StatisticsCards with filter */}
        {activeTab === 'overview' && (
          <div className="mt-8 space-y-8">
            {/* Updated Statistics Cards with Filter Support */}
            <StatisticsCards 
              title="Average"
              statsData={meanData}
              statType="mean"
              onPeriodChange={handlePeriodChange}
            />
            <StatisticsCards 
              title="Variance"
              statsData={varianceStats}
              statType="variance"
              onPeriodChange={handlePeriodChange}
            />
            <StatisticsCards 
              title="Standard Deviation"
              statsData={stdDevStats}
              statType="stdDev"
              onPeriodChange={handlePeriodChange}
            />

            <StatisticsCards 
              title="Min / Max Values"
              statsData={minMaxStats}
              statType="minMax"
              onPeriodChange={handlePeriodChange}
            />

            <StatisticsCards 
              title="Median Values"
              statsData={medianStats}
              statType="median"
              onPeriodChange={handlePeriodChange}
            />

            {/* Your original commented components remain intact */}
            {/* 
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Live Monitoring</h2>
              <p className="text-gray-500 text-sm mb-4">Real-time data from IoT Sensor Node</p>
              <QualityMetricsCards dashboardStats={dashboardData} meanStats={meanData} />
            </div> 

            {latestReading && <LatestReadingStatistics latestReading={latestReading} />}

            <RangeStatistics dashboardStats={dashboardData} minMaxStats={minMaxData} />

            <StabilityStatistics dashboardStats={dashboardData} stdDevStats={null} />

            <ClassificationDistribution classification={classification} />
            */}
          </div>
        )}

        {/* Other Tabs - Unchanged */}
        {activeTab === 'trends' && (
        <div className="mt-8">
        <TrendChart 
          trendStats={trendStats}
          classification={classification}
          fetchTrendLineData={fetchTrendLineData}
          loading={advancedLoading}
        />
        </div>
        )}

        {activeTab === 'correlations' && (
          <div className="mt-8">
            <CorrelationMatrix correlations={correlations} loading={advancedLoading} />
          </div>
        )}

        {activeTab === 'outliers' && (
          <div className="mt-8">
            <OutlierDetection
              outliers={outliers}
              loading={advancedLoading}
              onRefresh={() => statisticsApi.detectOutliers('turbidity', 3).then(setOutliers)}
            />
          </div>
        )}

        {activeTab === 'time-series' && (
          <div className="mt-8">
            <TimeSeriesStats
              dailyData={dailyStats}
              // dailyData={dailyStats}
              weeklyData={weeklyStats}
              monthlyData={monthlyStats}
              yearlyData={yearlyStats}
              loading={advancedLoading}
            />
          </div>
        )}

        {activeTab === 'districts' && (
          <div className="mt-8">
            <DistrictSelector
              districts={districts}
              selectedDistrict={selectedDistrict}
              onSelectDistrict={setSelectedDistrict}
              districtStats={districtStats}
              loading={advancedLoading}
            />
          </div>
        )}
      </Tabs>

      {/* Floating Refresh Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={refreshAllData}
          className="bg-[#2C7BE5] hover:bg-blue-600 text-white rounded-full shadow-lg px-6 py-3"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>
    </div>
  );
}