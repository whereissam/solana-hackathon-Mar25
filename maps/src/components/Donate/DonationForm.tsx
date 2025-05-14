import React, { useState } from 'react';
import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getImpactForAmount } from './data/impactData';
// Import the PaymentComponent
import PaymentComponent from '../payment/PaymentComponent';

// Register all necessary chart elements at the module level
Chart.register(ArcElement, Tooltip, Legend, Title);

interface DonationFormProps {
  donationAmount: number | string;
  customAmount: boolean;
  isRecurring: boolean;
  recurringFrequency: string;
  paymentMethod: string;
  handleAmountSelect: (amount: number) => void;
  handleCustomAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setCustomAmount: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRecurring: React.Dispatch<React.SetStateAction<boolean>>;
  setRecurringFrequency: React.Dispatch<React.SetStateAction<string>>;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  beneficiaryId: number; // Add this prop to match PaymentComponent requirements
}

const DonationForm: React.FC<DonationFormProps> = ({
  donationAmount,
  customAmount,
  isRecurring,
  recurringFrequency,
  paymentMethod,
  handleAmountSelect,
  handleCustomAmountChange,
  setCustomAmount,
  setIsRecurring,
  setRecurringFrequency,
  setPaymentMethod,
  beneficiaryId
}) => {
  // Add state for payment step
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  
  // Function to handle payment completion
  const handlePaymentComplete = async (signature: string, lamports: number) => {
    // Handle successful payment
    console.log(`Payment completed with signature: ${signature}`);
    console.log(`Amount in lamports: ${lamports}`);
    
    // Reset form or show success message
    setShowPaymentForm(false);
    
    // You might want to add additional state for showing a success message
    // setShowSuccessMessage(true);
    
    // Return a resolved promise to satisfy the PaymentComponent's expectation
    return Promise.resolve();
  };
  
  // Function to handle payment initiation
  const handleInitiateDonation = () => {
    console.log('Donation initiated');
    // Any pre-payment logic can go here
  };
  
  // Function to handle payment cancellation
  const handlePaymentCancel = () => {
    setShowPaymentForm(false);
  };
  
  return (
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
        
        {!showPaymentForm ? (
          // Show donation form when not in payment step
          <div className="bg-gray-50 rounded-2xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Column - Donation Options */}
              <div className="p-8 lg:border-r border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Choose Amount
                </h3>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[10, 25, 50, 100, 250, 500].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleAmountSelect(amount)}
                      className={`py-3 px-4 rounded-lg font-medium transition-all ${
                        !customAmount && donationAmount === amount
                          ? "bg-purple-600 text-white"
                          : "bg-white border border-gray-200 text-gray-800 hover:border-purple-300"
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <div className="mb-8">
                  <div
                    className={`flex items-center border rounded-lg overflow-hidden transition-all ${
                      customAmount
                        ? "border-purple-400 bg-white ring-2 ring-purple-100"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <span className="text-gray-500 text-lg font-medium pl-4">
                      $
                    </span>
                    <input
                      type="text"
                      placeholder="Custom amount"
                      value={customAmount ? donationAmount : ""}
                      onChange={handleCustomAmountChange}
                      onFocus={() => setCustomAmount(true)}
                      className="w-full py-3 px-2 bg-transparent border-none focus:outline-none text-gray-800"
                    />
                  </div>
                </div>
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Donation Frequency
                  </h3>
                  <div className="flex flex-col space-y-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        className="form-radio text-purple-600 h-5 w-5"
                        name="frequency"
                        checked={!isRecurring}
                        onChange={() => setIsRecurring(false)}
                      />
                      <span className="ml-2 text-gray-700">One-time donation</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        className="form-radio text-purple-600 h-5 w-5"
                        name="frequency"
                        checked={isRecurring}
                        onChange={() => setIsRecurring(true)}
                      />
                      <span className="ml-2 text-gray-700">Recurring donation</span>
                    </label>
                    {isRecurring && (
                      <div className="ml-7 mt-2">
                        <select
                          value={recurringFrequency}
                          onChange={(e) => setRecurringFrequency(e.target.value)}
                          className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-white py-2 px-3"
                        >
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="quarterly">Quarterly</option>
                          <option value="annually">Annually</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Payment Method
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`py-3 px-4 rounded-lg font-medium transition-all flex flex-col items-center justify-center ${
                        paymentMethod === "card"
                          ? "bg-purple-600 text-white"
                          : "bg-white border border-gray-200 text-gray-800 hover:border-purple-300"
                      }`}
                    >
                      <i className="fas fa-credit-card text-xl mb-1"></i>
                      <span className="text-sm">Card</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod("paypal")}
                      className={`py-3 px-4 rounded-lg font-medium transition-all flex flex-col items-center justify-center ${
                        paymentMethod === "paypal"
                          ? "bg-purple-600 text-white"
                          : "bg-white border border-gray-200 text-gray-800 hover:border-purple-300"
                      }`}
                    >
                      <i className="fab fa-paypal text-xl mb-1"></i>
                      <span className="text-sm">PayPal</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod("crypto")}
                      className={`py-3 px-4 rounded-lg font-medium transition-all flex flex-col items-center justify-center ${
                        paymentMethod === "crypto"
                          ? "bg-purple-600 text-white"
                          : "bg-white border border-gray-200 text-gray-800 hover:border-purple-300"
                      }`}
                    >
                      <i className="fab fa-bitcoin text-xl mb-1"></i>
                      <span className="text-sm">Crypto</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Right Column - Donation Summary */}
              <div className="p-8 bg-white">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Donation Summary
                </h3>
                
                <div className="mb-6">
                  {typeof donationAmount === 'number' || (typeof donationAmount === 'string' && donationAmount !== '') ? (
                    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                      <div className="flex justify-center mb-4">
                        <div style={{ width: '180px', height: '180px' }}>
                          <Doughnut 
                            data={{
                              labels: ['Education', 'Healthcare', 'Environment', 'Other Causes'],
                              datasets: [{
                                data: [30, 25, 20, 25],
                                backgroundColor: [
                                  'rgba(54, 162, 235, 0.8)',
                                  'rgba(255, 99, 132, 0.8)',
                                  'rgba(75, 192, 192, 0.8)',
                                  'rgba(255, 206, 86, 0.8)'
                                ],
                                borderColor: [
                                  'rgba(54, 162, 235, 1)',
                                  'rgba(255, 99, 132, 1)',
                                  'rgba(75, 192, 192, 1)',
                                  'rgba(255, 206, 86, 1)'
                                ],
                                borderWidth: 1
                              }]
                            }}
                            options={{
                              plugins: {
                                legend: {
                                  position: 'bottom',
                                  labels: {
                                    boxWidth: 10,
                                    font: {
                                      size: 11
                                    }
                                  }
                                },
                                title: {
                                  display: true,
                                  text: 'Donation Allocation',
                                  font: {
                                    size: 14
                                  }
                                }
                              },
                              cutout: '70%'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Donation Amount:</span>
                    <span className="text-xl font-bold text-gray-800">
                      ${donationAmount}
                    </span>
                  </div>
                  {isRecurring && (
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600">Frequency:</span>
                      <span className="font-medium text-gray-800 capitalize">
                        {recurringFrequency}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium text-gray-800 capitalize">
                      {paymentMethod}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 my-4 pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span className="text-gray-800">Total:</span>
                      <span className="text-purple-600">
                        ${donationAmount}
                        {isRecurring && (
                          <span className="text-sm font-normal text-gray-500 ml-1">
                            /{recurringFrequency.slice(0, -2)}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 mb-6 border border-blue-100">
                <h4 className="font-bold text-blue-800 mb-2 flex items-center">
                  <i className="fas fa-info-circle mr-2"></i>
                  Your Impact
                </h4>
                <p className="text-blue-700">
                  {getImpactForAmount(donationAmount)}
                </p>
              </div>
              <button 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-lg font-medium transition duration-300 flex items-center justify-center !rounded-button whitespace-nowrap cursor-pointer"
                onClick={() => setShowPaymentForm(true)}
              >
                <i className="fas fa-heart mr-2"></i>
                Proceed to Payment
              </button>
              <p className="text-center text-sm text-gray-500 mt-4">
                Your donation is tax-deductible to the extent allowed by law.
              </p>
            </div>
          </div>
        ) : (
          // Show payment component when in payment step
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden p-8">
            <button 
              onClick={handlePaymentCancel}
              className="mb-6 text-purple-600 hover:text-purple-800 flex items-center"
            >
              <i className="fas fa-arrow-left mr-2"></i> Back to Donation Form
            </button>
            
            <PaymentComponent 
              beneficiaryId={beneficiaryId}
              onInitiateDonation={handleInitiateDonation}
              onDonationComplete={handlePaymentComplete}
              onCancel={handlePaymentCancel}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default DonationForm;