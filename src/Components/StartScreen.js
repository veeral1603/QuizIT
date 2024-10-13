import React from "react";

export const StartScreen = ({ dispatch }) => {
  return (
    <div className="start-screen screen">
      <h1 className="title">QuizIT</h1>

      <button
        className="get-started-btn btn"
        onClick={() => dispatch({ type: "selectScreen" })}
      >
        Get Started
      </button>
    </div>
  );
};
