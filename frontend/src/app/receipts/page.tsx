import * as React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CardActionArea,
  Button,
  Grid as Grid2,
  Skeleton,
} from "@mui/material";
import OneTimeDonationIcon from "@/components/icons/OneTimeDonationIcon";
import Link from "next/link";

export default function ReceiptsPage() {
  // Temporary mock data - replace with your actual data fetching
  const data = [
    {
      date: new Date(),
      donatee: "Example Donatee",
      amount: 100,
      currency: "€",
      signature: "example-signature",
    },
  ];

  const isFetching = false;

  return (
    <>
      <Typography variant="h1" sx={{ textAlign: "left" }}>
        My Donations
      </Typography>
      <Box sx={{ flexGrow: 1 }} margin={1}>
        {isFetching && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Skeleton variant="text" sx={{ width: 0.3 }} />
            <Skeleton variant="text" sx={{ width: 0.5 }} />
            <Skeleton variant="text" sx={{ width: 0.4 }} />
          </Box>
        )}
        {data?.map((dateGroup, index) => (
          <Box key={index}>
            <Typography variant="h6">
              {new Date(dateGroup.date).toLocaleDateString()}
            </Typography>
            <Grid2
              sx={{ my: 4 }}
              container
              spacing={2}
              justifyContent="flex-start"
            >
              <Grid2 xs={12} sm={12} md={6}>
                <Card>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      gap: 2,
                    }}
                  >
                    <OneTimeDonationIcon />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
                        {dateGroup.donatee}
                      </Typography>
                      <Typography>One time Donation</Typography>
                    </Box>
                    <Box>
                      <Typography>
                        {dateGroup.currency} {dateGroup.amount}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActionArea sx={{ mb: 2 }}>
                    <Link
                      href={`https://explorer.solana.com/address/${dateGroup.signature}?cluster=devnet#metadata`}
                      target="_blank"
                      passHref
                    >
                      <Button sx={{ width: 0.9 }} variant="outlined">
                        View NFT
                      </Button>
                    </Link>
                  </CardActionArea>
                </Card>
              </Grid2>
            </Grid2>
          </Box>
        ))}
      </Box>
    </>
  );
}
