const searchItem = document.querySelector("#search-item > input");

// Récupérer le mot écrit dans la barre de recherche et le tester
searchItem.addEventListener('input', function() {
    let inputsearch = searchItem.value;
    console.log("input = ", inputsearch);
    // Vérifier s'il correspond à PHP
    findWordPHP(inputsearch);
    // Vérifier s'il correspond à REACT JS
    findWordREACT(inputsearch);
});

// Vérifier si le mot correspond à PHP
function findWordPHP(input){
    const arrayPHP = ['p', 'ph', 'php'];
    arrayPHP.forEach(function(word){
        if(word == input){
            console.log("mot PHP trouvé")
        }else{
            console.log("mince ce n'est pas le mot PHP");
        }
    });
};

// Vérifier si le mot correspond à REACT JS
function findWordREACT(input){
    const arrayREACT = ['j', 'js', 'r', 're', 'rea', 'reac', 'react','react ', 'react j', 'react js'];
    arrayREACT.forEach(function(word){
        if(word == input){
            console.log("mot REACT JS trouvé")
        }else{
            console.log("mince ce n'est pas le mot REACT JS");
        }
    });
};

// Archive - tentative avec regex
/*
    let regex = /php/g
    console.log(inputsearch.search(regex));

if(inputsearch.search(regex) !== -1){
    console.log("Super ça fonctionne");
}*/