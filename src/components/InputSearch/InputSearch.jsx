import s from "../InputSearch/InputSearch.module.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function InputSearch({ onSubmit }) {
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (!e.target[0].value.trim()) {
      toast.error("😲 Enter query...!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      e.target[0].value = "";
      return;
    }
    // console.log(e.target[0].value);
    onSubmit(e.target[0].value);
    e.target[0].value = "";
  };

  return (
    <div className={s.InputSearch}>
      <form className={s.SearchForm} onSubmit={handleSubmitSearch}>
        <input
          className={s.SearchForm_input}
          type="text"
          name="query"
          autoComplete="off"
          placeholder="Search movies..."
          // required=""
          // value=""
        />
        <button type="submit"></button>
      </form>
      <ToastContainer />
    </div>
  );
}
