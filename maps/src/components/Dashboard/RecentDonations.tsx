import React from 'react';
import { Badge } from '../Charities/ui/badge';
import { motion } from 'framer-motion';

interface Donation {
  id: string;
  date: string;
  amount: string;
  donor: string;
  charity: string;
  status: 'completed' | 'pending' | 'failed';
}

const RecentDonations: React.FC = () => {
  // Sample data - in a real app, this would come from an API
  const donations: Donation[] = [
    {
      id: 'DON-001',
      date: '2023-05-15',
      amount: '$250.00',
      donor: 'John Smith',
      charity: 'Berlin Education Initiative',
      status: 'completed'
    },
    {
      id: 'DON-002',
      date: '2023-05-14',
      amount: '$100.00',
      donor: 'Sarah Johnson',
      charity: 'Berlin Healthcare Access',
      status: 'completed'
    },
    {
      id: 'DON-003',
      date: '2023-05-13',
      amount: '$75.50',
      donor: 'Michael Brown',
      charity: 'Berlin Animal Shelter',
      status: 'pending'
    },
    {
      id: 'DON-004',
      date: '2023-05-12',
      amount: '$500.00',
      donor: 'Emily Davis',
      charity: 'Berlin Children\'s Fund',
      status: 'completed'
    },
    {
      id: 'DON-005',
      date: '2023-05-11',
      amount: '$50.00',
      donor: 'David Wilson',
      charity: 'Berlin Environmental Coalition',
      status: 'failed'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      case 'failed':
        return <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-200">Failed</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold">Recent Donations</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-3 border-b border-gray-200">ID</th>
              <th className="px-6 py-3 border-b border-gray-200">Date</th>
              <th className="px-6 py-3 border-b border-gray-200">Amount</th>
              <th className="px-6 py-3 border-b border-gray-200">Donor</th>
              <th className="px-6 py-3 border-b border-gray-200">Charity</th>
              <th className="px-6 py-3 border-b border-gray-200">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {donations.map((donation, index) => (
              <motion.tr 
                key={donation.id} 
                className="hover:bg-gray-50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {donation.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(donation.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {donation.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {donation.donor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {donation.charity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(donation.status)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <motion.div 
        className="p-4 border-t border-gray-200 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <button className="text-sm text-primary hover:underline">
          View all donations
        </button>
      </motion.div>
    </motion.div>
  );
};

export default RecentDonations;