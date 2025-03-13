import React from "react";
import useStore from "../store/store";

export const StartScreen = () => {
  const setStatus = useStore((state) => state.setStatus);

  return (
    <div className="start-screen screen">
      <h1 className="title">QuizIT</h1>

      <button
        className="get-started-btn btn"
        onClick={() => setStatus("select")}
      >
        Get Started
      </button>
    </div>
  );
};
