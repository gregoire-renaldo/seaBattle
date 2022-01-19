const tour = document.querySelector("#tour");
const alert = document.querySelector(".alert");
const messageJ1 = document.querySelector("#j1");
const messageJ2 = document.querySelector("#j2");
var joueurEnCours = 1;
var finJeu = false;

var pointJ1 = 0;
var pointJ2 = 0;

initialisationTableau();

function jouer(ligne,colonne){
    jouerCase(ligne,colonne);
    let celluleIA = IA.getCellule();
    jouerCase(celluleIA.ligne, celluleIA.colonne)

}
function jouerCase(ligne, colonne){
    if(!finJeu){
        jeu.jouerCase(ligne,colonne);
        jeu.afficherGrille();
        if(jeu.verificationFinduJeu(joueurEnCours)){
            gererFinJeu();
        }
        if(joueurEnCours === 1){
            joueurEnCours = 2;
            tour.innerHTML = "Tour du joueur 2";
        } else {
            joueurEnCours = 1;
            tour.innerHTML = "Tour du joueur 1";
        }
    }
}

function initialisationTableau(){
    jeu.nbCaseJ1 = 0;
    jeu.nbCaseJ2 = 0;
    finJeu = false;
    joueurEnCours = 1;
    alert.classList.add("d-none");
    var contentJ1 = "<img src='./images/J1.png' class='bg-danger rounded-circle' /><br />";
    contentJ1 += pointJ1;
    messageJ1.innerHTML = contentJ1;
    var contentJ2 = "<img src='./images/J2.png' class='bg-info rounded-circle' /><br />";
    contentJ2 += pointJ2;
    messageJ2.innerHTML = contentJ2;

    jeu.initialisation();
    jeu.afficherGrille();
}

function gererFinJeu(){
    finJeu = true;
    var contentAlert = "Partie terminée, le gagnant est : " + joueurEnCours + "<br />";
    contentAlert += '<button type="button" class="btn btn-secondary" onClick = initialisationTableau()>Recommencer</button>';
    alert.innerHTML = contentAlert;
    alert.classList.remove("d-none");
    if(joueurEnCours===1){
        pointJ1++;
    } else {
        pointJ2++;
    }
}
