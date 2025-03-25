import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

interface Beneficiary {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface BeneficiaryListProps {
  beneficiaries: Beneficiary[];
  userIsAdmin: boolean;
  onAddClick: () => void;
  onBeneficiaryClick: (beneficiaryId: string) => void;
}

const BeneficiaryList: React.FC<BeneficiaryListProps> = ({
  beneficiaries,
  userIsAdmin,
  onAddClick,
}) => {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleViewBeneficiary = (beneficiary: Beneficiary) => {
    router.push(`/beneficiaries/${beneficiary.id}`);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#222",
        borderRadius: 2,
        p: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "medium" }}>
          Beneficiaries
        </Typography>

        {userIsAdmin && (
          <Button
            variant="contained"
            size="small"
            startIcon={<PersonAddIcon />}
            onClick={onAddClick}
          >
            Add
          </Button>
        )}
      </Box>

      {beneficiaries.length > 0 ? (
        <Box>
          {beneficiaries.map((beneficiary) => (
            <Paper
              key={beneficiary.id}
              sx={{
                p: 2,
                mb: 2,
                backgroundColor: "#333",
                borderRadius: 2,
                color: "white",
                cursor: "pointer",
                transition: "background-color 0.2s",
                "&:hover": {
                  backgroundColor: "#444",
                },
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onClick={() => handleViewBeneficiary(beneficiary)}
            >
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {beneficiary.first_name} {beneficiary.last_name}
                </Typography>
                <Typography variant="body2">{beneficiary.email}</Typography>
              </Box>
              <Tooltip title="View Details">
                <IconButton
                  size="small"
                  sx={{ color: "white" }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the parent onClick
                    handleViewBeneficiary(beneficiary);
                  }}
                >
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
            </Paper>
          ))}
        </Box>
      ) : (
        <Box textAlign="center" py={3}>
          <Typography variant="body1" sx={{ fontStyle: "italic", mb: 3 }}>
            No beneficiaries have been added yet.
          </Typography>

          {!isAuthenticated ? (
            <Typography variant="body2" color="text.secondary">
              Only charity administrators can add beneficiaries.
            </Typography>
          ) : !userIsAdmin ? (
            <Typography variant="body2" color="text.secondary">
              You need to be the charity administrator to add beneficiaries.
            </Typography>
          ) : null}
        </Box>
      )}
    </Box>
  );
};

export default BeneficiaryList;
