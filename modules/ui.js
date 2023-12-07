import { setTrailer } from "../main";
import { getData } from "./https";

let iframe = document.querySelector("iframe");

export function header() {
  let header = document.querySelector("header");

  header.innerHTML = `
		<div class="header">
		<div class="left">
		<div class="logo">
  <img src="/public/cinema_logo.svg" alt="">
  <p> <span>Kino</span>area</p>
  </div>
  <div class="networks">
  <a href="#"><img src="/public/networks_immg.svg" alt=""></a>
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
  <button class="searcher_btn"><img src="/public/searcher_btn.svg" alt=""></button>
  <button class="sign_in">Войти</button>
  </div>
  </div>
  `;
}
export function searcher() {
  let searcher_wrapper = document.querySelector(".searcher_wrapper");

  searcher_wrapper.innerHTML = `
  <div class="searcher_box">
  <div class="logo">
    <img src="/public/cinema_logo.svg" alt="">
    <p> <span>Kino</span>area</p>
  </div>
  <div class="inp_box">
    <input class="searcher" placeholder="Search..." />
    <button><img src="/public/searcher_icon.svg" alt=""></button>
    <img class="close_search" src="/public/ex_icon.svg" alt="">
  </div>
  <div class="categories">
    <button>Movie</button>
    <button>Person</button>
    <button>TV</button>
  </div>
</div>
<div class="movies_box">
  <a href="/pages/movies/"></a>
</div>
  `;
}

// let movies_box = document.querySelector(".movies_box");
// let search_inp = document.querySelector(".searcher");
// let searcher_modal = document.querySelector(".searcher_wrapper");
// let close_modal = document.querySelector(".close_search");
// let searcher_btn = document.querySelector(".searcher_btn");
// let body = document.body;
// searcher_btn.onclick = () => {
//   searcher_modal.classList.add("show");
//   body.style.overflow = "hidden";
// };
// close_modal.onclick = () => {
//   searcher_modal.classList.remove("show");
//   search_inp.value = "";
//   movies_box.innerHTML = "";
//   body.style.overflow = "scroll";
// };

export function footer() {
  let footer = document.querySelector("footer");
  footer.innerHTML = `
  <img src="/public/footer_networks.svg" alt="">
  <ul type="none">
    <li>Афиша</li>
    <li>Новости</li>
    <li>Персоны</li>
    <li>Рейтинги</li>
    <li>Рецензии</li>
    <li>Каталог фильмов</li>
  </ul>
  <p>2020 © Kinoarea. Все права защищены</p>
  <a href="#">Политика конфиденциальности</a>`;
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
    img_bg_btn.onclick = () => {
      location.assign(`http://localhost:5173/pages/movies/?id=` + item.id);
    };
    img_bg.onclick = () => {
      getData(`/movie/${item.id}/videos`).then((res) => {
        setTrailer(res.data.results[0]);
      });

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

export function reload_trailers(arr, place) {
  place.innerHTML = "";
  for (let item of arr) {
    let trailer_card = document.createElement("div");
    let img_bg = document.createElement("div");
    // let img = document.createElement("img");
    let trailer_icon = document.createElement("img");
    let title = document.createElement("p");

    trailer_card.classList.add("trailer_card");
    img_bg.classList.add("img_bg");
    // img.classList.add('trailer_img')

    // img.src = "https://image.tmdb.org/t/p/original" + item.poster_path
    trailer_icon.src = "/public/trailer_icon.svg";
    img_bg.style.backgroundImage = `url(https://image.tmdb.org/t/p/original + ${item.poster_path})`;
    img_bg.style.backgroundRepeat = `no-repeat`;
    img_bg.style.backgroundSize = `contain`;
    img_bg.style.backgroundPosition = `center`;
    title.innerHTML = item.title;

    img_bg.onclick = () => {
      getData(`/movie/${item.id}/videos`).then((res) => {
        setTrailer(res.data.results[0]);
      });

      iframe.scrollIntoView({
        behavior: "smooth",
      });
    };
    console.log(img_bg);

    place.append(trailer_card);
    trailer_card.append(
      img_bg,
      //  img,
      title
    );
    img_bg.append(trailer_icon);
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

    img_title.innerHTML = item.name;
    origin_title.innerHTML = item.original_name;
    img.src = "https://image.tmdb.org/t/p/original" + item.profile_path;
    div.append(img_title, origin_title, known_for);
    img_box.append(img, div);
    place.append(img_box);

    img.onclick = () => {
      location.assign(`http://localhost:5173/pages/actors/?id=` + item.id);
    };

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

    info_box_left.onclick = () => {
      location.assign(`http://localhost:5173/pages/actors/?id=` + item.id);
    };

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

export function reload_all_actors(arr, place) {
  place.innerHTML = "";
  for (let item of arr) {
    let actor_card = document.createElement("div");
    let img = document.createElement("img");
    let info_box = document.createElement("div");
    let h2 = document.createElement("h2");
    let p = document.createElement("p");
    let span = document.createElement("span");

    actor_card.classList.add("actor_card");
    info_box.classList.add("info_box");

    img.src = "https://image.tmdb.org/t/p/original" + item.profile_path;
    h2.innerHTML = item.name;
    p.innerHTML = item.original_name;
    span.innerHTML = item.known_for_department;

    place.append(actor_card);
    actor_card.append(img, info_box);
    info_box.append(h2, p, span);
  }
}
export function reload_all_tv(arr, place, genres) {
  place.innerHTML = "";
  for (let item of arr) {
    let tv_card = document.createElement("div");
    let img = document.createElement("img");
    let info_box = document.createElement("div");
    let h2 = document.createElement("h2");
    let p = document.createElement("p");
    let span = document.createElement("span");
    let genreTitles = [];

    tv_card.classList.add("tv_card");
    info_box.classList.add("info_box");

    img.src = "https://image.tmdb.org/t/p/original" + item.poster_path;
    h2.innerHTML = item.name;
    p.innerHTML = item.original_name;
    for (let id of item.genre_ids) {
      for (let genre of genres) {
        if (id == genre.id) {
          genreTitles.push(genre.name);
        }
      }
    }
    span.innerHTML = genreTitles.join(", ");

    place.append(tv_card);
    tv_card.append(img, info_box);
    info_box.append(h2, p, span);
  }
}

export function reload_posters(arr, place) {
  place.innerHTML = "";
  for (let item of arr) {
    let poster_img = document.createElement("img");

    poster_img.src = "https://image.tmdb.org/t/p/original" + item.file_path;

    poster_img.classList.add("posters_img");

    place.append(poster_img);
  }
}
export function reload_actors(arr, place) {
  place.innerHTML = "";
  for (let item of arr) {
    let poster_img = document.createElement("img");

    poster_img.src = "https://image.tmdb.org/t/p/original" + item.profile_path;

    poster_img.classList.add("actors_img");

    poster_img.onclick = () => {
      location.assign(`http://localhost:5173/pages/actors/?id=` + item.id);
    };

    place.append(poster_img);
  }
}

export function reload_films(arr, place, genres) {
  place.innerHTML = "";
  for (let item of arr) {
    let film_card = document.createElement("div");
    let left = document.createElement("div");
    let img = document.createElement("img");
    let film_info = document.createElement("div");
    let h2 = document.createElement("h2");
    let p = document.createElement("p");
    let actor_name = document.createElement("p");
    let span = document.createElement("span");
    let button = document.createElement("button");
    let genreTitles = [];

    film_card.classList.add("film_card");
    left.classList.add("left");
    film_info.classList.add("film_info");
    actor_name.classList.add("actor_name");

    for (let id of item.genre_ids) {
      for (let genre of genres) {
        if (id == genre.id) {
          genreTitles.push(genre.name);
        }
      }
    }
    img.src = "https://image.tmdb.org/t/p/original" + item.poster_path;
    h2.innerHTML = item.title;
    p.innerHTML = item.title;
    button.innerHTML = "Карточка фильма";
    actor_name.innerHTML = item.character;

    button.onclick = () => {
      location.assign(`http://localhost:5173/pages/movies/?id=` + item.id);
    };

    span.innerHTML = genreTitles.join(", ");

    place.append(film_card);
    film_card.append(left, button);
    left.append(img, film_info);
    film_info.append(h2, p, span, actor_name);
  }
}
