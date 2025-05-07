import React, { useState, useEffect, useCallback } from 'react';
import { shipperBanks } from '../services/getBankServices'; // Import the Bank service
import { shipperConnectBanks } from '../services/connectToBankForShipperServices'; // Import the connect to Bank service

const BankCardList = () => {
  const [bankData, setBankData] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "", visible: false });

  // Wrap showToast in useCallback
  const showToast = useCallback((message, type) => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000);
  }, [toast]);

  useEffect(() => {
    const fetchBank = async () => {
      try {
        const response = await shipperBanks();
        console.log("API Response:", response);

        if (response?.status === 200) {
          setBankData(response?.data?.data);
        } else {
          showToast(response?.data?.message || "Failed to fetch Bank data.", "error");
        }
      } catch (err) {
        console.error(err);
        showToast("An error occurred while fetching Bank data.", "error");
      }
    };

    fetchBank();
  }, [showToast]); // Add showToast to the dependency array

  const handleSubmit = async (bankId) => {
    try {
      const payload = { bank_id: bankId };
      const response = await shipperConnectBanks(payload);

      if (response.status === 201) {
        console.log("Bank connected successfully:", response.data);
        showToast("Bank connected successfully!", "success");
      } else {
        showToast(response.message || "Failed to connect to the bank. Please try again.", "error");
      }
    } catch (error) {
      console.error(error);
      showToast("Server error. Try again later.", "error");
    }
  };

  return (
    <div className="space-y-4">
      {toast.visible && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      {bankData.map((bank) => (
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
              <p className="text-sm text-gray-700">{bank.location}</p>
              <p className="text-sm text-gray-600">
                Contact: <strong>{bank.official_email}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={() => handleSubmit(bank.id)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
          >
            Connect
          </button>
        </div>
      ))}
    </div>
  );
};

export default BankCardList;