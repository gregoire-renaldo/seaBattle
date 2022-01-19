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
    const jeu = document.querySelector("#jeu");
    jeu.innerHTML = "";

    let content = "<table>";
    for (let i = 0; i < this.nbLigne; i++) {
      content += "<tr>";
      for (let j = 0; j < this.nbColonne; j++) {
        content +=
          "<td class='border text-center' style='width:100px;height:100px'>";
        if (this.grille[i][j] === 0) {
          content +=
            "<button class='btn btn-secondary' onClick='jouer(" +
            i +
            "," +
            j +
            ")'>Tirer</button>";
        }

        if (this.grille[i][j] === 1) {
          content +=
            "<img src='./images/J1.png' class='bg-danger rounded-circle' />";
        }
        if (this.grille[i][j] === 2) {
          content +=
            "<button class='btn btn-secondary' onClick='jouer(" +
            i +
            "," +
            j +
            ")'>Tirer</button>";
        }
        if (this.grille[i][j] === 3) {
          content += "<img src='./images/croix.png'  />";
        }
        if (this.grille[i][j] === 4) {
          content +=
            "<img src='./images/croix.png' class='bg-danger rounded-circle' />";
        }
        if (this.grille[i][j] === 5) {
          content +=
            "<img src='./images/croix.png' class='bg-info rounded-circle' />";
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
