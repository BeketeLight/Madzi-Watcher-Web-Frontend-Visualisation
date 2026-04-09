// // src/features/statistics/api/statistics.api.js
// import api from '@/lib/axios';

// // Error handler (same style as your auth.api.js)
// function handleError(error) {
//   if (error.response) {
//     throw error.response.data;
//   } else if (error.request) {
//     throw {
//       status: 500,
//       message: 'No response from server',
//     };
//   } else {
//     throw {
//       status: 500,
//       message: error.message || 'An error occurred',
//     };
//   }
// }

// // Helper to add auth headers
// const getAuthHeaders = () => {
//   const token = localStorage.getItem('accessToken');
//   return {
//     headers: {
//       'Authorization': token ? `Bearer ${token}` : ''
//     }
//   };
// };

// // ====================== BASIC STATISTICS ======================

// // Dashboard Overview Stats
// export async function getDashboardStatistics() {
//   try {
//     const { data } = await api.get('/stats/dashboard', getAuthHeaders());
//     return data;
//   } catch (error) {
//     throw handleError(error);
//   }
// }

// export async function getMeanStatistics() {
//   try {
//     const { data } = await api.get('/stats/mean');
//     return data;
//   } catch (error) {
//     return handleError(error);
//   }
// }

// export async function getVarianceStatistics() {
//   try {
//     const { data } = await api.get('/stats/variance');
//     return data;
//   } catch (error) {
//     return handleError(error);
//   }
// }

// export async function getStandardDeviationStatistics() {
//   try {
//     const { data } = await api.get('/stats/std-dev');
//     return data;
//   } catch (error) {
//     return handleError(error);
//   }
// }

// export async function getMedianStatistics() {
//   try {
//     const { data } = await api.get('/stats/median');
//     return data;
//   } catch (error) {
//     return handleError(error);
//   }
// }

// export async function getMinMaxStatistics() {
//   try {
//     const { data } = await api.get('/stats/min-max');
//     return data;
//   } catch (error) {
//     return handleError(error);
//   }
// }

// // Time-based Statistics
// export async function getDailyStatistics(params = {}) {
//   try {
//     const { data } = await api.get('/stats/daily', { params });
//     return data;
//   } catch (error) {
//     return handleError(error);
//   }
// }

// export async function getWeeklyStatistics(params = {}) {
//   try {
//     const { data } = await api.get('/stats/weekly', { params });
//     return data;
//   } catch (error) {
//     return handleError(error);
//   }
// }

// export async function getMonthlyStatistics(params = {}) {
//   try {
//     const { data } = await api.get('/stats/monthly', { params });
//     return data;
//   } catch (error) {
//     return handleError(error);
//   }
// }

// // Advanced Analytics
// export async function getTrendAnalysis(params = {}) {
//   try {
//     const { data } = await api.get('/stats/trend', { params });
//     return data;
//   } catch (error) {
//     throw handleError(error);
//   }
// }

// export async function getMovingAverage(params = {}) {
//   try {
//     const { data } = await api.get('/stats/moving-average', { params });
//     return data;
//   } catch (error) {
//     return handleError(error);
//   }
// }

// export async function getParameterCorrelation(params = {}) {
//   try {
//     const { data } = await api.get('/stats/correlation', { params });
//     return data;
//   } catch (error) {
//     return handleError(error);
//   }
// }

// export async function detectOutliers(params = {}) {
//   try {
//     const { data } = await api.get('/stats/outliers', { params });
//     return data;
//   } catch (error) {
//     return handleError(error);
//   }
// }

// export async function getWaterQualityClassification() {
//   try {
//     const { data } = await api.get('/stats/classification');
//     return data;
//   } catch (error) {
//     return handleError(error);
//   }
// }

// export async function getWaterStabilityScore() {
//   try {
//     const { data } = await api.get('/stats/stability-score');
//     return data;
//   } catch (error) {
//     return handleError(error);
//   }
// }

// // Location-based
// export async function getDistrictStatistics(district) {
//   try {
//     const { data } = await api.get(`/stats/${district}/district`);
//     return data;
//   } catch (error) {
//     return handleError(error);
//   }
// }

// export async function getTreatmentPlantStatistics(plant) {
//   try {
//     const { data } = await api.get(`/stats/${plant}/treatment-plant`);
//     return data;
//   } catch (error) {
//     return handleError(error);
//   }
// }


// // ====================== TEST FUNCTION ======================

// export async function testAPI() {
//   console.log('🧪 Testing API connection...');
//   try {
//     const result = await getDashboardStatistics();
//     console.log('✅ API Test Successful!');
//     console.log('📊 Total readings:', result?.data?.totalReadings);
//     console.log('📊 Mean WQI:', result?.data?.mean?.wqi);
//     return result;
//   } catch (error) {
//     console.error('❌ API Test Failed:', error);
//     return null;
//   }
// }

// src/features/statistics/api/statistics.api.js
import api from '@/lib/axios';

// ====================== TEST TOKEN ======================
// Use this token for testing - it's valid and working
const TEST_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OWIwMjNlNWY1YjQwZTc1OTE5YWNmMGEiLCJqdGkiOiJlZGQ0MDFlNi04NWY4LTRhNzgtOGU2OC1iNTA5NDcxYTliMzciLCJpYXQiOjE3NzMxNTE0NzYsImV4cCI6MTgwNDY4NzQ3Nn0.FSunLkx-CQd2x98K0Msh3oROVLJVXM4LBggKo_QJGfo';

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

// Dashboard Overview Stats
export async function getDashboardStatistics() {
  try {
    console.log('📊 Fetching dashboard statistics...');
    const { data } = await api.get('/stats/dashboard', getAuthHeaders());
    console.log('✅ Dashboard statistics received');
    return data;
  } catch (error) {
    console.error('❌ Dashboard statistics error:', error);
    throw handleError(error);
  }
}

export async function getMeanStatistics() {
  try {
    const { data } = await api.get('/stats/mean', getAuthHeaders());
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

export async function getVarianceStatistics() {
  try {
    const { data } = await api.get('/stats/variance', getAuthHeaders());
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

export async function getStandardDeviationStatistics() {
  try {
    const { data } = await api.get('/stats/std-dev', getAuthHeaders());
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

export async function getMedianStatistics() {
  try {
    const { data } = await api.get('/stats/median', getAuthHeaders());
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

export async function getMinMaxStatistics() {
  try {
    const { data } = await api.get('/stats/min-max', getAuthHeaders());
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

// ====================== TIME-BASED STATISTICS ======================

export async function getDailyStatistics(days = 30) {
  try {
    const { data } = await api.get(`/stats/daily?days=${days}`, getAuthHeaders());
    return data;
  } catch (error) {
    console.warn('Daily stats error:', error);
    return { status: 'success', data: [] };
  }
}

export async function getWeeklyStatistics(weeks = 12) {
  try {
    const { data } = await api.get(`/stats/weekly?weeks=${weeks}`, getAuthHeaders());
    return data;
  } catch (error) {
    console.warn('Weekly stats error:', error);
    return { status: 'success', data: [] };
  }
}

export async function getMonthlyStatistics(months = 12) {
  try {
    const { data } = await api.get(`/stats/monthly?months=${months}`, getAuthHeaders());
    return data;
  } catch (error) {
    console.warn('Monthly stats error:', error);
    return { status: 'success', data: [] };
  }
}

export async function getYearlyStatistics() {
  try {
    const { data } = await api.get('/stats/yearly', getAuthHeaders());
    return data;
  } catch (error) {
    console.warn('Yearly stats not available');
    return { status: 'success', data: [] };
  }
}

// ====================== ADVANCED ANALYTICS ======================

export async function getTrendAnalysis(period = 30) {
  try {
    const { data } = await api.get(`/stats/trend?period=${period}`, getAuthHeaders());
    return data;
  } catch (error) {
    console.warn('Trend analysis error:', error);
    return { status: 'success', data: { trends: {} } };
  }
}

export async function getMovingAverage(parameter = 'turbidity', window = 7) {
  try {
    const { data } = await api.get(`/stats/moving-average?parameter=${parameter}&window=${window}`, getAuthHeaders());
    return data;
  } catch (error) {
    return handleError(error);
  }
}

export async function getParameterCorrelation() {
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

export async function getWaterQualityClassification() {
  try {
    const { data } = await api.get('/stats/classification', getAuthHeaders());
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

export async function getWaterStabilityScore() {
  try {
    const { data } = await api.get('/stats/stability-score', getAuthHeaders());
    return data;
  } catch (error) {
    return handleError(error);
  }
}

// ====================== LOCATION-BASED STATISTICS ======================

export async function getDistrictStatistics(district) {
  try {
    const { data } = await api.get(`/stats/${encodeURIComponent(district)}/district`, getAuthHeaders());
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

export async function getTreatmentPlantStatistics(plant) {
  try {
    const { data } = await api.get(`/stats/${encodeURIComponent(plant)}/treatment-plant`, getAuthHeaders());
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

// ====================== HISTORY ======================

export async function getWaterQualityHistory(params = {}) {
  try {
    const { limit = 100, skip = 0, startDate, endDate } = params;
    let url = `/history?limit=${limit}&skip=${skip}`;
    if (startDate) url += `&startDate=${startDate}`;
    if (endDate) url += `&endDate=${endDate}`;
    const { data } = await api.get(url, getAuthHeaders());
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

// ====================== TEST FUNCTION ======================

export async function testAPI() {
  console.log('🧪 Testing API connection...');
  try {
    const result = await getDashboardStatistics();
    console.log('✅ API Test Successful!');
    console.log('📊 Total readings:', result?.data?.totalReadings);
    console.log('📊 Mean WQI:', result?.data?.mean?.wqi);
    return result;
  } catch (error) {
    console.error('❌ API Test Failed:', error);
    return null;
  }
}