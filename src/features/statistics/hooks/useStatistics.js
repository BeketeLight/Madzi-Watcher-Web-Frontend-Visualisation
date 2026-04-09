
import { useState, useEffect, useCallback } from 'react';
import * as statisticsApi from '../api/statistics.api';
import { socket } from '@/lib/socket'; // Use your existing socket instance

export function useStatistics() {
  // ==================== STATE ====================
  const [dashboardStats, setDashboardStats] = useState(null);
  const [meanStats, setMeanStats] = useState(null);
  const [varianceStats, setVarianceStats] = useState(null);
  const [stdDevStats, setStdDevStats] = useState(null);
  const [medianStats, setMedianStats] = useState(null);
  const [minMaxStats, setMinMaxStats] = useState(null);
  const [dailyStats, setDailyStats] = useState(null);
  const [weeklyStats, setWeeklyStats] = useState(null);
  const [monthlyStats, setMonthlyStats] = useState(null);
  const [trendStats, setTrendStats] = useState(null);
  const [movingAverage, setMovingAverage] = useState(null);
  const [correlation, setCorrelation] = useState(null);
  const [outliers, setOutliers] = useState(null);
  const [classification, setClassification] = useState(null);
  const [stabilityScore, setStabilityScore] = useState(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);

  const clearError = () => setError(null);
  const clearStatus = () => setStatus(null);
  const clearMessage = () => setMessage(null);

  // ==================== CORE FETCH FUNCTIONS ====================

  const fetchDashboardStatistics = useCallback(async () => {
    setLoading(true);
    setError(null);
    setStatus(null);

    try {
      const data = await statisticsApi.getDashboardStatistics();
      setDashboardStats(data);
      setStatus('success');
      setMessage(data?.message || 'Dashboard statistics loaded');
      return data;
    } catch (err) {
      setStatus('failed');
      setError(err?.message || 'Failed to fetch dashboard statistics');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMeanStatistics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await statisticsApi.getMeanStatistics();
      setMeanStats(data);
      return data;
    } catch (err) {
      setError(err?.message || 'Failed to fetch mean statistics');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchVarianceStatistics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await statisticsApi.getVarianceStatistics();
      setVarianceStats(data);
      return data;
    } catch (err) {
      setError(err?.message || 'Failed to fetch variance statistics');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStandardDeviationStatistics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await statisticsApi.getStandardDeviationStatistics();
      setStdDevStats(data);
      return data;
    } catch (err) {
      setError(err?.message || 'Failed to fetch standard deviation');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMedianStatistics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await statisticsApi.getMedianStatistics();
      setMedianStats(data);
      return data;
    } catch (err) {
      setError(err?.message || 'Failed to fetch median statistics');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMinMaxStatistics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await statisticsApi.getMinMaxStatistics();
      setMinMaxStats(data);
      return data;
    } catch (err) {
      setError(err?.message || 'Failed to fetch min-max statistics');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Time-based
  const fetchDailyStatistics = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await statisticsApi.getDailyStatistics(params);
      setDailyStats(data);
      return data;
    } catch (err) {
      setError(err?.message || 'Failed to fetch daily statistics');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeeklyStatistics = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await statisticsApi.getWeeklyStatistics(params);
      setWeeklyStats(data);
      return data;
    } catch (err) {
      setError(err?.message || 'Failed to fetch weekly statistics');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMonthlyStatistics = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await statisticsApi.getMonthlyStatistics(params);
      setMonthlyStats(data);
      return data;
    } catch (err) {
      setError(err?.message || 'Failed to fetch monthly statistics');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Advanced
  const fetchTrendAnalysis = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await statisticsApi.getTrendAnalysis(params);
      setTrendStats(data);
      return data;
    } catch (err) {
      setError(err?.message || 'Failed to fetch trend analysis');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMovingAverage = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await statisticsApi.getMovingAverage(params);
      setMovingAverage(data);
      return data;
    } catch (err) {
      setError(err?.message || 'Failed to fetch moving average');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchParameterCorrelation = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await statisticsApi.getParameterCorrelation(params);
      setCorrelation(data);
      return data;
    } catch (err) {
      setError(err?.message || 'Failed to fetch correlation');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOutliers = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await statisticsApi.detectOutliers(params);
      setOutliers(data);
      return data;
    } catch (err) {
      setError(err?.message || 'Failed to detect outliers');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWaterQualityClassification = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await statisticsApi.getWaterQualityClassification();
      setClassification(data);
      return data;
    } catch (err) {
      setError(err?.message || 'Failed to fetch classification');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWaterStabilityScore = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await statisticsApi.getWaterStabilityScore();
      setStabilityScore(data);
      return data;
    } catch (err) {
      setError(err?.message || 'Failed to fetch stability score');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ==================== COMBINED FETCH ====================
  const fetchAllBasicStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    setStatus(null);

    try {
      const [dashboard, mean, minMax, classificationData] = await Promise.all([
        statisticsApi.getDashboardStatistics(),
        statisticsApi.getMeanStatistics(),
        statisticsApi.getMinMaxStatistics(),
        statisticsApi.getWaterQualityClassification(),
      ]);

      setDashboardStats(dashboard);
      setMeanStats(mean);
      setMinMaxStats(minMax);
      setClassification(classificationData);

      setStatus('success');
      return { dashboard, mean, minMax, classification: classificationData };
    } catch (err) {
      setStatus('failed');
      setError(err?.message || 'Failed to fetch statistics');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ==================== WEBSOCKET REAL-TIME UPDATES ====================
  // Listen to the same socket instance from useWaterSocket
  useEffect(() => {
    // Make sure socket is connected
    if (socket && !socket.connected) {
      socket.connect();
    }

    const handleConnect = () => {
      console.log('📊 Statistics: Socket connected');
      setIsSocketConnected(true);
    };

    const handleWaterQualityData = (newData) => {
      console.log('📊 New sensor data received, refreshing statistics...');
      // Refresh all statistics when new data arrives
      fetchAllBasicStats();
    };

    const handleDisconnect = () => {
      console.log('📊 Statistics: Socket disconnected');
      setIsSocketConnected(false);
    };

    const handleConnectError = (err) => {
      console.error('📊 Statistics: Socket connection error', err);
      setIsSocketConnected(false);
    };

    // Register listeners
    socket.on('connect', handleConnect);
    socket.on('water-quality-data', handleWaterQualityData);
    socket.on('disconnect', handleDisconnect);
    socket.on('connect_error', handleConnectError);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('water-quality-data', handleWaterQualityData);
      socket.off('disconnect', handleDisconnect);
      socket.off('connect_error', handleConnectError);
    };
  }, [fetchAllBasicStats]);

  // Auto-fetch dashboard stats when hook mounts
  useEffect(() => {
    fetchDashboardStatistics();
  }, [fetchDashboardStatistics]);

  // ==================== RETURN ====================
  return {
    // Data
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
    movingAverage,
    correlation,
    outliers,
    classification,
    stabilityScore,

    // UI States
    loading,
    error,
    status,
    message,
    isSocketConnected,

    // Actions
    clearError,
    clearStatus,
    clearMessage,
    setMessage,

    // Fetch functions
    fetchDashboardStatistics,
    fetchMeanStatistics,
    fetchVarianceStatistics,
    fetchStandardDeviationStatistics,
    fetchMedianStatistics,
    fetchMinMaxStatistics,
    fetchDailyStatistics,
    fetchWeeklyStatistics,
    fetchMonthlyStatistics,
    fetchTrendAnalysis,
    fetchMovingAverage,
    fetchParameterCorrelation,
    fetchOutliers,
    fetchWaterQualityClassification,
    fetchWaterStabilityScore,

    // Combined fetch
    fetchAllBasicStats,
  };
}