const jeu = {
  nbColonne: 5,
  nbLigne: 5,
  grille: [],

  nbCaseJ1: 0,
  nbCaseJ2: 0,

  initialisation: function (nbBateau) {
    this.nbColonne = nbBateau * 2 + 1;
    this.nbLigne = nbBateau * 2 + 1;
    this.grille = toolbox.initialiserTableauVide(this.nbLigne, this.nbColonne, 0);

    for (let i = 1; i <= nbBateau; i++) {
      this.positionnerBateau((i + 1), 1);
      this.nbCaseJ1 += 3;
      this.positionnerBateau((i + 1), 2);
      this.nbCaseJ2 += 3;
    }
  },

  positionnerBateau: function (taille, joueur) {
    const bateau = {};
    let positionTermine = false;
    while (!positionTermine) {
      let tailleXMax = 0;
      let tailleYMax = 0;
      const isHorizontal = Math.floor(Math.random() * 2);
      if (isHorizontal) {
        // horizontal
        tailleXMax = this.nbLigne - (taille - 1)
        tailleYMax = this.nbColonne
      } else {
        tailleXMax = this.nbLigne
        tailleYMax = this.nbColonne - (taille - 1)
      }
      const xAlea = Math.floor(Math.random() * tailleXMax);
      const yAlea = Math.floor(Math.random() * tailleYMax);

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
    const jeu = document.querySelector("#jeu");
    jeu.innerHTML = "";
    let ratio = (100 - (10 * (this.nbColonne - 5) + 1))
    // 2 bateaux 5 colonnes 90px
    // 3 bat 7 col 70px
    // 4 bateaux 9 col 50px

    let content = "<table>";
    for (let i = 0; i < this.nbLigne; i++) {
      content += "<tr>";
      for (let j = 0; j < this.nbColonne; j++) {
        content +=
          "<td class='border text-center' style='width:" + ratio + "px;height:" + ratio + "px'>";
        if (this.grille[i][j] === 0) {
          content +=
            "<button id='play' class='btn btn-secondary' onClick='jouer(" +
            i +
            "," +
            j +
            ")'>Tirer</button>";
        }

        if (this.grille[i][j] === 1) {
          content +=
            "<img src='./images/J1.png' style='width:" + ratio + "px;height:" + ratio + "px' class='bg-danger rounded-circle' />";
        }
        if (this.grille[i][j] === 2) {
          content +=
            "<button id='play' class='btn btn-secondary' onClick='jouer(" +
            i +
            "," +
            j +
            ")'>Tirer</button>";
        }
        if (this.grille[i][j] === 3) {
          content += "<img src='./images/croix.png' style='width:" + ratio + "px;height:" + ratio + "px'  />";
        }
        if (this.grille[i][j] === 4) {
          content +=
            "<img src='./images/croix.png' style='width:" + ratio + "px;height:" + ratio + "px' class='bg-danger rounded-circle' />";
        }
        if (this.grille[i][j] === 5) {
          content +=
            "<img src='./images/croix.png' style='width:" + ratio + "px;height:" + ratio + "px'  class='bg-info rounded-circle' />";
        }
        content += "</td>";
      }
      content += "</tr>";
    }
    content += "</table>";
    jeu.innerHTML = content;
  },
  jouerCase: function (ligne, colonne) {
    if (this.grille[ligne][colonne] === 0) {
      this.grille[ligne][colonne] = 3;
    }
    if (this.grille[ligne][colonne] === 1) {
      this.nbCaseJ1--;
      this.grille[ligne][colonne] = 4;
    }
    if (this.grille[ligne][colonne] === 2) {
      this.nbCaseJ2--;
      this.grille[ligne][colonne] = 5;
    }
  },
  verificationFinduJeu: function () {
    if (this.nbCaseJ1 <= 0 || this.nbCaseJ2 <= 0) return true;
  },
};
// module.exports = jeu;
