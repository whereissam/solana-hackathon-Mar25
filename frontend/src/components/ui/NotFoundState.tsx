import * as React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import AppBar from "@/components/AppBar";

interface NotFoundStateProps {
  handleGoBack: () => void;
}

export function NotFoundState({ handleGoBack }: NotFoundStateProps) {
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
      <AppBar />
      <Container
        maxWidth="md"
        sx={{ color: "white", px: { xs: 2, sm: 3 }, pb: 8 }}
      >
        <Box sx={{ my: 4, textAlign: "center" }}>
          <Typography variant="h4">Beneficiary Not Found</Typography>
          <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
            The requested beneficiary could not be found or has been removed.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleGoBack}>
            Back
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
