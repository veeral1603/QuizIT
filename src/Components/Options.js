import { decode } from "he";
import React, { useEffect, useState } from "react";

export const Options = ({ question, dispatch, isAnswered, answer }) => {
  const { incorrect_answers, correct_answer } = question;
  const Alloptions = [...incorrect_answers, correct_answer];

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
    setShuffledOptions(shuffleArray(Alloptions));
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
            dispatch({
              type: "newAnswer",
              isCorrect: index === shuffledOptions.indexOf(correct_answer),
              payload: index,
            })
          }
          disabled={isAnswered}
        >
          {decode(opt)}
        </button>
      ))}
    </div>
  );
};
