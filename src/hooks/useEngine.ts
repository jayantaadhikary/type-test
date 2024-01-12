import { useState } from "react";
import useWords from "./useWords";

export type State = "start" | "run" | "finish";

const numberOfWords = 15;

const useEngine = () => {
  const [state, setState] = useState<State>("start");
  const { words, updateWords } = useWords(numberOfWords);

  return { state, words };
};

export default useEngine;
