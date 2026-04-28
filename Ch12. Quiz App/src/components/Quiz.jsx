import { useState } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png"

export default function Quiz({}) {
  const [userAnswers, setUserAnswers] = useState([]);
  const currentQuestionIdx = userAnswers.length;

  const quizIsComplete = currentQuestionIdx === QUESTIONS.length;

  function handleSelectAnswer(answer) {
    setUserAnswers((prevState) => {
      return [...prevState, answer];
    });
  }

  if (quizIsComplete) {
    return <div id="summary">
        <img src={quizCompleteImg} alt="Quiz complete"/>
        <h2>Quiz Completed!</h2>
    </div>
  }

  const shuffledAnswers = [...QUESTIONS[currentQuestionIdx].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[currentQuestionIdx].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            return (
              <li key={answer} className="answer">
                <button onClick={() => handleSelectAnswer(answer)}>
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
