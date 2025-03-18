// src/app/charity/[id]/page.jsx
"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARITY_BENEFICIARIES } from "@/lib/queries/charity-queries";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  CircularProgress,
} from "@mui/material";
import AppBar from "@/components/AppBar";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/lib/apollo-client";

function CharityContent({ params }) {
  const { id } = params;
  const { loading, error, data } = useQuery(GET_CHARITY_BENEFICIARIES, {
    variables: { id: parseInt(id) },
  });

  if (loading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  const charity = data?.charity;

  return (
    <>
      <AppBar />
      <Box sx={{ maxWidth: 1200, mx: "auto", p: 2 }}>
        <Typography variant="h1">{charity?.name}</Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h2">Beneficiaries</Typography>
          <Grid container spacing={2}>
            {charity?.beneficiaries?.map((person) => (
              <Grid item xs={12} sm={6} md={4} key={person.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">
                      {person.first_name} {person.last_name}
                    </Typography>
                    <Typography color="textSecondary">
                      {person.email}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default function CharityPage({ params }) {
  return (
    <ApolloProvider client={apolloClient}>
      <CharityContent params={params} />
    </ApolloProvider>
  );
}
