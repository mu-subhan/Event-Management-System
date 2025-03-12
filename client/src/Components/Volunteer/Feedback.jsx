import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Provide Feedback</h2>

        {/* Rating Section */}
        <div className="mb-6 shadow-md p-4 rounded-lg gap-y-4">
          <label className="block text-gray-700 mb-2">Rate your experience</label>
          <div className="flex space-x-2 justify-center sm:justify-start">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <FaStar
                  key={index}
                  size={30}
                  className="cursor-pointer transition-colors duration-200"
                  color={ratingValue <= (hover || rating) ? "#FFB800" : "#e4e5e9"}
                  onClick={() => setRating(ratingValue)}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                />
              );
            })}
          </div>
        </div>

        {/* Feedback Message Section */}
        <div className="mb-6 shadow-md p-4 rounded-lg gap-y-4">
          <label htmlFor="feedback-message" className="block text-gray-700 mb-2">Your feedback</label>
          <textarea
            id="feedback-message"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="4"
            placeholder="Share your thoughts about the volunteer experience..."
          ></textarea>
        </div>

        {/* Footer Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center shadow-md p-4 rounded-lg gap-y-4">
          <div className="text-gray-600 text-sm mb-4 sm:mb-0">Your feedback helps us improve</div>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm w-full sm:w-auto">
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
