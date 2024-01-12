import { useState, useCallback, useEffect } from "react";
import useWords from "./useWords";
import useCountdownTimer from "./useCountdownTimer";
import useTyping from "./useTyping";
import { countErrors } from "../utils/helpers";

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

  const [errors, setErrors] = useState(0);

  const isStarting = state === "start" && cursor > 0;
  const areWordsFinished = cursor === words.length;

  const sumErrors = useCallback(() => {
    const wordsReached = words.substring(0, cursor);
    setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached));
  }, [typed, words, cursor]);

  useEffect(() => {
    if (isStarting) {
      setState("run");
      startCountdown();
    }
  }, [isStarting, startCountdown, cursor]);

  useEffect(() => {
    if (!timeLeft) {
      console.log("time is up");
      setState("finish");
      sumErrors();
    }
  }, [timeLeft, sumErrors]);

  useEffect(() => {
    if (areWordsFinished) {
      console.log("words are finished");
      sumErrors();
      updateWords();
      clearTyped();
    }
  }, [
    cursor,
    words,
    clearTyped,
    typed,
    updateWords,
    areWordsFinished,
    sumErrors,
  ]);

  const restart = useCallback(() => {
    console.log("restarting");
    resetCountdown();
    resetTotalTyped();
    setState("start");
    setErrors(0);
    updateWords();
    clearTyped();
  }, [clearTyped, resetCountdown, resetTotalTyped, updateWords]);

  return {
    state,
    words,
    timeLeft,
    typed,
    errors,
    totalTyped,
    restart,
  };
};

export default useEngine;
