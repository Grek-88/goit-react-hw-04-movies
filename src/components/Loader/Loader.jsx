import React from "react";
import Loader from "react-loader-spinner";
import s from "../Loader/Loader.module.css";

export default class Spiner extends React.Component {
  render() {
    return (
      <div className={s.loader}>
        <Loader
          type="Bars"
          color="#408cff"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </div>
    );
  }
}
