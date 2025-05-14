import React from 'react';
import Head from 'next/head';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import AboutHero from '@/components/About/AboutHero';
import AboutMission from '@/components/About/AboutMission';
import AboutValues from '@/components/About/AboutValues';
import AboutTeam from '@/components/About/AboutTeam';
import AboutContact from '@/components/About/AboutContact';
import { missionStatement, coreValues, teamMembers } from '@/components/About/data/data';

const AboutPage: React.FC = () => {
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);

  const contactData = {
    email: "info@unifygiving.com",
    phone: "+1 (555) 123-4567",
    address: "123 Charity Lane, Berlin, Germany",
    socialMedia: {
      twitter: "https://twitter.com/unifygiving",
      facebook: "https://facebook.com/unifygiving",
      linkedin: "https://linkedin.com/company/unifygiving"
    }
  };

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
        <AboutMission mission={missionStatement} />
        <AboutValues values={coreValues} />
        <AboutTeam members={teamMembers} />
        <AboutContact contact={contactData} />
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;