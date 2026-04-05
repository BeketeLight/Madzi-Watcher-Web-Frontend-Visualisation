import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const TurbidityChart = ({ history }) => {
  const labels = history.map(d => d.timestamp);

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { color: 'rgba(0, 0, 0, 0.05)' } },
      x: { grid: { display: false } },
    },
  };

  const chartData = (label, key, color) => ({
    labels,
    datasets: [{
      label,
      data: history.map(d => d[key]),
      borderColor: color,
      backgroundColor: `${color}1A`,
      fill: true,
      tension: 0.4,
    }],
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="border-none shadow-md bg-[#0a2540] border border-[#1e3a5f]">
        <CardHeader><CardTitle className="text-lg font-semibold text-white">Turbidity Trend</CardTitle></CardHeader>
        <CardContent className="h-[300px]">
          <Line options={commonOptions} data={chartData('Turbidity (NTU)', 'turbidity', '#2C7BE5')} />
        </CardContent>
      </Card>
      <Card className="border-none shadow-md bg-[#0a2540] border border-[#1e3a5f]">
        <CardHeader><CardTitle className="text-lg font-semibold text-white">pH Level Trend</CardTitle></CardHeader>
        <CardContent className="h-[300px]">
          <Line options={commonOptions} data={chartData('pH Level', 'pH', '#10B981')} />
        </CardContent>
      </Card>
      <Card className="border-none shadow-md bg-[#0a2540] border border-[#1e3a5f]">
        <CardHeader><CardTitle className="text-lg font-semibold text-white"q>WQI Trend</CardTitle></CardHeader>
        <CardContent className="h-[300px]">
          <Line options={commonOptions} data={chartData('Water Quality Index', 'waterQualityIndex', '#F59E0B')} />
        </CardContent>
      </Card>
    </div>
  );
};
