import { useState } from "react";

export default function StateLogin() {
  // Handling form data
  // Approach 1. Use states for email and password, and attach
  // a handler on form
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  // Validation when focus is lost
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  // Validation on every keystroke
  const emailIsInvalid = didEdit.email && !enteredValues.email.includes("@");

  function handleInputChange(identifier, value) {
    setEnteredValues((prev) => ({
      ...prev,
      [identifier]: value,
    }));
    setDidEdit((prev) => ({
      ...prev,
      [identifier]: false,
    }));
  }

  function handleInputBlur(identifier) {
    setDidEdit((prev) => ({
      ...prev,
      [identifier]: true,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(enteredValues);

    setEnteredValues({
      email: "",
      password: "",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onBlur={() => handleInputBlur("email")}
            onChange={(event) => handleInputChange("email", event.target.value)}
            value={enteredValues.email}
          />
          <div className="control-error">
            {emailIsInvalid && <p>Please enter a valid email address.</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
            value={enteredValues.password}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
