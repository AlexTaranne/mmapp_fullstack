import axios from "axios";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const fetchFightResults = async () => {
  try {
    const response = await axios.get(
      "https://api.sportsdata.io/v3/mma/scores/json/Fights",
      {
        headers: {
          "Ocp-Apim-Subscription-Key": process.env.SPORTSDATA_API_KEY,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des résultats :", error);
    return [];
  }
};

const updateFighters = async () => {
  const fightResults = await fetchFightResults();

  if (fightResults.length === 0) {
    console.info("Aucun nouveau combat trouvé.");
    return;
  }

  for (const fight of fightResults) {
    const { Fighter1Id, Fighter2Id, Fighter1Win } = fight;

    // Récupérer les fighters en base
    const [fighters] = await (await db).query(
      "SELECT id, wins, losses FROM fighter WHERE id IN (?, ?)",
      [Fighter1Id, Fighter2Id],
    );

    if (fighters.length !== 2) {
      console.info(
        `Fighters non trouvés en base pour le combat ${Fighter1Id} vs ${Fighter2Id}`,
      );
      continue;
    }

    // Mise à jour des victoires et défaites
    const winnerId = Fighter1Win ? Fighter1Id : Fighter2Id;
    const loserId = Fighter1Win ? Fighter2Id : Fighter1Id;

    await (await db).query("UPDATE fighter SET wins = wins + 1 WHERE id = ?", [
      winnerId,
    ]);
    await (await db).query(
      "UPDATE fighter SET losses = losses + 1 WHERE id = ?",
      [loserId],
    );

    console.info(`Mise à jour : ${winnerId} gagne, ${loserId} perd`);
  }

  console.info("Mise à jour terminée.");
};

// Lancer le script
updateFighters()
  .then(async () => (await db).end())
  .catch((error) =>
    console.error("Erreur lors de l'exécution du script :", error),
  );
