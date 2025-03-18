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
  Button,
  CardActions,
  Grid,
} from "@mui/material";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  if (loading) return <Typography>Loading charities...</Typography>;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <>
      <AppBar />
      <Box sx={{ flexGrow: 1 }} margin={1}>
        <Typography variant="h1">Charities</Typography>
        <Typography variant="body1">
          Explore our list of charitable organizations dedicated to making a
          difference in various communities. Each charity works tirelessly to
          address critical issues like homelessness, hunger, animal rescue, and
          environmental sustainability.
        </Typography>
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 5 }}>
          {data?.charities?.map((charity: Charity) => (
            <Grid item xs={12} sm={6} md={4} key={charity.id}>
              <Card variant="outlined">
                <CardMedia
                  sx={{ height: 305 }}
                  image={`/img/charity/${charity.id}.png`}
                  title={charity.name}
                />
                <CardHeader
                  titleTypographyProps={{ fontSize: 16 }}
                  title={charity.name}
                />
                <CardContent>
                  <Typography variant="h4">
                    {charity.slogan || "Making a difference"}
                  </Typography>
                  <Typography variant="body1">
                    {charity.detail ||
                      "Supporting communities and creating positive change."}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ display: "flex", flexDirection: "column", mb: 3 }}
                >
                  <Button
                    sx={{ width: 0.8 }}
                    variant="outlined"
                    onClick={() => router.push(`/charities/${charity.id}`)}
                  >
                    Visit Charity
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
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
