import { Switch, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Spiner from "./components/Loader/Loader";

const MoviesPage = lazy(() =>
  import(
    "./components/MoviesPage/MoviesPage" /* webpackChunkName: "MoviesPage" */
  )
);
const HomePage = lazy(() =>
  import("./components/HomePage/HomePage" /* webpackChunkName: "HomePage" */)
);
const MovieDetailsPage = lazy(() =>
  import(
    "./components/MovieDetailsPage/MovieDetailsPage" /* webpackChunkName: "MovieDetailsPage" */
  )
);
const NotFoundPage = lazy(() =>
  import(
    "./components/NotFoundPage/NotFoundPage" /* webpackChunkName: "NotFoundPage" */
  )
);

export default function App() {
  return (
    <>
      <div className="App">
        <Header />
        <Suspense fallback={<Spiner />}>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/movies" exact component={MoviesPage} />
            <Route path="/movies/:movieId" component={MovieDetailsPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </div>
      <div className="Footer">
        <Footer />
      </div>
    </>
  );
}
