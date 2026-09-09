/* ===========================================================
   SARAH-ANNE VALÈRE — panier, liste d'envies, notifications
   Persistance : localStorage (à remplacer par une session serveur
   + une table `panier` en production — voir README §3)
   =========================================================== */

const SAV = {
  CLE_PANIER: "sav_panier",
  CLE_ENVIES: "sav_envies",
  FRAIS_LIVRAISON: 6.9,
  SEUIL_LIVRAISON_OFFERTE: 90,

  lirePanier(){
    try{ return JSON.parse(localStorage.getItem(this.CLE_PANIER)) || []; }
    catch(e){ return []; }
  },
  ecrirePanier(panier){
    localStorage.setItem(this.CLE_PANIER, JSON.stringify(panier));
    this.rafraichirBadges();
  },
  ajouter(id, quantite = 1){
    const panier = this.lirePanier();
    const ligne = panier.find(l => l.id === id);
    if(ligne){ ligne.quantite += quantite; }
    else{ panier.push({ id, quantite }); }
    this.ecrirePanier(panier);
    const produit = PRODUITS.find(p => p.id === id);
    if(produit) this.toast(`${produit.nom} ajouté au panier`);
    this.renderTiroir();
  },
  retirer(id){
    this.ecrirePanier(this.lirePanier().filter(l => l.id !== id));
    this.renderTiroir();
  },
  modifierQuantite(id, quantite){
    let panier = this.lirePanier();
    if(quantite <= 0){ panier = panier.filter(l => l.id !== id); }
    else{ const l = panier.find(l => l.id === id); if(l) l.quantite = quantite; }
    this.ecrirePanier(panier);
    this.renderTiroir();
    if(typeof window.rafraichirPagePanier === "function") window.rafraichirPagePanier();
  },
  detailPanier(){
    return this.lirePanier().map(l => ({ ...l, produit: PRODUITS.find(p => p.id === l.id) })).filter(l => l.produit);
  },
  sousTotal(){
    return this.detailPanier().reduce((s, l) => s + l.produit.prix * l.quantite, 0);
  },
  nombreArticles(){
    return this.lirePanier().reduce((s, l) => s + l.quantite, 0);
  },

  // --- Liste d'envies ---
  lireEnvies(){ try{ return JSON.parse(localStorage.getItem(this.CLE_ENVIES)) || []; } catch(e){ return []; } },
  basculerEnvie(id){
    let envies = this.lireEnvies();
    const produit = PRODUITS.find(p => p.id === id);
    if(envies.includes(id)){
      envies = envies.filter(e => e !== id);
      if(produit) this.toast(`${produit.nom} retiré de vos envies`);
    } else {
      envies.push(id);
      if(produit) this.toast(`${produit.nom} ajouté à vos envies`);
    }
    localStorage.setItem(this.CLE_ENVIES, JSON.stringify(envies));
    this.rafraichirBadges();
    document.querySelectorAll(`[data-envie-id="${id}"]`).forEach(btn => btn.classList.toggle("actif", envies.includes(id)));
  },
  estEnvie(id){ return this.lireEnvies().includes(id); },

  // --- Code promo (simulé) ---
  CODES: { "BIENVENUE10": 0.10, "ATELIER15": 0.15 },
  appliquerPromo(code){
    const taux = this.CODES[code.trim().toUpperCase()];
    return taux || 0;
  },

  // --- UI ---
  rafraichirBadges(){
    document.querySelectorAll(".badge-panier").forEach(b => {
      const n = this.nombreArticles();
      b.textContent = n;
      b.style.display = n > 0 ? "flex" : "none";
    });
  },
  toast(message){
    let t = document.querySelector(".toast");
    if(!t){
      t = document.createElement("div");
      t.className = "toast";
      document.body.appendChild(t);
    }
    t.textContent = message;
    t.classList.add("visible");
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => t.classList.remove("visible"), 2600);
  },

  formaterPrix(n){ return n.toFixed(2).replace(".", ",") + " €"; },

  renderTiroir(){
    const corps = document.querySelector(".tiroir-corps");
    const pied = document.querySelector(".tiroir-pied");
    if(!corps || !pied) return;
    const lignes = this.detailPanier();
    if(lignes.length === 0){
      corps.innerHTML = `<div class="panier-vide"><p class="lede center">Votre panier est vide pour le moment.</p></div>`;
      pied.innerHTML = `<a href="boutique.html" class="btn btn-primaire btn-bloc">Découvrir la boutique</a>`;
      return;
    }
    corps.innerHTML = lignes.map(l => `
      <div class="ligne-panier">
        <img src="${l.produit.image}" alt="${l.produit.nom}">
        <div>
          <h4>${l.produit.nom}</h4>
          <div class="ligne-panier-meta">${this.formaterPrix(l.produit.prix)} · Qté ${l.quantite}</div>
        </div>
        <div class="ligne-panier-droite">
          <strong>${this.formaterPrix(l.produit.prix * l.quantite)}</strong>
          <button class="lien-retirer" onclick="SAV.retirer('${l.id}')">Retirer</button>
        </div>
      </div>
    `).join("");
    const sousTotal = this.sousTotal();
    pied.innerHTML = `
      <div class="recap-ligne"><span>Sous-total</span><span>${this.formaterPrix(sousTotal)}</span></div>
      <p class="form-note" style="margin-bottom:14px;">${sousTotal >= this.SEUIL_LIVRAISON_OFFERTE ? "Livraison offerte ✓" : `Plus que ${this.formaterPrix(this.SEUIL_LIVRAISON_OFFERTE - sousTotal)} pour la livraison offerte`}</p>
      <a href="panier.html" class="btn btn-primaire btn-bloc">Voir le panier</a>
    `;
  },

  ouvrirTiroir(){
    document.querySelector(".tiroir-fond")?.classList.add("visible");
    document.querySelector(".tiroir")?.classList.add("visible");
    this.renderTiroir();
  },
  fermerTiroir(){
    document.querySelector(".tiroir-fond")?.classList.remove("visible");
    document.querySelector(".tiroir")?.classList.remove("visible");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  SAV.rafraichirBadges();
  document.querySelectorAll("[data-envie-id]").forEach(btn => {
    if(SAV.estEnvie(btn.dataset.envieId)) btn.classList.add("actif");
  });
});
