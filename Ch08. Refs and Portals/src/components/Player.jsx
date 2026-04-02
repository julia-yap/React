/* Task 1: Let the input name be reflected in the h2 element */

import { useRef, useState } from "react";

export default function Player() {

  const playerName = useRef(null);
  const [enteredName, setEnteredName] = useState(null);

  function handleSetName() {
    setEnteredName(playerName.current.value)
    playerName.current.value = "" // Not declarative 
  }

  return (
    <section id="player">
      <h2>Welcome { enteredName ?? "unknown entity"}</h2>
      <p>
        {/* React sets the current property of the ref object to that DOM node (ie., Now methods of <input> can be accessed) */}
        <input type="text" ref={playerName}/>
        <button onClick={handleSetName}>Set Name</button>
      </p>
    </section>
  );
}
