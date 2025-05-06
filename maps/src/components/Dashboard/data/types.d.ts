// Dashboard data type definitions

// Chart data types
export interface DonationChartData {
  months: string[];
  values: number[];
}

export interface VolunteerChartData {
  weeks: string[];
  values: number[];
}

// Dashboard stats types
export interface DashboardStat {
  id: number;
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: string;
  color: string;
  description?: string;
  progress?: number;
}

// Quick action types
export interface QuickAction {
  id: number;
  title: string;
  icon: string;
  color: string;
  action: string;
  link?: string;
}

// Saved charity types
export interface SavedCharity {
  id: number;
  name: string;
  category: string;
  location: string;
  icon: string;
  color: string;
  link?: string;
}

// Recent activity types
export interface RecentActivity {
  id: number;
  type: string;
  description: string;
  time: string;
  icon: string;
  color: string;
}

// Chart data types
export interface ChartDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  fill: boolean;
}

export interface DonationChartData {
  labels: string[];
  datasets: ChartDataset[];
}

// Recent activity types
export interface DonationActivity {
  id: number;
  type: 'donation';
  user: string;
  amount: string;
  charity: string;
  timestamp: string;
}

export interface BeneficiaryAddedActivity {
  id: number;
  type: 'beneficiary_added';
  user: string;
  charity: string;
  beneficiary: string;
  timestamp: string;
}

export interface CharityCreatedActivity {
  id: number;
  type: 'charity_created';
  user: string;
  charity: string;
  timestamp: string;
}

export type ActivityItem = DonationActivity | BeneficiaryAddedActivity | CharityCreatedActivity;

// Top charities types
export interface CharityItem {
  id: number;
  name: string;
  donations: string;
  donors: number;
  trend: string;
}