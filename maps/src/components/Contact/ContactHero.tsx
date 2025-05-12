import React from "react";

interface ContactHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

const ContactHero: React.FC<ContactHeroProps> = ({ 
  title, 
  subtitle, 
  backgroundImage 
}) => {
  return (
    <section className="relative h-80 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent z-10"></div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      ></div>
      <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{title}</h1>
          <p className="text-xl">{subtitle}</p>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;