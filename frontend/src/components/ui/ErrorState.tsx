import * as React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import AppBar from "@/components/AppBar";

interface ErrorWithMessage {
  message: string;
}

interface ErrorStateProps {
  error: Error | ErrorWithMessage | unknown;
  handleGoBack: () => void;
}

export function ErrorState({ error, handleGoBack }: ErrorStateProps) {
  const getErrorMessage = (err: Error | ErrorWithMessage | unknown): string => {
    if (err instanceof Error) {
      return err.message;
    }

    // Check if error is an object with a message property
    if (
      err &&
      typeof err === "object" &&
      "message" in err &&
      typeof err.message === "string"
    ) {
      return err.message;
    }

    // Default error message if we can't extract a message
    return "Unable to load the beneficiary details. Please try again later.";
  };

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
          <Typography color="error" variant="h4">
            Error loading beneficiary details
          </Typography>
          <Typography sx={{ mt: 2 }}>{getErrorMessage(error)}</Typography>
          <Button variant="contained" sx={{ mt: 3 }} onClick={handleGoBack}>
            Back
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
