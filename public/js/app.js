const searchForm = document.querySelector("form");
const search = document.querySelector("input");
const btnDownload = document.querySelector("button");
const img = document.querySelector("img");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const key = search.value;

  fetch("/search?keyword=" + key).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        image.textContent = data.error;
      } else {
        document.getElementById("myImg").src = data.results[0].urls.raw;
      }
    });
  });
});
