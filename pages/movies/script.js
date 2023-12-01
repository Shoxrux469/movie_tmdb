import { header } from "../../modules/ui";
import { getData } from "../../modules/https";
// header();
let id = location.search.split('=').at(-1)
console.log(id);

getData(`/movie/${id}`)
    .then(res => console.log(res))
// document.querySelector('.poster_img').src = "https://image.tmdb.org/t/p/original"