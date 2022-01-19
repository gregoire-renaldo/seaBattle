const tour = document.querySelector("#tour");
const alert = document.querySelector(".alert");
const messageJ1 = document.querySelector("#j1");
const messageJ2 = document.querySelector("#j2");
let joueurEnCours = 1;
let finJeu = false;
let nbBateau = 0;

let pointJ1 = 0;
let pointJ2 = 0;

initialisationTableau();

function jouer(ligne, colonne) {
  jouerCase(ligne, colonne);
  let celluleIA = IA.getCellule();
  jouerCase(celluleIA.ligne, celluleIA.colonne);
}
function jouerCase(ligne, colonne) {
  if (!finJeu) {
    jeu.jouerCase(ligne, colonne);
    jeu.afficherGrille();
    if (jeu.verificationFinduJeu(joueurEnCours)) {
      gererFinJeu();
    }
    if (joueurEnCours === 1) {
      joueurEnCours = 2;
      tour.innerHTML = "Tour du joueur 2";
    } else {
      joueurEnCours = 1;
      tour.innerHTML = "Tour du joueur 1";
    }
  }
}

function initialisationTableau() {
  jeu.nbCaseJ1 = 0;
  jeu.nbCaseJ2 = 0;
  finJeu = false;
  joueurEnCours = 1;
  alert.classList.add("d-none");
  let contentJ1 =
    "<img src='./images/J1.png' class='bg-danger rounded-circle' /><br />";
  contentJ1 += pointJ1;
  messageJ1.innerHTML = contentJ1;
  let contentJ2 =
    "<img src='./images/J2.png' class='bg-info rounded-circle' /><br />";
  contentJ2 += pointJ2;
  messageJ2.innerHTML = contentJ2;

  jeu.initialisation();
  jeu.afficherGrille();
}

function gererFinJeu() {
  finJeu = true;
  let contentAlert =
    "Partie terminée, le gagnant est : " + joueurEnCours + "<br />";
  contentAlert +=
    '<button type="button" class="btn btn-secondary" onClick = initialisationTableau()>Recommencer</button>';
  afficherAlert(contentAlert, 1)
  if (joueurEnCours === 1) {
    pointJ1++;
  } else {
    pointJ2++;
  }
}

function afficherAlert(txt, type) {
  if (type === 1) {
    alert.classList.add("alert-success");
    alert.classList.remove("alert-danger");
  }
  if (type === 2) {
    alert.classList.add("alert-danger");
    alert.classList.remove("alert-success");
  }
  alert.innerHTML = txt;
  alert.classList.remove("d-none");
}

function startGame() {
  nbBateauSaisie = parseInt(document.querySelector("#nbBateaux").value);
  if (nbBateau < 2 ) {
    afficherAlert("le nombre de bateaux doit être supérieur à 2",2)
  }
}
