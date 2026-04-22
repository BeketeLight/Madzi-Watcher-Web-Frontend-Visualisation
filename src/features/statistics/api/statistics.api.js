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

// Helper to add auth headers - uses test token if no token in localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  // Use test token if no token found in localStorage
  const authToken = token || TEST_TOKEN;
  
  console.log('🔐 Using token:', authToken ? 'Token present' : 'No token');
  
  return {
    headers: {
      'Authorization': authToken ? `Bearer ${authToken}` : '',
      'Content-Type': 'application/json'
    }
  };
};

// ====================== BASIC STATISTICS ======================

// Core Statistics with Period Filter Support
export async function getDashboardStatistics(params = {}) {
  try {
    const { data } = await api.get('/stats/dashboard', { params });
    return data;
  } catch (error) {
    console.error('❌ Dashboard statistics error:', error);
    throw handleError(error);
  }
}

export async function getMeanStatistics(params = {}) {
  try {
    const { data } = await api.get('/stats/mean', { params });
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

export async function getVarianceStatistics(params = {}) {
  try {
    const { data } = await api.get('/stats/variance', { params });
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

export async function getStandardDeviationStatistics(params = {}) {
  try {
    const { data } = await api.get('/stats/std-dev', { params });
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

export async function getMedianStatistics(params = {}) {
  try {
    const { data } = await api.get('/stats/median', { params });
    return data;
  } catch (error) {
    throw handleError(error);
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
    const { data } = await api.get('/stats/correlation', getAuthHeaders());
    return data;
  } catch (error) {
    console.warn('Correlation error:', error);
    return { status: 'success', data: {} };
  }
}

export async function detectOutliers(parameter = 'turbidity', threshold = 3) {
  try {
    const { data } = await api.get(`/stats/outliers?parameter=${parameter}&threshold=${threshold}`, getAuthHeaders());
    return data;
  } catch (error) {
    console.warn('Outliers error:', error);
    return { status: 'success', data: { outliers: [] } };
  }
}

// Location-based (keep as is for now)
export async function getDistrictStatistics(district, params = {}) {
  try {
    const { data } = await api.get(`/stats/${district}/district`, { params });
    return data;
  } catch (error) {
    throw handleError(error);
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

export async function getTrendAnalysis(params = {}) {
  try {
    const { data } = await api.get('/stats/trends', { params });
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
    console.warn('Correlation error:', error);
    return { status: 'success', data: {} };
  }
}

export async function getWeeklyStatistics(params = {}) {
  try {
    const { data } = await api.get('/stats/weekly', { params });
    return data;
  } catch (error) {
    console.warn('Weekly statistics error:', error);
    return { status: 'success', data: {} };
  }
}

export async function getMonthlyStatistics(params = {}) {
  try {
    const { data } = await api.get('/stats/monthly', { params });
    return data;
  } catch (error) {
    console.warn('Monthly statistics error:', error);
    return { status: 'success', data: {} };
  }
}

export async function getYearlyStatistics(params = {}) {
  try {
    const { data } = await api.get('/stats/yearly', { params });
    return data;
  } catch (error) {
    console.warn('Yearly statistics error:', error);
    return { status: 'success', data: {} };
  }
} 