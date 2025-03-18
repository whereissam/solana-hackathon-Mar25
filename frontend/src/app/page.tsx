// src/app/page.tsx
"use client";

import * as React from "react";
import { Box } from "@mui/material";
import AppBar from "@/components/AppBar";
import Footer from "@/components/Footer";
import HomeHeader from "@/components/home/HomeHeader";
import HowItWorks from "@/components/home/HowItWorks";
import TeamSection from "@/components/home/TeamSection";

export default function HomePage(): JSX.Element {
  return (
    <>
      <Box
        component="section"
        sx={{
          backgroundImage: "url('/img/homeTopBackground.png')",
          backgroundPosition: "top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
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
      <Footer />
    </>
  );
}
