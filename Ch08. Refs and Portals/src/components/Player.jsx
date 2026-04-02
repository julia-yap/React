/* Task 1: Let the input name be reflected in the h2 element */

import { useState } from "react";

export default function Player() {

  /* Problem: Whenever there is a key stroke, h2 element gets
  updated in real-time even though change has not been submitted yet.
  There are ways to get around, but there already is enough code. */

  const [enteredName, setEnteredName] = useState(null);
  const [nameSubmitted, setNameSubmitted] = useState(false);

  function handleNameChange(event) {
    setNameSubmitted(false);
    setEnteredName(event.target.value);
  }

  function handleSetName() {
    setNameSubmitted(true);
  }

  return (
    <section id="player">
      <h2>Welcome {nameSubmitted ? enteredName : "unknown entity"}</h2>
      <p>
        <input type="text" onChange={handleNameChange} value={enteredName}/>
        <button onClick={handleSetName}>Set Name</button>
      </p>
    </section>
  );
}
