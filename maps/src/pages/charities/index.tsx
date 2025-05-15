import React, { useState } from 'react';
import Head from 'next/head';
import Charities from '@/components/Charities/Charities';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

const CharitiesPage = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div>
      <Head>
        <title>Unify Compass - Charity Dashboard</title>
        <meta
          property="og:title"
          content="Unify Compass - Charity Dashboard"
          key="title"
        />
        <meta
          name="description"
          content="Browse and filter charitable organizations by category, location, and impact. Find the perfect cause to support with Unify Compass."
        />
      </Head>
      
      <Header 
        showProfileMenu={showProfileMenu} 
        setShowProfileMenu={setShowProfileMenu}
        title="Unify Compass"
      />
      
      <Charities />
      <Footer />
    </div>
  );
};

export default CharitiesPage;