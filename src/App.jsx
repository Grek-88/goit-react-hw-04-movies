import { Switch } from "react-router";
import { Route } from "react-router-dom";

import Header from "./components/Header/Header";
import MoviesPage from "./components/MoviesPage/MoviesPage";
import HomePage from "./components/HomePage/HomePage";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/movies" component={MoviesPage} />
      </Switch>
    </div>
  );
}
