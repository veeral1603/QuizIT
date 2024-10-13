import React from "react";
import { Question } from "./Question";
import { Timer } from "./Timer";

export const ReadyScreen = ({
  question,
  length,
  points,
  current,
  isAnswered,
  dispatch,
  POINTS_PER_QUESTION,
  answer,
  timeRemaining,
}) => {
  return (
    <div className="ready-screen">
      <header>
        <h1 className="title">QuizIT</h1>
        <div className="questions-summary summary">
          <p>
            Question:{" "}
            <strong>
              {current + 1} / {length}
            </strong>
          </p>
        </div>

        <div className="points-container summary">
          <p>
            Points:{" "}
            <strong>
              {points} / {POINTS_PER_QUESTION * length}
            </strong>
          </p>
        </div>
      </header>

      <div className="progress-container">
        <progress value={current + 1} max={length}></progress>
      </div>

      <Question
        question={question}
        dispatch={dispatch}
        isAnswered={isAnswered}
        answer={answer}
      />

      <div className="next-btn-container">
        <Timer dispatch={dispatch} timeRemaining={timeRemaining} />
        {isAnswered ? (
          current < length - 1 ? (
            <button
              className="btn next-btn"
              onClick={() => dispatch({ type: "nextQuestion" })}
            >
              Next
            </button>
          ) : (
            <button
              className="btn next-btn"
              onClick={() => dispatch({ type: "finishQuiz" })}
            >
              Finish
            </button>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
