import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz({}) {
  const [userAnswers, setUserAnswers] = useState([]);
  const currentQuestionIdx = userAnswers.length;

  const quizIsComplete = currentQuestionIdx === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(answer) {
    setUserAnswers((prevState) => {
      return [...prevState, answer];
    });
  }, []);

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id="quiz">
      <Question
        key={currentQuestionIdx}
        idx={currentQuestionIdx}
        onSkipAnswer={handleSkipAnswer}
        onAnswerSelect={handleSelectAnswer}
      />
    </div>
  );
}
