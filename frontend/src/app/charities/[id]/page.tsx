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

// Define TypeScript interfaces
interface Beneficiary {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface Charity {
  id: number;
  name: string;
  beneficiaries?: Beneficiary[];
}

interface CharityData {
  charity: Charity;
}

// Define props explicitly for Client Component
interface CharityPageProps {
  params: { id: string };
  searchParams?: Record<string, string | string[] | undefined>;
}

function CharityContent({ params }: CharityPageProps): JSX.Element {
  const { id } = params;
  const { loading, error, data } = useQuery<CharityData>(
    GET_CHARITY_BENEFICIARIES,
    {
      variables: { id: parseInt(id) },
    }
  );

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

// Export as a Client Component (not async)
export default function CharityPage({ params }: CharityPageProps): JSX.Element {
  return (
    <ApolloProvider client={apolloClient}>
      <CharityContent params={params} />
    </ApolloProvider>
  );
}
