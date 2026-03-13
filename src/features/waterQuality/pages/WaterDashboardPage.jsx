import React from 'react';
import { useWaterSocket } from '../hooks/useWaterSocket';
import { WaterQualityCard } from '../components/WaterQualityCard';
import { TurbidityChart } from '../components/TurbidityChart';
import { RecentReadingsTable } from '../components/RecentReadingsTable';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Droplets, 
  Activity, 
  Table as TableIcon, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  FileText, 
  Download,
  Mail
} from 'lucide-react';

export const WaterDashboardPage = () => {
  const { data, history, isConnected, error } = useWaterSocket();

if (error) return (
  <div className="min-h-screen flex items-center justify-center bg-red-50">
    <div className="text-center text-red-600">
      <p>Connection failed: {error}</p>
      <p>Check backend/MQTT bridge is running</p>
    </div>
  </div>
);

if (!isConnected || !data) return (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-slate-600">
        {isConnected ? 'Waiting for first data...' : 'Connecting to real-time server...'}
      </p>
    </div>
  </div>
);

  return (
    <DashboardLayout>
      {/* Hero Section */}
      <section className="bg-[#2C7BE5] py-20 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Real-time Water Quality Monitoring</h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              This system visualizes real-time water quality data from IoT sensors (ESP32) to provide safe water insights.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-[#2C7BE5] hover:bg-blue-50 rounded-full">
                View Live Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section id="dashboard" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Live Monitoring</h2>
              <p className="text-slate-500">Real-time data from IoT Sensor Node</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Live System Online
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
            <WaterQualityCard title="Turbidity" value={data.turbidity?.toFixed(2) ?? '—'} unit="NTU" icon={Droplets} color="bg-blue-500" />
            <WaterQualityCard title="Water pH" value={data.pH?.toFixed(1) ?? '—'} icon={Activity} color="bg-emerald-500" />
            <WaterQualityCard title="TDS" value={data.tds?.toFixed(0) ?? '—'} unit="ppm" icon={TableIcon} color="bg-indigo-500" />
            <WaterQualityCard title="Conductivity" value={data.electricalConductivity?.toFixed(0) ?? '—'} unit="µS/cm" icon={Zap} color="bg-orange-500" />
            <WaterQualityCard title="Quality Index" value={data.waterQualityIndex?.toFixed(0) ?? '—'} unit="WQI" icon={ShieldCheck} color="bg-blue-600" />
          </div>

          {/* Charts */}
          <div className="mb-10">
            <TurbidityChart history={history} />
          </div>

          {/* Table */}
          <div className="mb-16">
            <RecentReadingsTable readings={[...history].reverse()} />
          </div>

          {/* Downloads Section */}
          <div id="downloads" className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Export Data & Reports</h2>
                <p className="text-slate-500 mb-8">Access historical data and generated reports for compliance and research.</p>
                <div className="flex flex-wrap gap-4">
                  <Button className="rounded-xl h-14 px-8"><FileText className="mr-2 h-5 w-5" /> Download PDF Report</Button>
                  <Button variant="outline" className="rounded-xl h-14 px-8"><Download className="mr-2 h-5 w-5" /> Export CSV Dataset</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-24 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex p-3 rounded-2xl bg-blue-100 text-blue-600 mb-6"><Mail className="h-8 w-8" /></div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Stay Updated</h2>
          <p className="text-slate-600 mb-10 text-lg">Subscribe to receive weekly water quality reports and safety alerts.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" placeholder="Enter your email" className="h-14 rounded-full px-6" />
            <Button className="h-14 rounded-full px-8 bg-blue-600">Subscribe</Button>
          </form>
        </div>
      </section>
    </DashboardLayout>
  );
};
