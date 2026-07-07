export default function Button({ children, textOnly, className, ...props }) {
  let cssStyling = textOnly ? "text-button" : "button";
  cssStyling += " " + className;

  return (
    <button className={cssStyling} {...props}>
      {children}
    </button>
  );
}
