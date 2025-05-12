import React, { useState } from 'react';
import { Box } from '@mui/material';
import Header from '../common/Header';
import DashboardSidebar from './DashboardSidebar';
import CharityOverview from './CharityOverview';
import DashboardStats from './DashboardStats';
import RecentDonations from './RecentDonations';
import { charities } from '../Charities/data/data';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <DashboardStats />
            <CharityOverview charities={charities} />
            <RecentDonations />
          </>
        );
      case 'donations':
        return <div>Donations Content</div>;
      case 'charities':
        return <div>Charities Content</div>;
      case 'analytics':
        return <div>Analytics Content</div>;
      case 'map':
        return <div>Map Content</div>;
      case 'settings':
        return <div>Settings Content</div>;
      default:
        return <div>Overview Content</div>;
    }
  };

  return (
    <Box className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        showProfileMenu={showProfileMenu}
        setShowProfileMenu={setShowProfileMenu}
      />
      
      <Box className="flex flex-1">
        <DashboardSidebar 
          isOpen={sidebarOpen} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          toggleSidebar={toggleSidebar} 
        />
        
        <Box className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
