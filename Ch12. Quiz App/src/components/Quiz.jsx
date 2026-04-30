import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question.jsx";

export default function Quiz({}) {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const currentQuestionIdx =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  const quizIsComplete = currentQuestionIdx === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(answer) {
      setAnswerState("selected");

      setTimeout(() => {
        if (answer === QUESTIONS[currentQuestionIdx][0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);

      setUserAnswers((prevState) => {
        return [...prevState, answer];
      });
    },
    [currentQuestionIdx],
  );

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Quiz complete" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={currentQuestionIdx}
        questionText={QUESTIONS[currentQuestionIdx].text}
        answers={QUESTIONS[currentQuestionIdx].answers}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        answerState={answerState}
        onSkipAnswer={handleSkipAnswer}
        onAnswerSelect={handleSelectAnswer}
      />
    </div>
  );
}
