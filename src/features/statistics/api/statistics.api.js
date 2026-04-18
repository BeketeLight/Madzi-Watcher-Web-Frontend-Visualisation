// src/features/statistics/api/statistics.api.js
import api from '@/lib/axios';

function handleError(error) {
  if (error.response) {
    throw error.response.data;
  } else if (error.request) {
    throw { status: 500, message: 'No response from server' };
  } else {
    throw { status: 500, message: error.message || 'An error occurred' };
  }
}

// ====================== STATISTICS API FUNCTIONS ======================

// Core Statistics with Period Filter Support
export async function getDashboardStatistics(params = {}) {
  try {
    const { data } = await api.get('/stats/dashboard', { params });
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getMeanStatistics(params = {}) {
  try {
    const { data } = await api.get('/stats/mean', { params });
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getVarianceStatistics(params = {}) {
  try {
    const { data } = await api.get('/stats/variance', { params });
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getStandardDeviationStatistics(params = {}) {
  try {
    const { data } = await api.get('/stats/std-dev', { params });
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getMedianStatistics(params = {}) {
  try {
    const { data } = await api.get('/stats/median', { params });
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getMinMaxStatistics(params = {}) {
  try {
    const { data } = await api.get('/stats/min-max', { params });
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getWaterQualityClassification(params = {}) {
  try {
    const { data } = await api.get('/stats/classification', { params });
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getWaterStabilityScore(params = {}) {
  try {
    const { data } = await api.get('/stats/stability-score', { params });
    return data;
  } catch (error) {
    return handleError(error);
  }
}

// Time-based Statistics (already support params)
export async function getDailyStatistics(params = {}) {
  try {
    const { data } = await api.get('/stats/daily', { params });
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getWeeklyStatistics(params = {}) {
  try {
    const { data } = await api.get('/stats/weekly', { params });
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getMonthlyStatistics(params = {}) {
  try {
    const { data } = await api.get('/stats/monthly', { params });
    return data;
  } catch (error) {
    return handleError(error);
  }
}

// Advanced Analytics
export async function getTrendAnalysis(params = {}) {
  try {
    const { data } = await api.get('/stats/trend', { params });
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getMovingAverage(params = {}) {
  try {
    const { data } = await api.get('/stats/moving-average', { params });
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getParameterCorrelation(params = {}) {
  try {
    const { data } = await api.get('/stats/correlation', { params });
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function detectOutliers(params = {}) {
  try {
    const { data } = await api.get('/stats/outliers', { params });
    return data;
  } catch (error) {
    return handleError(error);
  }
}

// Location-based (keep as is for now)
export async function getDistrictStatistics(district, params = {}) {
  try {
    const { data } = await api.get(`/stats/${district}/district`, { params });
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getTreatmentPlantStatistics(plant, params = {}) {
  try {
    const { data } = await api.get(`/stats/${plant}/treatment-plant`, { params });
    return data;
  } catch (error) {
    return handleError(error);
  }
}