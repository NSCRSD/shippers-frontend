import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressBar from './ProgressBar'; // Your existing component
import { ArrowLeft } from 'lucide-react'; // Optional icon library or replace with SVG

export default function FreightRateComp() {
  const [step, setStep] = useState(0);
  const [cciNumber, setCciNumber] = useState('');
  const [error, setError] = useState('');

  const handleNextStep = (e) => {
    e.preventDefault();

    if (step === 0) {
      const isValid = /^[A-Z0-9]{5,20}$/i.test(cciNumber);
      if (!isValid) {
        setError('Please enter a valid CCI Number (e.g. alphanumeric, 5-20 chars)');
        return;
      }
      setError('');
    }

    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const steps = [
    {
      id: 'cci',
      title: 'CCI Number Entry',
      content: (
        <>
          <h2 className="text-2xl font-bold text-blue-800 flex justify-center items-center gap-2">
            <svg className="w-6 h-6 text-blue-800" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 4a2 2 0 012-2h12a2 2 0 012 2v1H2V4zm0 3h16v9a2 2 0 01-2 2H4a2 2 0 01-2-2V7zm5 2v2h6V9H7z" />
            </svg>
            Freight Rate Submission Form
          </h2>
          <p className="text-black text-lg">
            In Order to Proceed, Provide <strong>CCI Number</strong> below
          </p>

          <form onSubmit={handleNextStep} className="space-y-4">
            <input
              type="text"
              placeholder="Input CCI NUMBER"
              value={cciNumber}
              onChange={(e) => setCciNumber(e.target.value)}
              className="w-full px-4 py-3 rounded-full bg-gray-100 focus:outline-none text-center"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full"
            >
              Submit
            </button>
          </form>
        </>
      ),
    },
    {
      id: 'form',
      title: 'Freight Form',
      content: (
        <div className="bg-white border rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-blue-800 mb-4">Step 2: Fill Out the Freight Form</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Freight Item"
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Destination"
              className="w-full px-4 py-2 border rounded-md"
            />
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded"
            >
              Submit Form
            </button>
          </form>
        </div>
      ),
    },
    // You can add more steps here easily
  ];


  return (
    <div className="h-[600px] flex flex-col justify-start rounded-2xl shadow-md items-center bg-white px-4 py-10 relative">
      {/* Progress Bar */}
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

      {/* Slide Content */}
      <div className="relative w-full h-full max-w-xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
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
