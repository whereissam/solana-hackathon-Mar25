// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from "react";
const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDistance, setSelectedDistance] = useState<number>(25);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] =
    useState<boolean>(false);
  const [selectedCharity, setSelectedCharity] = useState<number | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Handle profile dropdown
      const profileIcon = document.getElementById("profileIcon");
      const profileDropdown = document.getElementById("profileDropdown");
      if (
        profileIcon &&
        profileDropdown &&
        !profileIcon.contains(event.target as Node) &&
        !profileDropdown.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
      // Handle rating dropdown
      const ratingButton = document.getElementById("ratingFilterButton");
      const ratingDropdown = document.getElementById("ratingDropdown");
      if (
        ratingButton &&
        ratingDropdown &&
        !ratingButton.contains(event.target as Node) &&
        !ratingDropdown.contains(event.target as Node)
      ) {
        ratingDropdown.style.display = "none";
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const categories = [
    { name: "All", icon: "fa-globe", color: "bg-gray-500" },
    { name: "Education", icon: "fa-graduation-cap", color: "bg-blue-500" },
    { name: "Healthcare", icon: "fa-heartbeat", color: "bg-red-500" },
    { name: "Environment", icon: "fa-leaf", color: "bg-green-500" },
    { name: "Animal Welfare", icon: "fa-paw", color: "bg-yellow-500" },
    {
      name: "Humanitarian Aid",
      icon: "fa-hands-helping",
      color: "bg-purple-500",
    },
    { name: "Children", icon: "fa-child", color: "bg-pink-500" },
    { name: "Arts & Culture", icon: "fa-palette", color: "bg-indigo-500" },
    {
      name: "Disaster Relief",
      icon: "fa-house-damage",
      color: "bg-orange-500",
    },
  ];
  const charities = [
    {
      id: 1,
      name: "Global Education Initiative",
      category: "Education",
      description:
        "Providing educational resources to underprivileged communities worldwide",
      impact: "Reached 50,000+ students in 25 countries",
      rating: 4.9,
      location: "New York, USA",
      certifications: ["501(c)(3)", "Platinum Transparency"],
      imagePrompt:
        "Professional education charity logo with open book and globe symbol on clean white background, modern minimalist design with blue color scheme, representing global learning and knowledge sharing",
    },
    {
      id: 2,
      name: "Ocean Conservation Alliance",
      category: "Environment",
      description:
        "Protecting marine ecosystems and reducing ocean plastic pollution",
      impact: "Removed 2.5M pounds of plastic from oceans",
      rating: 4.8,
      location: "San Francisco, USA",
      certifications: ["501(c)(3)", "Gold Transparency"],
      imagePrompt:
        "Clean professional logo for ocean conservation organization featuring stylized wave and marine life elements, blue and teal color palette on white background, modern minimalist design conveying environmental protection",
    },
    {
      id: 3,
      name: "Medical Relief International",
      category: "Healthcare",
      description:
        "Providing emergency medical care and supplies to crisis zones",
      impact: "Served 120,000+ patients in 15 countries",
      rating: 4.7,
      location: "London, UK",
      certifications: ["501(c)(3)", "Platinum Transparency"],
      imagePrompt:
        "Professional healthcare charity logo with medical cross and globe symbol on clean white background, red and white color scheme, modern minimalist design representing international medical aid and emergency response",
    },
    {
      id: 4,
      name: "Wildlife Protection Fund",
      category: "Animal Welfare",
      description: "Preserving endangered species and their natural habitats",
      impact: "Protected 500,000+ acres of critical habitat",
      rating: 4.8,
      location: "Nairobi, Kenya",
      certifications: ["501(c)(3)", "Gold Transparency"],
      imagePrompt:
        "Professional wildlife conservation logo with stylized animal silhouette on clean white background, green and earth tone color palette, modern minimalist design representing animal protection and habitat preservation",
    },
    {
      id: 5,
      name: "Hunger Relief Network",
      category: "Humanitarian Aid",
      description:
        "Fighting food insecurity through meal programs and food banks",
      impact: "Provided 8M+ meals to families in need",
      rating: 4.9,
      location: "Chicago, USA",
      certifications: ["501(c)(3)", "Platinum Transparency"],
      imagePrompt:
        "Professional humanitarian aid charity logo with wheat symbol and helping hands on clean white background, warm orange color palette, modern minimalist design representing food security and hunger relief efforts",
    },
    {
      id: 6,
      name: "Children's Future Foundation",
      category: "Children",
      description:
        "Supporting vulnerable children through education and healthcare",
      impact: "Helped 75,000+ children access education",
      rating: 4.8,
      location: "Geneva, Switzerland",
      certifications: ["501(c)(3)", "Gold Transparency"],
      imagePrompt:
        "Professional children's charity logo with stylized child figure and protective symbol on clean white background, bright primary colors, modern minimalist design representing child welfare and development",
    },
    {
      id: 7,
      name: "Arts for All Foundation",
      category: "Arts & Culture",
      description:
        "Making arts and cultural programs accessible to underserved communities",
      impact: "Funded 200+ community art programs",
      rating: 4.6,
      location: "Paris, France",
      certifications: ["501(c)(3)", "Silver Transparency"],
      imagePrompt:
        "Professional arts charity logo with colorful abstract brush strokes on clean white background, vibrant artistic design representing creativity and cultural expression with modern minimalist aesthetic",
    },
    {
      id: 8,
      name: "Disaster Response Team",
      category: "Disaster Relief",
      description:
        "Providing immediate aid and long-term recovery support after natural disasters",
      impact: "Assisted 35,000+ people in disaster zones",
      rating: 4.7,
      location: "Tokyo, Japan",
      certifications: ["501(c)(3)", "Gold Transparency"],
      imagePrompt:
        "Professional disaster relief charity logo with protective shield and helping hand symbol on clean white background, red and orange color scheme, modern minimalist design representing emergency response and safety",
    },
    {
      id: 9,
      name: "Clean Water Initiative",
      category: "Humanitarian Aid",
      description:
        "Building wells and water purification systems in water-scarce regions",
      impact: "Provided clean water to 100,000+ people",
      rating: 4.9,
      location: "Cape Town, South Africa",
      certifications: ["501(c)(3)", "Platinum Transparency"],
      imagePrompt:
        "Professional water charity logo with water droplet and ripple effect on clean white background, blue color palette, modern minimalist design representing clean water access and sustainability",
    },
    {
      id: 10,
      name: "Rainforest Preservation Trust",
      category: "Environment",
      description: "Protecting and restoring rainforest ecosystems worldwide",
      impact: "Preserved 1.2M acres of rainforest",
      rating: 4.8,
      location: "Rio de Janeiro, Brazil",
      certifications: ["501(c)(3)", "Gold Transparency"],
      imagePrompt:
        "Professional environmental charity logo with stylized tree and leaf elements on clean white background, green color palette, modern minimalist design representing rainforest conservation and biodiversity protection",
    },
    {
      id: 11,
      name: "Women's Empowerment Alliance",
      category: "Humanitarian Aid",
      description:
        "Supporting women through education, healthcare, and economic opportunities",
      impact: "Empowered 50,000+ women in developing countries",
      rating: 4.7,
      location: "Mumbai, India",
      certifications: ["501(c)(3)", "Gold Transparency"],
      imagePrompt:
        "Professional women's empowerment charity logo with stylized female figure and uplifting symbol on clean white background, purple color palette, modern minimalist design representing gender equality and female empowerment",
    },
    {
      id: 12,
      name: "STEM Education Fund",
      category: "Education",
      description:
        "Promoting science, technology, engineering, and math education in schools",
      impact: "Reached 80,000+ students with STEM programs",
      rating: 4.6,
      location: "Boston, USA",
      certifications: ["501(c)(3)", "Silver Transparency"],
      imagePrompt:
        "Professional STEM education charity logo with atom symbol and educational elements on clean white background, blue and green color scheme, modern minimalist design representing science and technology education",
    },
  ];
  const filteredCharities = charities.filter((charity) => {
    // Filter by search query
    const matchesSearch =
      searchQuery === "" ||
      charity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      charity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      charity.location.toLowerCase().includes(searchQuery.toLowerCase());
    // Filter by category
    const matchesCategory =
      selectedCategory === null ||
      selectedCategory === "All" ||
      charity.category === selectedCategory;
    // Filter by rating
    const matchesRating =
      selectedRating === null || charity.rating >= selectedRating;
    return matchesSearch && matchesCategory && matchesRating;
  });
  const handleCharitySelect = (charityId: number) => {
    setSelectedCharity(selectedCharity === charityId ? null : charityId);
  };
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-purple-600 font-bold text-2xl">
              CharityFinder
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a
              href="https://readdy.ai/home/0cf6f6b1-aed0-45d4-a97b-d57bef8438ad/a7920c39-9cf2-4891-a847-09c93ef48c84"
              data-readdy="true"
              className="text-gray-700 hover:text-purple-600 font-medium cursor-pointer"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-purple-600 font-medium border-b-2 border-purple-600 cursor-pointer"
            >
              Charities
            </a>
            <a
              href="https://readdy.ai/home/0cf6f6b1-aed0-45d4-a97b-d57bef8438ad/ecb807a7-9dd4-48e5-8ada-353613abdb00"
              data-readdy="true"
              className="text-gray-700 hover:text-purple-600 font-medium cursor-pointer"
            >
              About
            </a>
            <a
              href="https://readdy.ai/home/0cf6f6b1-aed0-45d4-a97b-d57bef8438ad/03c1b94f-4a5e-4b2f-8bfb-e9386a46b480"
              data-readdy="true"
              className="text-gray-700 hover:text-purple-600 font-medium cursor-pointer"
            >
              Contact
            </a>
            <a
              href="https://readdy.ai/home/0cf6f6b1-aed0-45d4-a97b-d57bef8438ad/a7920c39-9cf2-4891-a847-09c93ef48c84"
              data-readdy="true"
              className="text-gray-700 hover:text-purple-600 font-medium cursor-pointer flex items-center"
            >
              <i className="fas fa-heart mr-1"></i>
              Donate
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600 cursor-pointer">
              <i className="fas fa-bell text-lg"></i>
            </button>
            <div className="relative">
              <div
                id="profileIcon"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="h-8 w-8 rounded-full bg-purple-600 text-white flex items-center justify-center cursor-pointer"
              >
                <i className="fas fa-user"></i>
              </div>
              {showProfileMenu && (
                <div
                  id="profileDropdown"
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                  >
                    <i className="fas fa-user-circle mr-2"></i>
                    My Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                  >
                    <i className="fas fa-history mr-2"></i>
                    Donation History
                  </a>
                  <a
                    href="https://readdy.ai/home/0cf6f6b1-aed0-45d4-a97b-d57bef8438ad/5aa0ff10-6551-4624-bf7c-eb55fc483a35"
                    data-readdy="true"
                    className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                  >
                    <i className="fas fa-heart mr-2"></i>
                    Saved Charities
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                  >
                    <i className="fas fa-cog mr-2"></i>
                    Account Settings
                  </a>
                  <div className="border-t border-gray-100 my-1"></div>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i>
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-grow">
        {/* Page Header */}
        <section className="bg-white shadow-sm py-8 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Explore Charities
            </h1>
            <p className="text-lg text-gray-600">
              Find and support trusted organizations making a difference around
              the world.
            </p>
          </div>
        </section>
        {/* Search and Filter Section */}
        <section className="bg-white border-b border-gray-200 py-6 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
              {/* View Toggle */}
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all !rounded-button whitespace-nowrap cursor-pointer ${
                    viewMode === "list"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <i className="fas fa-list-ul mr-2"></i>
                  List View
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all !rounded-button whitespace-nowrap cursor-pointer ${
                    viewMode === "map"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <i className="fas fa-map-marked-alt mr-2"></i>
                  Map View
                </button>
              </div>
              {/* Search Bar */}
              <div className="relative w-full md:w-1/3">
                <input
                  type="text"
                  placeholder="Search charities by name, cause, or location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-500 outline-none transition text-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-search text-gray-400"></i>
                </div>
              </div>
            </div>
            {/* Filter Options */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Category Filter */}
              <div className="relative">
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center space-x-2 focus:ring-2 focus:ring-purple-200 focus:border-purple-500 outline-none transition !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fas fa-tags text-gray-500"></i>
                  <span className="text-gray-700">
                    {selectedCategory || "All Categories"}
                  </span>
                  <i className="fas fa-chevron-down text-gray-500 text-xs"></i>
                </button>
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-40 border border-gray-200">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      onClick={() =>
                        setSelectedCategory(
                          category.name === "All" ? null : category.name,
                        )
                      }
                      className="px-4 py-2 hover:bg-purple-50 cursor-pointer flex items-center space-x-2"
                    >
                      <div
                        className={`w-6 h-6 ${category.color} rounded-full flex items-center justify-center text-white`}
                      >
                        <i className={`fas ${category.icon} text-xs`}></i>
                      </div>
                      <span className="text-gray-700">{category.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Distance Filter */}
              <div className="relative">
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center space-x-2 focus:ring-2 focus:ring-purple-200 focus:border-purple-500 outline-none transition !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fas fa-map-marker-alt text-gray-500"></i>
                  <span className="text-gray-700">
                    Within {selectedDistance} miles
                  </span>
                  <i className="fas fa-chevron-down text-gray-500 text-xs"></i>
                </button>
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg p-4 z-40 border border-gray-200">
                  <div className="mb-2">
                    <label className="text-sm text-gray-700 font-medium">
                      Distance: {selectedDistance} miles
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      step="5"
                      value={selectedDistance}
                      onChange={(e) =>
                        setSelectedDistance(parseInt(e.target.value))
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>5 mi</span>
                    <span>50 mi</span>
                    <span>100 mi</span>
                  </div>
                </div>
              </div>
              {/* Rating Filter */}
              <div className="relative">
                <button
                  id="ratingFilterButton"
                  onClick={() => {
                    const dropdown = document.getElementById("ratingDropdown");
                    if (dropdown) {
                      dropdown.style.display =
                        dropdown.style.display === "none" ? "block" : "none";
                    }
                  }}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center space-x-2 focus:ring-2 focus:ring-purple-200 focus:border-purple-500 outline-none transition !rounded-button whitespace-nowrap cursor-pointer"
                >
                  <i className="fas fa-star text-amber-500"></i>
                  <span className="text-gray-700">
                    {selectedRating
                      ? `${selectedRating}+ Rating`
                      : "Any Rating"}
                  </span>
                  <i className="fas fa-chevron-down text-gray-500 text-xs"></i>
                </button>
                <div
                  id="ratingDropdown"
                  className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-40 border border-gray-200"
                >
                  <div
                    id="anyRatingOption"
                    onClick={() => {
                      setSelectedRating(null);
                      const ratingDropdown =
                        document.getElementById("ratingDropdown");
                      if (ratingDropdown) {
                        ratingDropdown.style.display = "none";
                      }
                    }}
                    className="px-4 py-2 hover:bg-purple-50 cursor-pointer"
                  >
                    <span className="text-gray-700">Any Rating</span>
                  </div>
                  {[4, 4.5, 4.8].map((rating) => (
                    <div
                      key={rating}
                      onClick={() => setSelectedRating(rating)}
                      className="px-4 py-2 hover:bg-purple-50 cursor-pointer flex items-center justify-between"
                    >
                      <span className="text-gray-700">{rating}+</span>
                      <div className="flex text-amber-500">
                        {Array.from({ length: Math.floor(rating) }).map(
                          (_, i) => (
                            <i key={i} className="fas fa-star text-xs"></i>
                          ),
                        )}
                        {rating % 1 !== 0 && (
                          <i className="fas fa-star-half-alt text-xs"></i>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Advanced Filters Button */}
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center space-x-2 focus:ring-2 focus:ring-purple-200 focus:border-purple-500 outline-none transition !rounded-button whitespace-nowrap cursor-pointer"
              >
                <i
                  className={`fas fa-sliders-h text-gray-500 ${showAdvancedFilters ? "text-purple-600" : ""}`}
                ></i>
                <span
                  className={`${showAdvancedFilters ? "text-purple-600" : "text-gray-700"}`}
                >
                  Advanced Filters
                </span>
              </button>
              {/* Clear Filters Button */}
              {(selectedCategory || selectedRating || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedRating(null);
                    setSearchQuery("");
                    setSelectedDistance(25);
                  }}
                  className="px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg flex items-center space-x-2 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  <i className="fas fa-times"></i>
                  <span>Clear Filters</span>
                </button>
              )}
            </div>
            {/* Advanced Filters Panel */}
            {showAdvancedFilters && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Certification
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="platinum"
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <label
                          htmlFor="platinum"
                          className="ml-2 text-gray-700"
                        >
                          Platinum Transparency
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="gold"
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="gold" className="ml-2 text-gray-700">
                          Gold Transparency
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="silver"
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="silver" className="ml-2 text-gray-700">
                          Silver Transparency
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization Size
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="small"
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="small" className="ml-2 text-gray-700">
                          Small (Under $1M)
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="medium"
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="medium" className="ml-2 text-gray-700">
                          Medium ($1M - $10M)
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="large"
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="large" className="ml-2 text-gray-700">
                          Large (Over $10M)
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tax Deductible
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="501c3"
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="501c3" className="ml-2 text-gray-700">
                          501(c)(3) Organizations
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="international"
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <label
                          htmlFor="international"
                          className="ml-2 text-gray-700"
                        >
                          International Equivalents
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition duration-300 !rounded-button whitespace-nowrap cursor-pointer">
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
        {/* Map View */}
        {viewMode === "map" && (
          <section className="relative h-[calc(100vh-280px)] min-h-[600px]">
            {/* Map Container */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('/images/dashboard/world-map.jpg')`,
              }}
            >
              {/* Map Markers */}
              {filteredCharities.map((charity) => (
                <div
                  key={charity.id}
                  className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    selectedCharity === charity.id
                      ? "z-20 scale-125"
                      : "z-10 hover:scale-110"
                  }`}
                  style={{
                    top: `${30 + Math.random() * 50}%`,
                    left: `${20 + Math.random() * 60}%`,
                  }}
                  onClick={() => handleCharitySelect(charity.id)}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                      charity.rating >= 4.8
                        ? "bg-green-500"
                        : charity.rating >= 4.5
                          ? "bg-blue-500"
                          : "bg-purple-500"
                    }`}
                  >
                    <i
                      className={`fas ${
                        charity.category === "Education"
                          ? "fa-graduation-cap"
                          : charity.category === "Healthcare"
                            ? "fa-heartbeat"
                            : charity.category === "Environment"
                              ? "fa-leaf"
                              : charity.category === "Animal Welfare"
                                ? "fa-paw"
                                : charity.category === "Humanitarian Aid"
                                  ? "fa-hands-helping"
                                  : charity.category === "Children"
                                    ? "fa-child"
                                    : charity.category === "Arts & Culture"
                                      ? "fa-palette"
                                      : "fa-house-damage"
                      } text-white`}
                    ></i>
                  </div>
                  {selectedCharity === charity.id && (
                    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-72 bg-white rounded-lg shadow-xl p-4 z-30">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-800">
                          {charity.name}
                        </h3>
                        <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full">
                          {charity.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {charity.description}
                      </p>
                      <div className="flex items-center mb-2">
                        <i className="fas fa-map-marker-alt text-gray-500 mr-1"></i>
                        <span className="text-sm text-gray-700">
                          {charity.location}
                        </span>
                      </div>
                      <div className="flex items-center mb-3">
                        <div className="flex items-center text-amber-500 mr-2">
                          <span className="mr-1">{charity.rating}</span>
                          <i className="fas fa-star text-xs"></i>
                        </div>
                        <div className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                          <i className="fas fa-check-circle mr-1"></i> Verified
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 mb-3">
                        <i className="fas fa-chart-line text-green-600 mr-1"></i>
                        <span className="font-medium">Impact:</span>{" "}
                        {charity.impact}
                      </div>
                      <div className="flex space-x-2">
                        <a
                          href="https://readdy.ai/home/0cf6f6b1-aed0-45d4-a97b-d57bef8438ad/a7920c39-9cf2-4891-a847-09c93ef48c84"
                          data-readdy="true"
                          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition duration-300 flex-grow text-center !rounded-button whitespace-nowrap cursor-pointer"
                        >
                          Donate Now
                        </a>
                        <a
                          href="https://readdy.ai/home/0cf6f6b1-aed0-45d4-a97b-d57bef8438ad/03c1b94f-4a5e-4b2f-8bfb-e9386a46b480"
                          data-readdy="true"
                          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-lg text-sm font-medium transition duration-300 !rounded-button whitespace-nowrap cursor-pointer"
                        >
                          Details
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 cursor-pointer">
                <i className="fas fa-plus"></i>
              </button>
              <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 cursor-pointer">
                <i className="fas fa-minus"></i>
              </button>
              <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 cursor-pointer">
                <i className="fas fa-location-arrow"></i>
              </button>
            </div>
            {/* Side Panel */}
            <div className="absolute top-0 left-0 h-full w-80 bg-white shadow-lg overflow-y-auto">
              <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                <h3 className="font-bold text-gray-800">Search Results</h3>
                <p className="text-sm text-gray-600">
                  {filteredCharities.length} charities found
                </p>
              </div>
              <div className="divide-y divide-gray-100">
                {filteredCharities.map((charity) => (
                  <div
                    key={charity.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedCharity === charity.id
                        ? "bg-purple-50 border-l-4 border-purple-500"
                        : ""
                    }`}
                    onClick={() => handleCharitySelect(charity.id)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-semibold text-gray-800">
                        {charity.name}
                      </h4>
                      <div className="flex items-center text-amber-500 text-xs">
                        <span className="mr-0.5">{charity.rating}</span>
                        <i className="fas fa-star"></i>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <i className="fas fa-map-marker-alt mr-1"></i>
                      <span>{charity.location}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {charity.description}
                    </p>
                    <div className="flex items-center">
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                        {charity.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        {/* List View */}
        {viewMode === "list" && (
          <section className="py-8 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">
                  {filteredCharities.length} Charities Found
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 text-sm">Sort by:</span>
                  <div className="relative">
                    <select className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-sm">
                      <option>Highest Rated</option>
                      <option>Name (A-Z)</option>
                      <option>Recently Added</option>
                      <option>Most Popular</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <i className="fas fa-chevron-down text-gray-500 text-xs"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCharities.map((charity) => (
                  <div
                    key={charity.id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={`/images/charities/charity${charity.id}.jpg`}
                        alt={charity.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-gray-800">
                          {charity.name}
                        </h3>
                        <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full">
                          {charity.category}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">
                        {charity.description}
                      </p>
                      <div className="flex items-center mb-2">
                        <i className="fas fa-map-marker-alt text-gray-500 mr-2"></i>
                        <span className="text-sm text-gray-700">
                          {charity.location}
                        </span>
                      </div>
                      <div className="flex items-center mb-4">
                        <div className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full mr-2">
                          <i className="fas fa-check-circle mr-1"></i> Verified
                        </div>
                        <div className="flex items-center text-amber-500">
                          <span className="mr-1">{charity.rating}</span>
                          <i className="fas fa-star text-xs"></i>
                        </div>
                      </div>
                      <div className="border-t border-gray-100 pt-4 mb-4">
                        <div className="text-sm text-gray-600 mb-2">
                          <i className="fas fa-chart-line text-green-600 mr-2"></i>
                          <span className="font-medium">Impact:</span>{" "}
                          {charity.impact}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {charity.certifications.map((cert, idx) => (
                            <span
                              key={idx}
                              className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded"
                            >
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <a
                          href="https://readdy.ai/home/0cf6f6b1-aed0-45d4-a97b-d57bef8438ad/a7920c39-9cf2-4891-a847-09c93ef48c84"
                          data-readdy="true"
                          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition duration-300 flex-grow text-center !rounded-button whitespace-nowrap cursor-pointer"
                        >
                          Donate Now
                        </a>
                        <a
                          href="https://readdy.ai/home/0cf6f6b1-aed0-45d4-a97b-d57bef8438ad/03c1b94f-4a5e-4b2f-8bfb-e9386a46b480"
                          data-readdy="true"
                          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium transition duration-300 !rounded-button whitespace-nowrap cursor-pointer"
                        >
                          Learn More
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Pagination */}
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-purple-600 text-white !rounded-button whitespace-nowrap cursor-pointer">
                    1
                  </button>
                  <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
                    2
                  </button>
                  <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
                    3
                  </button>
                  <span className="px-3 py-2 text-gray-500">...</span>
                  <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
                    12
                  </button>
                  <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer">
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </nav>
              </div>
            </div>
          </section>
        )}
        {/* Featured Categories */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Popular Charity Categories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore charities by cause area to find organizations aligned
                with your values.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.slice(1, 5).map((category) => (
                <div
                  key={category.name}
                  className="relative h-64 rounded-xl overflow-hidden shadow-sm group cursor-pointer"
                >
                  <img
                    src={
                      category.name === "Education"
                        ? "/images/category/education.jpg"
                        : category.name === "Healthcare"
                          ? "/images/category/health.jpg"
                          : category.name === "Environment"
                            ? "/images/category/environment.jpg"
                            : category.name === "Animal Welfare"
                              ? "/images/category/animal-welfare.jpg"
                              : category.name === "Humanitarian Aid"
                                ? "/images/category/humanitarian.jpg"
                                : category.name === "Children"
                                  ? "/images/category/children.jpg"
                                  : category.name === "Arts & Culture"
                                    ? "/images/category/arts.jpg"
                                    : "/images/category/disaster.jpg"
                    }
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div
                      className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center text-white mb-3`}
                    >
                      <i className={`fas ${category.icon} text-xl`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {category.name}
                    </h3>
                    <p className="text-gray-200 text-sm">
                      {
                        filteredCharities.filter(
                          (c) => c.category === category.name,
                        ).length
                      }{" "}
                      organizations
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Newsletter Section */}
        <section className="py-16 bg-purple-700 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">
                  Stay Updated on Charitable Causes
                </h2>
                <p className="text-purple-200 mb-6">
                  Subscribe to our newsletter to receive updates on new
                  charities, impact stories, and donation opportunities.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-800 flex-grow border-none"
                  />
                  <button className="bg-purple-900 hover:bg-purple-950 text-white px-6 py-3 rounded-lg font-medium transition duration-300 !rounded-button whitespace-nowrap cursor-pointer">
                    Subscribe
                  </button>
                </div>
                <p className="text-purple-300 text-sm mt-3">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
              <div className="md:w-1/3">
                <img
                  src="/images/donate/newsletter.jpg"
                  alt="Newsletter subscription"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-purple-600 font-bold text-2xl mb-4">
                CharityFinder
              </div>
              <p className="text-gray-600 mb-4">
                Connecting donors with trusted charities to make a positive
                impact around the world.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-purple-600 transition-colors cursor-pointer"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-purple-600 transition-colors cursor-pointer"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-purple-600 transition-colors cursor-pointer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-purple-600 transition-colors cursor-pointer"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Explore</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://readdy.ai/home/0cf6f6b1-aed0-45d4-a97b-d57bef8438ad/a7920c39-9cf2-4891-a847-09c93ef48c84"
                    data-readdy="true"
                    className="text-gray-600 hover:text-purple-600 transition-colors cursor-pointer"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-purple-600 transition-colors cursor-pointer"
                  >
                    Charities
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-purple-600 transition-colors cursor-pointer"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-purple-600 transition-colors cursor-pointer"
                  >
                    Success Stories
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-purple-600 transition-colors cursor-pointer"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-purple-600 transition-colors cursor-pointer"
                  >
                    For Donors
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-purple-600 transition-colors cursor-pointer"
                  >
                    For Charities
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-purple-600 transition-colors cursor-pointer"
                  >
                    Tax Information
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-purple-600 transition-colors cursor-pointer"
                  >
                    Donation Guide
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-purple-600 transition-colors cursor-pointer"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <i className="fas fa-map-marker-alt text-purple-600 mt-1 mr-3"></i>
                  <span className="text-gray-600">
                    123 Charity Lane, New York, NY 10001
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-envelope text-purple-600 mt-1 mr-3"></i>
                  <span className="text-gray-600">info@charityfinder.org</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-phone text-purple-600 mt-1 mr-3"></i>
                  <span className="text-gray-600">+1 (555) 123-4567</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 mb-4 md:mb-0">
              © 2025 CharityFinder. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-purple-600 transition-colors cursor-pointer"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-purple-600 transition-colors cursor-pointer"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-purple-600 transition-colors cursor-pointer"
              >
                Cookie Policy
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.slice(1, 5).map((category) => (
                <div key={category.name} className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
                    <img
                      src={
                        category.name === "Education"
                          ? "/images/category/education-small.jpg"
                          : category.name === "Healthcare"
                            ? "/images/category/health-small.jpg"
                            : category.name === "Environment"
                              ? "/images/category/environment-small.jpg"
                              : "/images/category/animal-welfare-small.jpg"
                      }
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-4">
                <i className="fab fa-cc-visa text-gray-400 text-2xl"></i>
                <i className="fab fa-cc-mastercard text-gray-400 text-2xl"></i>
                <i className="fab fa-cc-amex text-gray-400 text-2xl"></i>
                <i className="fab fa-cc-paypal text-gray-400 text-2xl"></i>
                <i className="fab fa-cc-apple-pay text-gray-400 text-2xl"></i>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default App;
