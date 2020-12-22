export function getMoviesByText(searchedText, page = 0) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_TOKEN}&query=${searchedText}&page=${page}`;
  return fetch(url)
    .then(response => response.json())
    .catch(error =>
      console.log("Error during calling API. Deta ils : ", error)
    );
}

export function getImageFromApi(name) {
  return "https://image.tmdb.org/t/p/w300" + name;
}

export function getFilmDetailFromApi(id) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_TOKEN}&language=fr`
  )
    .then(response => response.json())
    .catch(error => console.error(error));
}
