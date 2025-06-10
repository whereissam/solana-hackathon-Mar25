import React from "react";
import Image from "next/image";

const HomeHeader: React.FC = () => {
  return (
    <section className="w-full  min-h-screen flex flex-col items-center justify-center px-4 py-16">
      {/* Main Content Container */}
      <div className="max-w-7xl w-full flex flex-col items-center text-center space-y-8">
        {/* Main Heading with Gradient */}
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-5xl"
          style={{
            background: "linear-gradient(135deg, #A56FFF 0%, #4DD9F0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Your compass for local good
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-lg md:text-xl lg:text-2xl max-w-4xl leading-relaxed font-medium">
          Explore places, meet changemakers, and give with purpose through Unify
          Compass.
        </p>

        {/* Hero Illustration */}
        <div className="w-screen -mx-4">
          <div className="relative w-full flex justify-center">
            <Image
              src="/img/hero.png"
              alt="Network illustration showing connected places and activities"
              width={600}
              height={300}
              className="w-full h-auto object-contain"
              style={{
                minHeight: "300px",
                maxHeight: "none",
                width: "80vw",
                maxWidth: "none",
              }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHeader;
