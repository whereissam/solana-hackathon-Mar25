// src/components/home/TeamSection.tsx
import React from "react";
import { Box } from "@mui/material";
import { sectionStyle } from "@/styles/common";
import Image from "next/image";

const TeamSection: React.FC = () => {
  return (
    <Box component="section" sx={sectionStyle}>
      <Image
        src="/img/From_discovery_to_impact.png"
        alt="Background header image"
        width={600}
        height={600}
      />
      <div className="text-center text-[#98A1C0] text-lg">
        Explore places, meet changemakers, and give with purpose through Unify
        Compass.
      </div>
      <Image
        src="/img/impactflow.png"
        alt="Background header image"
        width={600}
        height={200}
      />
    </Box>
  );
};

export default TeamSection;
