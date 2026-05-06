import { Bell, Search, Sun, Moon, User } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function TopNav() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="h-20 bg-theme-surface/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 sticky top-0 z-50">
      
      <div className="flex-1 flex items-center gap-4">
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search zones, alerts..." 
            className="w-full bg-gray-100 dark:bg-gray-800/50 border-none rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-theme-alert rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></span>
        </button>

        <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>

        <button className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <div className="w-8 h-8 rounded-full bg-theme-primary/20 flex items-center justify-center text-theme-primary">
            <User className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium hidden sm:block">Admin User</span>
        </button>
      </div>
    </header>
  );
}