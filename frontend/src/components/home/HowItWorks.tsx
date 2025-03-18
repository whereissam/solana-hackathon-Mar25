// src/components/home/HowItWorks.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { sectionStyle } from "@/styles/common";

const HowItWorks: React.FC = () => {
  return (
    <Box component="section" sx={sectionStyle}>
      <Typography
        variant="h6"
        sx={{
          backgroundColor: "#f4e6ff",
          display: "inline",
          borderRadius: 32,
          paddingX: 2,
        }}
      >
        How It Works
      </Typography>
      <Typography variant="h3">How Unify Works</Typography>
      <Box
        sx={{
          display: { xs: "none", sm: "none", md: "none", lg: "flex" },
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <img
          style={{ marginRight: 40 }}
          src="/img/howItWorks_1.png"
          alt="Step 1"
        />
        <img
          style={{ marginTop: 0, marginRight: 5 }}
          src="/img/howItWorks_2.png"
          alt="Step 2"
        />
        <img
          style={{ marginTop: 0 }}
          src="/img/howItWorks_3.png"
          alt="Step 3"
        />
      </Box>
      <Carousel
        duration={1000}
        autoPlay={true}
        interval={2000}
        animation="slide"
        sx={{
          display: { lg: "none" },
          width: 1,
          textAlign: "center",
          minHeight: "702px",
        }}
      >
        <img src="/img/howItWorks_1.png" alt="Step 1" />
        <img src="/img/howItWorks_2.png" alt="Step 2" />
        <img src="/img/howItWorks_3.png" alt="Step 3" />
      </Carousel>
    </Box>
  );
};

export default HowItWorks;
