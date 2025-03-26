import * as React from "react";
import { Box, Grid, Typography, Divider } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { Beneficiary } from "@/types/beneficiary";

interface ViewModeProps {
  beneficiary: Beneficiary;
  donationId?: string;
}

export function ViewMode({ beneficiary, donationId }: ViewModeProps) {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            First Name
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {beneficiary.first_name}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Last Name
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {beneficiary.last_name}
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2, backgroundColor: "rgba(255, 255, 255, 0.1)" }} />

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          Email Address
        </Typography>
        <Typography
          variant="h6"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <EmailIcon fontSize="small" /> {beneficiary.email}
        </Typography>
      </Box>

      {donationId && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            ID
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            {donationId}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
