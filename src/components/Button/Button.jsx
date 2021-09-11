import s from "../Button/Button.module.css";

export default function Button({ onClick, text }) {
  return (
    <button type="button" className={`${s.Button}`} onClick={onClick}>
      {text}
    </button>
  );
}
