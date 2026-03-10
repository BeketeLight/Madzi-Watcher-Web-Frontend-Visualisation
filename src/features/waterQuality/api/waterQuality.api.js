import axios from '@/src/lib/axios';

export const fetchHistoricalData = async () => {
  const response = await axios.get('/water-quality/history');
  return response.data;
};

export const downloadDataset = async () => {
  const response = await axios.get('/water-quality/export', { responseType: 'blob' });
  return response.data;
};
