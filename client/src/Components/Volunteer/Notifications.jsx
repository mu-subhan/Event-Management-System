
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaEnvelope } from "react-icons/fa";

const Notification = ({ onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="bg-white rounded-xl max-w-md w-full p-6 relative mx-2"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 text-gray-900 hover:text-gray-600"
            onClick={onClose}
          >
            <FaTimes className="text-xl" />
          </button>

          <div className="text-center mb-6">
            <div className="mx-auto w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <FaEnvelope className="text-blue-500 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Notification Sent!
            </h3>
            <p className="text-gray-600 mb-4">
              We've emailed all details to your registered address.
            </p>
            <p className="text-sm text-gray-500">
              Can't find it? Check your spam folder.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://mail.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-center flex items-center justify-center gap-2"
            >
              <FaEnvelope /> Open Gmail
            </a>
            <button
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              I'll Check Later
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Notification;