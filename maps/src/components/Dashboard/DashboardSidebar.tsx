import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Heart, 
  Users, 
  Settings, 
  LogOut, 
  ChevronLeft,
  BarChart3,
  Map
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardSidebarProps {
  isOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  toggleSidebar: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ 
  isOpen, 
  activeTab, 
  setActiveTab,
  toggleSidebar
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="h-5 w-5" /> },
    { id: 'donations', label: 'Donations', icon: <Heart className="h-5 w-5" /> },
    { id: 'charities', label: 'Charities', icon: <Users className="h-5 w-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="h-5 w-5" /> },
    { id: 'map', label: 'Charity Map', icon: <Map className="h-5 w-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <aside 
      className={cn(
        "bg-white border-r border-gray-200 z-20 fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:flex w-64 flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold text-primary">UnifyGiving</span>
        </Link>
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          aria-label="Close sidebar"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  activeTab === item.id 
                    ? "bg-primary text-white" 
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors">
          <LogOut className="h-5 w-5" />
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;