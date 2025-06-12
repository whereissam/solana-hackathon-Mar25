import React from "react";
import { Box, Typography } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { sectionStyle } from "@/styles/common";
import Image from "next/image";

const HowItWorks: React.FC = () => {
  return (
    <Box component="section" sx={sectionStyle}>
      <Image
        src="/img/Causes_near_you.png"
        alt="Background header image"
        width={600}
        height={600}
      />
      <div className="text-center text-[#98A1C0] text-lg">
        Discover impactful causes happening right around the corner.
      </div>
      <Image
        src="/img/near.png"
        alt="Background header image"
        width={600}
        height={200}
        style={{
          minHeight: "600px",
          maxHeight: "none",
          width: "80vw",
          maxWidth: "none",
        }}
      />
    </Box>
  );
};

export default HowItWorks;
