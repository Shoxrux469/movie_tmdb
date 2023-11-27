import {
  header,
  reload_pop_movies,
  reload_now_playing,
  reload_pop_stars,
  reload_upcoming,
  reload_top_rated,
  reload_pop_stars_list,
} from "./modules/ui.js";
import { getData } from "./modules/https.js";
let iframe = document.querySelector("iframe");
let pop_movies_box = document.querySelector(".pop_movies_box");
let swiper_wrapper = document.querySelector(".swiper-wrapper");
let pop_stars_content = document.querySelector(".pop_stars_content");
let pop_stars_list = document.querySelector(".pop_stars_list");
let upcoming_box = document.querySelector(".upcoming_content");
let top_rated_content = document.querySelector(".top_rated_content");

header();

export function setTrailer(video) {
  iframe.src = "https://www.youtube.com/watch?v=" + video.key;
}

getData("/person/popular").then((res) => {
  reload_pop_stars(res.data.results.slice(0, 2), pop_stars_content),
    reload_pop_stars_list(res.data.results, pop_stars_list);
});

getData("/movie/upcoming").then((res) =>
  reload_upcoming(res.data.results, upcoming_box)
);
getData("/movie/top_rated").then((res) =>
  reload_top_rated(res.data.results.slice(0, 5), top_rated_content)
);

Promise.all([
  getData("/movie/now_playing?page=2&language=ru"),
  getData("/movie/popular"),
  getData("/genre/movie/list"),
]).then(([movies_now_playing, movies_popular, genres]) => {
  reload_now_playing(
    movies_now_playing.data.results.slice(0, 8),
    pop_movies_box,
    genres.data.genres
  );
  reload_pop_movies(
    movies_popular.data.results,
    swiper_wrapper,
    genres.data.genres
  );
});
