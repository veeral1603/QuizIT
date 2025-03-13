import React from "react";
import { Question } from "./Question";
import { Timer } from "./Timer";
import useStore from "../store/store";
import { useShallow } from "zustand/shallow";

export const ReadyScreen = () => {
  const [questions, current, points, isAnswered, POINTS_PER_QUESTION] =
    useStore(
      useShallow((state) => [
        state.questions,
        state.current,
        state.points,
        state.isAnswered,
        state.POINTS_PER_QUESTION,
      ])
    );

  const [setStatus, nextQuestion] = useStore(
    useShallow((state) => [state.setStatus, state.nextQuestion])
  );

  const length = questions.length;

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

      <Question />

      <div className="next-btn-container">
        <Timer />
        {isAnswered ? (
          current < length - 1 ? (
            <button className="btn next-btn" onClick={() => nextQuestion()}>
              Next
            </button>
          ) : (
            <button
              className="btn next-btn"
              onClick={() => setStatus("finished")}
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
