/* Task 1: Let the input name be reflected in the h2 element */

import { useRef, useState } from "react";

export default function Player() {

  const playerName = useRef(null);
  const [enteredName, setEnteredName] = useState(null);
  
  /* 
  Why do we need state even at this point and not modify the name directly through a ref?
      - In the first render cycle, the connection to the input ref is not established yet,
        thus accessing playerName.current.value results in an error.
      - Change in the ref value does not cause React to rerender 
          => Change in value isn't reflected immediately
  */

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
