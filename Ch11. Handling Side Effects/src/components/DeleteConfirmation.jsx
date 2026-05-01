import { useEffect } from "react";
import ProgressBar from "./ProgressBar";

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {

  useEffect(() => {
    // Making the Modal close automatically with confirmation status
    // after 3 seconds
    const timer = setTimeout(() => {
      onConfirm();
    }, 3000);
    // Problem 1: Modal, hence DeleteConfirmation, is always part of the DOM.
    //    Timer gets set with DOM creation and timeouts 3 seconds after,
    //    even when Modal is not shown.
    // Problem 2: When Modal is closed without confirmations status,
    //    timer does not get cleared, and onConfirm runs
    // SOLUTION: useEffect

    // Return a cleanup function which will run right before useEffect gets
    // exected again, OR, right before the component dismounts

    return () => {
      clearTimeout(timer);
    };

    // onConfirm is a function. Function gets recreated everytime component is
    // reexecuted, which may lead to infinite loops. In our case, setModalIsOpen
    // prevents it, but we need to keep in mind that passing function as dependencies
    // is not safe.
    // SOLUTION: useCallback wrapper around handleRemovePlace in the App component
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar timer={TIMER}/>
    </div>
  );
}
