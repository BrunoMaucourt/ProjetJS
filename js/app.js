// Créer une fonction pour savoir sur quel bouton on a cliqué
function recoverid(){
    // Charger tous les boutons avec la classe add-to-cart
    const buttons = document.querySelectorAll('.add-to-cart');
    // Appliquer un événement pour tous les boutons
    // item est un terme "générique" qui correspond à chaque bouton
    buttons.forEach(function(item){
        item.addEventListener("click", function(){
            // Récupérer l'attribut du bouton
            let boutonclique = item.getAttribute('data-id');
            console.log("bouton cliqué =", boutonclique);
            // Enregistrer dans localStore l'attribut récupéré
            saveInLocalStorage(boutonclique);
            miseAJourQuantitePanier(calculQuantitePanier());
        });
    });
};

// Vérifier s'il y a un élément panier dans localStorage sinon en créer un et le renvoyer
function checkPanierlocalStorage(){
    // Créer une variable test qui recherche une clée Panier dans localStorage
    let testPanier = window.localStorage.getItem("Panier");
    console.log(testPanier);
    // S'il n'y a pas de panier dans le localStorage en créer un sinon récupérer celui qui existe
    if (testPanier == null){
        // Créer un objet
        let panier = {
            Article:[],
            QTT:[]
        };

        console.log("Aucun panier dans localStorage, un objet est créé");
        return panier;
    }else{
        // Récupérer le panier existant dans localStorage
        let panierJSON = window.localStorage.getItem("Panier");
        console.log("object récupéréJSON", panierJSON);

        // Convertir le panier de JSON vers object JS
        let panier = JSON.parse(panierJSON);
        console.log("object récupéré et parsé", panier);

        return panier;
    };
};

// Créer une fonction pour enregistrer dans le localStore
function saveInLocalStorage(value){
    // Créer une clée
    let key = "Panier";

    // Récupérer le panier dans le localStorage
    let panier = checkPanierlocalStorage();
    console.log("panier", panier);

    // Ajouter les données liées au bouton cliqué
    panier.Article.push(value);
    console.log(panier);

    // Convetir en JSON et enregistrer dans localStorage 
    stockageObject= JSON.stringify(panier);
    console.log(stockageObject);

    // Enregistrer dans localstore la clé ainsi que la valeur qui a été utilisée comme argument de la fonction
    window.localStorage.setItem(key, stockageObject)
    console.log(localStorage);
};

// Charger la fonction
recoverid()

/*
// tests JSON
let panierTest = checkPanierlocalStorage();
console.log("panierTest", panierTest);
console.log(panierTest.Article);
console.log(panierTest.QTT);
let tabletest = [3,6,8,9,1];
console.log("table test =", tabletest)
panierTest.QTT.push(tabletest);
console.log("panierTest",panierTest);
*/







//test panier James+Myles
//Penser a faire condition sur stock disponible
function ajoutPanier(value){
    let titreAjout = COURSES[value]['title'];
    console.log("titre ajouté au panier: ",titreAjout);
    let prixAjout = COURSES[value]['price'];
    console.log("prix du cours ajouté: ",prixAjout);
}

function calculQuantitePanier(){ 
    // tests JSON
    let panier = checkPanierlocalStorage();
    let quantiteCours1 = 0; 
    let quantiteCours2 = 0; 
    let quantiteCours3 = 0;
    let quantiteCours4 = 0;
    let quantiteCours5 = 0;

    panier.Article.forEach(function(valeurPanier){
        if (valeurPanier == 1){
            quantiteCours1++;
            console.log("Quantité UX/UI: ",quantiteCours1);
        }else if(valeurPanier == 2){
            quantiteCours2++;
            console.log("Quantité UPHP 8: ",quantiteCours2);
        }else if (valeurPanier == 3){
            quantiteCours3++;
            console.log("Quantité React JS: ",quantiteCours3);
        }else if(valeurPanier == 4) {quantiteCours4++; console.log("Quantité Node JS: ",quantiteCours4);}
        else if (valeurPanier == 5) { quantiteCours5++; console.log("Quantité MySQL: ",quantiteCours5);}
        else{};
    });
    let tableauQuantite = [quantiteCours1,quantiteCours2,quantiteCours3,quantiteCours4,quantiteCours5];
    console.log(tableauQuantite);
    return tableauQuantite;
};



function miseAJourQuantitePanier(table){ 
    // Récupérer le panier conservé dans le localStorage
    let panier = checkPanierlocalStorage();

    // Créer une clée
    let key = "Panier";

    // Ajouter les données calculées de quantité
    panier.QTT = table;
    console.log("panier mis à jour avec les quanités calculées",panier);

    // Convetir en JSON et enregistrer dans localStorage 
    stockageObject= JSON.stringify(panier);
    console.log(stockageObject);

    // Enregistrer dans localstore la clé ainsi que la valeur qui a été utilisée comme argument de la fonction
    window.localStorage.setItem(key, stockageObject)
    console.log(localStorage);
};



//fin test 
// Fonction pour savoir sur quel bouton on a cliqué





// Vider le panier
const emptyCart = document.querySelector('#empty-cart');

emptyCart.addEventListener("click",function(){
    // Effacer le contenu de localStorage
    window.localStorage.clear()
    console.log("tout est effacé");
});