// src/features/statistics/api/statistics.api.js
import api from '@/lib/axios';

// Error handler (same style as your auth.api.js)
function handleError(error) {
  if (error.response) {
    throw error.response.data;
  } else if (error.request) {
    throw {
      status: 500,
      message: 'No response from server',
    };
  } else {
    throw {
      status: 500,
      message: error.message || 'An error occurred',
    };
  }
}

// ====================== STATISTICS API FUNCTIONS ======================

// Dashboard Overview Stats
export async function getDashboardStatistics() {
  try {
    const { data } = await api.get('/api/water-quality/stats/dashboard');
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getMeanStatistics() {
  try {
    const { data } = await api.get('/api/water-quality/stats/mean');
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getVarianceStatistics() {
  try {
    const { data } = await api.get('/api/water-quality/stats/variance');
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getStandardDeviationStatistics() {
  try {
    const { data } = await api.get('/water-quality/stats/std-dev');
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getMedianStatistics() {
  try {
    const { data } = await api.get('/api/water-quality/stats/median');
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getMinMaxStatistics() {
  try {
    const { data } = await api.get('/api/water-quality/stats/min-max');
    return data;
  } catch (error) {
    return handleError(error);
  }
}

// Time-based Statistics
export async function getDailyStatistics(params = {}) {
  try {
    const { data } = await api.get('/api/water-quality/stats/daily', { params });
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getWeeklyStatistics(params = {}) {
  try {
    const { data } = await api.get('/api/water-quality/stats/weekly', { params });
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getMonthlyStatistics(params = {}) {
  try {
    const { data } = await api.get('/api/water-quality/stats/monthly', { params });
    return data;
  } catch (error) {
    return handleError(error);
  }
}

// Advanced Analytics
export async function getTrendAnalysis(params = {}) {
  try {
    const { data } = await api.get('/api/water-quality/stats/trend', { params });
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getMovingAverage(params = {}) {
  try {
    const { data } = await api.get('/api/water-quality/stats/moving-average', { params });
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getParameterCorrelation(params = {}) {
  try {
    const { data } = await api.get('/api/water-quality/stats/correlation', { params });
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function detectOutliers(params = {}) {
  try {
    const { data } = await api.get('/api/water-quality/stats/outliers', { params });
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getWaterQualityClassification() {
  try {
    const { data } = await api.get('/api/water-quality/stats/classification');
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getWaterStabilityScore() {
  try {
    const { data } = await api.get('/api/water-quality/stats/stability-score');
    return data;
  } catch (error) {
    return handleError(error);
  }
}

// Location-based
export async function getDistrictStatistics(district) {
  try {
    const { data } = await api.get(`/api/water-quality/stats/${district}/district`);
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getTreatmentPlantStatistics(plant) {
  try {
    const { data } = await api.get(`/api/water-quality/stats/${plant}/treatment-plant`);
    return data;
  } catch (error) {
    return handleError(error);
  }
}