import { useState } from "react";
import useWords from "./useWords";
import useCountdownTimer from "./useCountdownTimer";
import useTyping from "./useTyping";

export type State = "start" | "run" | "finish";

const numberOfWords = 15;
const countdownSeconds = 30;

const useEngine = () => {
  const [state, setState] = useState<State>("start");
  const { words, updateWords } = useWords(numberOfWords);
  const { timeLeft, startCountdown, resetCountdown } =
    useCountdownTimer(countdownSeconds);
  const { typed, cursor, totalTyped, clearTyped, resetTotalTyped } = useTyping(
    state !== "finish"
  );

  return {
    state,
    words,
    timeLeft,
    typed,
    cursor,
    totalTyped,
    updateWords,
    startCountdown,
    resetCountdown,
    clearTyped,
    resetTotalTyped,
  };
};

export default useEngine;
