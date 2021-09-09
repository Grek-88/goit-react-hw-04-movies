import { Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/Header/Header";
import MoviesPage from "./components/MoviesPage/MoviesPage";
import HomePage from "./components/HomePage/HomePage";
import Footer from "./components/Footer/Footer";
import MovieDetailsPage from "./components/MovieDetailsPage/MovieDetailsPage";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/movies" exact component={MoviesPage} />
        <Route path="/movies/:movieId" component={MovieDetailsPage} />
        {/* <Redirect to="/" /> */}
      </Switch>
      <Footer />
    </div>
  );
}
