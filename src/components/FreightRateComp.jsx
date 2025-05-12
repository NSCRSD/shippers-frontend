import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressBar from './ProgressBar'; // Your existing component
import { ArrowLeft } from 'lucide-react'; // Optional icon library or replace with SVG
import { shipperFreighRateApplications } from '../services/freightRateAppServices';
import { shipperFreighRateForm } from '../services/freightRateFormServices';
import { shipperConnectedBanks } from '../services/connectedBankServices'; 
import Loader from './Loader';

export default function FreightRateForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    cci_number: '',
    form_a_number: '',
    nxp_number: '',
    invoice_number: '',
    bill_of_lading_number: '',
    bank: '',
    beneficiary: '',
    voyage_from: '',
    voyage_to: '',
    cargo: '',
    number_of_units: '',
    price_per_unit: '',
    total_price: '',
  });
  const [connectedBanks, setConnectedBanks] = useState([]); // State to store connected banks
  const [applicationId, setApplicationId] = useState(null); // State to store application_id
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [loading, setLoading] = useState(false);

  const calculateTotalPrice = (numberOfUnits, pricePerUnit) => {
    const units = parseFloat(numberOfUnits) || 0;
    const price = parseFloat(pricePerUnit) || 0;
    return (units * price).toString(); // Return as a string to maintain text input compatibility
  };

  // Fetch connected banks when the form loads
  useEffect(() => {
    const fetchConnectedBanks = async () => {
      try {
        const response = await shipperConnectedBanks();
        console.log('Connected Banks Response:', response?.data?.data);
        if (response.status === 200 && response?.data?.data?.length > 0) {
          setConnectedBanks(response?.data?.data); // Store connected banks
        } else {
          setError('No connected banks found. Please connect to a bank.');
        }
      } catch (err) {
        console.error('Error fetching connected banks:', err);
        setError('An error occurred while fetching connected banks.');
      }
    };

    fetchConnectedBanks();
  }, []);

  const handleNextStep = async (e) => {
    e.preventDefault();

    if (step === 0 && !formData.title) {
      setError('Please enter a valid title.');
      setLoading(false); // Stop the loader
      return;
    }

    if (step === 1 && !formData.cci_number) {
      setError('Please enter a valid CCI Number.');
      setLoading(false); // Stop the loader
      return;
    }

    if (step === 1) {
      try {
        // Submit title and CCI number
        const prefilledResponse = await shipperFreighRateApplications({
          title: formData.title,
          cci_number: formData.cci_number,
        });

        setLoading(true); // Show the loader

        if (prefilledResponse.status === 200) {
          setLoading(false);
          setError('');
          setFormData((prev) => ({
            ...prev,
            ...prefilledResponse?.data?.data?.cbn_data, // Merge prefilled data into the form
          }));
          setApplicationId(prefilledResponse?.data?.data?.application_id); // Store application_id
          setDirection(1);
          setStep((prev) => prev + 1);
        } else {
          setLoading(false);
          setError(prefilledResponse?.message || 'Failed to fetch prefilled data.');
        }
      } catch (err) {
        setLoading(false); // Stop the loader
        console.error('Error submitting title and CCI number:', err);
        setError('An error occurred while submitting title and CCI number.');
      }
      return;
    }

    setError('');
    if (step < steps.length - 1) {
      setDirection(1);
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((prev) => prev - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        application_id: applicationId, // Include application_id in the payload
      };

      const response = await shipperFreighRateForm(payload); // Call the API service
      if (response.status === 200) {
        setSuccessMessage('Freight rate submitted successfully!');
        setFormData({
          title: '',
          cci_number: '',
          form_a_number: '',
          nxp_number: '',
          invoice_number: '',
          bill_of_lading_number: '',
          bank: '',
          beneficiary: '',
          voyage_from: '',
          voyage_to: '',
          cargo: '',
          number_of_units: '',
          price_per_unit: '',
          total_price: '',
        });
        setApplicationId(null); // Reset application_id
        setStep(0); // Reset the form
      } else {
        setError(response?.message || 'Failed to submit freight rate.');
      }
    } catch (error) {
      console.error('Error submitting freight rate:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  const steps = [
    {
      id: 'title',
      title: 'Title of Request',
      content: (
        <>
          <h2 className="text-2xl font-bold text-blue-800">Freight Rate Submission Form</h2>
          <p className="text-black text-lg">
            Provide <strong>Title of Request</strong> below
          </p>
          <form onSubmit={handleNextStep} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Input Title of Request"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-full bg-gray-100 focus:outline-none text-center"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full"
            >
              Next
            </button>
          </form>
        </>
      ),
    },
    {
      id: 'cci',
      title: 'CCI Number Entry',
      content: (
        <>
          <h2 className="text-2xl font-bold text-blue-800">Freight Rate Submission Form</h2>
          <p className="text-black text-lg">
            Provide <strong>CCI Number</strong> below
          </p>
          <form onSubmit={handleNextStep} className="space-y-4">
            <input
              type="text"
              name="cci_number"
              placeholder="Input CCI NUMBER"
              value={formData.cci_number}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-full bg-gray-100 focus:outline-none text-center"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full"
            >
              Next
            </button>
          </form>
        </>
      ),
    },
    {
      id: 'form',
      title: 'Freight Form',
      content: (
        <div className="w-full max-w-6xl border border-black rounded-xl p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-black rounded-sm mr-2"></div>
            <h1 className="text-xl sm:text-2xl font-bold">Freight Rate Submission Form</h1>
          </div>
    
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="col-span-1 sm:col-span-2 md:col-span-3">
              <label className="block mb-1">Title of Request</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-black p-2"
                type="text"
                readOnly
              />
            </div>
    
            <div>
              <label className="block mb-1">Form A Application</label>
              <input
                name="form_a_number"
                value={formData.form_a_number}
                onChange={handleChange}
                className="w-full border border-black p-2"
                type="text"
                readOnly
              />
            </div>
    
            <div>
              <label className="block mb-1">Form NXP Application No</label>
              <input
                name="nxp_number"
                value={formData.nxp_number}
                onChange={handleChange}
                className="w-full border border-black p-2"
                type="text"
                readOnly
                required
              />
            </div>
    
            <div>
              <label className="block mb-1 italic">Invoice No</label>
              <input
                name="invoice_number"
                value={formData.invoice_number}
                onChange={handleChange}
                className="w-full border border-black p-2"
                type="text"
                readOnly
                required
              />
            </div>
    
            <div>
              <label className="block mb-1">BL No</label>
              <input
                name="bill_of_lading_number"
                value={formData.bill_of_lading_number}
                onChange={handleChange}
                className="w-full border border-black p-2"
                type="text"
                readOnly
                required
              />
            </div>
    
            <div>
              <label className="block mb-1">Bank</label>
              {connectedBanks.length === 0 ? (
                <input
                  name="bank"
                  onChange={handleChange}
                  className="w-full border border-black p-2 text-red-600"
                  placeholder='connect to a bank'
                  type="text"
                />
              ) : connectedBanks.length === 1 ? (
                <input
                  name="bank"
                  value={connectedBanks[0].name}
                  onChange={handleChange}
                  className="w-full border border-black p-2"
                  type="text"
                />
              ) : (
                <select
                  name="bank"
                  value={formData.bank}
                  onChange={handleChange}
                  className="w-full border border-black p-2"
                >
                  <option value="">Select a bank</option>
                  {connectedBanks.map((bank) => (
                    <option key={bank.id} value={bank.name}>
                      {bank.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
    
            <div>
              <label className="block mb-1">Beneficiary</label>
              <input
                name="beneficiary"
                value={formData.beneficiary}
                onChange={handleChange}
                className="w-full border border-black p-2"
                type="text"
                required
              />
            </div>
    
            <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Voyage From</label>
                <input
                  name="voyage_from"
                  value={formData.voyage_from}
                  onChange={handleChange}
                  className="w-full border border-black p-2"
                  type="text"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Voyage To</label>
                <input
                  name="voyage_to"
                  value={formData.voyage_to}
                  onChange={handleChange}
                  className="w-full border border-black p-2"
                  type="text"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-1">Cargo</label>
              <input
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                className="w-full border border-black p-2"
                type="text"
                required
              />
            </div>
    
            <div>
              <label className="block mb-1">No. of Units</label>
              <input
                name="number_of_units"
                value={formData.number_of_units}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, ''); // Allow only numbers
                  setFormData((prev) => ({
                    ...prev,
                    number_of_units: value,
                    total_price: calculateTotalPrice(value, formData.price_per_unit), // Update total price
                  }));
                }}
                className="w-full border border-black p-2"
                type="text"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Freight Price / Unit</label>
              <input
                name="price_per_unit"
                value={formData.price_per_unit}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, ''); // Allow only numbers
                  setFormData((prev) => ({
                    ...prev,
                    price_per_unit: value,
                    total_price: calculateTotalPrice(formData.number_of_units, value), // Update total price
                  }));
                }}
                className="w-full border border-black p-2"
                type="text"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Freight Total Price</label>
              <input
                name="total_price"
                value={formData.total_price}
                className="w-full border border-black p-2"
                type="text"
                readOnly // Make it read-only to prevent manual editing
              />
            </div>
    
            <div className="col-span-1 sm:col-span-2 md:col-span-3 flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-800 text-white px-4 py-2 rounded-md"
              >
                <span className="text-xl font-bold">+</span> Submit Request
              </button>
            </div>
          </form>
    
          {error && <p className="text-red-600 mt-4">{error}</p>}
          {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
        </div>
      )
    },
  ];

  return (
    <div className="h-[600px] flex flex-col justify-start rounded-2xl shadow-md items-center bg-white px-4 py-10 relative">
      {loading && <Loader />} {/* Show the loader when loading */}
      <div className="mb-10">
        <ProgressBar currentStep={step + 1} totalSteps={steps.length} />
      </div>

      {/* Back Arrow */}
      {step > 0 && (
        <button
          onClick={handlePrevStep}
          className="absolute left-6 top-6 text-blue-700 hover:text-blue-900 flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>
      )}
      {successMessage && <p className="text-green-600">{successMessage}</p>}
      <div className="relative w-full h-full max-w-4xl overflow-y-auto overflow-x-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ x: direction === 1 ? '100%' : '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction === 1 ? '-100%' : '100%', opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute w-full h-full"
          >
            <div className="text-center space-y-6">{steps[step].content}</div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
