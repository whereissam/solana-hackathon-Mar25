import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ImpactItem {
  amount: number;
  description: string;
  icon: string;
}

const ImpactSection: React.FC = () => {
  // Chart data and options
  const chartData = {
    labels: ['Water', 'Education', 'Healthcare', 'Environment', 'Housing', 'Community'],
    datasets: [
      {
        label: 'Impact by Category',
        data: [25, 50, 100, 250, 500, 1000],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 206, 86, 0.6)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Donation Impact by Category',
        font: {
          size: 16
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Donation Amount ($)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Impact Category'
        }
      }
    }
  };

  const impactItems: ImpactItem[] = [
    {
      amount: 25,
      description: 'Provides clean water to a family for a month',
      icon: 'tint'
    },
    {
      amount: 50,
      description: 'Supplies educational materials for 10 children',
      icon: 'book'
    },
    {
      amount: 100,
      description: 'Funds medical supplies for a rural clinic',
      icon: 'heartbeat'
    },
    {
      amount: 250,
      description: 'Plants 50 trees to restore forest habitats',
      icon: 'tree'
    },
    {
      amount: 500,
      description: 'Builds a shelter for a family in need',
      icon: 'home'
    },
    {
      amount: 1000,
      description: 'Funds a community development project',
      icon: 'users'
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Your Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how your donation can make a real difference in people's lives
          </p>
        </div>
        <div className="mb-12 bg-white p-6 rounded-xl shadow-md">
          <Bar data={chartData} options={chartOptions} className="max-h-80" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {impactItems.map((item, index) => (
            <div key={index} className="card bg-white shadow-md hover:shadow-lg transition-all">
              <div className="card-body p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <i className={`fas fa-${item.icon} text-primary text-xl`}></i>
                  </div>
                  <h3 className="card-title text-xl">${item.amount}</h3>
                </div>
                <p className="text-gray-700">{item.description}</p>
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${Math.min(100, (item.amount / 10))}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button className="btn btn-primary btn-lg">
            Make Your Impact Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;