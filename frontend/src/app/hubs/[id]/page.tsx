"use client";

import * as React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_CHARITIES } from "@/lib/queries/charity-queries";
import { CREATE_CRYPTO_DONATION } from "@/lib/mutations/payment-mutations";
import { useRouter } from "next/navigation";
import AppBar from "@/components/AppBar";
import { use } from "react";
import { useAuthStore } from "@/store/authStore";
import { useDonationStore } from "@/store/donationStore";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PaymentComponent from "@/components/payment/PaymentComponent";

// Import components
import CharityInfoSection from "@/components/charities/CharityInfoSection";
import BeneficiaryList from "@/components/charities/BeneficiaryList";
import CreateBeneficiaryModal from "@/components/charities/CreateBeneficiaryModal";

// Interfaces for the component - these could be moved to a types file
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

interface Admin {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface Charity {
  id: string;
  name: string;
  description?: string;
  address?: Address;
  beneficiaries?: Beneficiary[];
  admin?: Admin;
  website?: string;
}

// Donation related interfaces
interface CryptoDonationResult {
  createCryptoDonation?: {
    id: string;
  };
}

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
}: {
  width?: string;
  height?: string;
  className?: string;
}) => (
  <div
    className={`bg-gray-700 animate-pulse rounded ${className}`}
    style={{ width, height }}
  ></div>
);

export default function CharityDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const charityId = id ? parseInt(id) : null;

  // Use the auth store to get the current user
  const { user, isAuthenticated } = useAuthStore();
  const { startDonation, completeDonation, resetDonation } = useDonationStore();

  // All state hooks must be at the top - before any conditional logic
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [retryCount, setRetryCount] = React.useState(0);
  const [isRetrying, setIsRetrying] = React.useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  // Donation related state
  const [openDonateModal, setOpenDonateModal] = React.useState(false);
  const [donationInProgress, setDonationInProgress] = React.useState(false);
  const [donationId, setDonationId] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  // Track if a donation was just completed to prevent re-triggering
  const justCompletedRef = React.useRef(false);

  // Image gallery data
  const galleryImages = [
    "/tierheim.png",
    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518715308788-3005759c61d4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=800&q=80",
  ];

  const { data, loading, error, refetch } = useQuery(GET_ALL_CHARITIES, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const [createCryptoDonation] = useMutation(CREATE_CRYPTO_DONATION);

  // Add effect for automatic retry
  React.useEffect(() => {
    // Filter for the specific charity from all charities
    const charity = data?.charities?.find(
      (c: Charity) => parseInt(c.id) === charityId
    );

    // Automatically retry if charity not found and we haven't tried too many times
    if (!loading && !error && data && !charity && retryCount < 3) {
      setIsRetrying(true);
      const timer = setTimeout(() => {
        console.log(`Retrying charity fetch (${retryCount + 1}/3)...`);
        refetch();
        setRetryCount((prevCount) => prevCount + 1);
        setIsRetrying(false);
      }, 1500); // 1.5 second delay between retries

      return () => clearTimeout(timer);
    }
  }, [data, loading, error, charityId, retryCount, refetch]);

  // Check if current user is the admin of this charity or has admin role
  const isCharityAdmin = (charity: Charity) => {
    if (!isAuthenticated || !user) return false;

    // Check if user has admin role
    if (user.role === "admin") return true;

    // Check if user is the charity admin
    if (charity.admin && user.email === charity.admin.email) return true;

    return false;
  };

  // Manual retry function
  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      refetch();
      setRetryCount((prevCount) => prevCount + 1);
      setIsRetrying(false);
    }, 1000);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const navigateToBeneficiary = (beneficiaryId: string) => {
    router.push(`/beneficiaries/${beneficiaryId}`);
  };

  // Return loading state
  if (loading || isRetrying) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#2B1C5D] to-[#1A103C] text-white px-4 py-8 flex flex-col items-center">
        <div className="w-full flex flex-col items-center">
          <AppBar />
        </div>

        <div className="max-w-5xl mx-auto w-full text-white px-2 sm:px-3 pb-8">
          <div className="my-4 text-center">
            {isRetrying ? (
              <div className="flex flex-col items-center">
                <LoadingSpinner size="large" />
                <h2 className="text-2xl font-bold mb-1 mt-4">
                  Finding charity data...
                </h2>
                <p className="text-base">Attempt {retryCount + 1}/4</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Skeleton width="50%" height="60px" className="mx-auto mb-2" />
                <Skeleton width="70%" height="24px" className="mx-auto mb-1" />
                <Skeleton width="60%" height="24px" className="mx-auto" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Skeleton width="100%" height="300px" />
            </div>
            <div>
              <Skeleton width="80%" height="50px" className="mb-2" />
              <Skeleton width="100%" height="100px" className="mb-2" />
              <Skeleton width="100%" height="150px" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Return error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#2B1C5D] to-[#1A103C] text-white px-4 py-8 flex flex-col items-center">
        <div className="w-full flex flex-col items-center">
          <AppBar />
        </div>

        <div className="max-w-5xl mx-auto w-full text-white px-2 sm:px-3 pb-8">
          <div className="my-4 text-center">
            <h1 className="text-red-500 text-4xl font-bold">
              Error loading charity details
            </h1>
            <p className="mt-2">
              {error.message ||
                "Unable to load the charity details. Please try again later."}
            </p>
            <button
              className="mt-3 px-6 py-2 bg-[#8A42F8] text-white rounded-lg font-semibold hover:bg-[#A88BFF] transition-colors"
              onClick={() => router.push("/charities")}
            >
              Back to Charities
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filter for the specific charity from all charities
  const charity = data?.charities?.find(
    (c: Charity) => parseInt(c.id) === charityId
  );

  if (!charity) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#2B1C5D] to-[#1A103C] text-white px-4 py-8 flex flex-col items-center">
        <div className="w-full flex flex-col items-center">
          <AppBar />
        </div>

        <div className="max-w-5xl mx-auto w-full text-white px-2 sm:px-3 pb-8">
          <div className="my-4 text-center">
            <h1 className="text-4xl font-bold">Charity Not Found</h1>
            <p className="text-base mt-2 mb-3">
              {retryCount >= 3
                ? "We've tried several times but couldn't find this charity. It might not exist or was recently created and is still processing."
                : "This charity may have been recently created and is still processing."}
            </p>
            <div className="mt-3 space-x-2">
              <button
                className="px-6 py-2 bg-[#8A42F8] text-white rounded-lg font-semibold hover:bg-[#A88BFF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleRetry}
                disabled={retryCount >= 4 || isRetrying}
              >
                {isRetrying ? "Trying..." : "Try Again"}
              </button>
              <button
                className="px-6 py-2 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[#2B1C5D] transition-colors"
                onClick={() => router.push("/charities")}
              >
                Back to Charities
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Check if user is admin for this charity
  const userIsAdmin = isCharityAdmin(charity);

  const handleBeneficiaryCreated = () => {
    // Refetch the beneficiaries data to update the list
    refetch();
  };

  // Donation related functions
  const handleOpenDonateModal = () => {
    // Reset donation state when opening the modal
    resetDonation();
    justCompletedRef.current = false;
    setDonationInProgress(false);
    setOpenDonateModal(true);
  };

  const handleCloseDonateModal = () => {
    // Don't reset if we're in the middle of processing
    if (!donationInProgress) {
      resetDonation();
    }
    setOpenDonateModal(false);
  };

  const handleInitiateDonation = () => {
    setDonationInProgress(true);
    startDonation(charityId || 0, 0); // Amount will be set in PaymentComponent
  };

  const handleDonationComplete = async (
    signature: string,
    lamports: number
  ) => {
    try {
      // Only process if we haven't just completed this donation
      if (justCompletedRef.current) {
        return;
      }

      justCompletedRef.current = true;
      completeDonation(signature, lamports);

      const result = await createCryptoDonation({
        variables: {
          beneficiaryId: charityId,
          amountInLamports: lamports,
          tokenCode: "USD",
        },
      });

      // Properly access the id from the typed result
      const donationId = (result.data as CryptoDonationResult)
        ?.createCryptoDonation?.id;

      if (donationId) {
        setDonationId(donationId);
        setSuccessMessage("Donation successfully processed!");

        // Clean up and close modal
        setDonationInProgress(false);
        handleCloseDonateModal();

        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        throw new Error("Failed to get donation ID from server response");
      }
    } catch (error: unknown) {
      setDonationInProgress(false);
      justCompletedRef.current = false;

      const errorMessage =
        error instanceof Error ? error.message : "Error processing donation";
      setErrorMessage(errorMessage);
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2B1C5D] to-[#1A103C] text-white px-4 py-8 flex flex-col items-center">
      <div className="w-full flex flex-col items-center">
        <AppBar />
      </div>

      <div className="max-w-5xl mx-auto w-full text-white px-2 sm:px-3 pb-8">
        <div className="my-4 text-center relative">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {charity.name}
          </h1>
          <h2 className="text-xl max-w-[800px] mx-auto mb-1 font-medium leading-relaxed whitespace-pre-line">
            {charity.description || "No description available."}
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-[#A88BFF]">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2C6.13 2 3 5.13 3 9c0 5.25 7 11 7 11s7-5.75 7-11c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 10 6a2.5 2.5 0 0 1 0 5.5z" />
              </svg>
              <span className="text-sm">
                {charity.address?.city} {charity.address?.postcode}{" "}
                {charity.address?.country}
              </span>
            </div>
            {charity.website && (
              <div className="flex items-center gap-2 text-[#A88BFF]">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M12.293 2.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-8.5 8.5a1 1 0 01-.707.293H5a1 1 0 01-1-1v-3.5a1 1 0 01.293-.707l8.5-8.5zM5 16h3.5a1 1 0 01.707.293l8.5-8.5a1 1 0 000-1.414l-4-4a1 1 0 00-1.414 0l-8.5 8.5A1 1 0 004 12.5V16a1 1 0 001 1z" />
                </svg>
                <a
                  href={charity.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-sm hover:text-white transition-colors"
                >
                  {charity.website}
                </a>
              </div>
            )}
          </div>

          {/* Admin action button */}
          {userIsAdmin && (
            <div className="flex justify-center mb-4">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-[#8A42F8] rounded-lg font-semibold hover:bg-[#A88BFF] transition-colors"
                onClick={handleOpenModal}
              >
                <PersonAddIcon />
                Add Beneficiary
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main image and thumbnails - Takes 2/3 width */}
          <div className="lg:col-span-2">
            {/* Main large image */}
            <div className="rounded-2xl overflow-hidden mb-4 shadow-lg">
              <img
                src={galleryImages[selectedImageIndex]}
                alt="Main charity image"
                className="w-full h-80 lg:h-96 object-cover"
              />
            </div>

            {/* Thumbnail images */}
            <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
              {galleryImages.map((src, i) => (
                <div
                  key={i}
                  className={`rounded-xl overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                    selectedImageIndex === i
                      ? "border-[#8A42F8] ring-2 ring-[#8A42F8]/50"
                      : "border-transparent hover:border-[#8A42F8]/60"
                  }`}
                  style={{ width: 80, height: 80, minWidth: 80 }}
                  onClick={() => setSelectedImageIndex(i)}
                >
                  <img
                    src={src}
                    alt={`Gallery image ${i + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>

            {/* Charity description text */}
            <div className="text-gray-300 space-y-4">
              <p className="leading-relaxed">
                The Animal Shelter Berlin is Europe's largest animal shelter.
                With an area of 16 hectares, the Animal Shelter Berlin is as
                large as 22 soccer fields.
              </p>
              <p className="leading-relaxed">
                There are four large cat houses, six large dog houses, a small
                animal house, a bird house, as well as a large compound for
                free-roaming cats. In addition, there is the animal welfare farm
                for so-called farm animals such as pigs, goats, sheep, geese and
                chickens, as well as an exotic station for reptiles, monkeys and
                other exotic animals.
              </p>
              <p className="leading-relaxed">
                The Tierschutzverein Berlin e.V. has existed since 1841 and
                since 2001 with its current location in the district of
                Lichtenberg - Falkenberg.
              </p>
            </div>
          </div>

          {/* Donation summary card - Takes 1/3 width */}
          <div className="lg:col-span-1">
            <div className="w-full bg-gradient-to-br from-[#2B1C5D] to-[#1A103C] rounded-2xl shadow-lg p-6 flex flex-col items-center border border-[#6B48FF]/30 sticky top-4">
              <div className="text-lg font-semibold mb-2">
                SOL <span className="text-[#8A42F8] font-bold">0.03</span>{" "}
                Raised
              </div>
              <div className="text-sm text-gray-300 mb-6">
                2 people have just made a donation
              </div>
              <button
                className="w-full py-3 rounded-xl bg-[#8A42F8] text-white font-bold text-lg hover:bg-[#A88BFF] transition-colors mb-4"
                onClick={handleOpenDonateModal}
              >
                Donate now
              </button>

              {/* Recent donors */}
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center font-bold text-black border-2 border-white">
                  R
                </div>
                <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center font-bold text-black border-2 border-white">
                  C
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Create Beneficiary Modal */}
        <CreateBeneficiaryModal
          open={isModalOpen}
          onClose={handleCloseModal}
          charityId={charityId || 0}
          onBeneficiaryCreated={handleBeneficiaryCreated}
        />

        {/* Donation Modal */}
        {openDonateModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-[#2B1C5D] to-[#1A103C] rounded-2xl border border-[#6B48FF]/30 p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">
                  Donate to {charity?.name || "Charity"}
                </h2>
                <button
                  onClick={handleCloseDonateModal}
                  className="text-gray-400 hover:text-white transition-colors"
                  disabled={donationInProgress}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <PaymentComponent
                beneficiaryId={charityId || 0}
                onInitiateDonation={handleInitiateDonation}
                onDonationComplete={handleDonationComplete}
                onCancel={handleCloseDonateModal}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
