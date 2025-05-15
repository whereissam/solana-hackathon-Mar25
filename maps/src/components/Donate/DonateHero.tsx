import React from 'react';
import { motion } from 'framer-motion';

interface DonateHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  stats?: {
    raised: string;
    donors: string;
    charities: string;
  };
}

const DonateHero: React.FC<DonateHeroProps> = ({ 
  title = "Make a Difference Today", 
  subtitle = "Your donation can change lives. Support causes you care about and see the impact of your generosity.", 
  backgroundImage = "/images/donate/donateBanner.jpg",
  stats = {
    raised: "$2.5M+",
    donors: "12K+",
    charities: "50+"
  }
}) => {
  return (
    <section className="relative h-96 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent z-10"></div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      ></div>
      <div className="relative z-20 max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl mb-6"
          >
            {subtitle}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
              <div className="text-2xl font-bold">{stats.raised}</div>
              <div className="text-sm">Raised</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
              <div className="text-2xl font-bold">{stats.donors}</div>
              <div className="text-sm">Donors</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
              <div className="text-2xl font-bold">{stats.charities}</div>
              <div className="text-sm">Charities</div>
            </div>
          </motion.div>
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition duration-300 shadow-lg !rounded-button whitespace-nowrap cursor-pointer flex items-center"
          >
            <i className="fas fa-heart mr-2"></i>
            Start Donating Now
          </motion.button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-purple-900/50 to-transparent z-10"></div>
    </section>
  );
};

export default DonateHero;