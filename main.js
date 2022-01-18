const jeu = require("./jeu.js");
const toolBox = require("./toolBox");

jeu.initialisation();
jeu.afficherGrille();
while (true) {
  if (jouer()) return;
  if (jouer()) return;
}

function jouer() {
  let saisieLigne = toolBox.saisirEntier("Jouer en quelle ligne ? : ");
  let saisieColonne = toolBox.saisirEntier("Jouer en quelle colonne ? : ");
  let isOver = jeu.jouerCase(saisieLigne, saisieColonne);
  jeu.afficherGrille();
  return isOver;
}
