import React from 'react';
import { motion } from 'framer-motion';

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
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: 'fa-chart-pie' },
    { id: 'donations', label: 'Donations', icon: 'fa-hand-holding-heart' },
    { id: 'charities', label: 'Charities', icon: 'fa-building' },
    { id: 'analytics', label: 'Analytics', icon: 'fa-chart-line' },
    { id: 'map', label: 'Map View', icon: 'fa-map-marked-alt' },
    { id: 'settings', label: 'Settings', icon: 'fa-cog' }
  ];

  return (
    <motion.div 
      className={`bg-white shadow-md ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <motion.h2 
          className={`font-bold ${isOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Dashboard
        </motion.h2>
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <i className={`fas ${isOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
        </button>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.li 
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
            >
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <i className={`fas ${item.icon} ${isOpen ? 'mr-3' : 'mx-auto'}`}></i>
                {isOpen && <span>{item.label}</span>}
              </button>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};

export default DashboardSidebar;