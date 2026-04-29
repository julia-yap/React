import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png"
import Timer from "../../../Ch11. Handling Side Effects/src/components/Timer.jsx";

export default function Quiz({}) {
  const [userAnswers, setUserAnswers] = useState([]);
  const currentQuestionIdx = userAnswers.length;

  const quizIsComplete = currentQuestionIdx === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(answer) {
    setUserAnswers((prevState) => {
      return [...prevState, answer];
    });
  }, []);

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
        <Timer key={currentQuestionIdx} timeout={10000} onTimeout={()=>{handleSelectAnswer(null)}}/>
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
