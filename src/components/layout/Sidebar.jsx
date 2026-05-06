import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Map, BarChart3, History, Settings, Info, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/map', label: 'Live Map', icon: Map },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/history', label: 'History', icon: History },
    { path: '/admin', label: 'Admin Panel', icon: Settings },
    { path: '/about', label: 'About', icon: Info },
  ];

  return (
    <aside className="h-screen w-64 bg-theme-surface border-r border-theme-surface flex flex-col shadow-lg sticky top-0 hidden md:flex">
      <Link to="/" className="p-6 flex items-center gap-3 hover:opacity-80 transition-opacity">
        <div className="h-16 flex items-center justify-center drop-shadow-md">
          <img src="/logo.png" alt="EleGuardLK Logo" className="h-full w-auto object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
          <div className="hidden h-10 w-10 bg-theme-primary rounded-full items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
        </div>
        <span className="text-xl font-bold tracking-tight text-[var(--color-text-primary-val)]">EleGuard<span className="text-theme-accent">LK</span></span>
      </Link>

      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative ${
                isActive 
                  ? 'text-theme-accent bg-theme-primary/10 font-medium' 
                  : 'text-theme-secondary hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-theme-primary rounded-r-md"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <Link to="/" className="flex items-center justify-center px-4 py-2 w-full text-sm text-theme-secondary hover:text-theme-primary transition-colors">
          Log Out
        </Link>
      </div>
    </aside>
  );
}