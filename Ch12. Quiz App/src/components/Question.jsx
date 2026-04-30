import Timer from "../components/Timer.jsx";
import Answers from "./Answers.jsx";
import QUESTIONS from "../questions.js";

import { useState } from "react";

export default function Question({ idx, onSkipAnswer, onAnswerSelect }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  function handleSelect(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: answer === QUESTIONS[idx].answers[0],
      });

      setTimeout(() => {
        onAnswerSelect(answer)
      }, 2000)
    }, 1000);
  }

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answerState.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "selected"
  }

  return (
    <div id="question">
      <Timer timeout={10000} onTimeout={onSkipAnswer} />
      <h2>{QUESTIONS[idx].text}</h2>
      <Answers
        answers={QUESTIONS[idx].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelect}
      />
    </div>
  );
}
