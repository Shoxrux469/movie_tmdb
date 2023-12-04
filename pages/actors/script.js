import { getData } from "../../modules/https";
import {
  header,
  searcher,
  footer,
  reload_movies,
  reload_films,
  reload_posters,
} from "../../modules/ui";

let id = location.search.split("=").at(-1);
let best_movies_content = document.querySelector(".best_movies_content");
let photo_content = document.querySelector(".photo_content");
let films_content = document.querySelector(".films_content");
getData(`/person/${id}`).then((res) => {
  //   console.log(res.data);
  for (let item of document.querySelectorAll(".origin_name")) {
    item.innerHTML = res.data.name;
  }
  document.querySelector(".actor_img").src =
    "https://image.tmdb.org/t/p/original" + res.data.profile_path;
  document.querySelector(".career").innerHTML = res.data.known_for_department;

  if (res.data.gender === 0) {
    document.querySelector(".gender").innerHTML = "famale";
  } else {
    document.querySelector(".gender").innerHTML = "male";
  }
  document.querySelector(".birthday").innerHTML = res.data.birthday;
  document.querySelector(".place_of_birth").innerHTML = res.data.place_of_birth;
  document.querySelector(".rating").innerHTML = res.data.popularity;
});

Promise.all([
  getData(`/person/${id}/movie_credits`),
  getData("/genre/movie/list"),
]).then(([movies, genres]) => {
  console.log(movies.data.cast);
  reload_movies(movies.data.cast, best_movies_content, genres.data.genres);
  reload_films(
    movies.data.cast.slice(0, 8),
    films_content,
    genres.data.genres
  );
});

getData(`/person/${id}/tagged_images`).then((res) => {
  // console.log(res.data.results);
  reload_posters(res.data.results.slice(0, 6), photo_content);
});
