import {
  header,
  footer,
  searcher,
  reload_movies,
  reload_pop_stars,
  reload_top_rated,
  reload_all_movies,
  reload_all_actors,
  reload_all_tv,
  reload_pop_stars_list,
} from "./modules/ui.js";
import { getData } from "./modules/https.js";
header();
searcher();
footer();
let iframe = document.querySelector("iframe");
let now_playing_box = document.querySelector(".now_playing_box");
let pop_movies_box = document.querySelector(".pop_movies_box");
let pop_stars_content = document.querySelector(".pop_stars_content");
let pop_stars_list = document.querySelector(".pop_stars_list");
let upcoming_box = document.querySelector(".upcoming_content");
let top_rated_content = document.querySelector(".top_rated_content");
let btns = document.querySelectorAll(".categories button");
let movies_box = document.querySelector(".movies_box");
let search_inp = document.querySelector(".searcher");
let genres_list = document.querySelectorAll(".genres_list li");
let searcher_modal = document.querySelector(".searcher_wrapper");
let close_modal = document.querySelector(".close_search");
let searcher_btn = document.querySelector(".searcher_btn");
let body = document.body;
searcher_btn.onclick = () => {
  searcher_modal.classList.add("show");
  body.style.overflow = "hidden";
};
close_modal.onclick = () => {
  searcher_modal.classList.remove("show");
  search_inp.value = "";
  movies_box.innerHTML = "";
  body.style.overflow = "scroll";
};
btns.forEach((btn) => {
  btn.onclick = (e) => {
    let active = document.querySelectorAll(".active");
    for (let act of active) {
      //   console.log(act.innerHTML.toLowerCase());
      act.classList.remove("active");
    }
    btn.classList.add("active");

    function debounce(func, timeout = 400) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, timeout);
      };
    }

    function saveInput() {
      if (e.target.innerHTML.toLowerCase() == "movie") {
        Promise.all([
          getData(`/search/movie?query=${search_inp.value}&page=1`),
          getData("/genre/movie/list"),
        ]).then(([movies, genres]) => {
          console.log(movies.data.results);
          reload_all_movies(
            movies.data.results,
            movies_box,
            genres.data.genres
          );
        });
      } else if (e.target.innerHTML.toLowerCase() == "person") {
        getData(`/search/person?query=${search_inp.value}&page=1`).then(
          (res) => {
            reload_all_actors(res.data.results, movies_box);
          }
        );
      } else if (e.target.innerHTML.toLowerCase() == "tv") {
        Promise.all([
			getData(`/search/tv?query=${search_inp.value}&page=1`),
			getData("/genre/movie/list"),
		  ]).then(([movies, genres]) => {
			console.log(movies.data.results);
			reload_all_tv(
			  movies.data.results,
			  movies_box,
			  genres.data.genres
			);
		  });
	  }
    }
    const processChange = debounce(() => saveInput());

    search_inp.onkeyup = () => {
      processChange();
    };
  };
});

export function setTrailer(video) {
  iframe.src = "https://www.youtube.com/embed/" + video.key;
}

getData("/person/popular").then((res) => {
  reload_pop_stars(res.data.results.slice(0, 2), pop_stars_content),
    reload_pop_stars_list(res.data.results, pop_stars_list);
});
getData("/movie/top_rated").then((res) =>
  reload_top_rated(res.data.results.slice(0, 5), top_rated_content)
);

Promise.all([
  getData("/movie/now_playing?page=2&language=ru"),
  getData("/movie/popular"),
  getData("/movie/upcoming"),
  getData("/genre/movie/list"),
]).then(([now_playing_movies, movies_popular, upcoming_movies, genres]) => {
  reload_movies(
    now_playing_movies.data.results.slice(0, 8),
    now_playing_box,
    genres.data.genres
  );
  reload_movies(
    movies_popular.data.results,
    pop_movies_box,
    genres.data.genres
  );
  reload_movies(upcoming_movies.data.results, upcoming_box, genres.data.genres);
});

getData("/genre/movie/list").then((res) => {
  for (let item of res.data.genres) {
    genres_arr.push(item);
  }
});

let genres_box = [];
let genres_arr = [];

genres_list.forEach((genre) => {
  genre.onclick = (e) => {
    if (e.target.getAttribute("data-status")) {
      e.target.removeAttribute("data-status");

      for (let item of genres_arr) {
        if (e.target.className === item.name) {
          let index = genres_box.indexOf(item.id);
          if (index !== -1) {
            genres_box.splice(index, 1);
          }
          let joined_genres = genres_box.join(",");
          //   console.log(genres_box.join(", "));

          getData(`/discover/movie?with_genres=${joined_genres}`).then((res) =>
            reload_movies(
              res.data.results.slice(0, 8),
              now_playing_box,
              genres_arr
            )
          );
        }
      }
    } else {
      genre.dataset.status = "selected";

      for (let item of genres_arr) {
        if (genre.className === item.name) {
          genres_box.push(item.id);
          let joined_genres = genres_box.join(",");
          //   console.log(genres_box.join/(","));

          getData(`/discover/movie?with_genres=${joined_genres}`).then((res) =>
            reload_movies(
              res.data.results.slice(0, 8),
              now_playing_box,
              genres_arr
            )
          );
        }
      }
    }
  };
});
