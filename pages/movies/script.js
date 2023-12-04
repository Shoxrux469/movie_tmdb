import {
  reload_actors,
  reload_posters,
  reload_movies,
} from "../../modules/ui";
import { getData } from "../../modules/https";

let id = location.search.split("=").at(-1);
console.log(id);

let iframe = document.querySelector("iframe");
let trailer_types = document.querySelectorAll(".trailer_types button");
let scroll_to_trailer = document.querySelector(".scroll_to_trailer");
let poster_content = document.querySelector(".posters_content");
let all_posters = document.querySelector(".posters_title button");
let close_all_posters = document.querySelector(".close_all_posters");
let movies_frames_content = document.querySelector(".movie_frames_content");
let main_roles_content = document.querySelector(".main_roles_content");
let similar_movies_content = document.querySelector(".similar_movies_content");
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

scroll_to_trailer.onclick = () => {
  iframe.scrollIntoView({
    behavior: "smooth",
  });
};
trailer_types.forEach((trailer) => {
  getData(`/movie/${id}/videos`).then((res) => {
    MovieTrailer(res.data.results[1]);
  });
  trailer.onclick = () => {
    let types = document.querySelectorAll(".clicked");

    for (let type of types) {
      type.classList.remove("clicked");
    }
    trailer.classList.add("clicked");

    getData(`/movie/${id}/videos`).then((res) => {
      MovieTrailer(res.data.results[trailer.dataset.num]);
    });
  };
});

function MovieTrailer(video) {
  iframe.src = "https://www.youtube.com/embed/" + video.key;
}

getData(`/movie/${id}`).then((res) => {
  console.log(res.data);
  document.querySelector(".poster_img").src =
    "https://image.tmdb.org/t/p/original" + res.data.poster_path;
  document.querySelectorAll(".origin_title").forEach((item) => {
    item.innerHTML = res.data.original_title;
  });
  document.querySelectorAll(".movie_title").forEach((item) => {
    item.innerHTML = res.data.title;
  });
  document.querySelector(
    ".poster_bg"
  ).style.backgroundImage = `url(https://image.tmdb.org/t/p/original${res.data.backdrop_path})`;
  document.querySelector(".year").innerHTML = res.data.release_date;
  for (let item of res.data.production_countries) {
    document.querySelector(".country").innerHTML = item.name;
  }
  document.querySelector(".origin_lang").innerHTML = res.data.original_language;
  for (let item of res.data.spoken_languages) {
    document.querySelector(".spoken_lang").innerHTML = item.name;
  }
  for (let item of res.data.genres) {
    document.querySelector(".genre").innerHTML += item.name + ", ";
  }
  for (let item of res.data.production_companies) {
    document.querySelector(".company").innerHTML = item.name;
  }
  document.querySelector(".run_time").innerHTML = res.data.runtime + "мин";
  document.querySelector(".tagline").innerHTML = res.data.tagline;
});

let posters_num = 4;
let frames_num = 6;
all_posters.onclick = () => {
  posters_num += 12;
  close_all_posters.classList.remove("hide");
  close_all_posters.classList.add("show");
  get_posters();
  close_all_posters.onclick = () => {
    posters_num -= 12;
    get_posters();

    close_all_posters.classList.remove("show");
    close_all_posters.classList.add("hide");
  };
};

function get_posters() {
  getData(`/movie/${id}/images`).then((res) => {
    reload_posters(res.data.posters.slice(0, posters_num), poster_content);
    reload_posters(
      res.data.backdrops.slice(0, frames_num),
      movies_frames_content
    );
  });
}
get_posters();

getData(`/movie/${id}/credits`).then((res) => {
  reload_actors(res.data.cast.slice(0, 8), main_roles_content);
});

Promise.all([
  getData(`/movie/${id}/similar`),
  getData("/genre/movie/list"),
]).then(([movies, genres]) => {
  reload_movies(
    movies.data.results,
    similar_movies_content,
    genres.data.genres
  );
});
