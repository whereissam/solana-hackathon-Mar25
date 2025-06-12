"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useQuery } from "@apollo/client";
import { GET_ALL_CHARITIES } from "@/lib/queries/charity-queries";
import { useRouter } from "next/navigation";
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
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useAuthStore } from "@/store/authStore";
import { CoPresentOutlined } from "@mui/icons-material";

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
  description?: string;
  sector?: string;
  mission?: string;
  website?: string;
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

const categories = [
  "Animal Charities",
  "Social Charities",
  "Food Locations",
  "Berlin Blockchain Week Locations",
  "Record Stores",
];

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
  const [selectedCategory, setSelectedCategory] = React.useState(categories[0]);
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
    <div className="min-h-screen bg-gradient-to-b from-[#2B1C5D] to-[#1A103C] flex flex-col items-center">
      <div className="w-full">
        <AppBar />
      </div>
      {/* Header */}
      <div className="w-full max-w-4xl mx-auto text-center mt-12 mb-8">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-5xl font-bold text-[#A88BFF]">Hubs</h1>
        </div>
        <p className="mt-4 text-lg text-gray-200">
          Explore our list of charitable organizations dedicated to making a
          difference in various communities. Each charity works tirelessly to
          address critical issues like homelessness, hunger, animal rescue, and
          environmental sustainability.
        </p>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-2xl flex items-center bg-[#2B1C5D] rounded-2xl px-4 py-2 mb-6 border border-[#6B48FF]">
        <FaSearch className="text-2xl text-[#A88BFF] mr-3" />
        <input
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-lg"
          placeholder="Search charities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="ml-4 px-6 py-2 rounded-xl bg-[#A88BFF] text-white font-semibold hover:bg-[#8A42F8] transition">
          Search
        </button>
      </div>

      {/* Category Pills */}
      <div className="w-full max-w-4xl flex flex-wrap gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-5 py-2 rounded-xl font-medium border transition ${
              selectedCategory === cat
                ? "bg-gradient-to-r from-[#6B48FF] to-[#8A42F8] text-white border-transparent"
                : "bg-[#2B1C5D] text-[#A88BFF] border-[#6B48FF] hover:bg-[#3C256D]"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Charity Cards Grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 pb-16">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-[#2B1C5D] h-64 animate-pulse"
            />
          ))
        ) : error ? (
          <div className="col-span-full text-red-400 text-center">
            Error loading charities.
          </div>
        ) : searchResults.length === 0 ? (
          <div className="col-span-full text-gray-300 text-center">
            No charities found.
          </div>
        ) : (
          getCurrentCharities().map(
            (charity: Charity) => (
              console.log(charity),
              (
                <div
                  key={charity.id}
                  className="rounded-2xl bg-gradient-to-b from-[#6B48FF]/80 to-[#2B1C5D]/80 shadow-lg p-0 flex flex-col"
                >
                  <div className="h-32 w-full flex items-center justify-center bg-white rounded-t-2xl overflow-hidden">
                    {/* Replace with actual image if available */}
                    <img
                      src={
                        `https://lon1.digitaloceanspaces.com/ug-hackathon/charityImage/${charity.id}` ||
                        "https://images.unsplash.com/photo-1670847688925-42dc761b98aa?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      }
                      alt={charity.name}
                      className="h-24 object-contain"
                    />
                  </div>
                  <div className="flex-1 flex flex-col p-4">
                    <h2 className="text-lg font-bold text-white mb-1 truncate">
                      {charity.name}
                    </h2>
                    <div className="flex items-center text-[#A88BFF] text-sm mb-2">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 2C6.13 2 3 5.13 3 9c0 5.25 7 11 7 11s7-5.75 7-11c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 10 6a2.5 2.5 0 0 1 0 5.5z" />
                      </svg>
                      {charity.address?.city && charity.address?.country
                        ? `${charity.address.city}, ${charity.address.country}`
                        : "No address"}
                    </div>
                    <p className="text-gray-200 text-sm flex-1 mb-3 line-clamp-3">
                      {charity.description ||
                        "The Animal Shelter Berlin is Europe's largest animal shelter. With an area of 16 hectares, the Animal Shelter B..."}
                    </p>
                    <button
                      className="mt-auto text-[#A88BFF] hover:text-white font-semibold transition"
                      onClick={() => router.push(`/beneficiaries/3`)}
                    >
                      See more
                    </button>
                  </div>
                </div>
              )
            )
          )
        )}
      </div>
    </div>
  );
}
