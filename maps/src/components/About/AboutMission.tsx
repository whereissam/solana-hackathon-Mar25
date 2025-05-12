import React from 'react';

interface MissionProps {
  mission?: {
    title?: string;
    description?: string;
    goals?: string[];
  };
}

const AboutMission: React.FC<MissionProps> = ({ mission }) => {
  // Default values if mission is undefined
  const defaultMission = {
    title: "Revolutionizing Charitable Giving with Blockchain",
    description: "Our mission is to leverage blockchain technology to create a more transparent, efficient, and impactful charitable giving ecosystem.",
    goals: [
      "Increase transparency in charitable donations through blockchain verification",
      "Reduce administrative costs associated with traditional donation methods",
      "Empower donors with real-time tracking of their contributions",
      "Provide a secure and efficient platform for global giving",
      "Build trust in the charitable sector through immutable records"
    ]
  };

  // Use mission if provided, otherwise use default values
  const { title, description, goals } = mission || defaultMission;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img
                src="/images/about/ourstory.jpg"
                alt="Our Story"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 mb-6">
              Unify Giving began when our founder, Sarah Johnson, recognized a critical gap between local charities and the communities they serve. After years working in the nonprofit sector, she saw how smaller organizations struggled with visibility while community members wanted to help but didn't know where to start.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              What started as a simple database has grown into a comprehensive platform connecting thousands of charities with volunteers, donors, and partners across the country. Our mission remains the same: to make local impact accessible to everyone.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full text-purple-600 mr-4">
                  <i className="fas fa-flag text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">2020: Foundation</h3>
                  <p className="text-gray-600">Unify Giving launches with 100 partner organizations</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full text-purple-600 mr-4">
                  <i className="fas fa-map-marked-alt text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">2022: Mapping Innovation</h3>
                  <p className="text-gray-600">Introduced interactive charity mapping feature</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full text-purple-600 mr-4">
                  <i className="fas fa-globe text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">2024: National Expansion</h3>
                  <p className="text-gray-600">Expanded to all 50 states with 2,500+ charity partners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;