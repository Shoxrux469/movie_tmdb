import { getData } from "../../modules/https";
import {
  reload_movies,
  reload_films,
  reload_posters,
} from "../../modules/ui";

let id = location.search.split("=").at(-1);
let best_movies_content = document.querySelector(".best_movies_content");
let photo_content = document.querySelector(".photo_content");
let films_content = document.querySelector(".films_content");
let info_btn = document.querySelector(".info_btn");
let bio_btn = document.querySelector(".bio_btn");
let biography_pi = document.querySelector(".biography_pi");
let information_pi = document.querySelector(".information_pi");

let liked_movies = JSON.parse(localStorage.getItem("liked_movies")) || [];
console.log(liked_movies);

info_btn.onclick = () => {
  bio_btn.classList.remove('clicked')
  info_btn.classList.add('clicked')
  biography_pi.classList.add('hide')
  information_pi.classList.remove('hide')
}
bio_btn.onclick = () => {
  info_btn.classList.remove('clicked')
  bio_btn.classList.add('clicked')
  biography_pi.classList.remove('hide')
  information_pi.classList.add('hide')
}

getData(`/person/${id}`).then((res) => {

    console.log(res.data);
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
  biography_pi.innerHTML = res.data.biography
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
