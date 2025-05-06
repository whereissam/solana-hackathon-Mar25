// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from "react";
const App: React.FC = () => {
  const [donationAmount, setDonationAmount] = useState<number | string>(25);
  const [customAmount, setCustomAmount] = useState<boolean>(false);
  const [selectedCharity, setSelectedCharity] = useState<string | null>(null);
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [recurringFrequency, setRecurringFrequency] =
    useState<string>("monthly");
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const handleAmountSelect = (amount: number) => {
    setCustomAmount(false);
    setDonationAmount(amount);
  };
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
      setDonationAmount(value);
    }
  };
  const handleCharitySelect = (charityName: string) => {
    setSelectedCharity(charityName);
  };
  const categories = [
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
      certifications: ["501(c)(3)", "Gold Transparency"],
      imagePrompt:
        "Professional children's charity logo with stylized child figure and protective symbol on clean white background, bright primary colors, modern minimalist design representing child welfare and development",
    },
  ];
  const impactData = [
    {
      amount: 10,
      description: "Provides clean water for 20 people for a month",
    },
    {
      amount: 25,
      description: "Supplies educational materials for 5 students",
    },
    { amount: 50, description: "Funds emergency medical care for 2 patients" },
    { amount: 100, description: "Plants 100 trees to restore forest habitats" },
    {
      amount: 250,
      description: "Delivers food packages to 25 families in need",
    },
    {
      amount: 500,
      description: "Builds a clean water well for an entire village",
    },
  ];
  const getImpactForAmount = (amount: number | string) => {
    const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
    // Find the closest impact data point
    const sortedImpacts = [...impactData].sort(
      (a, b) => Math.abs(a.amount - numAmount) - Math.abs(b.amount - numAmount),
    );
    return (
      sortedImpacts[0]?.description ||
      "Makes a meaningful difference to those in need"
    );
  };
  const filteredCharities = selectedCategory
    ? charities.filter((charity) => charity.category === selectedCategory)
    : charities;
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
              href="#"
              className="text-gray-700 hover:text-purple-600 font-medium cursor-pointer"
            >
              Dashboard
            </a>
            <a
              href="https://readdy.ai/home/0cf6f6b1-aed0-45d4-a97b-d57bef8438ad/1b70e32b-b32a-4771-9f47-62e0209097ea"
              data-readdy="true"
              className="text-gray-700 hover:text-purple-600 font-medium cursor-pointer"
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
              href="#"
              className="text-purple-600 font-medium border-b-2 border-purple-600 cursor-pointer flex items-center"
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
        {/* Hero Section */}
        <section className="relative h-80 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-purple-800 to-transparent z-10"></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://readdy.ai/api/search-image?query=Diverse%2520volunteers%2520working%2520together%2520on%2520community%2520projects%2520with%2520happy%2520faces%2520showing%2520impact%2520of%2520charity%2520work.%2520The%2520scene%2520includes%2520people%2520planting%2520trees%252C%2520building%2520homes%252C%2520and%2520distributing%2520food%2520packages.%2520The%2520lighting%2520is%2520warm%2520and%2520hopeful%2520with%2520soft%2520natural%2520tones%2520creating%2520an%2520inspiring%2520atmosphere%2520that%2520conveys%2520compassion%2520and%2520positive%2520change&width=1440&height=500&seq=donate1&orientation=landscape')`,
            }}
          ></div>
          <div className="relative z-20 max-w-7xl mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Make a Difference
              </h1>
              <p className="text-xl mb-6">
                Your donation can change lives. Support causes you care about
                and see the impact of your generosity.
              </p>
              <button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition duration-300 shadow-lg !rounded-button whitespace-nowrap cursor-pointer">
                Start Donating Now
              </button>
            </div>
          </div>
        </section>
        {/* Charity Categories */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Choose a Cause
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Select a category to find charities aligned with causes you're
                passionate about.
              </p>
            </div>
            <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
              {categories.map((category, index) => (
                <div
                  key={index}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category.name ? null : category.name,
                    )
                  }
                  className={`flex-shrink-0 w-48 h-36 rounded-xl shadow-sm flex flex-col items-center justify-center p-4 transition-all cursor-pointer ${
                    selectedCategory === category.name
                      ? "ring-4 ring-purple-400 transform scale-105"
                      : "hover:shadow-md hover:transform hover:scale-105"
                  }`}
                >
                  <div
                    className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center text-white mb-3`}
                  >
                    <i className={`fas ${category.icon} text-2xl`}></i>
                  </div>
                  <h3 className="font-semibold text-gray-800">
                    {category.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Featured Organizations */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Featured Organizations
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover trusted charities making a significant impact in their
                fields.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCharities.map((charity) => (
                <div
                  key={charity.id}
                  className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all ${
                    selectedCharity === charity.name
                      ? "ring-4 ring-purple-400"
                      : "hover:shadow-md"
                  }`}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={`https://readdy.ai/api/search-image?query=$%7Bcharity.imagePrompt%7D&width=400&height=200&seq=charity${charity.id}&orientation=landscape`}
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
                    <p className="text-gray-600 mb-4">{charity.description}</p>
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
                      <button
                        onClick={() => handleCharitySelect(charity.name)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition duration-300 flex-grow !rounded-button whitespace-nowrap cursor-pointer"
                      >
                        Donate Now
                      </button>
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
          </div>
        </section>
        {/* Donation Form Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Make Your Donation
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose your donation amount and payment method to support the
                causes you care about.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left Column - Donation Options */}
                <div className="p-8 border-b lg:border-b-0 lg:border-r border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Donation Details
                  </h3>
                  {selectedCharity && (
                    <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <div className="flex items-center">
                        <i className="fas fa-heart text-purple-500 mr-3"></i>
                        <div>
                          <p className="text-sm text-gray-600">
                            Selected Charity:
                          </p>
                          <p className="font-semibold text-gray-800">
                            {selectedCharity}
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedCharity(null)}
                          className="ml-auto text-gray-400 hover:text-gray-600 cursor-pointer"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="mb-8">
                    <label className="block text-gray-700 font-medium mb-3">
                      Choose Amount
                    </label>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {[10, 25, 50, 100, 250, 500].map((amount) => (
                        <button
                          key={amount}
                          onClick={() => handleAmountSelect(amount)}
                          className={`py-3 rounded-lg font-medium transition-all !rounded-button whitespace-nowrap cursor-pointer ${
                            !customAmount && donationAmount === amount
                              ? "bg-purple-600 text-white"
                              : "bg-white border border-gray-200 text-gray-700 hover:border-purple-300"
                          }`}
                        >
                          ${amount}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Custom Amount"
                        value={customAmount ? donationAmount : ""}
                        onChange={handleCustomAmountChange}
                        onFocus={() => setCustomAmount(true)}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-500 outline-none transition"
                      />
                    </div>
                  </div>
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-gray-700 font-medium">
                        Make this a recurring donation
                      </label>
                      <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                        <input
                          type="checkbox"
                          id="toggle"
                          className="opacity-0 w-0 h-0"
                          checked={isRecurring}
                          onChange={() => setIsRecurring(!isRecurring)}
                        />
                        <label
                          htmlFor="toggle"
                          className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full ${
                            isRecurring ? "bg-purple-600" : "bg-gray-300"
                          } transition-all duration-300 before:absolute before:content-[''] before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-300 ${
                            isRecurring ? "before:translate-x-6" : ""
                          }`}
                        ></label>
                      </div>
                    </div>
                    {isRecurring && (
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <div className="flex items-center mb-3">
                          <i className="fas fa-sync-alt text-purple-500 mr-2"></i>
                          <span className="text-gray-700 font-medium">
                            Frequency
                          </span>
                        </div>
                        <div className="flex space-x-3">
                          <button
                            onClick={() => setRecurringFrequency("monthly")}
                            className={`px-4 py-2 rounded-lg font-medium transition-all !rounded-button whitespace-nowrap cursor-pointer ${
                              recurringFrequency === "monthly"
                                ? "bg-purple-600 text-white"
                                : "bg-white border border-gray-200 text-gray-700"
                            }`}
                          >
                            Monthly
                          </button>
                          <button
                            onClick={() => setRecurringFrequency("quarterly")}
                            className={`px-4 py-2 rounded-lg font-medium transition-all !rounded-button whitespace-nowrap cursor-pointer ${
                              recurringFrequency === "quarterly"
                                ? "bg-purple-600 text-white"
                                : "bg-white border border-gray-200 text-gray-700"
                            }`}
                          >
                            Quarterly
                          </button>
                          <button
                            onClick={() => setRecurringFrequency("yearly")}
                            className={`px-4 py-2 rounded-lg font-medium transition-all !rounded-button whitespace-nowrap cursor-pointer ${
                              recurringFrequency === "yearly"
                                ? "bg-purple-600 text-white"
                                : "bg-white border border-gray-200 text-gray-700"
                            }`}
                          >
                            Yearly
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-3">
                      Currency
                    </label>
                    <div className="relative">
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 outline-none transition">
                        <option value="usd">USD - US Dollar</option>
                        <option value="eur">EUR - Euro</option>
                        <option value="gbp">GBP - British Pound</option>
                        <option value="cad">CAD - Canadian Dollar</option>
                        <option value="aud">AUD - Australian Dollar</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <i className="fas fa-chevron-down text-gray-500"></i>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-start">
                      <i className="fas fa-lightbulb text-blue-500 mt-1 mr-3"></i>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          Your Impact
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {getImpactForAmount(donationAmount)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right Column - Payment Methods */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Payment Method
                  </h3>
                  <div className="mb-6">
                    <div className="grid grid-cols-4 gap-3 mb-4">
                      <button
                        onClick={() => setPaymentMethod("card")}
                        className={`py-3 px-4 rounded-lg font-medium transition-all flex flex-col items-center !rounded-button whitespace-nowrap cursor-pointer ${
                          paymentMethod === "card"
                            ? "bg-purple-600 text-white"
                            : "bg-white border border-gray-200 text-gray-700 hover:border-purple-300"
                        }`}
                      >
                        <i className="fas fa-credit-card mb-1"></i>
                        <span className="text-xs">Card</span>
                      </button>
                      <button
                        onClick={() => setPaymentMethod("paypal")}
                        className={`py-3 px-4 rounded-lg font-medium transition-all flex flex-col items-center !rounded-button whitespace-nowrap cursor-pointer ${
                          paymentMethod === "paypal"
                            ? "bg-purple-600 text-white"
                            : "bg-white border border-gray-200 text-gray-700 hover:border-purple-300"
                        }`}
                      >
                        <i className="fab fa-paypal mb-1"></i>
                        <span className="text-xs">PayPal</span>
                      </button>
                      <button
                        onClick={() => setPaymentMethod("applepay")}
                        className={`py-3 px-4 rounded-lg font-medium transition-all flex flex-col items-center !rounded-button whitespace-nowrap cursor-pointer ${
                          paymentMethod === "applepay"
                            ? "bg-purple-600 text-white"
                            : "bg-white border border-gray-200 text-gray-700 hover:border-purple-300"
                        }`}
                      >
                        <i className="fab fa-apple mb-1"></i>
                        <span className="text-xs">Apple Pay</span>
                      </button>
                      <button
                        onClick={() => setPaymentMethod("bank")}
                        className={`py-3 px-4 rounded-lg font-medium transition-all flex flex-col items-center !rounded-button whitespace-nowrap cursor-pointer ${
                          paymentMethod === "bank"
                            ? "bg-purple-600 text-white"
                            : "bg-white border border-gray-200 text-gray-700 hover:border-purple-300"
                        }`}
                      >
                        <i className="fas fa-university mb-1"></i>
                        <span className="text-xs">Bank</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      <button
                        onClick={() => setPaymentMethod("bitcoin")}
                        className={`py-3 px-4 rounded-lg font-medium transition-all flex flex-col items-center !rounded-button whitespace-nowrap cursor-pointer ${
                          paymentMethod === "bitcoin"
                            ? "bg-purple-600 text-white"
                            : "bg-white border border-gray-200 text-gray-700 hover:border-purple-300"
                        }`}
                      >
                        <i className="fab fa-bitcoin mb-1"></i>
                        <span className="text-xs">Bitcoin</span>
                      </button>
                      <button
                        onClick={() => setPaymentMethod("ethereum")}
                        className={`py-3 px-4 rounded-lg font-medium transition-all flex flex-col items-center !rounded-button whitespace-nowrap cursor-pointer ${
                          paymentMethod === "ethereum"
                            ? "bg-purple-600 text-white"
                            : "bg-white border border-gray-200 text-gray-700 hover:border-purple-300"
                        }`}
                      >
                        <i className="fab fa-ethereum mb-1"></i>
                        <span className="text-xs">Ethereum</span>
                      </button>
                      <button
                        onClick={() => setPaymentMethod("usdt")}
                        className={`py-3 px-4 rounded-lg font-medium transition-all flex flex-col items-center !rounded-button whitespace-nowrap cursor-pointer ${
                          paymentMethod === "usdt"
                            ? "bg-purple-600 text-white"
                            : "bg-white border border-gray-200 text-gray-700 hover:border-purple-300"
                        }`}
                      >
                        <i className="fas fa-dollar-sign mb-1"></i>
                        <span className="text-xs">USDT</span>
                      </button>
                      <button
                        onClick={() => setPaymentMethod("dogecoin")}
                        className={`py-3 px-4 rounded-lg font-medium transition-all flex flex-col items-center !rounded-button whitespace-nowrap cursor-pointer ${
                          paymentMethod === "dogecoin"
                            ? "bg-purple-600 text-white"
                            : "bg-white border border-gray-200 text-gray-700 hover:border-purple-300"
                        }`}
                      >
                        <i className="fas fa-dog mb-1"></i>
                        <span className="text-xs">Dogecoin</span>
                      </button>
                    </div>
                  </div>
                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Card Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-500 outline-none transition"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                            <i className="fab fa-cc-visa text-blue-500"></i>
                            <i className="fab fa-cc-mastercard text-red-500"></i>
                            <i className="fab fa-cc-amex text-blue-400"></i>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-500 outline-none transition"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            CVC
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-500 outline-none transition"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Smith"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-500 outline-none transition"
                        />
                      </div>
                    </div>
                  )}
                  {paymentMethod === "paypal" && (
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 text-center">
                      <i className="fab fa-paypal text-blue-600 text-4xl mb-3"></i>
                      <p className="text-gray-700 mb-4">
                        You will be redirected to PayPal to complete your
                        donation.
                      </p>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300 !rounded-button whitespace-nowrap cursor-pointer">
                        Continue to PayPal
                      </button>
                    </div>
                  )}
                  {paymentMethod === "applepay" && (
                    <div className="bg-gray-900 p-6 rounded-lg text-center">
                      <i className="fab fa-apple text-white text-4xl mb-3"></i>
                      <p className="text-white mb-4">
                        Complete your donation with Apple Pay.
                      </p>
                      <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium transition duration-300 !rounded-button whitespace-nowrap cursor-pointer">
                        <i className="fab fa-apple mr-2"></i>
                        Pay
                      </button>
                    </div>
                  )}
                  {paymentMethod === "bank" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Account Holder Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Smith"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-500 outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Account Number
                        </label>
                        <input
                          type="text"
                          placeholder="12345678"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-500 outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Routing Number
                        </label>
                        <input
                          type="text"
                          placeholder="123456789"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-500 outline-none transition"
                        />
                      </div>
                    </div>
                  )}
                  {(paymentMethod === "bitcoin" ||
                    paymentMethod === "ethereum" ||
                    paymentMethod === "usdt" ||
                    paymentMethod === "dogecoin") && (
                    <div className="space-y-6">
                      <div className="bg-gray-900 p-6 rounded-lg text-center">
                        <i
                          className={`fab fa-${paymentMethod === "usdt" ? "dollar-sign" : paymentMethod} text-white text-4xl mb-4`}
                        ></i>
                        <p className="text-white mb-6">
                          Send your{" "}
                          {paymentMethod === "usdt"
                            ? "USDT"
                            : paymentMethod.charAt(0).toUpperCase() +
                              paymentMethod.slice(1)}{" "}
                          to the following address:
                        </p>
                        <div className="bg-gray-800 p-4 rounded-lg mb-4">
                          <code className="text-green-400 break-all">
                            {paymentMethod === "bitcoin" &&
                              "3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5"}
                            {paymentMethod === "ethereum" &&
                              "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"}
                            {paymentMethod === "usdt" &&
                              "TUGCQqn9rXAdYpvGzHKqFBz3RQEh5Zyxj8"}
                            {paymentMethod === "dogecoin" &&
                              "D8vFz4p1L37jdg47HXKtSujChhP9f3doTK"}
                          </code>
                        </div>
                        <div className="flex justify-center mb-6">
                          <div className="bg-white p-4 rounded-lg">
                            <img
                              src={`https://readdy.ai/api/search-image?query=QR%20code%20for%20cryptocurrency%20wallet%20address%20on%20clean%20white%20background%2C%20professional%20and%20clear%20design&width=150&height=150&seq=crypto-qr-${paymentMethod}&orientation=squarish`}
                              alt={`${paymentMethod} QR Code`}
                              className="w-32 h-32"
                            />
                          </div>
                        </div>
                        <div className="text-gray-400 text-sm">
                          <p className="mb-2">
                            • Please send only{" "}
                            {paymentMethod === "usdt"
                              ? "USDT"
                              : paymentMethod.charAt(0).toUpperCase() +
                                paymentMethod.slice(1)}{" "}
                            to this address
                          </p>
                          <p className="mb-2">
                            • Transaction may take 10-30 minutes to confirm
                          </p>
                          <p>
                            • Minimum donation amount:{" "}
                            {paymentMethod === "bitcoin"
                              ? "0.001 BTC"
                              : paymentMethod === "ethereum"
                                ? "0.01 ETH"
                                : paymentMethod === "usdt"
                                  ? "10 USDT"
                                  : "100 DOGE"}
                          </p>
                        </div>
                      </div>
                      <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                        <div className="flex items-start">
                          <i className="fas fa-info-circle text-yellow-500 mt-1 mr-3"></i>
                          <p className="text-sm text-yellow-700">
                            For assistance with cryptocurrency donations, please
                            contact our support team at crypto@charityfinder.org
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="mt-8">
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id="taxReceipt"
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <label
                        htmlFor="taxReceipt"
                        className="ml-2 text-gray-700"
                      >
                        I would like to receive a tax receipt
                      </label>
                    </div>
                    <div className="flex items-center mb-6">
                      <input
                        type="checkbox"
                        id="termsAgree"
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <label
                        htmlFor="termsAgree"
                        className="ml-2 text-gray-700"
                      >
                        I agree to the{" "}
                        <a href="#" className="text-purple-600 hover:underline">
                          terms and conditions
                        </a>
                      </label>
                    </div>
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-medium transition duration-300 flex items-center justify-center !rounded-button whitespace-nowrap cursor-pointer">
                      <i className="fas fa-heart mr-2"></i>
                      Complete Donation
                    </button>
                    <div className="mt-4 flex items-center justify-center space-x-4 text-gray-500 text-sm">
                      <i className="fas fa-lock"></i>
                      <span>Secure Payment</span>
                      <i className="fas fa-shield-alt"></i>
                      <span>SSL Encrypted</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Impact Information */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Your Donation Makes an Impact
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how your contribution helps create positive change around
                the world.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-graduation-cap text-blue-600 text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Education
                </h3>
                <p className="text-gray-600 mb-4">
                  $25 provides educational materials for 5 students in
                  underserved communities.
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500">75% toward monthly goal</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-leaf text-green-600 text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Environment
                </h3>
                <p className="text-gray-600 mb-4">
                  $50 plants 50 trees to restore forest habitats and combat
                  climate change.
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500">60% toward monthly goal</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-heartbeat text-red-600 text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Healthcare
                </h3>
                <p className="text-gray-600 mb-4">
                  $100 provides medical care for 4 patients in underserved
                  regions.
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500">85% toward monthly goal</p>
              </div>
            </div>
            <div className="mt-12 bg-white p-8 rounded-xl shadow-sm">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Transparency & Accountability
                  </h3>
                  <p className="text-gray-600 mb-4">
                    We're committed to complete transparency in how donations
                    are used. All charities on our platform are vetted and must
                    provide regular impact reports.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <i className="fas fa-check-circle text-green-500 mr-3"></i>
                      <span className="text-gray-700">
                        100% of donations go directly to charities
                      </span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-check-circle text-green-500 mr-3"></i>
                      <span className="text-gray-700">
                        Quarterly impact reports available
                      </span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-check-circle text-green-500 mr-3"></i>
                      <span className="text-gray-700">
                        All charities verified and rated
                      </span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-check-circle text-green-500 mr-3"></i>
                      <span className="text-gray-700">
                        Financial statements publicly available
                      </span>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <img
                    src="https://readdy.ai/api/search-image?query=Professional%2520infographic%2520showing%2520charity%2520donation%2520allocation%2520with%2520pie%2520charts%2520and%2520graphs%2520on%2520clean%2520white%2520background.%2520The%2520visualization%2520shows%2520how%2520funds%2520are%2520distributed%2520across%2520program%2520services%252C%2520administrative%2520costs%252C%2520and%2520fundraising%2520with%2520clear%2520percentages%2520and%2520professional%2520design%2520elements%2520in%2520purple%2520and%2520blue%2520color%2520scheme&width=600&height=400&seq=impact1&orientation=landscape"
                    alt="Donation impact visualization"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Tax Receipt Information */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Tax Deduction Information
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Learn about tax benefits available for your charitable
                donations.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Tax Receipt Details
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Donations to registered 501(c)(3) organizations are
                    tax-deductible in the United States. Similar benefits may
                    apply in other countries.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-purple-100 p-2 rounded-full text-purple-600 mr-3 mt-1">
                        <i className="fas fa-file-alt"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          Receipt Delivery
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Tax receipts are automatically emailed after your
                          donation is processed.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-purple-100 p-2 rounded-full text-purple-600 mr-3 mt-1">
                        <i className="fas fa-calendar-alt"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          Annual Summary
                        </h4>
                        <p className="text-gray-600 text-sm">
                          A summary of all your donations for the year is sent
                          in January for tax filing purposes.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-purple-100 p-2 rounded-full text-purple-600 mr-3 mt-1">
                        <i className="fas fa-globe-americas"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          International Donors
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Tax benefits vary by country. Check local regulations
                          or consult a tax professional.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Maximizing Your Tax Benefits
                  </h3>
                  <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 mb-6">
                    <div className="flex items-start">
                      <i className="fas fa-lightbulb text-blue-600 mt-1 mr-3"></i>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          Tax Deduction Tip
                        </h4>
                        <p className="text-gray-600 text-sm">
                          In the US, you can generally deduct up to 60% of your
                          adjusted gross income for cash donations to qualified
                          charities.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-full text-green-600 mr-3 mt-1">
                        <i className="fas fa-hand-holding-usd"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          Employer Matching
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Many employers match charitable donations. Check if
                          your company offers this benefit to double your
                          impact.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-full text-green-600 mr-3 mt-1">
                        <i className="fas fa-chart-line"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          Stock Donations
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Donating appreciated stocks can provide additional tax
                          benefits beyond cash donations.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-full text-green-600 mr-3 mt-1">
                        <i className="fas fa-user-tie"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          Consult a Professional
                        </h4>
                        <p className="text-gray-600 text-sm">
                          For large donations or complex tax situations, we
                          recommend consulting with a tax professional.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center">
                    <i className="fas fa-shield-alt text-gray-500 mr-2"></i>
                    <span className="text-gray-700">
                      All information is securely stored and protected
                    </span>
                  </div>
                  <button className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-lg font-medium transition duration-300 !rounded-button whitespace-nowrap cursor-pointer">
                    <i className="fas fa-download mr-2"></i>
                    Download Tax Guide
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600">
            © 2025 CharityFinder. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-600 hover:text-purple-600 cursor-pointer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-purple-600 cursor-pointer"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-purple-600 cursor-pointer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-purple-600 cursor-pointer"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default App;
