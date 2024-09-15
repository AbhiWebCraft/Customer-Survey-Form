import React from 'react';

const Welcome = ({ startSurvey }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative bg-white p-8 shadow-lg rounded-lg w-[600px] h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg"></div>
        <div className="relative text-center p-4">
          <h1 className="text-2xl font-bold text-white">Welcome to the Survey!</h1>
          <p className="text-lg text-gray-900 mt-4">
            We value your feedback. Please take a few moments to answer our questions.
          </p>
          <button
            onClick={startSurvey}
            className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Take the Survey
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
