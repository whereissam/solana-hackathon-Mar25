// src/app/page.tsx
"use client";

import * as React from "react";
import { Box } from "@mui/material";
import AppBar from "@/components/AppBar";
import Footer from "@/components/Footer";
import HomeHeader from "@/components/home/HomeHeader";
import HowItWorks from "@/components/home/HowItWorks";
import TeamSection from "@/components/home/TeamSection";
import Image from "next/image";
import { sectionStyle } from "@/styles/common";

export default function HomePage() {
  return (
    <div className="bg-[#18023C]">
      <Box
        component="section"
        sx={{
          width: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AppBar variant="home" />
        <HomeHeader />
      </Box>
      <HowItWorks />
      <TeamSection />
      <Box component="section" sx={sectionStyle}>
        <Image
          src="/img/Across_the_dots_across_the_city.png"
          alt="Background header image"
          width={600}
          height={600}
        />
        <div className="text-center text-[#98A1C0] text-lg">
          Explore places, meet changemakers, and give with purpose through Unify
          Compass.
        </div>
        <Image
          src="/img/userfeedback.png"
          alt="Background header image"
          width={600}
          height={200}
        />
      </Box>
      <Footer />
    </div>
  );
}
