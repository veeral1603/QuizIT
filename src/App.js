import "./App.css";
import { StartScreen } from "./Components/StartScreen";
import { SelectScreen } from "./Components/SelectScreen";
import { LoadingScreen } from "./Components/LoadingScreen";
import { ReadyScreen } from "./Components/ReadyScreen";
import { FinishedScreen } from "./Components/FinishedScreen";
import useStore from "./store/store";
import { useShallow } from "zustand/shallow";

function App() {
  // status = start, select, loading, ready, finish

  const [setStatus, setQuestions, setTimeRemaining] = useStore(
    useShallow((state) => [
      state.setStatus,
      state.setQuestions,
      state.setTimeRemaining,
    ])
  );

  const [status] = useStore(useShallow((state) => [state.status]));

  async function fetchData(category, difficulty, amount) {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
    );
    const data = await res.json();

    setStatus("ready");
    setQuestions(data.results);
    setTimeRemaining();
  }

  return (
    <div className="app">
      {status === "start" && <StartScreen />}
      {status === "select" && <SelectScreen fetchData={fetchData} />}
      {status === "loading" && <LoadingScreen />}
      {status === "ready" && <ReadyScreen />}
      {status === "finished" && <FinishedScreen />}
    </div>
  );
}

export default App;
