import React, { useEffect, useState } from "react";
import { data } from "../assets/data";
import Completion from "../Component/Completion.jsx";
import Welcome from "../Component/Welcome.jsx";

function Review() {
  const [surveyStarted, setSurveyStarted] = useState(false);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [rating, setRating] = useState(0);
  const [textAnswer, setTextAnswer] = useState('');
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    setQuestion(data[index]);
  }, [index]);

  const handleRating = (value) => {
    setRating(value);
    setResponses(prev => ({
      ...prev,
      [data[index].question]: value
    }));
  };

  const handleTextInput = (e) => {
    setTextAnswer(e.target.value);
    setResponses(prev => ({
      ...prev,
      [data[index].question]: e.target.value
    }));
  };

  const next = () => {
    if (index < data.length - 1) {
      setIndex(prevIndex => prevIndex + 1);
      setRating(0);
      setTextAnswer('');
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(prevIndex => prevIndex - 1);
    }
  };

  const skip = () => {
    if (index < data.length - 1) {
      setIndex(prevIndex => prevIndex + 1);
      setRating(0);
      setTextAnswer('');
    }
  };

  // Save all responses to localStorage
  const submitSurvey = () => {
    Object.entries(responses).forEach(([question, value]) => {
      localStorage.setItem(question, value);
    });
    setSurveyCompleted(true);
  };

  const restartSurvey = () => {
    setSurveyStarted(false);
    setSurveyCompleted(false);
    setIndex(0);
    setRating(0);
    setTextAnswer('');
    setResponses({});
  };

  return (
    <>
      {!surveyStarted ? (
        <Welcome startSurvey={() => setSurveyStarted(true)} />
      ) : surveyCompleted ? (
        <Completion surveyData={responses} restartSurvey={restartSurvey} />
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="relative bg-white p-8 shadow-lg rounded-lg w-[600px] h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg"></div>
            <div className="relative flex flex-col justify-center items-center h-full text-center">
              <p className='absolute top-0 text-bold font-bold text-lg text-black'>Customer Survey</p>
              <p className="text-lg font-semibold text-gray-800 mb-6">
                {index + 1}. {data[index].question}
              </p>

              {index === 3 ? (
                <div className="flex justify-center space-x-4 mt-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                    <span
                      className={`w-10 h-10 flex items-center justify-center border border-gray-400 rounded-lg cursor-pointer transition-colors duration-300 ${
                        rating >= number
                          ? "bg-blue-500 text-white"
                          : "hover:bg-blue-500 hover:text-white"
                      }`}
                      key={number}
                      onClick={() => handleRating(number)}
                    >
                      {number}
                    </span>
                  ))}
                </div>
              ) : index === 4 ? (
                <div className="mt-4">
                  <textarea
                    className="w-full h-20 p-2 border border-gray-300 rounded-lg"
                    placeholder="Your answer"
                    value={textAnswer}
                    onChange={handleTextInput}
                  />
                </div>
              ) : (
                <div className="flex justify-center space-x-4 mt-4">
                  {[1, 2, 3, 4, 5].map((number) => (
                    <span
                      className={`w-10 h-10 flex items-center justify-center border border-gray-400 rounded-lg cursor-pointer transition-colors duration-300 ${
                        rating >= number
                          ? "bg-blue-500 text-white"
                          : "hover:bg-blue-500 hover:text-white"
                      }`}
                      key={number}
                      onClick={() => handleRating(number)}
                    >
                      {number}
                    </span>
                  ))}
                </div>
              )}

              <button
                onClick={skip}
                className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
              >
                Skip This
              </button>
            </div>

            <button
              onClick={prev}
              disabled={index === 0}
              className="absolute bottom-4 left-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              &larr; Prev
            </button>

            {index === data.length - 1 ? (
              <button
                onClick={submitSurvey}
                className="absolute bottom-4 right-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Submit Survey
              </button>
            ) : (
              <button
                onClick={next}
                className="absolute bottom-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Next &rarr;
              </button>
            )}

            <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-lg text-gray-600">
              {index + 1} of {data.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Review;
