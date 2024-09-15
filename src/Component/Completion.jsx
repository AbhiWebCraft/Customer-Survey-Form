import React from 'react';

const Completion = ({ surveyData, restartSurvey }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative bg-white p-8 shadow-lg rounded-lg w-[600px] h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg"></div>
        <div className="relative text-center p-4">
          <h2 className="text-2xl font-bold text-white">Survey Completed!</h2>
          <p className="text-lg text-gray-200 mt-4">Thank you for your feedback.</p>
          <button
            onClick={restartSurvey}
            className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Restart Survey
          </button>
        </div>
      </div>
    </div>
  );
};

export default Completion;
