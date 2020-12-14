export function getMoviesByText(searchedText, page = 0) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=APIKEY&query=${searchedText}&page=${page}`;
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.log("Error during calling API. Details : ", error));
}

export function getImageFromApi(name) {
  return "https://image.tmdb.org/t/p/w300" + name;
}
