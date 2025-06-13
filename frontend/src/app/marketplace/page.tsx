"use client";
import React, { useState } from "react";
import AppBar from "@/components/AppBar";

// Category data structure
const eventCategories = ["Event Passes", "Merchandise", "Digital Art"];

const eventFilters = [
  "All",
  "Music & Entertainment",
  "Art & Collectibles",
  "Tech & Innovation",
  "Community & Culture",
];

// Data for different categories
const categoryData = {
  "Event Passes": {
    upcoming: [
      {
        date: "15",
        title: "Solana Builders Meetup",
        location: "Factory Berlin, Görlitzer Park",
        image:
          "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
        tag: "See detail",
      },
      {
        date: "18",
        title: "Berlin Street Art Tour",
        location: "Mitte, Hackescher Markt",
        image:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        tag: "See detail",
      },
      {
        date: "20",
        title: "Open Mic Night – Stories from the City",
        location: "ArtHaus, Prenzlauer Berg",
        image:
          "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
        tag: "See detail",
      },
    ],
    items: [
      {
        title: "Berlin Beats Festival",
        desc: "VIP access to electronic music festival with Berlin's best DJs.",
        image:
          "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
        price: "€89",
      },
      {
        title: "Vinyl Vibes Night",
        desc: "Premium entry to collector's paradise for vinyl lovers.",
        image:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        price: "€45",
      },
      {
        title: "Sunset Acoustic Sessions",
        desc: "Front row seats for unplugged performances by the Spree.",
        image:
          "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
        price: "€35",
      },
      {
        title: "Synth & Space",
        desc: "Early bird tickets for synthwave and cosmic visuals night.",
        image:
          "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
        price: "€55",
      },
      {
        title: "Jazz in the Courtyard",
        desc: "Premium seating for smooth jazz and cocktails evening.",
        image:
          "https://images.unsplash.com/photo-1575425050048-cc8fa7c193b2?q=80&w=2940&auto=format&fit=crop&w=400&q=80",
        price: "€65",
      },
      {
        title: "Techno Under the Bridge",
        desc: "Secret access to exclusive rave under Oberbaum Bridge.",
        image:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        price: "€75",
      },
    ],
  },
  Merchandise: {
    upcoming: [
      {
        date: "NEW",
        title: "Limited Edition Berlin Tees",
        location: "Available Online & In-Store",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
        tag: "Shop now",
      },
      {
        date: "HOT",
        title: "Vinyl Record Collection",
        location: "Music Store, Kreuzberg",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80",
        tag: "Shop now",
      },
      {
        date: "20%",
        title: "Artist Collaboration Hoodies",
        location: "Pop-up Store, Mitte",
        image:
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80",
        tag: "Shop now",
      },
    ],
    items: [
      {
        title: "Berlin Underground T-Shirt",
        desc: "Premium cotton tee with exclusive Berlin underground design.",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
        price: "€29",
      },
      {
        title: "Vintage Vinyl Collection",
        desc: "Curated selection of rare Berlin electronic music vinyl.",
        image:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80",
        price: "€149",
      },
      {
        title: "Street Art Hoodie",
        desc: "Limited edition hoodie featuring local Berlin street artists.",
        image:
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80",
        price: "€79",
      },
      {
        title: "Berlin Beats Poster Set",
        desc: "Collection of vintage-style posters from iconic Berlin venues.",
        image:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80",
        price: "€39",
      },
      {
        title: "Underground Tote Bag",
        desc: "Eco-friendly canvas bag with Berlin underground logo.",
        image:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80",
        price: "€25",
      },
      {
        title: "Berlin Music History Book",
        desc: "Comprehensive guide to Berlin's electronic music scene.",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        price: "€45",
      },
    ],
  },
  "Digital Art": {
    upcoming: [
      {
        date: "NFT",
        title: "Berlin Streets Digital Collection",
        location: "Blockchain Marketplace",
        image:
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
        tag: "Mint now",
      },
      {
        date: "AI",
        title: "Generative Music Visuals",
        location: "Digital Gallery, Online",
        image:
          "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=80",
        tag: "Mint now",
      },
      {
        date: "3D",
        title: "Virtual Berlin Experience",
        location: "VR Platform, Metaverse",
        image:
          "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?auto=format&fit=crop&w=400&q=80",
        tag: "Mint now",
      },
    ],
    items: [
      {
        title: "Berlin Nights NFT",
        desc: "Exclusive digital artwork capturing Berlin's nightlife essence.",
        image:
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
        price: "0.5 SOL",
      },
      {
        title: "Generative Beat Patterns",
        desc: "AI-generated visual representations of Berlin techno beats.",
        image:
          "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=80",
        price: "0.3 SOL",
      },
      {
        title: "Virtual Gallery Pass",
        desc: "Access to exclusive virtual reality art exhibitions.",
        image:
          "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?auto=format&fit=crop&w=400&q=80",
        price: "0.2 SOL",
      },
      {
        title: "Digital Street Art",
        desc: "Digitized versions of famous Berlin street art murals.",
        image:
          "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=400&q=80",
        price: "0.4 SOL",
      },
      {
        title: "Music Visualization NFT",
        desc: "Interactive digital art that responds to music beats.",
        image:
          "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?auto=format&fit=crop&w=400&q=80",
        price: "0.6 SOL",
      },
      {
        title: "Berlin Skyline AR",
        desc: "Augmented reality overlay of Berlin's evolving skyline.",
        image:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
        price: "0.8 SOL",
      },
    ],
  },
};

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState(eventCategories[0]);
  const [selectedFilter, setSelectedFilter] = useState(eventFilters[0]);

  // Reset filter to "All" when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedFilter("All");
  };

  // Get current category data
  const currentData =
    categoryData[selectedCategory as keyof typeof categoryData];

  // Simple and effective filtering
  const filteredItems =
    currentData?.items?.filter((item) => {
      if (selectedFilter === "All") return true;

      // Create a searchable text from title and description
      const searchText = `${item.title} ${item.desc}`.toLowerCase();

      // Check for specific filter matches
      switch (selectedFilter) {
        case "Music & Entertainment":
          return (
            searchText.includes("music") ||
            searchText.includes("beats") ||
            searchText.includes("jazz") ||
            searchText.includes("techno") ||
            searchText.includes("festival") ||
            searchText.includes("acoustic")
          );
        case "Art & Collectibles":
          return (
            searchText.includes("art") ||
            searchText.includes("collectible") ||
            searchText.includes("poster") ||
            searchText.includes("vinyl") ||
            searchText.includes("design")
          );
        case "Tech & Innovation":
          return (
            searchText.includes("tech") ||
            searchText.includes("digital") ||
            searchText.includes("nft") ||
            searchText.includes("virtual") ||
            searchText.includes("ai") ||
            searchText.includes("vr")
          );
        case "Community & Culture":
          return (
            searchText.includes("community") ||
            searchText.includes("culture") ||
            searchText.includes("meetup") ||
            searchText.includes("berlin") ||
            searchText.includes("street") ||
            searchText.includes("underground")
          );
        default:
          return true;
      }
    }) || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2B1C5D] to-[#1A103C] text-white pb-10">
      <div className="w-full pt-5">
        <AppBar />
      </div>
      {/* Header */}
      <header className="w-full px-6 py-8 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#A88BFF] mb-4 text-center">
          The UG Collection
        </h1>
        <p className="text-lg text-gray-300 text-center max-w-3xl mb-8 leading-relaxed">
          View and manage your purchases from UG's partner stores – event
          passes, merch, digital art & more.
        </p>

        {/* Category pills */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {eventCategories.map((cat) => (
            <button
              key={cat}
              className={`px-6 py-3 rounded-xl font-semibold border-2 transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-[#6B48FF] to-[#8A42F8] text-white border-transparent shadow-lg shadow-purple-500/25"
                  : "bg-transparent text-[#A88BFF] border-[#6B48FF] hover:bg-[#6B48FF]/20 hover:border-[#8A42F8]"
              }`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl justify-center mb-8">
          <input
            className="flex-1 rounded-xl px-4 py-3 bg-[#2B1C5D]/50 text-white placeholder-gray-400 border border-[#6B48FF]/50 outline-none focus:border-[#8A42F8] transition-colors backdrop-blur-sm"
            placeholder="Search Event"
          />
          <input
            className="flex-1 rounded-xl px-4 py-3 bg-[#2B1C5D]/50 text-white placeholder-gray-400 border border-[#6B48FF]/50 outline-none focus:border-[#8A42F8] transition-colors backdrop-blur-sm"
            placeholder="Place"
            defaultValue="Mitte"
          />
          <select className="flex-1 rounded-xl px-4 py-3 bg-[#2B1C5D]/50 text-white border border-[#6B48FF]/50 outline-none focus:border-[#8A42F8] transition-colors backdrop-blur-sm">
            <option>Any date</option>
            <option>Today</option>
            <option>This week</option>
            <option>This month</option>
          </select>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6">
        {/* Upcoming Events/Items */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#A88BFF] mb-6">
            {selectedCategory === "Event Passes"
              ? "Upcoming events"
              : selectedCategory === "Merchandise"
                ? "Featured items"
                : "Latest drops"}
          </h2>
          <div className="flex flex-col gap-4">
            {currentData?.upcoming?.length > 0 ? (
              currentData.upcoming.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center bg-gradient-to-r from-[#2B1C5D]/80 to-[#1A103C]/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#6B48FF]/20 hover:border-[#8A42F8]/40 transition-all duration-300"
                >
                  <div className="flex flex-col items-center justify-center w-16 h-16 bg-gradient-to-br from-[#8A42F8] to-[#6B48FF] rounded-xl text-white font-bold text-sm mr-6 shadow-lg">
                    <span>{item.date}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-300">{item.location}</p>
                  </div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-16 object-cover rounded-xl ml-6 shadow-md"
                  />
                  <button className="ml-6 px-6 py-2 rounded-xl bg-gradient-to-r from-[#A88BFF] to-[#8A42F8] text-white font-semibold hover:from-[#8A42F8] hover:to-[#6B48FF] transition-all duration-300 shadow-lg">
                    {item.tag}
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">
                  No upcoming {selectedCategory.toLowerCase()} available.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Items Grid */}
        <section>
          <h2 className="text-2xl font-bold text-[#A88BFF] mb-6">
            {selectedCategory === "Event Passes" ? "Events" : selectedCategory}
          </h2>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-3 mb-8">
            {eventFilters.map((filter) => (
              <button
                key={filter}
                className={`px-5 py-2 rounded-xl font-medium border transition-all duration-300 ${
                  selectedFilter === filter
                    ? "bg-gradient-to-r from-[#6B48FF] to-[#8A42F8] text-white border-transparent shadow-lg shadow-purple-500/25"
                    : "bg-transparent text-[#A88BFF] border-[#6B48FF]/50 hover:bg-[#6B48FF]/20 hover:border-[#8A42F8]"
                }`}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Items grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-gradient-to-b from-[#6B48FF]/20 to-[#2B1C5D]/40 backdrop-blur-sm shadow-lg flex flex-col border border-[#6B48FF]/20 hover:border-[#8A42F8]/40 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-t-2xl"
                  />
                  <div className="flex-1 flex flex-col p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-white flex-1">
                        {item.title}
                      </h3>
                      <span className="text-[#A88BFF] font-bold text-lg ml-2">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm flex-1 mb-4 leading-relaxed">
                      {item.desc}
                    </p>
                    <button className="mt-auto bg-gradient-to-r from-[#8A42F8] to-[#6B48FF] text-white font-semibold py-2 px-4 rounded-xl hover:from-[#A88BFF] hover:to-[#8A42F8] transition-all duration-300 shadow-lg">
                      {selectedCategory === "Digital Art"
                        ? "Mint now"
                        : "Get now"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400 text-lg">
                  No items found in "{selectedCategory}" for filter "
                  {selectedFilter}"
                </p>
                <button
                  onClick={() => setSelectedFilter("All")}
                  className="mt-4 px-6 py-2 bg-[#8A42F8] text-white rounded-xl hover:bg-[#A88BFF] transition-colors"
                >
                  Show All {selectedCategory}
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
