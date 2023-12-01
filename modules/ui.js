import { setTrailer } from "../main";
import { getData } from "./https";

let iframe = document.querySelector("iframe");

export function header() {
  let header = document.querySelector("header");

  header.innerHTML = `
		<div class="header">
		<div class="left">
		<div class="logo">
  <img src="./public/cinema_logo.svg" alt="">
  <p> <span>Kino</span>area</p>
  </div>
  <div class="networks">
  <a href="#"><img src="./public/networks_immg.svg" alt=""></a>
  </div>
  </div>
  <nav class="center">
  <a href="#">Афиша</a>
  <a href="#">Медиа</a>
  <a href="#">Фильмы</a>
  <a href="#">Актёры</a>
  <a href="#">Новости</a>
  <a href="#">Подборки</a>
  <a href="#">Категории</a>
  </nav>
  <div class="right">
  <button class="searcher_btn"><img src="./public/searcher_btn.svg" alt=""></button>
  <button class="sign_in">Войти</button>
  </div>
  </div>
  `;
}

export function reload_movies(arr, place, genres) {
  place.innerHTML = "";

  for (let item of arr) {
    let img_box = document.createElement("div");
    let img_bg = document.createElement("div");
    let img_bg_btn = document.createElement("a");
    let img = document.createElement("img");
    let title = document.createElement("p");
    let genre_span = document.createElement("span");
    let img_rating = document.createElement("div");
    let genreTitles = [];

    img_box.classList.add("movies_imgs");
    img_bg.classList.add("movies_bg");
    img_rating.classList.add("movies_rating");
    img_bg_btn.classList.add("movies_bg_btn");
    title.classList.add("movies_title");
    genre_span.classList.add("movies_genre");

    img_bg.onmouseover = () => {
      img_bg_btn.classList.add("show");
    };
    img_bg.onmouseout = () => {
      img_bg_btn.classList.remove("show");
    };
    img_bg.onclick = () => {
      getData(`/movie/${item.id}/videos`).then((res) => {
        setTrailer(res.data.results[0]);
      });
      img_bg_btn.onclick = () => {
		location.assign(`http://localhost:5173/pages/movies/?id=` + item.id)
	  };

      iframe.scrollIntoView({
        behavior: "smooth",
      });
    };
    for (let id of item.genre_ids) {
      for (let genre of genres) {
        if (id == genre.id) {
          genreTitles.push(genre.name);
        }
      }
    }

    img_bg_btn.innerHTML = "Карточка фильма";
    img.src = "https://image.tmdb.org/t/p/original" + item.poster_path;
    title.innerHTML = item.original_title;
    img_rating.innerHTML = item.vote_average.toFixed(2);
    genre_span.innerHTML = genreTitles.join(", ");

    place.append(img_box);
    img_box.append(img_bg, img, title, genre_span);
    img_bg.append(img_bg_btn, img_rating);
  }
}

export function reload_pop_stars(arr, place) {
  place.innerHTML = "";
  for (let item of arr) {
    let img_box = document.createElement("div");
    let img = document.createElement("img");
    let img_title = document.createElement("h2");
    let origin_title = document.createElement("p");
    let known_for = document.createElement("span");
    let div = document.createElement("div");

    img_box.classList.add("pop_stars_box");
    img.classList.add("pop_stars_img");
    div.classList.add("pop_stars_div");

    img.src = "https://image.tmdb.org/t/p/original" + item.profile_path;
    img_title.innerHTML = item.name;
    origin_title.innerHTML = item.original_name;
    div.append(img_title, origin_title, known_for);
    img_box.append(img, div);
    place.append(img_box);

    for (let film of item.known_for) {
      known_for.innerHTML += film.title + ", ";
    }
  }
}

export function reload_pop_stars_list(arr, place) {
  place.innerHTML = "";
  for (let item of arr) {
    let info_box = document.createElement("div");
    let info_box_left = document.createElement("div");
    let info_box_right = document.createElement("span");
    let info_box_title = document.createElement("h2");
    let info_box_origin_title = document.createElement("p");

    info_box.classList.add("info_box");
    info_box_left.classList.add("info_box_left");
    info_box_right.classList.add("info_box_right");

    info_box_right.innerHTML = item.popularity.toFixed(0);
    info_box_title.innerHTML = item.name;
    info_box_origin_title.innerHTML = item.original_name;

    place.append(info_box);
    info_box.append(info_box_left, info_box_right);
    info_box_left.append(info_box_title, info_box_origin_title);
  }
}

export function reload_top_rated(arr, place) {
  place.innerHTML = "";
  for (let item of arr) {
    let img_box = document.createElement("div");
    let img = document.createElement("img");
    let img_title = document.createElement("h2");
    let img_vote_average = document.createElement("span");
    let img_release_date = document.createElement("p");
    let img_info_box = document.createElement("div");

    img.src = "https://image.tmdb.org/t/p/original" + item.poster_path;
    img_title.innerHTML = item.title;
    img_vote_average.innerHTML = item.vote_average;
    img_release_date.innerHTML = item.release_date;

    place.append(img_box);
    img_box.append(img, img_info_box);
    img_info_box.append(img_title, img_vote_average, img_release_date);
  }
}

export function reload_all_movies(arr, place, genres) {
  place.innerHTML = "";
  for (let item of arr) {
    let movie_card = document.createElement("a");
    let img = document.createElement("img");
    let info_box = document.createElement("div");
    let title = document.createElement("h2");
    let origin_title = document.createElement("p");
    let genre_span = document.createElement("span");
    let rating = document.createElement("div");
    let genreTitles = [];

    movie_card.classList.add("movie_card");
    info_box.classList.add("info_box");
    rating.classList.add("rating");

    for (let id of item.genre_ids) {
      for (let genre of genres) {
        if (id == genre.id) {
          genreTitles.push(genre.name);
        }
      }
    }
    img.src = "https://image.tmdb.org/t/p/original" + item.poster_path;
    title.innerHTML = item.title;
    origin_title.innerHTML = item.original_title;
    genre_span.innerHTML = genreTitles.join(", ");
    rating.innerHTML = item.vote_average.toFixed(2);

    place.append(movie_card);
    movie_card.append(img, info_box, rating);
    info_box.append(title, origin_title, genre_span);
  }
}
