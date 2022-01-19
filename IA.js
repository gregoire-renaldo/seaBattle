let IA = {
  getCellule : function() {
    let cellulePossibles = this.getAllCellulePossibles();
    console.log(cellulePossibles);
    // let randomCel = Math.floor(Math.random() * cellulePossibles.length);
    // return cellulePossibles[randomCel]
    let cellule = this.getBestRandomCelluleAvecPoids(cellulePossibles)
    return cellule
  },
  getAllCellulePossibles : function () {
    // cel possibles = vide + celles ou J1 a boutons
    let celVides = []
    for(let i = 0; i < jeu.nbLigne; i++) {
      for(let j = 0; j < jeu.nbColonne; j++) {
        if(jeu.grille[i][j] === 0 || jeu.grille[i][j] === 1 ) {
          let cel = {
            ligne : i,
            colonne : j,
            poids : this.getPoidsCel(i, j)
          }
          celVides.push(cel)
        }
      }
    }
    return celVides;
  },
  getPoidsCel : function (ligne,colonne) {
    let poidsCellule = 1;
    if((colonne+1 < jeu.nbColonne) && jeu.grille[ligne][colonne+1] === 4) poidsCellule++
    if((colonne-1 >= 0) && jeu.grille[ligne][colonne-1] === 4) poidsCellule++
    if((ligne+1 < jeu.nbLigne) && jeu.grille[ligne+1][colonne] === 4) poidsCellule++
    if((ligne-1 >= 0) && jeu.grille[ligne][colonne-1] === 4) poidsCellule++
    return poidsCellule;

  },
  getBestRandomCelluleAvecPoids : function (cellulePossibles) {
    let bestCel = 0;
    let bestCellules = [0];
    for (let i=1; i< cellulePossibles.length; i++) {
     if ( cellulePossibles[i].poids > cellulePossibles[bestCel].poids) {
       bestCel = i
       bestCellules = new Array();
       bestCellules.push(i);
     } else if(cellulePossibles[i].poids === cellulePossibles[bestCel].poids) {
       bestCellules.push(i)
     }
    }
    let randomCel = Math.floor(Math.random() * bestCellules.length);
    return cellulePossibles[bestCellules[randomCel]];
  }
}
