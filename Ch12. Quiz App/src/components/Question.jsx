import Timer from "../components/Timer.jsx";
import Answers from "./Answers.jsx";

export default function Question({
  onSkipAnswer,
  questionText,
  answers,
  selectedAnswer,
  answerState,
  onAnswerSelect,
}) {
  return (
    <div id="question">
      <Timer timeout={10000} onTimeout={onSkipAnswer} />
      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelect={onAnswerSelect}
      />
    </div>
  );
}
