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
import { QualityMetricsCards } from '../components/QualityMetricsCards';
import { LatestReadingCard } from '../components/LatestReadingCard';
import { RangeStatistics } from '../components/RangeStatistics';
import { StabilityStatistics } from '../components/StabilityStatistics';
import { ClassificationDistribution } from '../components/ClassificationDistribution';
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
    fetchAllBasicStats,
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
          <Button onClick={fetchAllBasicStats} className="bg-[#2C7BE5] hover:bg-blue-600 text-white">
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
    <div className="space-y-8 p-6 bg-white min-h-screen">
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
          <Button
            onClick={() => {
              fetchAllBasicStats();
              fetchAdvancedAnalytics();
            }}
            className="bg-[#2C7BE5] hover:bg-blue-600 text-white"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh All Data
          </Button>
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
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Live Monitoring</h2>
              <p className="text-gray-500 text-sm mb-4">Real-time data from IoT Sensor Node</p>
              <QualityMetricsCards dashboardStats={dashboardData} meanStats={meanData} />
            </div>

            {latestReading && <LatestReadingCard latestReading={latestReading} />}

            <RangeStatistics dashboardStats={dashboardData} minMaxStats={minMaxData} />
            
            <StabilityStatistics dashboardStats={dashboardData} stdDevStats={null} />
            
            <ClassificationDistribution classification={classification} />
          </div>
        )}

        {/* Trends Tab */}
        {activeTab === 'trends' && (
          <div className="mt-8 space-y-8">
            <TrendChart trends={trends} loading={advancedLoading} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-4 bg-[#0a2540] rounded-lg">
                <h3 className="text-white text-lg mb-4">Interpretation Guide</h3>
                <ul className="space-y-2 text-blue-300 text-sm">
                  <li>📈 <span className="text-white">Increasing trend</span> - Values are going up</li>
                  <li>📉 <span className="text-white">Decreasing trend</span> - Values are going down</li>
                  <li>➡️ <span className="text-white">Stable trend</span> - Values are consistent</li>
                  <li className="mt-2 text-yellow-400">⚠️ For WQI: Decreasing = Improving water quality</li>
                </ul>
              </div>
              <div className="p-4 bg-[#0a2540] rounded-lg">
                <h3 className="text-white text-lg mb-4">Recommendations</h3>
                <ul className="space-y-2 text-blue-300 text-sm">
                  {trends?.trends?.wqi?.direction === 'decreasing' && (
                    <li className="text-green-400">✓ Water quality is improving. Continue current practices.</li>
                  )}
                  {trends?.trends?.wqi?.direction === 'increasing' && (
                    <li className="text-yellow-400">⚠️ Water quality is degrading. Investigate potential sources of contamination.</li>
                  )}
                  {trends?.trends?.turbidity?.direction === 'increasing' && (
                    <li>📊 Turbidity is increasing - Check for sediment runoff or treatment issues.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Correlations Tab */}
        {activeTab === 'correlations' && (
          <div className="mt-8">
            <CorrelationMatrix correlations={correlations} loading={advancedLoading} />
            <div className="mt-6 p-4 bg-[#0a2540] rounded-lg">
              <h3 className="text-white text-lg mb-2">How to Read Correlations</h3>
              <p className="text-blue-300 text-sm">
                Correlation coefficients range from -1 to +1:
              </p>
              <ul className="mt-2 space-y-1 text-blue-300 text-sm">
                <li>• <span className="text-green-400">+0.7 to +1.0</span> - Strong positive relationship</li>
                <li>• <span className="text-yellow-400">+0.3 to +0.7</span> - Moderate positive relationship</li>
                <li>• <span className="text-gray-400">-0.3 to +0.3</span> - Weak or no relationship</li>
                <li>• <span className="text-yellow-400">-0.7 to -0.3</span> - Moderate negative relationship</li>
                <li>• <span className="text-red-400">-1.0 to -0.7</span> - Strong negative relationship</li>
              </ul>
            </div>
          </div>
        )}

        {/* Outliers Tab */}
        {activeTab === 'outliers' && (
          <div className="mt-8 space-y-8">
            <OutlierDetection 
              outliers={outliers} 
              loading={advancedLoading} 
              onRefresh={() => statisticsApi.detectOutliers('turbidity', 3).then(setOutliers)}
            />
            <div className="p-4 bg-[#0a2540] rounded-lg">
              <h3 className="text-white text-lg mb-2">About Outlier Detection</h3>
              <p className="text-blue-300 text-sm">
                Outliers are readings that deviate significantly from the normal range.
                These may indicate:
              </p>
              <ul className="mt-2 space-y-1 text-blue-300 text-sm">
                <li>• 🔧 Sensor malfunction or calibration issues</li>
                <li>• 🏭 Contamination events or pollution spikes</li>
                <li>• 📊 Data entry errors</li>
                <li className="mt-2">Recommendation: Investigate outliers promptly and verify sensor readings.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Time Series Tab */}
        {activeTab === 'time-series' && (
          <div className="mt-8">
            <TimeSeriesStats 
              dailyData={dailyStats}
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

      {/* Footer */}
      {dashboardData.totalReadings > 0 && (
        <div className="bg-gray-100 rounded-xl p-4 text-center">
          <p className="text-gray-600 text-sm">
            Based on {dashboardData.totalReadings.toLocaleString()} sensor readings
          </p>
        </div>
      )}
    </div>
  );
}