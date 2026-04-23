import { forwardRef, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ open, children }) {
  const dialog = useRef();

  useEffect(() => {
    // Runs into an error in the first render cycle,
    // because dialog reference has not been established yet.
    // SOLUTION: useEffect
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);
  // Dependencies: states or props whose values when changed makes
  // the code to execute again

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {open ? children : null}
    </dialog>,
    document.getElementById("modal"),
  );
}
