import React from "react";
import { decode } from "he";
import { Options } from "./Options";
import useStore from "../store/store";
import { useShallow } from "zustand/shallow";

export const Question = () => {
  const [questions, current] = useStore(
    useShallow((state) => [state.questions, state.current])
  );

  const question = questions[current];
  return (
    <div className="question">
      <h2>{decode(question.question)}</h2>

      <Options />
    </div>
  );
};
