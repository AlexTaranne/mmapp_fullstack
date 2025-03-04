import * as cheerio from "cheerio";
import fetch from "node-fetch"; // Si ce n'est pas déjà installé

async function getUFCFighters() {
  const url = "https://www.ufc.com/athlete/";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`);
    }

    // Récupérer le contenu HTML de la page
    const body = await response.text();

    // Charger le HTML dans Cheerio
    const $ = cheerio.load(body);

    // Exemple d'extraction de données (tu peux adapter selon ta page cible)
    const fighters = [];
    $(".fighter-class-selector").each((index, element) => {
      const name = $(element).find(".fighter-name-selector").text().trim();
      const photo = $(element).find(".fighter-photo-selector").attr("src");

      fighters.push({ name, photo });
    });
  } catch (error) {
    console.error("Erreur:", error.message);
  }
}

getUFCFighters();
