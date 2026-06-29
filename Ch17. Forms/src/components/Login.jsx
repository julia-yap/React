import { useRef } from "react";

export default function Login() {

  // Handling form data
  // Approach 1. Use states for email and password, and attach
  // a handler on form
  // const [enteredValues, setEnteredValues] = useState({
  //   email: "",
  //   password: "",
  // });
  // function handleInputChange(identifier, value) {
  //   setEnteredValues((prev) => ({
  //     ...prev,
  //     [identifier]: value,
  //   }));

  // Approach 2. Use refs. (Downside: not recommended to use)
  const email = useRef();
  const password = useRef();
  
  function handleSubmit(event) {
    event.preventDefault();

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    console.log(enteredEmail, enteredPassword);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={email}/>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" ref={password}/>
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
