import { header, reload_pop_movies, reload_now_playing, reload_pop_stars } from "./modules/ui.js";
import { getData } from "./modules/https.js";
let iframe = document.querySelector("iframe");
let pop_movies_box = document.querySelector(".pop_movies_box");
let swiper_wrapper = document.querySelector(".swiper-wrapper");
let pop_stars_content = document.querySelector(".pop_stars_content");


header();

export function setTrailer(video) {
  iframe.src = "https://www.youtube.com/watch?v=" + video.key;
}

getData('/person/popular')
  .then(res => {
    reload_pop_stars(res.data.results, pop_stars_content)
  })

Promise.all([
  getData("/movie/now_playing?page=2&language=ru"),
  getData("/movie/popular"),
  getData("/genre/movie/list"),
]).then(([movies_now_playing,movies_popular,  genres]) => {
  reload_now_playing(movies_now_playing.data.results, pop_movies_box, genres.data.genres);
  reload_pop_movies(movies_popular.data.results, swiper_wrapper, genres.data.genres);
});