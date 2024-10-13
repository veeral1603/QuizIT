import React, { useEffect } from "react";

export const Timer = ({ dispatch, timeRemaining }) => {
  const mins = Math.floor(timeRemaining / 60);
  const secs = timeRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      <p>{`${mins < 10 ? "0" : ""}${mins} : ${secs < 10 ? "0" : ""}${secs}`}</p>
    </div>
  );
};
