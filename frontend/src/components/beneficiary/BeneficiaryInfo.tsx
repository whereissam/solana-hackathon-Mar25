import * as React from "react";
import { Paper } from "@mui/material";
import { Beneficiary, FormData, FormErrors } from "@/types/beneficiary";
import { BeneficiaryEditForm } from "./BeneficiaryEditForm";
import { ViewMode } from "./ViewMode";

interface BeneficiaryInfoProps {
  beneficiary: Beneficiary;
  isEditMode: boolean;
  formData: FormData;
  formErrors: FormErrors;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
  handleCancel: () => void;
  handleDelete: () => void;
  isAdmin: () => boolean;
  isDeleting: boolean;
  donationId?: string;
}

export function BeneficiaryInfo({
  beneficiary,
  isEditMode,
  formData,
  formErrors,
  handleInputChange,
  handleSave,
  handleCancel,
  handleDelete,
  isAdmin,
  isDeleting,
  donationId,
}: BeneficiaryInfoProps) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 2,
        backgroundColor: "#111",
        color: "white",
      }}
    >
      {isEditMode ? (
        <BeneficiaryEditForm
          formData={formData}
          formErrors={formErrors}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
          handleDelete={handleDelete}
          isAdmin={isAdmin}
          isDeleting={isDeleting}
        />
      ) : (
        <ViewMode beneficiary={beneficiary} donationId={donationId} />
      )}
    </Paper>
  );
}
