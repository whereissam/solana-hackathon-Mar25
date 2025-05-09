"use client";

import * as React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_CHARITIES } from "@/lib/queries/charity-queries";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  CardMedia,
  Grid,
  Container,
  Skeleton,
  Button,
  CardActions,
  TextField,
  InputAdornment,
  Pagination,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import AppBar from "@/components/AppBar";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useAuthStore } from "@/store/authStore";

// Define the charity interface
interface Address {
  city: string | null;
  country: string | null;
  lat: number | null;
  lng: number | null;
  postcode: string | null;
}

interface Beneficiary {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface Charity {
  id: string;
  name: string;
  address?: Address;
  beneficiaries?: Beneficiary[];
}

// Skeleton card for loading state
const CharityCardSkeleton = () => (
  <Card
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      borderRadius: "16px",
      overflow: "hidden",
    }}
  >
    <Skeleton variant="rectangular" height={220} animation="wave" />
    <CardHeader title={<Skeleton animation="wave" height={20} width="80%" />} />
    <CardContent sx={{ flexGrow: 1 }}>
      <Skeleton animation="wave" height={30} width="90%" sx={{ mb: 1 }} />
      <Skeleton animation="wave" height={20} width="100%" />
      <Skeleton animation="wave" height={20} width="60%" />
    </CardContent>
    <Box sx={{ px: 2, pb: 2 }}>
      <Skeleton animation="wave" height={36} width="100%" />
    </Box>
  </Card>
);

export default function CharitiesPage() {
  const { data, loading, error } = useQuery(GET_ALL_CHARITIES);
  const router = useRouter();
  const [isMounted, setIsMounted] = React.useState(false);
  const { user, isAuthenticated } = useAuthStore();

  // Pagination state
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(9);

  // Search state
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<Charity[]>([]);

  // Check if current user is an admin
  const isAdmin = React.useMemo(() => {
    return isAuthenticated && user && user.role === "admin";
  }, [isAuthenticated, user]);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Filter and paginate charities based on search term
  React.useEffect(() => {
    if (data?.charities) {
      const filteredCharities = data.charities.filter((charity: Charity) =>
        charity.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredCharities);
      // Reset to first page when search changes
      setPage(1);
    }
  }, [data, searchTerm]);

  // Function to navigate to charity detail page
  const handleViewCharity = (charityId: string) => {
    router.push(`/charities/${charityId}`);
  };

  // Function to navigate to charity creation page
  const handleCreateCharity = () => {
    if (isAdmin) {
      router.push("/charities/create");
    } else {
      // Optional: Show alert or notification that only admins can create charities
      alert("Only administrators can create new charities");
    }
  };

  // Handle pagination changes
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle items per page change
  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    setItemsPerPage(Number(event.target.value));
    setPage(1); // Reset to first page
  };

  // Handle search input changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Get current charities for pagination
  const getCurrentCharities = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return searchResults.slice(startIndex, endIndex);
  };

  // Only render a minimal placeholder during server-side rendering
  if (!isMounted) {
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
      />
    );
  }

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
      {/* Wrapper to center the AppBar */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <AppBar />
      </Box>

      {/* Main content container */}
      <Container
        maxWidth="lg"
        sx={{
          color: "white",
          px: { xs: 2, sm: 3 },
          pb: 8,
        }}
      >
        <Box
          sx={{
            my: 4,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              mb: 2,
              fontWeight: "bold",
            }}
          >
            Charities
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: "800px",
              mx: "auto",
              mb: 4,
              fontSize: "1.1rem",
              lineHeight: 1.6,
            }}
          >
            Explore our list of charitable organizations dedicated to making a
            difference in various communities. Each charity works tirelessly to
            address critical issues like homelessness, hunger, animal rescue,
            and environmental sustainability.
          </Typography>

          {/* Search bar and Create Charity Button */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
              gap: 2,
            }}
          >
            <TextField
              placeholder="Search charities..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "white" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: { xs: "100%", sm: "50%" },
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": { borderColor: "rgba(255, 255, 255, 0.23)" },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": { borderColor: "primary.main" },
                },
                "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
              }}
            />

            {/* Create Charity Button - Only visible to admins */}
            {isAdmin && (
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleCreateCharity}
                startIcon={<AddIcon />}
              >
                Create New Charity
              </Button>
            )}
          </Box>
        </Box>

        {error ? (
          <Box sx={{ textAlign: "center", my: 4 }}>
            <Typography color="error" variant="h6">
              Error loading charities: {error.message}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Please try refreshing the page or contact support if the problem
              persists.
            </Typography>
          </Box>
        ) : (
          <>
            {loading ? (
              // Show skeleton cards while loading
              <Grid container spacing={3} justifyContent="center">
                {Array.from(new Array(itemsPerPage)).map((_, index) => (
                  <Grid item xs={12} sm={6} md={4} key={`skeleton-${index}`}>
                    <CharityCardSkeleton />
                  </Grid>
                ))}
              </Grid>
            ) : searchResults.length > 0 ? (
              <>
                {/* Items per page selector */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ mr: 2, color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    Showing{" "}
                    {Math.min(
                      (page - 1) * itemsPerPage + 1,
                      searchResults.length
                    )}{" "}
                    - {Math.min(page * itemsPerPage, searchResults.length)} of{" "}
                    {searchResults.length} charities
                  </Typography>
                  <FormControl
                    size="small"
                    sx={{
                      minWidth: 100,
                      "& .MuiOutlinedInput-root": {
                        color: "white",
                        "& fieldset": {
                          borderColor: "rgba(255, 255, 255, 0.23)",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255, 255, 255, 0.7)",
                      },
                      "& .MuiSelect-icon": { color: "white" },
                    }}
                  >
                    <InputLabel id="items-per-page-label">Per Page</InputLabel>
                    <Select
                      labelId="items-per-page-label"
                      value={itemsPerPage}
                      label="Per Page"
                      onChange={handleItemsPerPageChange}
                    >
                      <MenuItem value={6}>6</MenuItem>
                      <MenuItem value={9}>9</MenuItem>
                      <MenuItem value={12}>12</MenuItem>
                      <MenuItem value={24}>24</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Show charity cards for current page */}
                <Grid container spacing={3} justifyContent="center">
                  {getCurrentCharities().map((charity: Charity) => (
                    <Grid item xs={12} sm={6} md={4} key={charity.id}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          borderRadius: "16px",
                          overflow: "hidden",
                          transition: "transform 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-5px)",
                          },
                        }}
                      >
                        <CardMedia
                          sx={{ height: 220 }}
                          image={`https://therecordnewspaper.org/wp-content/uploads/2019/05/Catholic-Charities-Building-Southwest-5-16-19-p1-.gif`}
                          title={charity.name}
                        />
                        <CardHeader
                          sx={{ pb: 0 }}
                          titleTypographyProps={{
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "#666",
                          }}
                          title={charity.name}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography
                            variant="h5"
                            component="h3"
                            sx={{
                              mb: 1,
                              fontWeight: "bold",
                            }}
                          >
                            Making a difference
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                          >
                            Supporting communities and creating positive change.
                          </Typography>

                          {/* Display number of beneficiaries */}
                          <Typography
                            variant="body2"
                            sx={{
                              mt: 1,
                              display: "inline-block",
                              bgcolor: "primary.main",
                              color: "white",
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              fontSize: "0.75rem",
                            }}
                          >
                            {charity.beneficiaries &&
                            charity.beneficiaries.length > 0
                              ? `${charity.beneficiaries.length} ${
                                  charity.beneficiaries.length === 1
                                    ? "Beneficiary"
                                    : "Beneficiaries"
                                }`
                              : "No Beneficiaries Yet"}
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ p: 2, pt: 0 }}>
                          <Button
                            variant="contained"
                            fullWidth
                            onClick={() => handleViewCharity(charity.id)}
                          >
                            View Details & Create Beneficiary
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {/* Pagination controls */}
                {searchResults.length > itemsPerPage && (
                  <Stack spacing={2} sx={{ mt: 4, alignItems: "center" }}>
                    <Pagination
                      count={Math.ceil(searchResults.length / itemsPerPage)}
                      page={page}
                      onChange={handlePageChange}
                      variant="outlined"
                      shape="rounded"
                      sx={{
                        "& .MuiPaginationItem-root": {
                          color: "white",
                          borderColor: "rgba(255, 255, 255, 0.23)",
                          "&.Mui-selected": {
                            backgroundColor: "primary.main",
                            borderColor: "primary.main",
                            "&:hover": {
                              backgroundColor: "primary.dark",
                            },
                          },
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                          },
                        },
                      }}
                    />
                  </Stack>
                )}
              </>
            ) : searchTerm ? (
              // Show message when no search results
              <Box
                sx={{
                  textAlign: "center",
                  my: 4,
                  p: 5,
                  borderRadius: 2,
                  border: "1px dashed rgba(255, 255, 255, 0.3)",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                }}
              >
                <Typography variant="h5" sx={{ mb: 2 }}>
                  {"No charities found matching ${searchTerm}"}
                </Typography>
                <Typography sx={{ mb: 3 }}>
                  Try a different search term or clear your search
                </Typography>
                <Button variant="outlined" onClick={() => setSearchTerm("")}>
                  Clear Search
                </Button>
              </Box>
            ) : (
              // Show message when no charities exist - with conditional button for admins
              <Box
                sx={{
                  textAlign: "center",
                  my: 4,
                  p: 5,
                  borderRadius: 2,
                  border: "1px dashed rgba(255, 255, 255, 0.3)",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                }}
              >
                <Typography variant="h5" sx={{ mb: 2 }}>
                  No charities have been created yet
                </Typography>
                <Typography sx={{ mb: 3 }}>
                  {isAdmin
                    ? "Get started by creating your first charity organization"
                    : "Please contact an administrator to add a new charity"}
                </Typography>
                {isAdmin && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleCreateCharity}
                    startIcon={<AddIcon />}
                  >
                    Create Your First Charity
                  </Button>
                )}
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}
