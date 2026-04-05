import React from 'react';
import { Droplets, Menu, X } from 'lucide-react';
import { Button } from './ui/button';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: 'Overview', href: '#' },
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'Downloads', href: '#downloads' },
    { name: 'Products', href: '#' },
    { name: 'Newsletter', href: '#newsletter' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="bg-[#2C7BE5] p-1.5 rounded-lg">
              <Droplets className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Madzi Watcher</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-slate-600 hover:text-[#2C7BE5] transition-colors">
                {link.name}
              </a>
            ))}
            <Button size="sm" className="bg-[#2C7BE5] hover:bg-blue-700 rounded-full px-6">Subscribe</Button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-slate-900 p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-[#2C7BE5] hover:bg-slate-50 rounded-md" onClick={() => setIsOpen(false)}>
              {link.name}
            </a>
          ))}
          <div className="px-3 pt-4">
            <Button className="w-full bg-[#2C7BE5] rounded-full">Subscribe</Button>
          </div>
        </div>
      )}
    </nav>
  );
};
