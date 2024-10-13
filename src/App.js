import { useEffect, useReducer, useState } from "react";
import "./App.css";
import { StartScreen } from "./Components/StartScreen";
import { SelectScreen } from "./Components/SelectScreen";
import { LoadingScreen } from "./Components/LoadingScreen";
import { ReadyScreen } from "./Components/ReadyScreen";
import { FinishedScreen } from "./Components/FinishedScreen";
import { Timer } from "./Components/Timer";

const POINTS_PER_QUESTION = 10;
const TIME_PER_QUESTION = 15; //Seconds

function App() {
  // status = start, select, loading, ready, finish

  const initialState = {
    status: "start",
    category: null,
    difficulty: null,
    amount: null,
    questions: [],
    answer: null,
    current: 0,
    points: 0,
    isAnswered: false,
    timeRemaining: null,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "setCategory":
        return { ...state, category: action.payload };

      case "setDifficulty":
        return { ...state, difficulty: action.payload };

      case "setAmount":
        return { ...state, amount: action.payload };

      case "selectScreen":
        return { ...state, status: "select" };

      case "loadingScreen":
        return { ...state, status: "loading" };

      case "dataFetched":
        return {
          ...state,
          status: "ready",
          questions: action.payload,
          timeRemaining: state.amount * TIME_PER_QUESTION,
        };

      case "newAnswer":
        return {
          ...state,
          isAnswered: true,
          points: action.isCorrect
            ? state.points + POINTS_PER_QUESTION
            : state.points,
          answer: action.payload,
        };

      case "nextQuestion":
        return {
          ...state,
          current: state.current++,
          isAnswered: false,
          answer: null,
        };

      case "finishQuiz":
        return { ...state, status: "finished" };

      case "newQuiz":
        return { ...initialState };

      case "tick":
        return {
          ...state,
          timeRemaining: state.timeRemaining - 1,
          status: state.timeRemaining === 0 ? "finished" : state.status,
        };
      default:
        throw new Error("Invalid Case");
    }
  }

  const [
    {
      status,
      category,
      amount,
      difficulty,
      questions,
      current,
      points,
      isAnswered,
      answer,
      timeRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  async function fetchData() {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
    );
    const data = await res.json();
    console.log(data);
    dispatch({ type: "dataFetched", payload: data.results });
  }

  return (
    <div className="app">
      {status === "start" && <StartScreen dispatch={dispatch} />}
      {status === "select" && (
        <SelectScreen
          dispatch={dispatch}
          difficulty={difficulty}
          amount={amount}
          category={category}
          fetchData={fetchData}
        />
      )}
      {status === "loading" && <LoadingScreen dispatch={dispatch} />}
      {status === "ready" && (
        <ReadyScreen
          question={questions[current]}
          length={questions.length}
          points={points}
          current={current}
          isAnswered={isAnswered}
          dispatch={dispatch}
          POINTS_PER_QUESTION={POINTS_PER_QUESTION}
          answer={answer}
          timeRemaining={timeRemaining}
        />
      )}
      {status === "finished" && (
        <FinishedScreen
          dispatch={dispatch}
          points={points}
          POINTS_PER_QUESTION={POINTS_PER_QUESTION}
          length={questions.length}
        />
      )}
    </div>
  );
}

export default App;
