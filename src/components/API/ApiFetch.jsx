export default function ApiFetch(query = 0, page = 1) {
  const API_KEY = "b935b76f7270f1257638a990b1cb347c";

  const result = fetch(
    query
      ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&query=${query}&include_adult=false`
      : `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${page}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      new Error("По такому запросу фильмов не найдено. Введите другой запрос.")
    );
  });
  return result;
}
