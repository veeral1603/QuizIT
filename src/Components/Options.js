import { decode } from "he";
import React, { useEffect, useState } from "react";
import useStore from "../store/store";
import { useShallow } from "zustand/shallow";

export const Options = () => {
  const [questions, current, isAnswered, answer] = useStore(
    useShallow((state) => [
      state.questions,
      state.current,
      state.isAnswered,
      state.answer,
    ])
  );
  const [setNewAnswer] = useStore(useShallow((state) => [state.setNewAnswer]));

  const question = questions[current];

  const { correct_answer } = question;

  const [shuffledOptions, setShuffledOptions] = useState([]);

  function shuffleArray(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  useEffect(() => {
    setShuffledOptions(
      shuffleArray([...question.incorrect_answers, question.correct_answer])
    );
  }, [question]);

  return (
    <div className="options-container">
      {shuffledOptions.map((opt, index) => (
        <button
          className={`option-btn ${index === answer ? "selected" : ""} ${
            isAnswered
              ? index === shuffledOptions.indexOf(correct_answer)
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={opt}
          onClick={() =>
            setNewAnswer(
              index,
              index === shuffledOptions.indexOf(correct_answer)
            )
          }
          disabled={isAnswered}
        >
          {decode(opt)}
        </button>
      ))}
    </div>
  );
};
