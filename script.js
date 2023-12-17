function searchInput(event){
    event.preventDefault();
    let search = document.querySelector("#search");
    let city = document.querySelector("#city");
    city.innerHTML = `${search.value}`;
}

let form = document.querySelector("#form");
form.addEventListener("submit", searchInput )