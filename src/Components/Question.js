import React from "react";
import { decode } from "he";
import { Options } from "./Options";

export const Question = ({ question, dispatch, isAnswered, answer }) => {
  return (
    <div className="question">
      <h2>{decode(question.question)}</h2>

      <Options
        question={question}
        dispatch={dispatch}
        isAnswered={isAnswered}
        answer={answer}
      />
    </div>
  );
};
