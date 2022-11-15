console.log("Coucou, la recherche est lancée");
const searchItem = document.querySelector("#search-item");
console.log("search-item", searchItem);

searchItem.addEventListener('input', function() {
    let value = searchItem.value;
    console.log(value);
});