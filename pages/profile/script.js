import { getData } from "../../modules/https";
import { header, footer } from "../../modules/ui";
let home_img_profile = document.querySelector(".home_img_profile");
let assessment_img_profile = document.querySelector(".assessment_img_profile");
let liked_movies = document.querySelector(".liked_movies");
let profile = document.querySelector(".profile");

let saveds = JSON.parse(localStorage.getItem("liked_movies")) || [];
console.log(saveds);

getData(`/discover/movie/?&id=${saveds}`).then((res) => {
  console.log(res.data.results);
});

home_img_profile.onclick = () => {
  home_img_profile.classList.add("chosen");
  assessment_img_profile.classList.remove("chosen");
  profile.classList.remove("hide");
  liked_movies.classList.add("hide");
};
assessment_img_profile.onclick = () => {
  home_img_profile.classList.remove("chosen");
  assessment_img_profile.classList.add("chosen");
  liked_movies.classList.remove("hide");
  profile.classList.add("hide");
};
