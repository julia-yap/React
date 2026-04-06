import { useImperativeHandle, useRef } from "react";

export default function ResultModal({ ref, result, targetTime }) {
  const dialog = useRef();

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
      <h2> You {result}!</h2>
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>X seconds left.</strong>
      </p>
      <form method="dialog">
        {/* A button inside a dialog form will always close the dialog */}
        <button>Close</button>
      </form>
    </dialog>
  );
}
