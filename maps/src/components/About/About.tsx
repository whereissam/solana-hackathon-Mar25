import React from 'react';
import Header from '../common/Header';
import AboutHero from './AboutHero';
import AboutMission from './AboutMission';
import AboutValues from './AboutValues';
import AboutTeam from './AboutTeam';
import { missionStatement, coreValues, teamMembers } from './data/data';

const About: React.FC = () => {
  const [showProfileMenu, setShowProfileMenu] = React.useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header 
        showProfileMenu={showProfileMenu} 
        setShowProfileMenu={setShowProfileMenu} 
      />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 md:py-16 px-4 sm:px-6 bg-white text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-gray-900">About Us</h1>
            <p className="text-lg md:text-xl text-gray-700 mb-6 md:mb-8">
              We're dedicated to making charitable giving more transparent, efficient, and impactful through blockchain technology.
            </p>
            <button className="btn btn-primary px-6 py-2">Learn More</button>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-12 md:py-16 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Our Mission</h2>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{missionStatement.title}</h3>
                <p className="text-gray-700 mb-4 md:mb-6">{missionStatement.description}</p>
                <ul className="space-y-2 md:space-y-3">
                  {missionStatement.goals.map((goal, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
                <img 
                  src="/images/mission-illustration.svg" 
                  alt="Our Mission Illustration" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-12 md:py-16 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {coreValues.map((value, index) => (
                <div key={index} className="bg-gray-50 p-6 md:p-8 rounded-xl">
                  <div className="text-3xl md:text-4xl mb-3 md:mb-4">{value.icon}</div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{value.title}</h3>
                  <p className="text-gray-700">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-12 md:py-16 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
                  <div className="flex flex-col items-center text-center mb-3 md:mb-4">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-3 md:mb-4">
                      <img 
                        src={member.avatar} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold">{member.name}</h3>
                    <p className="text-primary font-medium">{member.role}</p>
                  </div>
                  <p className="text-gray-700 mb-3 md:mb-4">{member.bio}</p>
                  <div className="flex justify-center space-x-2 md:space-x-3">
                    {member.socialLinks.map((link, idx) => (
                      <a 
                        key={idx} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <span>{link.icon}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
