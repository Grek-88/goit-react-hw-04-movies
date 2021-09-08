import s from "../InputSearch/InputSearch.module.css";

export default function InputSearch() {
  return (
    <div className={s.InputSearch}>
      <form className={s.SearchForm}>
        <input
          className={s.SearchForm_input}
          type="text"
          name="query"
          autocomplete="off"
          placeholder="Search movies..."
          // required=""
          // value=""
        ></input>
        <button type="submit"></button>
      </form>
    </div>
  );
}
