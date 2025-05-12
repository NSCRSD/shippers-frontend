import React, { useState, useEffect } from 'react';
import { shipperBanks } from '../services/getBankServices'; // Import the Bank service
import { shipperConnectBanks } from '../services/connectToBankForShipperServices'; // Import the connect to Bank service

const BankCardList = () => {
  const [bankData, setBankData] = useState([]); // State to store Bank data

  useEffect(() => {
    const fetchBank = async () => {
      try {
        const response = await shipperBanks(); // Call the Bank service

        // Log the entire response to inspect its structure
        console.log("API Response:", response);

        console.log("Bank Data:", response?.data?.data); // Log the Bank data
        
        if (response?.status === 200) {
          setBankData(response?.data?.data); // Store the data in state
        } else {
          console.log(response?.data?.message || "Failed to fetch Bank data.");
        }
      } catch (err) {
        console.error(err);
        console.log("An error occurred while fetching Bank data.");
      } 
    };

    fetchBank(); // Call the fetchBank function
  }, []);

  const handleSubmit = async (bankId) => {
    try {
      const payload = {
        bank_id: bankId, 
      };

      const response = await shipperConnectBanks(payload);

      if (response.status === 201) {
        // Handle successful connection to the bank
        console.log("Bank connected successfully:", response.data);
      } else {
        console.log(response.message || "Failed to connect to the bank. Please try again.", "error");
      }
    } catch (error) {
      console.error(error);
      console.log("Server error. Try again later.", "error");
    }
  };

  return (
    <div className="space-y-4">
      {!Array.isArray(bankData) || bankData.length === 0 ? ( // Check if bankData is not an array or is empty
        <p className="text-center text-gray-500 text-3xl md:text-7xl mt-32 md:mt-60">No Bank is Onboard</p>
      ) : (
        bankData.map((bank) => (
          <div
            key={bank.id}
            className="flex items-center justify-between bg-white rounded-xl shadow-sm p-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={bank.logo}
                alt={`${bank.bank_name} logo`}
                className="w-16 h-16 rounded-md object-contain"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{bank.bank_name}</h3>
                <p className="text-sm text-gray-700 flex items-center gap-1">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {bank.address}
                </p>
                <p className="text-sm text-gray-600">
                  Contact: <strong>{bank.official_email}</strong>
                </p>
              </div>
            </div>
            <button
              onClick={() => handleSubmit(bank.id)} // Pass the bank ID when clicked
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
            >
              Connect
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default BankCardList;