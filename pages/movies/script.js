import { header, reload_posters } from "../../modules/ui";
import { getData } from "../../modules/https";
header();

let id = location.search.split("=").at(-1);
console.log(id);
header();

let iframe = document.querySelector("iframe");
let trailer_types = document.querySelectorAll(".trailer_types button");
let scroll_to_trailer = document.querySelector(".scroll_to_trailer");
let poster_content = document.querySelector(".posters_content");
let all_posters = document.querySelector(".posters_title button");
let close_all_posters = document.querySelector(".close_all_posters");
let movies_frames_content = document.querySelector(".movie_frames_content");

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
  posters_num = 16;
  close_all_posters.classList.remove("hide");
  close_all_posters.classList.add("show");
  get_posters();
  close_all_posters.onclick = () => {
    posters_num = 4;
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
