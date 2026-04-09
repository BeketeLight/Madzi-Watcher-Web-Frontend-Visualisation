import api from '@/lib/axios';

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

// Helper to add auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return {
    headers: {
      'Authorization': token ? `Bearer ${token}` : ''
    }
  };
};

// ====================== BASIC STATISTICS ======================

export async function getDashboardStatistics() {
  try {
    const { data } = await api.get('/api/water-quality/stats/dashboard', getAuthHeaders());
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

export async function getMeanStatistics() {
  try {
    const { data } = await api.get('/api/water-quality/stats/mean', getAuthHeaders());
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

export async function getVarianceStatistics() {
  try {
    const { data } = await api.get('/api/water-quality/stats/variance', getAuthHeaders());
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

export async function getStandardDeviationStatistics() {
  try {
    const { data } = await api.get('/api/water-quality/stats/std-dev', getAuthHeaders());
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

export async function getMedianStatistics() {
  try {
    const { data } = await api.get('/api/water-quality/stats/median', getAuthHeaders());
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

export async function getMinMaxStatistics() {
  try {
    const { data } = await api.get('/api/water-quality/stats/min-max', getAuthHeaders());
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

// ====================== TIME-BASED STATISTICS ======================

export async function getDailyStatistics(days = 30) {
  try {
    const { data } = await api.get(`/api/water-quality/stats/daily?days=${days}`, getAuthHeaders());
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

export async function getWeeklyStatistics(weeks = 12) {
  try {
    const { data } = await api.get(`/api/water-quality/stats/weekly?weeks=${weeks}`, getAuthHeaders());
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

export async function getMonthlyStatistics(months = 12) {
  try {
    const { data } = await api.get(`/api/water-quality/stats/monthly?months=${months}`, getAuthHeaders());
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

export async function getYearlyStatistics() {
  try {
    const { data } = await api.get('/api/water-quality/stats/yearly', getAuthHeaders());
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

// ====================== ADVANCED ANALYTICS ======================

export async function getTrendAnalysis(period = 30) {
  try {
    const { data } = await api.get(`/api/water-quality/stats/trend?period=${period}`, getAuthHeaders());
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

export async function getMovingAverage(parameter = 'turbidity', window = 7) {
  try {
    const { data } = await api.get(`/api/water-quality/stats/moving-average?parameter=${parameter}&window=${window}`, getAuthHeaders());
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

export async function getParameterCorrelation() {
  try {
    const { data } = await api.get('/api/water-quality/stats/correlation', getAuthHeaders());
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

export async function detectOutliers(parameter = 'turbidity', threshold = 3) {
  try {
    const { data } = await api.get(`/api/water-quality/stats/outliers?parameter=${parameter}&threshold=${threshold}`, getAuthHeaders());
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

export async function getWaterQualityClassification() {
  try {
    const { data } = await api.get('/api/water-quality/stats/classification', getAuthHeaders());
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

export async function getWaterStabilityScore() {
  try {
    const { data } = await api.get('/api/water-quality/stats/stability-score', getAuthHeaders());
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

// ====================== LOCATION-BASED STATISTICS ======================

export async function getDistrictStatistics(district) {
  try {
    const { data } = await api.get(`/api/water-quality/stats/${encodeURIComponent(district)}/district`, getAuthHeaders());
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

export async function getTreatmentPlantStatistics(plantId) {
  try {
    const { data } = await api.get(`/api/water-quality/stats/${encodeURIComponent(plantId)}/treatment-plant`, getAuthHeaders());
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

// ====================== HISTORY ======================

export async function getWaterQualityHistory(params = {}) {
  try {
    const { limit = 100, skip = 0, startDate, endDate } = params;
    let url = `/api/water-quality/history?limit=${limit}&skip=${skip}`;
    if (startDate) url += `&startDate=${startDate}`;
    if (endDate) url += `&endDate=${endDate}`;
    const { data } = await api.get(url, getAuthHeaders());
    return data;
  } catch (error) {
    throw handleError(error);
  }
}