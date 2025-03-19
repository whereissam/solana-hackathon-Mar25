// src/app/charities/page.jsx
"use client";

import * as React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_CHARITIES } from "@/lib/queries/charity-queries";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  CardMedia,
  Grid,
  Container,
  CircularProgress,
} from "@mui/material";
import AppBar from "@/components/AppBar";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/lib/apollo-client";

// Define the charity interface
interface Charity {
  id: string;
  name: string;
  slogan?: string;
  detail?: string;
}

// Wrap the actual content in Apollo Provider
function CharitiesContent() {
  const { data, loading, error } = useQuery(GET_ALL_CHARITIES);
  // Add this for SSR/CSR consistency
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Basic loading state before client-side hydration
  if (!isMounted) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="inherit" sx={{ color: "white" }} />
      </Box>
    );
  }

  if (loading)
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="inherit" sx={{ color: "white" }} />
      </Box>
    );

  if (error)
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <Typography color="error">Error: {error.message}</Typography>
      </Box>
    );

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Wrapper to center the AppBar */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <AppBar />
      </Box>

      {/* Main content container */}
      <Container
        maxWidth="lg"
        sx={{
          color: "white",
          px: { xs: 2, sm: 3 },
          pb: 8,
        }}
      >
        <Box sx={{ my: 4, textAlign: "center" }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              mb: 2,
              fontWeight: "bold",
            }}
          >
            Charities
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: "800px",
              mx: "auto",
              mb: 4,
              fontSize: "1.1rem",
              lineHeight: 1.6,
            }}
          >
            Explore our list of charitable organizations dedicated to making a
            difference in various communities. Each charity works tirelessly to
            address critical issues like homelessness, hunger, animal rescue,
            and environmental sustainability.
          </Typography>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {data?.charities?.map((charity: Charity) => (
            <Grid item xs={12} sm={6} md={4} key={charity.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "16px",
                  overflow: "hidden",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <CardMedia
                  sx={{ height: 220 }}
                  image={`/img/charity/${charity.id}.png`}
                  title={charity.name}
                />
                <CardHeader
                  sx={{ pb: 0 }}
                  titleTypographyProps={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#666",
                  }}
                  title={charity.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      mb: 1,
                      fontWeight: "bold",
                    }}
                  >
                    {charity.slogan || "Making a difference"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {charity.detail ||
                      "Supporting communities and creating positive change."}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// Main export with Apollo Provider
export default function CharitiesPage() {
  return (
    <ApolloProvider client={apolloClient}>
      <CharitiesContent />
    </ApolloProvider>
  );
}
