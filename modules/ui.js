import { getData } from "./https";

let body = document.body
let pop_movies_box = document.querySelector('.pop_movies_box')

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
  `

}



getData('/movie/now_playing?page=2&language=ru')
  .then(res => {
    reload(res.data.results, pop_movies_box)
    console.log(res.data.results);
  })


function reload(arr, place) {
    place.innerHTML = ''
  
    for(let item of arr) {
      
      let img_box = document.createElement('div')
      let img_bg = document.createElement('div')
      let img_bg_btn = document.createElement('button')
      let img = document.createElement('img')
	  let title = document.createElement('p')
	  let release_date = document.createElement('span')
	  let img_rating = document.createElement('div')

      img_box.classList.add('now_playing_movies_imgs')
      img_bg.classList.add('now_playing_movies_bg')
	  img_rating.classList.add('now_playing_movies_rating')
      img_bg_btn.classList.add('now_playing_movies_bg_btn')
	  title.classList.add('now_playing_movies_title')
	  release_date.classList.add('now_playing_movies_rel_date')


      img_bg_btn.innerHTML = "Карточка фильма"
	  img.src = "https://image.tmdb.org/t/p/original" +  item.poster_path
	  title.innerHTML = item.original_title
	  img_rating.innerHTML = item.vote_average.toFixed(2)
	  release_date.innerHTML = item.release_date
  
      img_bg.onmouseover = () => {
        img_bg_btn.classList.add('show')
      }
      img_bg.onmouseout = () => {
        img_bg_btn.classList.remove('show')
      }
      place.append(img_box)
      img_box.append(img_bg, img, title, release_date)
      img_bg.append(img_bg_btn, img_rating)

    }
  }