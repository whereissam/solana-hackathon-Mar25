import React from 'react';

const AboutHero: React.FC = () => {
  return (
    <section className="relative h-96 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-transparent z-10"></div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/about/aboutBanner.jpg')`,
        }}
      ></div>
      <div className="relative z-20 max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Unify Giving
          </h1>
          <p className="text-xl mb-8">
            We're dedicated to making charitable giving more transparent, efficient, and impactful through blockchain technology.
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition duration-300 shadow-lg !rounded-button whitespace-nowrap cursor-pointer">
            Get Involved
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;