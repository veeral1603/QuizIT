import React from "react";
import { DoughnutChart } from "./DoughnutChart";
import useStore from "../store/store";
import { useShallow } from "zustand/shallow";

export const FinishedScreen = () => {
  const [points, POINTS_PER_QUESTION, questions, newQuiz] = useStore(
    useShallow((state) => [
      state.points,
      state.POINTS_PER_QUESTION,
      state.questions,
      state.newQuiz,
    ])
  );

  const length = questions.length;

  return (
    <div className="finished-screen">
      <h1 className="title">QuizIT Result</h1>

      <div className="chart-container">
        <DoughnutChart />
        <h2 className="points-summary">
          Points: {points} / {POINTS_PER_QUESTION * length}
        </h2>
      </div>

      <div className="new-quiz-btn-container">
        <button className="btn new-quiz-btn" onClick={() => newQuiz()}>
          Start New Quiz
        </button>
      </div>
    </div>
  );
};
