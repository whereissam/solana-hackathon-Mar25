import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { color } from "@/styles/theme";
import { useRouter } from "next/navigation";

const HomeHeader: React.FC = () => {
  const router = useRouter();

  const handleDonateClick = () => {
    router.push("/donate");
  };

  return (
    <Box
      sx={() => ({
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        marginTop: "10px",
        width: 0.95,
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 12,
        paddingBottom: 12,
        justifyContent: "space-between",
        gap: 4,
        position: "relative",
      })}
      maxWidth={880}
    >
      <img
        src="/img/homeTopImage.png"
        style={{
          position: "absolute",
          top: "-20px",
          width: "100%",
          zIndex: "-1",
        }}
        alt="Background header image"
      />
      <Typography
        variant="h1"
        sx={{
          color: "white",
          fontSize: { xs: 50, sm: 60, md: 70 },
          textAlign: "center",
          fontWeight: "normal",
        }}
      >
        Empower Your
        <Box
          component="strong"
          sx={{
            color: color.primary[200],
          }}
        >
          {" "}
          Generosity{" "}
        </Box>
        <br />
        Donate Seamlessly
      </Typography>
      <Typography
        variant="h3"
        sx={{
          width: 0.9,
          color: "white",
          fontSize: { xs: 14, md: 20 },
          textAlign: "center",
        }}
      >
        Connect your wallet, donate through Solana, and receive a verifiable
        proof of your contribution. Empower your generosity with transparency
        and trust.
      </Typography>
      <Box
        sx={{
          flexGrow: 0,
          display: "flex",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Button variant="contained" onClick={handleDonateClick} size="large">
          Donate Now
        </Button>
      </Box>
    </Box>
  );
};

export default HomeHeader;
