// src/features/statistics/hooks/useStatistics.js
import { useState, useEffect, useCallback } from 'react';
import * as statisticsApi from '../api/statistics.api';
import { socket } from '@/lib/socket';
import { set } from 'date-fns';

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  // ==================== CORE FETCH WITH FILTER SUPPORT ====================

  const fetchWithParams = useCallback(async (apiFunction, setter, params = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiFunction(params);
      const data = response?.data || response;
      setter(data);
      return data;
    } catch (err) {
      const errorMsg = err?.message || 'Failed to fetch data';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Main combined fetch for Statistics Cards (most important)
  const fetchAllBasicStats = useCallback(async (period = 'all', startDate = null, endDate = null) => {
    setLoading(true);
    setError(null);

    const params = { period };
    if (period === 'range') {
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
    }

    try {
      const [dashboard, mean, variance, stdDev, median, minMax, classificationData] = await Promise.all([
        statisticsApi.getDashboardStatistics(params),
        statisticsApi.getMeanStatistics(params),
        statisticsApi.getVarianceStatistics(params),
        statisticsApi.getStandardDeviationStatistics(params),
        statisticsApi.getMedianStatistics(params),
        statisticsApi.getMinMaxStatistics(params),
        statisticsApi.getWaterQualityClassification(params),
        statisticsApi.getStandardDeviationStatistics(params),
        statisticsApi.getMedianStatistics(params),
      ]);

      setDashboardStats(dashboard?.data || dashboard);
      setMeanStats(mean?.data || mean);
      setVarianceStats(variance?.data || variance);
      setStdDevStats(stdDev?.data || stdDev);
      setMedianStats(median?.data || median); 
      setMinMaxStats(minMax?.data || minMax);
      setClassification(classificationData?.data || classificationData);

      return { dashboard, mean, minMax, classification: classificationData };
    } catch (err) {
      setError(err?.message || 'Failed to fetch basic statistics');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Individual fetchers with period support
  const fetchDashboardStatistics = useCallback((period = 'all', startDate = null, endDate = null) => {
    const params = { period };
    if (period === 'range') {
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
    }
    return fetchWithParams(statisticsApi.getDashboardStatistics, setDashboardStats, params);
  }, [fetchWithParams]);

  const fetchMeanStatistics = useCallback((period = 'all', startDate = null, endDate = null) => {
    const params = { period };
    if (period === 'range') {
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
    }
    return fetchWithParams(statisticsApi.getMeanStatistics, setMeanStats, params);
  }, [fetchWithParams]);

  const fetchVarianceStatistics = useCallback((period = 'all', startDate = null, endDate = null) => {
    const params = { period };
    if (period === 'range') {
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
    }
    return fetchWithParams(statisticsApi.getVarianceStatistics, setVarianceStats, params);
  }, [fetchWithParams]);

  const fetchStandardDeviationStatistics = useCallback((period = 'all', startDate = null, endDate = null) => {
    const params = { period };
    if (period === 'range') {
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
    }
    return fetchWithParams(statisticsApi.getStandardDeviationStatistics, setStdDevStats, params);
  }, [fetchWithParams]);

  const fetchMedianStatistics = useCallback((period = 'all', startDate = null, endDate = null) => {
    const params = { period };
    if (period === 'range') {
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
    }
    return fetchWithParams(statisticsApi.getMedianStatistics, setMedianStats, params);
  }, [fetchWithParams]);

  const fetchMinMaxStatistics = useCallback((period = 'all', startDate = null, endDate = null) => {
    const params = { period };
    if (period === 'range') {
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
    }
    return fetchWithParams(statisticsApi.getMinMaxStatistics, setMinMaxStats, params);
  }, [fetchWithParams]);

  // Time-based Statistics
  const fetchDailyStatistics = useCallback((params = {}) => {
    return fetchWithParams(statisticsApi.getDailyStatistics, setDailyStats, params);
  }, [fetchWithParams]);

  const fetchWeeklyStatistics = useCallback((params = {}) => {
    return fetchWithParams(statisticsApi.getWeeklyStatistics, setWeeklyStats, params);
  }, [fetchWithParams]);

  const fetchMonthlyStatistics = useCallback((params = {}) => {
    return fetchWithParams(statisticsApi.getMonthlyStatistics, setMonthlyStats, params);
  }, [fetchWithParams]);

const fetchTrendLineData = useCallback(async (period = 'last_30_days') => {
  setLoading(true);
  setError(null);

  let params = {};

  if (period === 'last_7_days') params = { days: 7 };
  else if (period === 'last_30_days') params = { days: 30 };
  else if (period === 'last_90_days') params = { days: 90 };
  else if (period === 'this_year') params = { period: 'this_year' };
  else params = { days: 30 };

  try {
    const data = await statisticsApi.getDailyStatistics(params);
    setTrendStats(data?.data || data);   // Store daily data for line chart
    return data;
  } catch (err) {
    setError(err?.message || 'Failed to fetch trend line data');
    throw err;
  } finally {
    setLoading(false);
  }
}, []);

  // Advanced Analytics
  const fetchTrendAnalysis = useCallback((params = {}) => {
    return fetchWithParams(statisticsApi.getTrendAnalysis, setTrendStats, params);
  }, [fetchWithParams]);

  const fetchMovingAverage = useCallback((params = {}) => {
    return fetchWithParams(statisticsApi.getMovingAverage, setMovingAverage, params);
  }, [fetchWithParams]);

  const fetchParameterCorrelation = useCallback((params = {}) => {
    return fetchWithParams(statisticsApi.getParameterCorrelation, setCorrelation, params);
  }, [fetchWithParams]);

  const fetchOutliers = useCallback((params = {}) => {
    return fetchWithParams(statisticsApi.detectOutliers, setOutliers, params);
  }, [fetchWithParams]);

  const fetchWaterQualityClassification = useCallback((params = {}) => {
    return fetchWithParams(statisticsApi.getWaterQualityClassification, setClassification, params);
  }, [fetchWithParams]);

  const fetchWaterStabilityScore = useCallback((params = {}) => {
    return fetchWithParams(statisticsApi.getWaterStabilityScore, setStabilityScore, params);
  }, [fetchWithParams]);

  // ==================== SOCKET REAL-TIME UPDATES ====================
  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => setIsSocketConnected(true);
    const handleDisconnect = () => setIsSocketConnected(false);

    const handleNewWaterData = () => {
      console.log('New water quality data received → Refreshing statistics');
      fetchAllBasicStats('all');   // Refresh basic stats on new data
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('water-quality-data', handleNewWaterData);

    // Auto connect if not connected
    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('water-quality-data', handleNewWaterData);
    };
  }, [fetchAllBasicStats]);

  // ==================== INITIAL LOAD ====================
  useEffect(() => {
    fetchAllBasicStats('all');
  }, [fetchAllBasicStats]);

  // ==================== RETURN OBJECT ====================
  return {
    // Data States
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
    isSocketConnected,

    // Actions
    fetchTrendLineData,
    fetchAllBasicStats,
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

    // Helpers
    clearError: () => setError(null),
  };
}