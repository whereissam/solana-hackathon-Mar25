"use client";
import React from "react";
import AppBar from "@/components/AppBar";

// You can replace this with a real map later
const MAP_IMAGE = "/img/fake-map.png"; // Place a screenshot or placeholder in public/img/fake-map.png

export default function MapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2B1C5D] to-[#1A103C] flex flex-col items-center py-8 px-4">
      <div className="w-full">
        <AppBar />
      </div>
      <div className="max-w-4xl w-full mx-auto text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Dynamic map{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A88BFF] to-[#14F195]">
            powered by
          </span>{" "}
          <span className="inline-block align-middle">
            <img
              src="/img/solana-logo.svg"
              alt="Solana"
              className="inline w-10 h-10 ml-1"
            />
          </span>
        </h1>
        <p className="text-lg text-gray-200 mb-6">
          showing where giving is happening, who's being helped, and how
          artists, donors, and charities build stronger neighborhoods.
        </p>
        <button className="px-6 py-2 rounded-xl bg-[#A88BFF] text-white font-semibold hover:bg-[#8A42F8] transition mb-8">
          Explore Map
        </button>
      </div>
      <div className="w-full flex justify-center">
        <div
          className="relative rounded-2xl overflow-hidden shadow-2xl"
          style={{ width: 700, height: 400, maxWidth: "100%" }}
        >
          {/* Fake map image */}
          <img
            src={"https://i.imgur.com/IyYWO80.png"}
            alt="Dynamic Map"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
