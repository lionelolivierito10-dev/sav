/* ===========================================================
   SARAH-ANNE VALÈRE — comportements d'interface partagés
   =========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  // --- Menu mobile ---
  const navToggle = document.querySelector(".nav-toggle");
  const navMobile = document.querySelector(".nav-menu-mobile");
  if(navToggle && navMobile){
    navToggle.addEventListener("click", () => navMobile.classList.add("visible"));
    navMobile.querySelector(".fermer-tiroir")?.addEventListener("click", () => navMobile.classList.remove("visible"));
    navMobile.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navMobile.classList.remove("visible")));
  }

  // --- Tiroir panier ---
  document.querySelectorAll("[data-ouvrir-panier]").forEach(btn => btn.addEventListener("click", (e) => { e.preventDefault(); SAV.ouvrirTiroir(); }));
  document.querySelector(".fermer-tiroir-panier")?.addEventListener("click", () => SAV.fermerTiroir());
  document.querySelector(".tiroir-fond")?.addEventListener("click", () => SAV.fermerTiroir());

  // --- Onglets génériques (data-onglets) ---
  document.querySelectorAll("[data-onglets]").forEach(conteneur => {
    const boutons = conteneur.querySelectorAll(".onglet-btn");
    boutons.forEach(btn => {
      btn.addEventListener("click", () => {
        const cible = btn.dataset.cible;
        conteneur.querySelectorAll(".onglet-btn").forEach(b => b.classList.remove("actif"));
        conteneur.querySelectorAll(".onglet-panneau").forEach(p => p.classList.remove("actif"));
        btn.classList.add("actif");
        document.getElementById(cible)?.classList.add("actif");
      });
    });
  });

  // --- Accordéons (FAQ) ---
  document.querySelectorAll(".accordeon-item").forEach(item => {
    const btn = item.querySelector(".accordeon-btn");
    const panneau = item.querySelector(".accordeon-panneau");
    btn?.addEventListener("click", () => {
      const ouvert = item.classList.contains("ouvert");
      item.parentElement.querySelectorAll(".accordeon-item").forEach(i => {
        i.classList.remove("ouvert");
        i.querySelector(".accordeon-panneau").style.maxHeight = null;
      });
      if(!ouvert){
        item.classList.add("ouvert");
        panneau.style.maxHeight = panneau.scrollHeight + "px";
      }
    });
  });

  // --- Formulaire newsletter (simulation) ---
  document.querySelectorAll(".form-newsletter").forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      SAV.toast("Merci ! Vérifiez votre boîte mail pour confirmer votre inscription.");
      form.reset();
    });
  });

  // --- Formulaire de contact (simulation) ---
  document.querySelector(".formulaire-contact")?.addEventListener("submit", (e) => {
    e.preventDefault();
    SAV.toast("Votre message a bien été envoyé. Nous répondons sous 24h ouvrées.");
    e.target.reset();
  });

});
