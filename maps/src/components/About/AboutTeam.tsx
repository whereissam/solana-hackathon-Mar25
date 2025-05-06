import React from 'react';
import { TeamMemberType } from './data/types';

interface AboutTeamProps {
  members?: TeamMemberType[];
}

const AboutTeam: React.FC<AboutTeamProps> = ({ members }) => {
  // Default values if members is undefined
  const defaultMembers: TeamMemberType[] = [
    {
      name: "John Doe",
      role: "CEO",
      bio: "John is the visionary leader of our team, driving innovation and growth.",
      avatar: "/images/about/sarahj.jpg",
      socialLinks: [
        { icon: "🐦", url: "https://twitter.com" },
        { icon: "💼", url: "https://linkedin.com/in/johndoe" }
      ]
    },
    // Add more default team members as needed
  ];

  // Use members if provided, otherwise use default values
  const membersToDisplay = members || defaultMembers;

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our diverse team brings together expertise in nonprofit management, technology, and community organizing to create a platform that serves both charities and supporters.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {membersToDisplay.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                <div className="flex space-x-4">
                  {member.socialLinks && member.socialLinks.map((link, idx) => (
                    <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors cursor-pointer">
                      <span>{link.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutTeam;