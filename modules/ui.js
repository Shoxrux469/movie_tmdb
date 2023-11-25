import { setTrailer } from "../main";
import { getData } from "./https";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
let swiper_pagination = document.querySelector('.swiper-pagination')
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

export function reload_now_playing(arr, place, genres) {
  place.innerHTML = "";

  for (let item of arr) {
    let img_box = document.createElement("div");
    let img_bg = document.createElement("div");
    let img_bg_btn = document.createElement("button");
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
      getData(`movie/${item.id}/videos`).then((res) => {
        console.log(res);
        setTrailer(res.data.results[0]);
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

export function reload_pop_movies(arr, place, genres) {
  place.innerHTML = "";

  for (let item of arr) {
    let img_box = document.createElement("div");
    let img_bg = document.createElement("div");
    let img_rating = document.createElement("div");
    let img_bg_btn = document.createElement("button");
    let img = document.createElement("img");
    let genre_span = document.createElement("span");
    let title = document.createElement("p");
    let genreTitles = [];

    img_box.classList.add("movies_imgs");
    img_box.classList.add("swiper-slide");
    img_bg.classList.add("movies_bg");
    img_rating.classList.add("movies_rating");
    img_bg_btn.classList.add("movies_bg_btn");
    title.classList.add("movies_title");
    genre_span.classList.add("movies_genre");
    img.src = "https://image.tmdb.org/t/p/original" + item.poster_path;
	swiper_pagination.innerHTML = "4/" + arr.length;
	// console.log(arr.length);

    img_bg.onmouseover = () => {
      img_bg_btn.classList.add("show");
    };
    img_bg.onmouseout = () => {
      img_bg_btn.classList.remove("show");
    };
    img_bg_btn.onclick = () => {
      getData(`movie/${item.id}/videos`).then((res) => {
        console.log(res);
        setTrailer(res.data.results[0]);
      });
    };
    for (let id of item.genre_ids) {
      for (let genre of genres) {
        if (id == genre.id) {
          genreTitles.push(genre.name);
        }
      }
    }

    const swiper = new Swiper(".swiper", {
      loop: true,

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      Pagination: {
        bulletActiveClass: "swiper-pagination-bullet-active",
        bulletClass: "swiper-pagination-bullet",
        bulletElement: "span",
        clickable: true,
        clickableClass: "swiper-pagination-clickable",
        currentClass: "swiper-pagination-current",
        dynamicBullets: false,
        dynamicMainBullets: 1,
        hiddenClass: "swiper-pagination-hidden",
        hideOnClick: true,
        horizontalClass: "swiper-pagination-horizontal",
        lockClass: "swiper-pagination-lock",
        modifierClass: "swiper-pagination-",
        paginationDisabledClass: "swiper-pagination-disabled",
        progressbarFillClass: "swiper-pagination-progressbar-fill",
        progressbarOpposite: false,
		el: '.swiper-pagination',
        progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
        totalClass: "swiper-pagination-total",
        type: "bullets",
        verticalClass: "swiper-pagination-vertical",
      },
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
      renderCustom: function (swiper, current, total) {
        return current + " of " + total;
      },
      renderFraction: function (currentClass, totalClass) {
        return (
          '<span class="' +
          currentClass +
          '"></span>' +
          " of " +
          '<span class="' +
          totalClass +
          '"></span>'
        );
      },
      renderProgressbar: function (progressbarFillClass) {
        return '<span class="' + progressbarFillClass + '"></span>';
      },
      autoplay: {
        delay: 5000,
      },

      scrollbar: {
        el: ".swiper-scrollbar",
      },
    });

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
	place.innerHTML = ""
	for(let item of arr) {
		let img_box = document.createElement('div')
		let img = document.createElement('img')
		let img_title = document.createElement('h2')
		let origin_title = document.createElement('p')
		let div = document.createElement('div')

		console.log(item);

		img_box.classList.add('pop_stars_box')
		img.classList.add('pop_stars_img')
		div.classList.add('pop_stars_div')

		img.src = 'https://image.tmdb.org/t/p/original' + item.profile_path
		img_title.innerHTML = item.name
		origin_title.innerHTML = item.original_name
		div.append(img_title, origin_title)
		img_box.append(img, div)
		place.append(img_box)

		console.log(item);

	}
}