// Effacer le contenu de localStorage
//window.localStorage.clear()

// Variable avec le contenu de localStorage
const stockage = window.localStorage;



// Créer une fonction pour savoir sur quel bouton on a cliqué
function recoverid(){
    // Charger tous les boutions
    const buttons = document.querySelectorAll('.add-to-cart');
    // Appliquer pour tous les boutons
    buttons.forEach(function(item){
        item.addEventListener("click", function(){
            // Récupérer l'attribut du bouton
            let boutonclique = item.getAttribute('data-id');
            console.log("bouton cliqué =", boutonclique);
            saveInLocalStorage(boutonclique)
        });
    });
};

// Créer une fonction pour enregistrer 
function saveInLocalStorage(value){
    // Variable compteur pour les clés d'entrée dans localStorage
    let compteur = localStorage.length;
    console.log(compteur);
    compteur ++
    let nomCles = "cours" + compteur;
    console.log("nomCles", nomCles);
    window.localStorage.setItem(nomCles, value)
    console.log(stockage); 
}




// Fonction pour savoir sur quel bouton on a cliqué
recoverid()