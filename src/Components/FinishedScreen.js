import React from "react";
import { DoughnutChart } from "./DoughnutChart";

export const FinishedScreen = ({
  dispatch,
  points,
  POINTS_PER_QUESTION,
  length,
}) => {
  return (
    <div className="finished-screen">
      <h1 className="title">QuizIT Result</h1>

      <div className="chart-container">
        <DoughnutChart
          correct={points / POINTS_PER_QUESTION}
          incorrect={length - points / POINTS_PER_QUESTION}
        />
        <h2 className="points-summary">
          Points: {points} / {POINTS_PER_QUESTION * length}
        </h2>
      </div>

      <div className="new-quiz-btn-container">
        <button
          className="btn new-quiz-btn"
          onClick={() => dispatch({ type: "newQuiz" })}
        >
          Start New Quiz
        </button>
      </div>
    </div>
  );
};
