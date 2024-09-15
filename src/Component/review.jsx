import React, { useEffect, useState } from "react";
import { data } from "../assets/data";
import Completion from "../Component/Completion.jsx";
import Welcome from "../Component/Welcome.jsx";

function Review() {
  const [surveyStarted, setSurveyStarted] = useState(false);
  const [surveyCompleted, setSurveyCompleted] = useState(false); 
  const [rating, setRating] = useState(0);
  const [textAnswer, setTextAnswer] = useState(''); 
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);

  // saving rating or text input in localStorage
  const saveToLocalStorage = (questionText, value) => {
    localStorage.setItem(questionText, value); 
  };

  //getting saved rating/text input from localStorage
  const getFromLocalStorage = (questionText) => {
    return localStorage.getItem(questionText) || ""; 
  };

  
  useEffect(() => {
    if (index === 4) {
      setTextAnswer(getFromLocalStorage(data[index].question));
    } else {
      setRating(getFromLocalStorage(data[index].question));
    }
  }, [index]);

  const handleRating = (value) => {
    setRating(value);
    saveToLocalStorage(data[index].question, value);
  };

  const handleTextInput = (e) => {
    setTextAnswer(e.target.value);
    saveToLocalStorage(data[index].question, e.target.value);
  };

  const next = () => {
    if (index < data.length - 1) {
      setIndex(++index);
      setRating(0); 
      setTextAnswer(''); 
    } else {
      setSurveyCompleted(true); 
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(--index);
    }
  };

  const skip = () => {
    if (index < data.length - 1) {
      setIndex(++index);
      setRating(0); 
      setTextAnswer(''); 
    }
  };


  const restartSurvey = () => {
    localStorage.clear(); 
    setSurveyStarted(false); 
    setSurveyCompleted(false); 
    setIndex(0); 
    setRating(0); 
    setTextAnswer(''); 
    setQuestion(data[0]); 
  };

  // getting all the questions and their answers from localStorage
  const surveyData = data.map((item) => ({
    question: item.question,
    answer: localStorage.getItem(item.question) || "Skipped",
  }));

  window.addEventListener('load',()=>{
    localStorage.clear();
    setRating(0);
  })

  return (
    <>
      {!surveyStarted ? (
        <Welcome startSurvey={() => setSurveyStarted(true)} />
      ) : surveyCompleted ? (
        <Completion surveyData={surveyData} restartSurvey={restartSurvey} />
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="relative bg-white p-8 shadow-lg rounded-lg w-[600px] h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg"></div>
            <div className="relative flex flex-col justify-center items-center h-full text-center">
            <p className="absolute top-1 font-bold text-black"> Customer Survey</p>
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
                    className="w-full h-24 p-2 border border-gray-300 rounded-lg"
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
                          : "hover:bg-blue-600 "
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
              className="absolute bottom-4 left-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              &larr; Prev
            </button>

            <button
              onClick={next}
              className="absolute bottom-4 right-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Next &rarr;
            </button>

            <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-lg text-black">
              {index + 1} of {data.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Review;
