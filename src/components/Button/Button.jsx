import s from "../Button/Button.module.css";

export default function Button({ onClick, text, classMode }) {
  return (
    <button
      type="button"
      className={`${s.Button}  ${classMode}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
