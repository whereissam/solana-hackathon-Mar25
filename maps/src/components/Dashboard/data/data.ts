// Dashboard data

// Chart data for donation history
export const donationChartData = {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  values: [120, 200, 150, 80, 170, 220]
};

// Chart data for volunteer hours
export const volunteerChartData = {
  weeks: ["Week 1", "Week 2", "Week 3", "Week 4"],
  values: [5, 8, 12, 10]
};

// Dashboard stats cards data
export const dashboardStats = [
  {
    id: 1,
    title: "Total Donations",
    value: "$1,250",
    change: "12.5%",
    trend: "up",
    icon: "fa-hand-holding-usd",
    color: "blue"
  },
  {
    id: 2,
    title: "Saved Charities",
    value: "15",
    change: "3",
    trend: "up",
    icon: "fa-heart",
    color: "purple",
    description: "new this month"
  },
  {
    id: 3,
    title: "Volunteer Hours",
    value: "35",
    description: "10 hours this month",
    icon: "fa-clock",
    color: "green"
  },
  {
    id: 4,
    title: "Impact Score",
    value: "82/100",
    progress: 82,
    icon: "fa-star",
    color: "yellow"
  }
];

// Quick actions data
export const quickActions = [
  {
    id: 1,
    title: "Make a Donation",
    icon: "fa-donate",
    color: "blue",
    action: "donate"
  },
  {
    id: 2,
    title: "Find Opportunities",
    icon: "fa-search",
    color: "green",
    action: "find"
  },
  {
    id: 3,
    title: "Manage Saved Charities",
    icon: "fa-heart",
    color: "purple",
    action: "manage",
    link: "/dashboard/report1"
  },
  {
    id: 4,
    title: "Schedule Volunteer Time",
    icon: "fa-calendar-alt",
    color: "yellow",
    action: "schedule"
  }
];

// Saved charities data
export const savedCharities = [
  {
    id: 1,
    name: "Food For All",
    category: "Food Banks",
    location: "Berlin",
    icon: "fa-utensils",
    color: "blue",
    link: "/dashboard/charity1"
  },
  {
    id: 2,
    name: "Education Matters",
    category: "Education",
    location: "Berlin",
    icon: "fa-book",
    color: "green",
    link: "/dashboard/charity2"
  },
  {
    id: 3,
    name: "Healthcare Access",
    category: "Healthcare",
    location: "Berlin",
    icon: "fa-heartbeat",
    color: "red",
    link: "/dashboard/charity3"
  }
];

// Recent activity data
export const recentActivities = [
  {
    id: 1,
    type: "donation",
    description: "You donated $50 to Food For All",
    time: "Today at 10:30 AM",
    icon: "fa-donate",
    color: "blue"
  },
  {
    id: 2,
    type: "volunteer",
    description: "You volunteered 3 hours at Community Garden",
    time: "Yesterday at 2:15 PM",
    icon: "fa-clock",
    color: "green"
  },
  {
    id: 3,
    type: "save",
    description: "You saved Healthcare Access to your favorites",
    time: "April 20, 2025",
    icon: "fa-heart",
    color: "purple"
  }
];