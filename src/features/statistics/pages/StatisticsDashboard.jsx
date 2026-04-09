import React, { useEffect, useState } from 'react';
import { useStatistics } from '../hooks/useStatistics';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
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

// Import API functions
import * as statisticsApi from '../api/statistics.api';

export default function StatisticsDashboard() {
  const {
    dashboardStats,
    meanStats,
    minMaxStats,
    classification,
    loading,
    error,
    trendStats,
    // dailyStats,
    fetchAllBasicStats,

    fetchTrendAnalysis
  } = useStatistics();

  // Additional state for advanced features
  const [activeTab, setActiveTab] = useState('overview');
  const [trends, setTrends] = useState(null);
  const [correlations, setCorrelations] = useState(null);
  const [outliers, setOutliers] = useState(null);
  const [dailyStats, setDailyStats] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [yearlyStats, setYearlyStats] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [districtStats, setDistrictStats] = useState(null);
  const [advancedLoading, setAdvancedLoading] = useState(false);

  const dashboardData = dashboardStats?.data || {};
  const meanData = meanStats?.data || {};
  const minMaxData = minMaxStats?.data || {};
  const classificationData = classification?.data || {};
  const latestReading = dashboardData.latestReading;

  // Function to refresh all data
  const refreshAllData = () => {
    fetchAllBasicStats();
    fetchAdvancedAnalytics();
    fetchTrendAnalysis(30); //new
  };

  // console.log(trendStats)
  // Fetch advanced analytics
  const fetchAdvancedAnalytics = async () => {
    setAdvancedLoading(true);
    try {
      const [trendRes, correlationRes, outliersRes, dailyRes, weeklyRes, monthlyRes, yearlyRes] = await Promise.all([
        statisticsApi.getTrendAnalysis(30),
        statisticsApi.getParameterCorrelation(),
        statisticsApi.detectOutliers('turbidity', 3),
        statisticsApi.getDailyStatistics(30),
        statisticsApi.getWeeklyStatistics(12),
        statisticsApi.getMonthlyStatistics(12),
        statisticsApi.getYearlyStatistics(),
      ]);

      setTrends(trendRes.data);
      setCorrelations(correlationRes.data);
      setOutliers(outliersRes);
      setDailyStats(dailyRes.data || []);
      setWeeklyStats(weeklyRes.data || []);
      setMonthlyStats(monthlyRes.data || []);
      setYearlyStats(yearlyRes.data || []);

      // Get available districts from the data
      const uniqueDistricts = [...new Set(
        (dailyRes.data || []).map(item => item.district).filter(Boolean)
      )];
      if (uniqueDistricts.length > 0) {
        setDistricts(uniqueDistricts);
        setSelectedDistrict(uniqueDistricts[0]);
      }
    } catch (err) {
      console.error('Failed to fetch advanced analytics:', err);
    } finally {
      setAdvancedLoading(false);
    }
  };

  // Fetch district stats when district changes
  const fetchDistrictStats = async (district) => {
    if (!district) return;
    try {
      const res = await statisticsApi.getDistrictStatistics(district);
      setDistrictStats(res);
    } catch (err) {
      console.error('Failed to fetch district stats:', err);
    }
  };

  useEffect(() => {
    fetchAdvancedAnalytics();
     
    fetchTrendAnalysis(30); //new
  }, []);

  useEffect(() => {
    if (selectedDistrict) {
      fetchDistrictStats(selectedDistrict);
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
    { id: 'correlations', name: 'Correlations', icon: LinkIcon },
    { id: 'outliers', name: 'Outliers', icon: AlertTriangle },
    { id: 'time-series', name: 'Time Series', icon: Calendar },
    { id: 'districts', name: 'Districts', icon: MapPin },
  ];

  return (
    <div className="space-y-8 p-6 bg-white min-h-screen relative">
      {/* Header Section with Green DATA ANALYTICS badge */}
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

          {/* Green DATA ANALYTICS badge */}
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

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="mt-8 space-y-8">
            {/* Statistics Summary Cards */}
            <StatisticsCards
              dashboardStats={dashboardData}
              meanStats={meanData}
            />

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Live Monitoring</h2>
              <p className="text-gray-500 text-sm mb-4">Real-time data from IoT Sensor Node</p>
              <QualityMetricsCards dashboardStats={dashboardData} meanStats={meanData} />
            </div>

            {latestReading && <LatestReadingStatistics latestReading={latestReading} />}

            <RangeStatistics dashboardStats={dashboardData} minMaxStats={minMaxData} />

            <StabilityStatistics dashboardStats={dashboardData} stdDevStats={null} />

            <ClassificationDistribution classification={classification} />
          </div>
        )}

        {/* Trends Tab */}
        {/* {activeTab === 'trends' && (
          <div className="mt-8">
            <TrendChart trends={trends} loading={advancedLoading} />
          </div>
        )} */}
          {activeTab === 'trends' && (
          <div className="mt-8">
            <TrendChart trends={trendStats} loading={advancedLoading} />
          </div>
        )}

        {/* Correlations Tab */}
        {activeTab === 'correlations' && (
          <div className="mt-8">
            <CorrelationMatrix correlations={correlations} loading={advancedLoading} />
          </div>
        )}

        {/* Outliers Tab */}
        {activeTab === 'outliers' && (
          <div className="mt-8">
            <OutlierDetection
              outliers={outliers}
              loading={advancedLoading}
              onRefresh={() => statisticsApi.detectOutliers('turbidity', 3).then(setOutliers)}
            />
          </div>
        )}

        {/* Time Series Tab */}
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

        {/* Districts Tab */}
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

      {/* Footer with total readings */}
      {dashboardData.totalReadings > 0 && (
        <div className="bg-gray-100 rounded-xl p-4 text-center">
          <p className="text-gray-600 text-sm">
            Based on {dashboardData.totalReadings.toLocaleString()} sensor readings
          </p>
        </div>
      )}

      {/* Refresh Button - Floating at bottom right */}
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

