import React from 'react';
import { Droplets, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#2C7BE5] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-white p-1.5 rounded-lg">
                <Droplets className="h-6 w-6 text-[#2C7BE5]" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Madzi Watcher</span>
            </div>
            <p className="text-sm leading-relaxed text-blue-50">
              Real-time water quality monitoring system for Malawi and beyond. Providing insights for safe water and sustainable communities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-200 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-blue-200 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-blue-200 transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-blue-200 transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Contact Information</h4>
            <ul className="space-y-4 text-sm text-blue-50">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-200 shrink-0" />
                <span>Madzi Watcher Water Monitoring System<br />Lilongwe, Malawi</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-200 shrink-0" />
                <span>+265 XXX XXX XXX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-200 shrink-0" />
                <a href="mailto:info@madziwatcher.mw" className="hover:text-white">info@madziwatcher.mw</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-blue-50">
              <li><a href="#" className="hover:text-white transition-colors">Overview</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Downloads</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Products</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Help</h4>
            <ul className="space-y-3 text-sm text-blue-50">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-blue-400/30 text-center text-xs text-blue-100">
          <p>© {new Date().getFullYear()} Madzi Watcher. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
