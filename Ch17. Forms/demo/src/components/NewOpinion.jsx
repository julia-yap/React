import { useActionState, use } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);

  async function newOpinionAction(prevState, formData) {
    const userName = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");

    let errors = [];

    if (!userName.trim()) {
      errors.push("Please provide your name.");
    }

    if (title.trim() < 5) {
      errors.push("Title must be at least five characters long.");
    }

    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push("Opinion must be between 10 and 300 characters long.");
    }

    if (errors.length > 0) {
      return { errors, opinion: { userName, title, body } };
    }

    await addOpinion({ userName, title, body });
    // There's a delay in submitting the http request and
    // updating the UI. The UI whilst delay can be managed with
    // useFormStatus, which needs to be used in some component
    // that is inside the form.
    return { errors: null };
  }

  const [formState, formAction] = useActionState(newOpinionAction, {
    errors: null,
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.opinion?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.opinion?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.opinion?.body}
          ></textarea>
        </p>
        {formState.errors && (
          <ul>
            {formState.errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        <Submit />
      </form>
    </div>
  );
}
