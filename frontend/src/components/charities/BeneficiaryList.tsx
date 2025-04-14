import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Papa from "papaparse";
import { useMutation } from "@apollo/client";
import { CREATE_BENEFICIARY } from "@/lib/mutations/beneficiary-mutations";

interface ParseError {
  message: string;
  name: string;
  code: string;
}

interface Beneficiary {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
}

interface BeneficiaryListProps {
  beneficiaries: Beneficiary[];
  userIsAdmin: boolean;
  onAddClick: () => void;
  onBeneficiaryClick: (beneficiaryId: string) => void;
  charityId: number;
  onImportComplete?: () => void;
}

const BeneficiaryList: React.FC<BeneficiaryListProps> = ({
  beneficiaries,
  userIsAdmin,
  onAddClick,
  charityId,
  onImportComplete,
}) => {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importPreview, setImportPreview] = useState<Omit<Beneficiary, "id">[]>(
    []
  );
  const [isImporting, setIsImporting] = useState(false);
  const [importResults, setImportResults] = useState<{
    success: number;
    failed: number;
    errors: Array<{ email: string; error: string }>;
  }>({ success: 0, failed: 0, errors: [] });
  const [showResults, setShowResults] = useState(false);

  // GraphQL mutation hook
  const [createBeneficiary] = useMutation(CREATE_BENEFICIARY);

  const handleViewBeneficiary = (beneficiary: Beneficiary) => {
    router.push(`/beneficiaries/${beneficiary.id}`);
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImportError(null);

    // Use the correct type for the complete callback
    Papa.parse<Record<string, string>>(file as File, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setImportError(`Error parsing CSV: ${results.errors[0].message}`);
          return;
        }

        try {
          // Validate and transform the data
          const beneficiariesToImport = results.data.map(
            (row: Record<string, string>) => {
              // Check required fields
              if (
                !row.first_name ||
                !row.last_name ||
                !row.email ||
                !row.password
              ) {
                throw new Error(
                  "Missing required fields. CSV must have first_name, last_name, email, and password columns"
                );
              }

              // Basic email validation
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(row.email)) {
                throw new Error(`Invalid email format: ${row.email}`);
              }

              // Basic password validation (at least 6 characters)
              if (row.password.length < 6) {
                throw new Error(
                  `Password too short for user ${row.email}. Passwords must be at least 6 characters`
                );
              }

              return {
                first_name: row.first_name.trim(),
                last_name: row.last_name.trim(),
                email: row.email.trim(),
                password: row.password,
              };
            }
          );

          setImportPreview(beneficiariesToImport);
          setImportDialogOpen(true);
        } catch (error) {
          setImportError((error as Error).message);
        }
      },
      error: (error: ParseError) => {
        setImportError(`Error reading file: ${error.message}`);
      },
    });

    // Reset the file input
    if (event.target) {
      event.target.value = "";
    }
  };

  const handleImport = async () => {
    if (importPreview.length === 0) return;

    setIsImporting(true);
    setImportResults({ success: 0, failed: 0, errors: [] });

    try {
      const results = {
        success: 0,
        failed: 0,
        errors: [] as Array<{ email: string; error: string }>,
      };

      // Process beneficiaries one by one
      for (const beneficiary of importPreview) {
        try {
          await createBeneficiary({
            variables: {
              charityId,
              detail: {
                first_name: beneficiary.first_name,
                last_name: beneficiary.last_name,
                email: beneficiary.email,
                password: beneficiary.password,
              },
            },
          });
          results.success++;
        } catch (error) {
          results.failed++;
          results.errors.push({
            email: beneficiary.email,
            error: (error as Error).message || "Unknown error",
          });
        }
      }

      setImportResults(results);
      setShowResults(true);

      // If all successful or user chose to continue, close dialog and refresh
      if (results.failed === 0) {
        setTimeout(() => {
          setImportDialogOpen(false);
          setImportPreview([]);
          setShowResults(false);
          if (onImportComplete) {
            onImportComplete();
          }
        }, 2000);
      }
    } catch (error) {
      setImportError(`Import failed: ${(error as Error).message}`);
    } finally {
      setIsImporting(false);
    }
  };

  const handleCloseAfterImport = () => {
    setImportDialogOpen(false);
    setImportPreview([]);
    setShowResults(false);
    if (onImportComplete) {
      onImportComplete();
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#222",
        borderRadius: 1,
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
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<UploadFileIcon />}
              onClick={handleFileSelect}
            >
              Import CSV
            </Button>
            <Button
              variant="contained"
              size="small"
              startIcon={<PersonAddIcon />}
              onClick={onAddClick}
            >
              Add
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept=".csv"
              onChange={handleFileChange}
            />
          </Box>
        )}
      </Box>

      {importError && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          onClose={() => setImportError(null)}
        >
          {importError}
        </Alert>
      )}

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

      {/* CSV Import Preview Dialog */}
      <Dialog
        open={importDialogOpen}
        onClose={() => !isImporting && setImportDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#111",
            color: "white",
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle
          sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
        >
          Import Beneficiaries
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          {showResults ? (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Import Results
              </Typography>
              <Alert
                severity={importResults.failed > 0 ? "warning" : "success"}
                sx={{ mb: 2 }}
              >
                {importResults.success} beneficiaries imported successfully.
                {importResults.failed > 0 && ` ${importResults.failed} failed.`}
              </Alert>

              {importResults.errors.length > 0 && (
                <Box sx={{ maxHeight: "200px", overflow: "auto", mt: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Errors:
                  </Typography>
                  {importResults.errors.map((err, idx) => (
                    <Typography
                      key={idx}
                      variant="body2"
                      sx={{ color: "error.main", mb: 0.5 }}
                    >
                      {err.email}: {err.error}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>
          ) : (
            <>
              {importPreview.length > 0 ? (
                <>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Ready to import {importPreview.length} beneficiaries:
                  </Typography>
                  <Box sx={{ maxHeight: "300px", overflow: "auto", mb: 2 }}>
                    <table
                      style={{ width: "100%", borderCollapse: "collapse" }}
                    >
                      <thead>
                        <tr>
                          <th
                            style={{
                              border: "1px solid #444",
                              padding: "8px",
                              textAlign: "left",
                            }}
                          >
                            First Name
                          </th>
                          <th
                            style={{
                              border: "1px solid #444",
                              padding: "8px",
                              textAlign: "left",
                            }}
                          >
                            Last Name
                          </th>
                          <th
                            style={{
                              border: "1px solid #444",
                              padding: "8px",
                              textAlign: "left",
                            }}
                          >
                            Email
                          </th>
                          <th
                            style={{
                              border: "1px solid #444",
                              padding: "8px",
                              textAlign: "left",
                            }}
                          >
                            Password
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {importPreview.map((beneficiary, index) => (
                          <tr key={index}>
                            <td
                              style={{
                                border: "1px solid #444",
                                padding: "8px",
                              }}
                            >
                              {beneficiary.first_name}
                            </td>
                            <td
                              style={{
                                border: "1px solid #444",
                                padding: "8px",
                              }}
                            >
                              {beneficiary.last_name}
                            </td>
                            <td
                              style={{
                                border: "1px solid #444",
                                padding: "8px",
                              }}
                            >
                              {beneficiary.email}
                            </td>
                            <td
                              style={{
                                border: "1px solid #444",
                                padding: "8px",
                              }}
                            >
                              {beneficiary.password ? "●●●●●●●●" : "None"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Box>
                  <Alert
                    severity="info"
                    sx={{
                      backgroundColor: "rgba(30, 73, 118, 0.15)",
                      border: "1px solid rgba(30, 73, 118, 0.3)",
                    }}
                  >
                    For security, passwords are masked in this preview. All
                    users will be imported with the passwords provided in the
                    CSV.
                  </Alert>
                </>
              ) : (
                <Typography>
                  No valid beneficiaries found in CSV file.
                </Typography>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            p: 2,
          }}
        >
          {showResults ? (
            <Button
              onClick={handleCloseAfterImport}
              variant="contained"
              color="primary"
            >
              Close
            </Button>
          ) : (
            <>
              <Button
                onClick={() => setImportDialogOpen(false)}
                sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                disabled={isImporting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleImport}
                variant="contained"
                color="primary"
                disabled={importPreview.length === 0 || isImporting}
              >
                {isImporting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Import"
                )}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BeneficiaryList;
