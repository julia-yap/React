import { useRef } from "react";
import Input from "./Input.jsx";
import Modal from "./Modal.jsx";

export default function NewProject({ onSaveProject }) {
  const modal = useRef();

  const title = useRef(null);
  const desc = useRef(null);
  const due = useRef(null);

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDesc = desc.current.value;
    const enteredDue = due.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredDesc.trim() === "" ||
      enteredDue.trim() === ""
    ) {
      modal.current.open();
      return;
    }

    onSaveProject({ title: enteredTitle, desc: enteredDesc, due: enteredDue });
  }

  return (
    <>
      <Modal ref={modal} buttonCaption="Okay">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">Oops ... Looks like you forgot to enter a value.</p>
        <p className="text-stone-600 mb-4">Please make sure you enter a value for all input fields. </p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button className="text-stone-800 hover:text-stone-950">
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input ref={title} label="Title" type="text" />
          <Input ref={desc} label="Description" textarea />
          <Input ref={due} label="Due Date" type="date" />
        </div>
      </div>
    </>
  );
}
