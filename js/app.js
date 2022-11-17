/************************************
 * 
 * Délcarations des variables globales et fonctions appelées au chargement de la page
 * 
 ************************************/

// Charger les 5 cours
const lienCoursUIUX = document.querySelector('[data-id="1"]');
const ficheUIUX = lienCoursUIUX.parentNode.parentNode;
let showUIUX = true;
const lienCoursPHP = document.querySelector('[data-id="2"]');
const fichePHP = lienCoursPHP.parentNode.parentNode;
let showPHP = true;
const lienCoursREACT = document.querySelector('[data-id="3"]');
const ficheREACT = lienCoursREACT.parentNode.parentNode;
let showREACT = true;
const lienCoursNODE = document.querySelector('[data-id="4"]');
const ficheNODE = lienCoursNODE.parentNode.parentNode;
let showNODE = true;
const lienCoursMYSQL = document.querySelector('[data-id="5"]');
const ficheMYSQL = lienCoursMYSQL.parentNode.parentNode;
let showMYSQL = true;

// Charger la fonction pour récupérer les cliques sur les boutons
recoverid();
// Mettre à jour les quantitées disponibles sur la page HTML
updateAvailabilites();
displayAvailabilites();

/************************************
 * 
 * Fonction pour gérer les cliques sur les boutons d'achat
 * 
 ************************************/

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

            // Vérifier s'il reste des stocks disponbile
            let disponibilite = checkAvailabilities(boutonclique);

            // Enregistrer les données dans localStorage si disponibilité sinon envoyé un message d'erreur
            if(disponibilite == true){
                // Enregistrer dans localStorage l'attribut récupéré
                saveInLocalStorage(boutonclique);
                miseAJourQuantitePanier(calculQuantitePanier());
                updateAvailabilites();
                displayAvailabilites();
                ajouterNotification(boutonclique,notificationAjoutPanier);
            }else{
                console.log("LocalStorage n'est pas mis à jour car il n'y a plus de place");
            }
        });
    });
};

// Vérifier s'il y a un élément panier dans localStorage sinon en créer un et le renvoyer
function checkPanierlocalStorage(){
    // Créer une variable test qui recherche une clée Panier dans localStorage
    let testPanier = window.localStorage.getItem("Panier");
    // S'il n'y a pas de panier dans le localStorage en créer un sinon récupérer celui qui existe
    if (testPanier == null){
        // Créer un objet
        let panier = {
            Article:[],
            QTT:[],
            Disponibilite:[]
        };

        return panier;
    }else{
        // Récupérer le panier existant dans localStorage
        let panierJSON = window.localStorage.getItem("Panier");

        // Convertir le panier de JSON vers object JS
        let panier = JSON.parse(panierJSON);

        return panier;
    };
};

// Créer une fonction pour enregistrer dans le localStore
function saveInLocalStorage(value){
    // Créer une clée
    let key = "Panier";

    // Récupérer le panier dans le localStorage
    let panier = checkPanierlocalStorage();

    // Ajouter les données liées au bouton cliqué
    panier.Article.push(value);

    // Convetir en JSON et enregistrer dans localStorage 
    stockageObject= JSON.stringify(panier);

    // Enregistrer dans localstore la clé ainsi que la valeur qui a été utilisée comme argument de la fonction
    window.localStorage.setItem(key, stockageObject)
};

// Calculer les quantités de cours dans le panier
function calculQuantitePanier(){ 
    // Charger le panier
    let panier = checkPanierlocalStorage();
    // Mettre à 0 les 5 compteurs
    let quantiteCours1, quantiteCours2, quantiteCours3, quantiteCours4, quantiteCours5;
    quantiteCours1 = quantiteCours2 = quantiteCours3 = quantiteCours4 = quantiteCours5 = 0;

    // Calculer pour chaque valeur de panier combien de fois elle revient
    panier.Article.forEach(function(valeurPanier){
        if (valeurPanier == 1){
            quantiteCours1++;
        }else if(valeurPanier == 2){
            quantiteCours2++;
        }else if(valeurPanier == 3){
            quantiteCours3++;
        }else if(valeurPanier == 4){
            quantiteCours4++;
        }else if(valeurPanier == 5){
            quantiteCours5++;
        };
    });

    // Créer un tableau contenant les quantités pour tous les cours
    let tableauQuantite = [quantiteCours1,quantiteCours2,quantiteCours3,quantiteCours4,quantiteCours5];
    return tableauQuantite;
};

// Fonction permettant de mettre à jour la quanité de cours dans le localStorage 
function miseAJourQuantitePanier(table){ 
    // Récupérer le panier conservé dans le localStorage
    let panier = checkPanierlocalStorage();

    // Créer une clée
    let key = "Panier";

    // Ajouter les données calculées de quantité dans l'objet panier
    panier.QTT = table;

    // Convetir en JSON et enregistrer dans localStorage 
    stockageObject= JSON.stringify(panier);

    // Enregistrer dans localstore la clé ainsi que la valeur qui a été utilisée comme argument de la fonction
    window.localStorage.setItem(key, stockageObject)
};

/************************************
 * 
 * Gestion des quantités
 * 
 ************************************/

// Fonction pour vérifier si les cours sont encore disponibles
function checkAvailabilities(idATester){

    // Récupérer le nombre maximum de cours disponible dans la constante COURSES
    let disponibiliteMax = COURSES[idATester]['stock'];

    // Récupérer le panier conservé dans le localStorage
    let panier = checkPanierlocalStorage();
    let tableauQuantite = panier.QTT

    // Créer une variable simulant la nouvelle disponibilité
    let quantiteATester;
    
    // Si le tableau dans localStorage est vide mettre la quantité à 0 sinon récupérer la valeur et ajouter +1 pour simuler la prochaine valeur
    if(tableauQuantite.length == 0){
        quantiteATester = 0;
    }else{
        // Calculer la quantité dans localStorage plus un
        quantiteATester = tableauQuantite[idATester-1] + 1;
    }

    // Renvoyer un résultat différent en fonction de la comparaison entre le nombre de place disponible et celui à tester
    if(disponibiliteMax >= quantiteATester){
        return true; 
    }else{
        return false;
    };
};

// Fonction pour mettre à jour dans localStorage le nombre de place disponible
function updateAvailabilites(){

        // Récupérer le panier conservé dans le localStorage
        let panier = checkPanierlocalStorage();
        //let tableauQuantite = panier.QTT 

        // Vérifier si un tableau disponibilité existe dans localStorage
        // Créer le tableau s'il n'existe pas
        // Charger le tableau s'il existe

        if (panier.Disponibilite.length == 0){
            panier.Disponibilite = [0,0,0,0,0];
        };

        // Calculer le nombre de place disponbile
        for (let compteur = 0; compteur < 5; compteur ++){
            panier.Disponibilite[compteur] = COURSES[compteur+1]['stock'] - panier.QTT[compteur];
            // Vérifier si panier.Disponibilite[compteur] est un nombre.
            // Lors du premier chargement ce n'est pas un nombre car LocalStorage est vide.
            // Dans ce cas on lui déclare la valeur max disponible.
            if(isNaN(panier.Disponibilite[compteur]) == true){
                panier.Disponibilite[compteur]=COURSES[compteur+1]['stock'];
            };
        };

        // Mettre à jour le tableau dans localStorage
        // Créer une clée
        let key = "Panier";

        // Convetir en JSON et enregistrer dans localStorage 
        stockageObject= JSON.stringify(panier);

        // Enregistrer dans localstore la clé ainsi que la valeur qui a été utilisée comme argument de la fonction
        window.localStorage.setItem(key, stockageObject)
};

// Fonction pour afficher le nombre de cours encore disponible sur la pge HTML
function displayAvailabilites(){

    // Récupérer le panier conservé dans le localStorage
    let panier = checkPanierlocalStorage();
    let tableauDisponibilite = panier.Disponibilite;

    // Charger le span contenant la classe stock dans pour chacune des fiches de cours
    let quantiteFicheUIUX = ficheUIUX.querySelector('.stock');
    let quantiteFichePHP = fichePHP.querySelector('.stock');
    let quantiteFicheREACT = ficheREACT.querySelector('.stock');
    let quantiteFicheNODE = ficheNODE.querySelector('.stock');
    let quantiteFicheMYSQL = ficheMYSQL.querySelector('.stock');

    // Mettre à jour la quantité dans la partie HTML
    quantiteFicheUIUX.innerHTML = tableauDisponibilite[0];
    quantiteFichePHP.innerHTML = tableauDisponibilite[1];
    quantiteFicheREACT.innerHTML = tableauDisponibilite[2];
    quantiteFicheNODE.innerHTML = tableauDisponibilite[3];
    quantiteFicheMYSQL.innerHTML = tableauDisponibilite[4];
}

/************************************
 * 
 * Afficher des notifications
 * 
 ************************************/

// Déclarer les messages qui seront utilisés dans les notifications
const notificationAjoutPanier = " a été ajouté au panier !";
const notificationSuppressionPanier = " a été supprimé du panier !";
const notificationCoursIndisponibleDebut = "Le cours ";
const notificationCoursIndisponibleFin = " n'est plus disponible";
const notificationPanierVide = "Le panier a été vidé";

// Déclarer une position de départ pour l'ajout des notifications
let compteurPosition = 0;

function ajouterNotification(idCours, messageAffiche){
    // Créer le conteneur de la notification
    const notificationContainer = document.createElement('div');
    notificationContainer.setAttribute('id','notification_container');
    document.querySelector('#header').appendChild(notificationContainer);
    // Adapter la position où apparait les notifications
    if(compteurPosition ==0){
        notificationContainer.style.top= "40px";
    }else if(compteurPosition == 1){
        notificationContainer.style.top= "120px";
    }else if(compteurPosition == 2){
        notificationContainer.style.top= "200px";
    }else if(compteurPosition == 3){
        notificationContainer.style.top= "280px";
    }else if(compteurPosition == 4){
        notificationContainer.style.top= "360px";
    }else if(compteurPosition == 5){
        notificationContainer.style.top= "440px";
    }else if(compteurPosition == 6){
        notificationContainer.style.top= "520px";
    }else if(compteurPosition == 7){
        notificationContainer.style.top= "600px";
    }

    // Incrémenter le compteur de position
    compteurPosition++;
    
    // Créer la div de contenu
    const notificationContent = document.createElement('div');
    notificationContainer.appendChild(notificationContent);
    notificationContent.classList.add('content');

    // Ajouter une image dans la div de contenu
    const notificationImage = document.createElement('img');
    notificationContent.appendChild(notificationImage);
    notificationImage.setAttribute('src','img/info.png');
    
    // Ajouter du texte dans la div de contenu
    const notificationTexte = document.createElement('p');
    notificationContent.appendChild(notificationTexte);

    // Adapter le contenu affiché en fonction du bouton sur lequel on a cliqué
    if(idCours == 1){
        notificationTexte.innerText= "UIUX" + messageAffiche;
    }else if(idCours == 2){
        notificationTexte.innerText= "PHP 8" + messageAffiche;
    }else if(idCours == 3){
        notificationTexte.innerText= "REACT JS" + messageAffiche;
    }else if(idCours == 4){
        notificationTexte.innerText= "NODE JS" + messageAffiche;
    }else if(idCours == 5){
        notificationTexte.innerText= "MYSQL" + messageAffiche;
    }
    
    // Supprimer la notification au bout de 3 secondes
    setTimeout(function(){
        notificationContainer.remove();
        compteurPosition--
    }, 3000);  
};

/*
#notification_container {
  position: fixed;
  top: 40px;
  right: 25px;

  width: 200px;
  height: auto;
}
*/










/************************************
 * 
 * Vider le panier
 * 
 ************************************/

// Charger le bouton pour effacer le contenu du panier
const emptyCart = document.querySelector('#empty-cart');

// Effacer le contenu du localStorage lorsque l'on clique sur le bouton
emptyCart.addEventListener("click",function(){
    // Effacer le contenu de localStorage
    window.localStorage.clear()

    // Mettre à jour les valeurs de disponibilité et leur contenu en HTML.
    updateAvailabilites();
    displayAvailabilites();
});