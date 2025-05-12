import React from 'react';

interface BannerImageProps {
  title: string;
  subtitle?: string;
  imagePath: string;
  height?: string;
}

/**
 * BannerImage component for page headers
 * 
 * This component provides a consistent banner image with title overlay for pages.
 * Banner images should be placed in the public/images directory, organized by page name.
 * 
 * Example image paths:
 * - Contact page: '/images/contact/contactBanner.jpg'
 * - About page: '/images/about/aboutBanner.jpg'
 * 
 * @param title - The main heading text
 * @param subtitle - Optional subheading text
 * @param imagePath - Path to the banner image (from public directory)
 * @param height - Optional custom height (default: 'h-80')
 */
const BannerImage: React.FC<BannerImageProps> = ({ 
  title, 
  subtitle, 
  imagePath,
  height = 'h-80'
}) => {
  return (
    <section className={`relative ${height} overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent z-10"></div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${imagePath}')` }}
      ></div>
      <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{title}</h1>
          {subtitle && <p className="text-xl">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
};

export default BannerImage;