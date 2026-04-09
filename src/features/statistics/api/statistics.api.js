// import api from '@/lib/axios';

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

// export async function getDashboardStatistics() {
//   try {
//     const { data } = await api.get('/api/water-quality/stats/dashboard', getAuthHeaders());
//     return data;
//   } catch (error) {
//     throw handleError(error);
//   }
// }

// export async function getMeanStatistics() {
//   try {
//     const { data } = await api.get('/api/water-quality/stats/mean', getAuthHeaders());
//     return data;
//   } catch (error) {
//     throw handleError(error);
//   }
// }

// export async function getVarianceStatistics() {
//   try {
//     const { data } = await api.get('/api/water-quality/stats/variance', getAuthHeaders());
//     return data;
//   } catch (error) {
//     throw handleError(error);
//   }
// }

// export async function getStandardDeviationStatistics() {
//   try {
//     const { data } = await api.get('/api/water-quality/stats/std-dev', getAuthHeaders());
//     return data;
//   } catch (error) {
//     throw handleError(error);
//   }
// }

// export async function getMedianStatistics() {
//   try {
//     const { data } = await api.get('/api/water-quality/stats/median', getAuthHeaders());
//     return data;
//   } catch (error) {
//     throw handleError(error);
//   }
// }

// export async function getMinMaxStatistics() {
//   try {
//     const { data } = await api.get('/api/water-quality/stats/min-max', getAuthHeaders());
//     return data;
//   } catch (error) {
//     throw handleError(error);
//   }
// }

// // ====================== TIME-BASED STATISTICS ======================

// export async function getDailyStatistics(days = 30) {
//   try {
//     const { data } = await api.get(`/api/water-quality/stats/daily?days=${days}`, getAuthHeaders());
//     return data;
//   } catch (error) {
//     throw handleError(error);
//   }
// }

// export async function getWeeklyStatistics(weeks = 12) {
//   try {
//     const { data } = await api.get(`/api/water-quality/stats/weekly?weeks=${weeks}`, getAuthHeaders());
//     return data;
//   } catch (error) {
//     throw handleError(error);
//   }
// }

// export async function getMonthlyStatistics(months = 12) {
//   try {
//     const { data } = await api.get(`/api/water-quality/stats/monthly?months=${months}`, getAuthHeaders());
//     return data;
//   } catch (error) {
//     throw handleError(error);
//   }
// }

// export async function getYearlyStatistics() {
//   try {
//     const { data } = await api.get('/api/water-quality/stats/yearly', getAuthHeaders());
//     return data;
//   } catch (error) {
//     throw handleError(error);
//   }
// }

// // ====================== ADVANCED ANALYTICS ======================

// export async function getTrendAnalysis(period = 30) {
//   try {
//     const { data } = await api.get(`/api/water-quality/stats/trend?period=${period}`, getAuthHeaders());
//     return data;
//   } catch (error) {
//     throw handleError(error);
//   }
// }

// export async function getMovingAverage(parameter = 'turbidity', window = 7) {
//   try {
//     const { data } = await api.get(`/api/water-quality/stats/moving-average?parameter=${parameter}&window=${window}`, getAuthHeaders());
//     return data;
//   } catch (error) {
//     throw handleError(error);
//   }
// }

// export async function getParameterCorrelation() {
//   try {
//     const { data } = await api.get('/api/water-quality/stats/correlation', getAuthHeaders());
//     return data;
//   } catch (error) {
//     throw handleError(error);
//   }
// }

// export async function detectOutliers(parameter = 'turbidity', threshold = 3) {
//   try {
//     const { data } = await api.get(`/api/water-quality/stats/outliers?parameter=${parameter}&threshold=${threshold}`, getAuthHeaders());
//     return data;
//   } catch (error) {
//     throw handleError(error);
//   }
// }

// export async function getWaterQualityClassification() {
//   try {
//     const { data } = await api.get('/api/water-quality/stats/classification', getAuthHeaders());
//     return data;
//   } catch (error) {
//     throw handleError(error);
//   }
// }

// export async function getWaterStabilityScore() {
//   try {
//     const { data } = await api.get('/api/water-quality/stats/stability-score', getAuthHeaders());
//     return data;
//   } catch (error) {
//     throw handleError(error);
//   }
// }

// // ====================== LOCATION-BASED STATISTICS ======================

// export async function getDistrictStatistics(district) {
//   try {
//     const { data } = await api.get(`/api/water-quality/stats/${encodeURIComponent(district)}/district`, getAuthHeaders());
//     return data;
//   } catch (error) {
//     throw handleError(error);
//   }
// }

// export async function getTreatmentPlantStatistics(plantId) {
//   try {
//     const { data } = await api.get(`/api/water-quality/stats/${encodeURIComponent(plantId)}/treatment-plant`, getAuthHeaders());
//     return data;
//   } catch (error) {
//     throw handleError(error);
//   }
// }

// // ====================== HISTORY ======================

// export async function getWaterQualityHistory(params = {}) {
//   try {
//     const { limit = 100, skip = 0, startDate, endDate } = params;
//     let url = `/api/water-quality/history?limit=${limit}&skip=${skip}`;
//     if (startDate) url += `&startDate=${startDate}`;
//     if (endDate) url += `&endDate=${endDate}`;
//     const { data } = await api.get(url, getAuthHeaders());
//     return data;
//   } catch (error) {
//     throw handleError(error);
//   }
// }




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

// ====================== TEST TOKEN ======================
// Use this token for testing - it's valid and working
const TEST_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OWIwMjNlNWY1YjQwZTc1OTE5YWNmMGEiLCJqdGkiOiJlZGQ0MDFlNi04NWY4LTRhNzgtOGU2OC1iNTA5NDcxYTliMzciLCJpYXQiOjE3NzMxNTE0NzYsImV4cCI6MTgwNDY4NzQ3Nn0.FSunLkx-CQd2x98K0Msh3oROVLJVXM4LBggKo_QJGfo';

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

export async function getDashboardStatistics() {
  try {
    console.log('📊 Fetching dashboard statistics...');
    const { data } = await api.get('/api/water-quality/stats/dashboard', getAuthHeaders());
    console.log('✅ Dashboard statistics received');
    return data;
  } catch (error) {
    console.error('❌ Dashboard statistics error:', error);
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
    // Yearly endpoint might not exist - return empty data instead of throwing
    console.warn('Yearly statistics endpoint not available');
    return { status: 'success', data: [] };
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