import React from 'react';
import Head from 'next/head';
import Donate from '@/components/Donate/Donate';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const DonatePage: React.FC = () => {
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  return (
    <div className="min-h-screen bg-base-200">
      <Head>
        <title>Unify Giving - Make a Donation</title>
        <meta
          property="og:title"
          content="Unify Giving - Make a Donation"
          key="title"
        />
        <meta
          name="description"
          content="Support causes you care about with a donation through Unify Giving. Your generosity helps make a difference in communities worldwide."
        />
      </Head>
      
      <Header 
        showProfileMenu={showProfileMenu} 
        setShowProfileMenu={setShowProfileMenu}
        title="Unify Giving"
      />
      
      <main className="pt-6 pb-16">
        <Donate />
      </main>
      
      <Footer />
    </div>
  );
};

export default DonatePage;