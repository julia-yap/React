import { useState } from "react";

export default function Login() {
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(event) {
    // Prevents the default browser behaviour
    event.preventDefault();
  }

  function handleInputChange(identifier, value) {
    setEnteredValues((prev) => ({
      ...prev,
      [identifier]: value,
    }));
  }

  // By default, the browser sends a HTTP request with form data
  // whenever a button inside the form is clicked. Thereafter, the
  // whole component will get reloaded. To prevent this, set type="button"
  // on the button element, or set onSubmit on the form element instead
  // of onClick on the button.

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
            onChange={(event) => {
              handleInputChange("email", event.target.value);
            }}
            value={enteredValues.email}
          />
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
        <button type="button" className="button">
          Login
        </button>
      </p>
    </form>
  );
}
