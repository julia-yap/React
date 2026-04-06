import { useImperativeHandle, useRef } from "react";

export default function ResultModal({
  ref,
  targetTime,
  remainingTime,
  onReset,
}) {
  const dialog = useRef();

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  // Detaching TimerChallenge from ResultModal (i.e., if ResultModal
  // was to return a div instead of dialog, we just need to adjust the
  // code inside open function.)
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  // The built-in backdrop accompanied by dialog needs to be opened
  // programmatically. A ref comes handy in this scenario.
  return (
    <dialog className="result-modal" ref={dialog}>
      {/* An overlay */}
      {userLost && <h2> You lost!</h2>}
      {!userLost && <h2>Your score: {score} </h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemainingTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        {/* A button inside a dialog form will always close the dialog */}
        <button>Close</button>
      </form>
    </dialog>
  );
}
