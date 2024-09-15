import React, { useEffect } from 'react';

const Completion = ({ restartSurvey }) => {

  useEffect(()=>{
    setTimeout(()=>{
      restartSurvey();
    },5000)
  },[])

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative bg-white p-8 shadow-lg rounded-lg w-[600px] h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg"></div>
        <div className="relative text-center p-4">
          <h2 className="text-xl font-bold text-white">Survey Completed!</h2>
          <p className="text-sm text-gray-200 mt-2">Thank you for your feedback.</p>
        </div>
      </div>
    </div>
  );
};

export default Completion;
