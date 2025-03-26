import * as React from "react";
import { Box, Container, Button, Skeleton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AppBar from "@/components/AppBar";

interface LoadingStateProps {
  handleGoBack: () => void;
}

export function LoadingState({ handleGoBack }: LoadingStateProps) {
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
        <Box sx={{ my: 4 }}>
          <Button
            startIcon={<ChevronLeftIcon />}
            onClick={handleGoBack}
            sx={{ color: "white", mb: 2 }}
          >
            Back
          </Button>
          <Skeleton
            variant="rectangular"
            height={60}
            width="70%"
            sx={{ mb: 2 }}
          />
          <Skeleton
            variant="rectangular"
            height={200}
            width="100%"
            sx={{ mb: 2, borderRadius: 2 }}
          />
        </Box>
      </Container>
    </Box>
  );
}
