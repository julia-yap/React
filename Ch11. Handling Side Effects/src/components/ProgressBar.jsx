import { useState, useEffect } from "react";

// Outsourcing progress bar from DeleteConfirmation
// since state update will reexecute useEffect every 10ms,
// compare onConfirm every 10ms, and reevaluate the entire
// JSX code 10ms. 

export default function ProgressBar({ timer }) {
  const [remainingTime, setRemainingTime] = useState(timer);
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return <progress value={remainingTime} max={timer} />;
}
