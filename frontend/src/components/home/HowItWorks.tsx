import React from "react";
import { Box, Typography } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { sectionStyle } from "@/styles/common";
import Image from "next/image";

const HowItWorks: React.FC = () => {
  return (
    <Box component="section" sx={sectionStyle}>
      <Typography
        variant="h6"
        sx={{
          backgroundColor: "#f4e6ff",
          display: "inline-block",
          borderRadius: 32,
          paddingX: 3,
          paddingY: 1,
          color: "#333",
          fontSize: "1.2rem",
          fontWeight: 500,
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
          gap: "40px",
          position: "relative",
        }}
      >
        <Image
          src="/img/howItWorks_1.png"
          alt="Step 1"
          width={400}
          height={600}
          priority
        />
        <Image
          src="/img/howItWorks_2.png"
          alt="Step 2"
          width={400}
          height={600}
        />
        <Image
          src="/img/howItWorks_3.png"
          alt="Step 3"
          width={400}
          height={600}
        />
      </Box>
      <Box sx={{ display: { lg: "none" }, width: 1, textAlign: "center" }}>
        <Carousel
          showThumbs={false} // Hide thumbnails
          showStatus={false} // Hide status indicators
          infiniteLoop={true} //loop the carousel
          autoPlay={true}
          interval={2000}
        >
          <div style={{ minHeight: "600px" }}>
            <Image
              src="/img/howItWorks_1.png"
              alt="Step 1"
              width={400}
              height={600}
              priority
            />
          </div>
          <div style={{ minHeight: "600px" }}>
            <Image
              src="/img/howItWorks_2.png"
              alt="Step 2"
              width={400}
              height={600}
            />
          </div>
          <div style={{ minHeight: "600px" }}>
            <Image
              src="/img/howItWorks_3.png"
              alt="Step 3"
              width={400}
              height={600}
            />
          </div>
        </Carousel>
      </Box>
    </Box>
  );
};

export default HowItWorks;
