import React, { useEffect } from "react";
import useStore from "../store/store";
import { useShallow } from "zustand/shallow";

export const Timer = () => {
  const [timeRemaining, tickTimeRemaining] = useStore(
    useShallow((state) => [state.timeRemaining, state.tickTimeRemaining])
  );

  const mins = Math.floor(timeRemaining / 60);
  const secs = timeRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        tickTimeRemaining();
      }, 1000);

      return () => clearInterval(id);
    },
    [tickTimeRemaining]
  );

  return (
    <div className="timer">
      <p>{`${mins < 10 ? "0" : ""}${mins} : ${secs < 10 ? "0" : ""}${secs}`}</p>
    </div>
  );
};
