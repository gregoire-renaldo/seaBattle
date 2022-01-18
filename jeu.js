const toolbox = require("./toolBox");

const jeu = {
  nbColonne: 5,
  nbLigne: 5,
  grille: [],

  initialisation: function () {
    this.grille = toolbox.ini$(this.nbLigne, this.nbColonne, 0);
  },

  afficherGrille: function () {
    for (let i = 0; i < this.nbLigne; i++) {
      let txt = "";
      for (let j = 0; j < this.nbColonne; j++) {
        text += "| ";
        if (this.grille[i][j] === 0) {
          txt += "_";
        } else if (this.grille[i][j] === 1) {
          txt += "x";
        } else if (this.grille[i][j] === 2) {
          txt += "o";
        }
        txt += " |"
      }
      console.log(txt)
    }
  },

  jouerCase: function (ligne, colonne) {},
};

module.exports = jeu;
