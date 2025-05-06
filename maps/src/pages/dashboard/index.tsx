import React from 'react';
import Head from 'next/head';
import Dashboard from '#components/Dashboard/Dashboard';

const DashboardPage = () => (
  <div>
    <Head>
      <title>Unify Giving - Dashboard</title>
      <meta
        property="og:title"
        content="Unify Giving - Dashboard"
        key="title"
      />
      <meta
        name="description"
        content="Manage your charitable activities, track donations, and discover new opportunities to make a difference."
      />
    </Head>
    <Dashboard />
  </div>
);

export default DashboardPage;
