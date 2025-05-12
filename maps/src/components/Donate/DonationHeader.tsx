import React from 'react';

interface DonationHeaderProps {
  title: string;
  subtitle: string;
}

const DonationHeader: React.FC<DonationHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="hero bg-primary text-primary-content py-12">
      <div className="hero-content text-center">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationHeader;