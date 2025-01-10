"use strict";
class CalculateurPrix {
    constructor(prix, count, state) {
        this.prix = prix;
        this.count = count;
        this.state = state;
    }
    totalHT() {
        return this.prix * this.count;
    }
    finalPrice() {
        let remise = this.calculerRemiseAvecPourcentage(this.totalHT(), this.definirPourcentageRemise(this.totalHT()));
        return this.totalHT() - remise;
    }
    calculerRemiseAvecPourcentage(totalHT, remisePourcentage) {
        // Vérification : La remise ne doit pas dépasser 100% ou être négative
        if (remisePourcentage < 0 || remisePourcentage > 100) {
            throw new Error("Le pourcentage de remise doit être compris entre 0 et 100.");
        }
        if (remisePourcentage === 0) {
            return 0;
        }
        // Calcul du montant de la remise
        const montantRemise = (totalHT * remisePourcentage) / 100;
        // Calcul du montant total après remise
        const totalAvecRemise = totalHT - montantRemise;
        return totalAvecRemise;
    }
    definirPourcentageRemise(totalHT) {
        // Définir les tranches de remise
        if (totalHT > 50000) {
            return 15; // Remise de 15% si total > 50,000
        }
        else if (totalHT > 10000) {
            return 10; // Remise de 10% si total > 10,000
        }
        else if (totalHT > 7000) {
            return 7; // Remise de 7% si total > 7,000
        }
        else if (totalHT > 5000) {
            return 5; // Remise de 5% si total > 5,000
        }
        else if (totalHT > 1000) {
            return 3; // Remise de 3% si total > 1,000
        }
        else {
            return 0; // Pas de remise si total <= 1,000
        }
    }
    calculerTVA(totalHT, codeEtat) {
        // Taux de TVA par état (codes à 2 lettres)
        const tauxTVA = {
            "UT": 6.85, // Utah
            "NV": 8.00, // Nevada
            "TX": 6.25, // Texas
            "AL": 4.00, // Alabama
            "CA": 8.25 // California
        };
        // Vérifier si le code d'état est valide
        const taux = tauxTVA[codeEtat.toUpperCase()];
        if (taux === undefined) {
            throw new Error(`Code d'état invalide : ${codeEtat}`);
        }
        // Calcul de la TVA
        const tva = (totalHT * taux) / 100;
        return tva;
    }
}
function calculerPrix() {
    const prixInput = document.getElementById('prix');
    const countInput = document.getElementById('count');
    const stateInput = document.getElementById('state');
    const prix = parseFloat(prixInput.value);
    const count = parseInt(countInput.value);
    const state = stateInput.value;
    if (isNaN(prix) || isNaN(count)) {
        alert("Veuillez entrer des valeurs valides pour le prix et la quantité.");
        return;
    }
    const calculateur = new CalculateurPrix(prix, count, state);
    const prixFinal = calculateur.finalPrice();
    // Affichage des résultats dans le DOM
    const resultatPrix = document.getElementById('resultat-prix');
    const resultatFinal = document.getElementById('resultat-final');
    resultatPrix.textContent = `Prix Unitaire : ${prix.toFixed(2)} €`;
    resultatFinal.textContent = `Prix Final : ${prixFinal.toFixed(2)} €`;
}
let calcu = new CalculateurPrix(10, 2, "LA");
console.log(calcu.finalPrice());
