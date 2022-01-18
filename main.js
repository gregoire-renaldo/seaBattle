let jeu = require("./jeu.js");
let toolbox = require("./toolbox.js");

jeu.initialisation();
jeu.afficherGrille();
while (true) {
  if (jouer()) return ;
  if (jouer()) return ;
}

function jouer() {
  let saisieLigne = toolbox.saisirEntier("Jouer en quelle ligne ? : ");
  let saisieColonne = toolbox.saisirEntier("Jouer en quelle colonne ? : ");
  let isOver = jeu.jouerCase(saisieLigne, saisieColonne);
  jeu.afficherGrille();
  return isOver;
}
