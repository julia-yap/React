import Timer from "../components/Timer.jsx";
import Answers from "./Answers.jsx";
import QUESTIONS from "../questions.js";

import { useState } from "react";

export default function Question({ idx, onSkipAnswer, onAnswerSelect }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  } 

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

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
      <Timer key={timer} timeout={timer} onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null} mode={answerState} />
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
