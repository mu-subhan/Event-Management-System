import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
  const [open, setOpen] = useState(null);

  const faqData = [
    {
      question: 'What is EventMatch, and how does it work?',
      answer:
        'EventMatch is a platform designed to streamline event organization and volunteer assignment. Admins can create events, and our intelligent system uses machine learning to match volunteers to roles based on their skills, interests, and experience.',
    },
    {
      question: 'How do I register as a volunteer?',
      answer:
        'To register, click on the "Sign Up" button on the Volunteer Portal. Fill in your profile details, including your skills, interests, and availability, and you\'re ready to start getting matched with event roles.',
    },
    {
      question: 'What kind of events can I create on the platform?',
      answer:
        'Admins can create events of any type, from corporate seminars and charity fundraisers to community service events. The system even suggests suitable roles for each event type to make planning easier.',
    },
    {
      question: 'How does the volunteer matching process work?',
      answer:
        'Our platform uses a machine learning module to analyze volunteer profiles and event requirements. Based on skills, interests, and previous activity, it suggests the most suitable volunteers for specific roles, ensuring a perfect match.',
    },
    {
      question: 'Can I update my volunteer profile after registration?',
      answer:
        'Yes, volunteers can update their profiles anytime. Simply log in to your Volunteer Portal, and you can edit your skills, interests, or availability.',
    },
    {
      question: 'Is there a way to contact volunteers or admins directly?',
      answer:
        'Yes, the platform includes a messaging feature that allows admins and volunteers to communicate directly for role confirmations or additional details.',
    },
    {
      question: 'Are notifications sent for event updates?',
      answer:
        'Absolutely! Volunteers receive email or SMS notifications for role assignments, event updates, or any changes in schedules, ensuring everyone stays informed.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <>
      <hr className="bg-slate-800 " />
      <div className=" w-full py-8">
        <div className="max-w-4xl mx-auto px-6 bg-white rounded-lg shadow-xl py-8">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
          <hr className='border-custom-blue'/>
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <button
                  className="w-full text-left py-4 px-6 flex justify-between items-center text-lg font-medium text-gray-800 hover:bg-blue-100 focus:outline-none transition-all duration-200"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-xl">{faq.question}</span>
                  <span className="text-xl text-custom-blue">
                    {open === index ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>
                {open === index && (
                  <div className="py-4 px-6 bg-gray-50 text-gray-700 text-pretty transition-all duration-300 ease-in-out">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-300 mt-8" />
    </>
  );
};

export default FAQ;
