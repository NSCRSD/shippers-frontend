import { useState } from "react";
import { FaClock } from "react-icons/fa";
import { PiBankFill, PiListBulletsBold } from "react-icons/pi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

export const SubmissionCards = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const data = [
    {
      id: 1,
      title: "LOREM/ From EKO",
      bank: "Damiet Plc",
      cargoConsolidator: "Eko",
      amount: "$34,600",
      date: "Thu, 7th Apr ‘25 - 11:45 am",
    },
    {
      id: 2,
      title: "IPSUM/ From LAGOS",
      bank: "Zenith Bank",
      cargoConsolidator: "LagosPort",
      amount: "$20,200",
      date: "Mon, 10th Apr ‘25 - 9:30 am",
    },
  ];

  const handleReject = (submission) => {
    setSelectedSubmission(submission);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setRejectionReason("");
  };

  const handleRejectionSubmit = (e) => {
    e.preventDefault();
    console.log("Rejection Reason:", rejectionReason);
    console.log("Rejected Submission:", selectedSubmission);
    // Perform rejection logic here (e.g., API call)
    handleModalClose();
  };

  return (
    <div className="mx-auto p-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl shadow-md p-6 mb-4 flex flex-col gap-3"
        >
          <h2 className="text-2xl font-semibold text-gray-800">{item.title}</h2>

          <div className="flex flex-wrap items-center gap-3 text-gray-600">
            <span className="flex items-center gap-1">
              Bank: <span className="font-semibold text-black">{item.bank}</span>
              <PiBankFill className="text-lg" />
            </span>

            <span className="mx-2 border-r h-5" />

            <span className="flex items-center gap-1">
              Cargo Consolidator:{" "}
              <span className="font-semibold text-black">
                {item.cargoConsolidator}
              </span>
              <PiListBulletsBold className="text-lg" />
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <span className="flex items-center gap-1">
              Amount Request:
              <RiMoneyDollarCircleLine className="text-blue-600" />
              <span className="text-blue-600 font-semibold">{item.amount}</span>
            </span>
          </div>

          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2 text-gray-500">
              <FaClock />
              <span>{item.date}</span>
            </div>

            <div className="flex gap-3">
              <button className="bg-[#12538f] text-white text-sm px-5 py-2 rounded-md font-semibold hover:bg-[#0e3f6a] transition">
                Submit
              </button>
              <button
                onClick={() => handleReject(item)}
                className="bg-red-600 text-white text-sm px-5 py-2 rounded-md font-semibold hover:bg-red-700 transition"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Reason for Rejection
              </h3>
              <form onSubmit={handleRejectionSubmit} className="space-y-4">
                <textarea
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder="Enter reason for rejection..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  required
                />
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="px-4 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Submit Rejection
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubmissionCards;