import React, { useState } from "react";
import Select from "react-select";
import useStore from "../store/store";
import { useShallow } from "zustand/shallow";

export const SelectScreen = ({ fetchData }) => {
  const categoryOptions = [
    { value: 9, label: "General Knowledge" },
    { value: 10, label: "Books" },
    { value: 11, label: "Films" },
    { value: 12, label: "Music" },
    { value: 13, label: "Musicals & Theatres" },
    { value: 14, label: "Television" },
    { value: 15, label: "Video Games" },
    { value: 16, label: "Board Games" },
    { value: 17, label: "Science & Nature" },
    { value: 18, label: "Science: Computers" },
    { value: 19, label: "Science: Mathematics" },
    { value: 20, label: "Mythology" },
    { value: 21, label: "Sports" },
    { value: 22, label: "Geography" },
    { value: 23, label: "History" },
    { value: 24, label: "Politics" },
    { value: 25, label: "Art" },
    { value: 26, label: "Celebrities" },
    { value: 27, label: "Animals" },
    { value: 28, label: "Vehicles" },
    { value: 29, label: "Comics" },
    { value: 30, label: "Science: Gadgets" },
    { value: 31, label: "Japanese Anime & Manga" },
    { value: 32, label: "Cartoon & Animations" },
  ];

  const difficultyOptions = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

  const amountOptions = [
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
    { value: 10, label: "10" },
    { value: 11, label: "11" },
    { value: 12, label: "12" },
    { value: 13, label: "13" },
    { value: 14, label: "14" },
    { value: 15, label: "15" },
    { value: 16, label: "16" },
    { value: 17, label: "17" },
    { value: 18, label: "18" },
    { value: 19, label: "19" },
    { value: 20, label: "20" },
  ];

  const [setStatus, setOptions] = useStore(
    useShallow((state) => [state.setStatus, state.setOptions])
  );

  const [difficulty, setDifficulty] = useState(null);
  const [category, setCategory] = useState(null);
  const [amount, setAmount] = useState(null);

  const styles = {
    menuList: (base) => ({
      ...base,

      "::-webkit-scrollbar": {
        width: "5px",
        height: "0px",
      },
      "::-webkit-scrollbar-track": {
        background: "#f1f1f1",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#888",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
    }),
  };

  function onGenerate() {
    setStatus("loading");
    fetchData(category, difficulty, amount);
    setOptions(category, difficulty, amount);
  }

  return (
    <div className="select-screen screen">
      <div className="heading-text-container">
        <h2>Choose Quiz Options</h2>
      </div>

      <div className="input-container">
        <Select
          options={categoryOptions}
          className="select"
          placeholder="Select Category"
          styles={styles}
          onChange={(e) => setCategory(e.value)}
        />
        <Select
          options={difficultyOptions}
          className="select"
          placeholder="Select Difficulty"
          styles={styles}
          onChange={(e) => setDifficulty(e.value)}
        />
        <Select
          options={amountOptions}
          className="select"
          placeholder="Select Amount"
          styles={styles}
          onChange={(e) => setAmount(e.value)}
        />
      </div>

      <button
        className="btn generate-quiz-btn"
        onClick={() =>
          category && amount && difficulty
            ? onGenerate()
            : alert("Choose all the options first.")
        }
      >
        Generate Quiz
      </button>
    </div>
  );
};
