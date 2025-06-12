"use client";

import * as React from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import AppBar from "@/components/AppBar";
import { useAuthStore } from "@/store/authStore";
import { GET_DONATIONS } from "@/lib/queries/donation-queries";

// Define the donation receipt interface
interface DonationReceipt {
  id: string;
  created_at: string;
  amount: number;
  currency: string;
  payment_id: string;
  receipt_addr: string;
  status: string;
  type: string;
}

// Format currency amount
const formatAmount = (amount: number, currency: string) => {
  // Handle SOLANA or other crypto values that might be in lamports or similar small units
  if (currency === "USD" || currency === "EUR" || currency === "€") {
    // For crypto amounts that are represented in the smallest unit (like lamports for SOL)
    // We're assuming donations in USD are stored in cents
    return `${currency === "€" ? currency : currency + " "}${(amount / 100000000).toFixed(2)}`;
  }

  return `${currency} ${amount}`;
};

// Custom Loading Spinner Component
const LoadingSpinner = ({
  size = "medium",
}: {
  size?: "small" | "medium" | "large";
}) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-10 h-10",
    large: "w-12 h-12",
  };

  return (
    <div
      className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-[#8A42F8]`}
    ></div>
  );
};

// Custom Skeleton Component
const Skeleton = ({
  width = "100%",
  height = "1rem",
  className = "",
  variant = "rectangular",
}: {
  width?: string;
  height?: string;
  className?: string;
  variant?: "rectangular" | "circular" | "rounded";
}) => {
  const variantClasses = {
    rectangular: "rounded",
    circular: "rounded-full",
    rounded: "rounded-lg",
  };

  return (
    <div
      className={`bg-gray-600 animate-pulse ${variantClasses[variant]} ${className}`}
      style={{ width, height }}
    ></div>
  );
};

// Skeleton card for loading state
const ReceiptCardSkeleton = () => (
  <div className="h-full flex flex-col rounded-2xl overflow-hidden bg-white/10 border border-purple-500/30">
    <div className="flex flex-row items-center gap-4 p-6 pb-2">
      <Skeleton
        variant="circular"
        width="48px"
        height="48px"
        className="bg-purple-500/20"
      />
      <div className="flex-grow">
        <Skeleton height="24px" width="60%" className="mb-2" />
        <Skeleton height="20px" width="40%" />
      </div>
      <Skeleton height="24px" width="60px" className="bg-purple-500/20" />
    </div>
    <div className="px-6 pb-6 mt-auto">
      <Skeleton
        height="36px"
        variant="rounded"
        width="100%"
        className="bg-purple-500/20"
      />
    </div>
  </div>
);

// Fixed version of OneTimeDonationIcon component
const FixedOneTimeDonationIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 53 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M26.5 51C39.7548 51 50.5 40.2548 50.5 27C50.5 13.7452 39.7548 3 26.5 3C13.2452 3 2.5 13.7452 2.5 27C2.5 40.2548 13.2452 51 26.5 51Z"
      stroke="#903DF4"
      strokeWidth="5"
    />
    <path
      d="M38.5 22.2H14.5L22.7512 15M14.5 31.8H38.5L30.2512 39"
      stroke="#903DF4"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Recurring donation icon
const RecurringDonationIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 53 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M26.5 51C39.7548 51 50.5 40.2548 50.5 27C50.5 13.7452 39.7548 3 26.5 3C13.2452 3 2.5 13.7452 2.5 27C2.5 40.2548 13.2452 51 26.5 51Z"
      stroke="#903DF4"
      strokeWidth="5"
    />
    <path
      d="M15 27C15 33.0751 19.9249 38 26 38C32.0751 38 37 33.0751 37 27C37 20.9249 32.0751 16 26 16"
      stroke="#903DF4"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M26 16L21 21M26 16L31 21"
      stroke="#903DF4"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ReceiptsPage() {
  const { user, token, isAuthenticated } = useAuthStore();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Use Apollo client to fetch donations
  const { loading, error, data } = useQuery(GET_DONATIONS, {
    variables: { donorId: user?.id ? parseInt(user.id) : 1 },
    skip: !isAuthenticated || !token,
    fetchPolicy: "network-only",
  });

  // Generate donation type display name
  const getDonationTypeDisplay = (type: string) => {
    switch (type?.toLowerCase()) {
      case "crypto":
        return "Crypto Donation";
      case "recurring":
        return "Monthly Donation";
      default:
        return "One Time Donation";
    }
  };

  // Group receipts by date
  const groupedDonations = React.useMemo(() => {
    if (!data?.donations) return [];

    const groups: Record<string, DonationReceipt[]> = {};

    data.donations.forEach((donation: DonationReceipt) => {
      const date = new Date(donation.created_at);
      const dateKey = date.toLocaleDateString();

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(donation);
    });

    return Object.entries(groups).map(([date, items]) => ({
      date,
      items,
    }));
  }, [data]);

  // Only render a minimal placeholder during server-side rendering
  if (!isMounted) {
    return (
      <div className="w-full min-h-screen bg-black flex flex-col items-center" />
    );
  }

  const showLoginMessage = !isAuthenticated || !token;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2B1C5D] to-[#1A103C] text-white flex flex-col items-center">
      {/* Wrapper to center the AppBar */}
      <div className="w-full flex flex-col items-center">
        <AppBar />
      </div>

      {/* Main content container */}
      <div className="max-w-6xl mx-auto w-full text-white px-4 sm:px-6 pb-8">
        <div className="my-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#A88BFF]">
            My Donations
          </h1>
          <p className="max-w-4xl mx-auto mb-8 text-lg leading-relaxed text-gray-300">
            Track all your charitable contributions and view digital receipts.
            Each donation makes a meaningful impact on the causes you care
            about.
          </p>
        </div>

        {showLoginMessage ? (
          <div className="text-center my-12 py-8">
            <h2 className="text-2xl font-bold mb-4">
              Please log in to view your donations
            </h2>
            <p className="mb-6 text-gray-400">
              You need to be logged in to access your donation history
            </p>
            <button
              className="px-8 py-3 bg-[#8A42F8] text-white rounded-full font-semibold hover:bg-[#A88BFF] transition-colors"
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </button>
          </div>
        ) : loading ? (
          // Show skeleton loader
          <div className="mb-8">
            <Skeleton height="32px" width="20%" className="mb-4 bg-white/20" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from(new Array(4)).map((_, index) => (
                <ReceiptCardSkeleton key={`skeleton-${index}`} />
              ))}
            </div>
          </div>
        ) : error ? (
          // Show error state
          <div className="text-center my-12 py-8">
            <h2 className="text-2xl font-bold mb-4 text-red-400">
              Error loading donations
            </h2>
            <p className="mb-6 text-gray-400">
              {error.message ||
                "An error occurred while fetching your donations. Please try again later."}
            </p>
            <button
              className="px-8 py-3 bg-[#8A42F8] text-white rounded-full font-semibold hover:bg-[#A88BFF] transition-colors"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        ) : groupedDonations.length > 0 ? (
          // Show actual donation receipts
          groupedDonations.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-300 border-b border-gray-600 pb-2">
                {group.date}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {group.items.map((donation) => (
                  <div
                    key={donation.id}
                    className="h-full flex flex-col rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:-translate-y-1"
                  >
                    <div className="flex flex-row items-center gap-4 p-6 pb-4">
                      <div className="flex items-center justify-center bg-purple-500/20 rounded-full w-12 h-12">
                        {donation.type === "recurring" ? (
                          <RecurringDonationIcon />
                        ) : (
                          <FixedOneTimeDonationIcon />
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-lg font-bold text-white">
                            {donation.type === "crypto"
                              ? "Crypto Donation"
                              : "Charity Donation"}
                          </h4>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              donation.status === "completed"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {donation.status}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">
                          {getDonationTypeDisplay(donation.type)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-[#A88BFF]">
                          {formatAmount(donation.amount, donation.currency)}
                        </p>
                      </div>
                    </div>
                    <div className="px-6 pb-6 mt-auto">
                      <Link
                        href={`https://explorer.solana.com/address/${donation.receipt_addr}?cluster=devnet`}
                        target="_blank"
                        className="block w-full"
                      >
                        <button className="w-full py-3 border border-[#A88BFF] text-[#A88BFF] rounded-full font-medium hover:bg-[#A88BFF] hover:text-white transition-colors">
                          View NFT Receipt
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          // Show empty state
          <div className="text-center my-12 py-8">
            <h2 className="text-2xl font-bold mb-4">No donations yet</h2>
            <p className="mb-6 text-gray-400">
              Make your first donation to see your contributions here
            </p>
            <button className="px-8 py-3 bg-[#8A42F8] text-white rounded-full font-semibold hover:bg-[#A88BFF] transition-colors">
              Donate Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
