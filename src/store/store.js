import { create } from "zustand";

const store = (set) => ({
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
  POINTS_PER_QUESTION: 10,
  TIME_PER_QUESTION: 1,

  setStatus: (newStatus) => set((state) => ({ status: newStatus })), //newStatus is a string

  setQuestions: (newQuestions) => set((state) => ({ questions: newQuestions })), //newQuestions is an array

  setOptions: (cat, diff, amou) =>
    set((state) => ({ category: cat, difficulty: diff, amount: amou })),

  setTimeRemaining: () =>
    set((state) => ({ timeRemaining: state.amount * state.TIME_PER_QUESTION })),

  tickTimeRemaining: () =>
    set((state) => ({
      timeRemaining: state.timeRemaining - 1,
      status: state.timeRemaining === 0 ? "finished" : state.status,
    })),

  nextQuestion: () =>
    set((state) => ({
      current: state.current + 1,
      isAnswered: false,
      answer: null,
    })),

  setNewAnswer: (ans, isCorrect) =>
    set((state) => ({
      isAnswered: true,
      points: isCorrect
        ? state.points + state.POINTS_PER_QUESTION
        : state.points,
      answer: ans,
    })),

  newQuiz: () =>
    set((state) => ({
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
    })),
});

const useStore = create(store);

export default useStore;
