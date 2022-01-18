const toolbox = require("./toolbox.js");

const jeu = {
  nbColonne: 5,
  nbLigne: 5,
  grille: [],

  nbCaseJ1: 0,
  nbCaseJ2: 0,

  initialisation: function () {
    this.grille = toolbox.initialiserTableauVide(
      this.nbLigne,
      this.nbColonne,
      0
    );
    this.positionnerBateau(3, 1);
    this.nbCaseJ1 += 3;
    this.positionnerBateau(2, 1);
    this.nbCaseJ1 += 2;
    this.positionnerBateau(3, 2);
    this.nbCaseJ2 += 3;
    this.positionnerBateau(2, 2);
    this.nbCaseJ2 += 2;
  },

  positionnerBateau: function (taille, joueur) {
    const bateau = {};
    let positionTermine = false;
    while (!positionTermine) {
      const xAlea = Math.floor(Math.random() * (this.nbLigne - (taille - 1)));
      const yAlea = Math.floor(Math.random() * (this.nbColonne - (taille - 1)));
      const isHorizontal = Math.floor(Math.random() * 2);

      let isCaseVide = true;
      for (let i = 1; i <= taille && isCaseVide; i++) {
        bateau["case" + i] = this.getCaseCreationBateau(
          xAlea,
          yAlea,
          isHorizontal,
          i
        );
        isCaseVide = this.verifCaseVide(bateau["case" + i]);
      }
      if (isCaseVide) positionTermine = true;
    }
    this.enregistrerGrille(bateau, joueur);
  },
  getCaseCreationBateau: function (xAlea, yAlea, isHorizontal, numCase) {
    const cellule = {};
    if (isHorizontal) {
      cellule.x = xAlea + (numCase - 1);
      cellule.y = yAlea;
    } else {
      cellule.x = xAlea;
      cellule.y = yAlea + (numCase - 1);
    }
    return cellule;
  },
  verifCaseVide: function (caseB) {
    if (this.grille[caseB.x][caseB.y] === 0) return true;
    return false;
  },
  enregistrerGrille: function (bateau, joueur) {
    for (let cellule in bateau) {
      this.grille[bateau[cellule].x][bateau[cellule].y] = joueur;
    }
  },

  afficherGrille: function () {
    for (let i = 0; i < this.nbLigne; i++) {
      let txt = "";
      for (let j = 0; j < this.nbColonne; j++) {
        txt += "| ";
        if (this.grille[i][j] === 0) {
          txt += "_";
        } else if (this.grille[i][j] === 1) {
          txt += "x";
        } else if (this.grille[i][j] === 2) {
          txt += "o";
        } else if (this.grille[i][j] === 3) {
          txt += "d";
        }
        txt += " |";
      }
      console.log(txt);
    }
  },
  jouerCase: function (ligne, colonne) {
    if (this.grille[ligne][colonne] === 1) this.nbCaseJ1--;
    if (this.grille[ligne][colonne] === 2) this.nbCaseJ2--;
    this.grille[ligne][colonne] = 3;
    if (this.nbCaseJ1 <= 0 || this.nbCaseJ2 <= 0) return true;
  },
};
module.exports = jeu;
