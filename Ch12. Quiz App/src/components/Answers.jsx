import { useRef } from "react";

export default function Answers({ answers, answerState, selectedAnswer, onSelect }) {
  // Need to keep order of shuffeld answers for each question,
  // while answerState changes, so use ref
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = answer === selectedAnswer;
        let cssClass = "";

        if (answerState !== "" && isSelected) {
          cssClass = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button
              className={cssClass}
              onClick={() => onSelect(answer)}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
