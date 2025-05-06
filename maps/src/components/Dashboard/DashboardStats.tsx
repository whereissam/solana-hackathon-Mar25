import React from 'react';
import { ArrowUpIcon, ArrowDownIcon, DollarSign, Users, Heart, TrendingUp } from 'lucide-react';

const DashboardStats: React.FC = () => {
  const stats = [
    {
      title: 'Total Donations',
      value: '$12,345',
      change: '+12.5%',
      isIncrease: true,
      icon: <DollarSign className="h-6 w-6 text-white" />,
      bgColor: 'bg-primary'
    },
    {
      title: 'Active Charities',
      value: '24',
      change: '+3',
      isIncrease: true,
      icon: <Users className="h-6 w-6 text-white" />,
      bgColor: 'bg-blue-500'
    },
    {
      title: 'Beneficiaries',
      value: '156',
      change: '+8',
      isIncrease: true,
      icon: <Heart className="h-6 w-6 text-white" />,
      bgColor: 'bg-green-500'
    },
    {
      title: 'Donation Growth',
      value: '18.2%',
      change: '-2.4%',
      isIncrease: false,
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      bgColor: 'bg-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`${stat.bgColor} p-3 rounded-lg`}>
              {stat.icon}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
              stat.isIncrease ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {stat.isIncrease ? (
                <ArrowUpIcon className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownIcon className="h-3 w-3 mr-1" />
              )}
              {stat.change}
            </span>
            <span className="text-xs text-gray-500 ml-2">from last month</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;