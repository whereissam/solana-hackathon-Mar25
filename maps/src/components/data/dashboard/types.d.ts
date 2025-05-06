// Types for Dashboard component data

export interface DashboardStat {
  id: number;
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down';
  icon: string;
  color: string;
  description?: string;
  progress?: number;
}

export interface QuickAction {
  id: number;
  title: string;
  icon: string;
  color: string;
  action: string;
  link?: string;
}

export interface SavedCharity {
  id: number;
  name: string;
  category: string;
  location: string;
  icon: string;
  color: string;
  link: string;
}

export interface ChartData {
  months: string[];
  values: number[];
}

export interface VolunteerChartData {
  weeks: string[];
  values: number[];
}