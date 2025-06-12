import * as React from "react";
import { Box, Typography, Link, Divider, Stack } from "@mui/material";
import Image from "next/image";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1D073C",
        width: 1,
        px: { xs: 2, md: 8 },
        py: { xs: 4, md: 6 },
        mt: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "flex-start" },
          gap: { xs: 4, md: 0 },
        }}
      >
        {/* Logo, description, social */}
        <Box sx={{ flex: 1, minWidth: 220 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1,
              position: "relative",
              width: "180px",
              height: "40px",
            }}
          >
            <Image
              src="/img/Logo.png"
              alt="Unify Logo"
              fill
              priority
              style={{ objectFit: "contain" }}
            />
          </Box>
          <Typography
            variant="body2"
            color="white"
            sx={{ mb: 2, maxWidth: 260 }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In urna
            ultrices amet tellus ornare. Faucibus id posuere massa
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Link
              href="#"
              aria-label="Facebook"
              sx={{ color: "#8A42F8", fontSize: 22 }}
            >
              <FaFacebookF />
            </Link>
            <Link
              href="#"
              aria-label="LinkedIn"
              sx={{ color: "#8A42F8", fontSize: 22 }}
            >
              <FaLinkedinIn />
            </Link>
            <Link
              href="#"
              aria-label="Twitter"
              sx={{ color: "#8A42F8", fontSize: 22 }}
            >
              <FaTwitter />
            </Link>
          </Stack>
        </Box>

        {/* Site Map */}
        <Box sx={{ flex: 1, minWidth: 150 }}>
          <Typography
            variant="subtitle1"
            color="white"
            sx={{ mb: 1, fontWeight: 600 }}
          >
            Site Map
          </Typography>
          <Stack spacing={1}>
            <Link href="/" color="inherit" underline="hover">
              Home
            </Link>
            <Link href="/hubs" color="inherit" underline="hover">
              Hubs
            </Link>
            <Link href="/map" color="inherit" underline="hover">
              Map
            </Link>
            <Link href="/donations" color="inherit" underline="hover">
              My Donations
            </Link>
            <Link href="/marketplace" color="inherit" underline="hover">
              UGs Marketplace
            </Link>
          </Stack>
        </Box>

        {/* Company */}
        <Box sx={{ flex: 1, minWidth: 150 }}>
          <Typography
            variant="subtitle1"
            color="white"
            sx={{ mb: 1, fontWeight: 600 }}
          >
            Company
          </Typography>
          <Stack spacing={1}>
            <Link href="/support" color="inherit" underline="hover">
              Help & Support
            </Link>
            <Link href="/terms" color="inherit" underline="hover">
              Terms & Conditions
            </Link>
            <Link href="/privacy" color="inherit" underline="hover">
              Privacy Policy
            </Link>
          </Stack>
        </Box>

        {/* Resource */}
        <Box sx={{ flex: 1, minWidth: 150 }}>
          <Typography
            variant="subtitle1"
            color="white"
            sx={{ mb: 1, fontWeight: 600 }}
          >
            Resource
          </Typography>
          <Stack spacing={1}>
            <Link href="/partner" color="inherit" underline="hover">
              Partner
            </Link>
            <Link href="/blog" color="inherit" underline="hover">
              Blog
            </Link>
            <Link href="/newsletter" color="inherit" underline="hover">
              Newsletter
            </Link>
          </Stack>
        </Box>
      </Box>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)", my: 3 }} />
      <Typography variant="body2" color="white" align="center">
        Copyright © Unify Compass 2025 All right reserved
      </Typography>
    </Box>
  );
}
