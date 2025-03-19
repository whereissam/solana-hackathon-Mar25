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
  Skeleton,
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

// Skeleton card for loading state
const CharityCardSkeleton = () => (
  <Card
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      borderRadius: "16px",
      overflow: "hidden",
    }}
  >
    <Skeleton variant="rectangular" height={220} animation="wave" />
    <CardHeader title={<Skeleton animation="wave" height={20} width="80%" />} />
    <CardContent sx={{ flexGrow: 1 }}>
      <Skeleton animation="wave" height={30} width="90%" sx={{ mb: 1 }} />
      <Skeleton animation="wave" height={20} width="100%" />
      <Skeleton animation="wave" height={20} width="60%" />
    </CardContent>
  </Card>
);

// Wrap the actual content in Apollo Provider
function CharitiesContent() {
  const { data, loading, error } = useQuery(GET_ALL_CHARITIES);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Only render a minimal placeholder during server-side rendering
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
        }}
      />
    );
  }

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

        {error ? (
          <Box sx={{ textAlign: "center", my: 4 }}>
            <Typography color="error" variant="h6">
              Error loading charities: {error.message}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Please try refreshing the page or contact support if the problem
              persists.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {loading
              ? // Show skeleton cards while loading
                Array.from(new Array(6)).map((_, index) => (
                  <Grid item xs={12} sm={6} md={4} key={`skeleton-${index}`}>
                    <CharityCardSkeleton />
                  </Grid>
                ))
              : // Show actual charity cards when data is loaded
                data?.charities?.map((charity: Charity) => (
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
                        // image={`/img/charity/${charity.id}.png`}
                        image={`https://therecordnewspaper.org/wp-content/uploads/2019/05/Catholic-Charities-Building-Southwest-5-16-19-p1-.gif`}
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
        )}
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
