import React from 'react';
import Head from 'next/head';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import AboutHero from '@/components/About/AboutHero';
import AboutMission from '@/components/About/AboutMission';
import AboutValues from '@/components/About/AboutValues';
import AboutTeam from '@/components/About/AboutTeam';
import AboutContact from '@/components/About/AboutContact';
import { missionData, valuesData, teamData, contactData } from '@/components/About/data/data';

const AboutPage: React.FC = () => {
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  return (
    <div className="min-h-screen bg-base-200">
      <Head>
        <title>Unify Giving - About Us</title>
        <meta
          property="og:title"
          content="Unify Giving - About Us"
          key="title"
        />
        <meta
          name="description"
          content="Learn about Unify Giving's mission, values, and the team behind our platform dedicated to making charitable giving more transparent and impactful."
        />
      </Head>
      
      <Header 
        showProfileMenu={showProfileMenu} 
        setShowProfileMenu={setShowProfileMenu}
        title="Unify Giving"
      />
      
      <main>
        <AboutHero 
          title="About Unify Compass"
          subtitle="Learn about our mission and impact"
          backgroundImage="/images/about/aboutBanner.jpg"
        />
        <AboutMission mission={missionData} />
        <AboutValues values={valuesData} />
        <AboutTeam members={teamData} />
        <AboutContact contact={contactData} />
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;