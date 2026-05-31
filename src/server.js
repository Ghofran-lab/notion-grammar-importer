import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import grammarRepository from "./repositories/grammarRepository.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/levels", async (_req, res) => {
  try {
    res.json(await grammarRepository.getLevels());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Impossible de lire les niveaux depuis Google Sheets" });
  }
});

app.get("/api/rules", async (req, res) => {
  try {
    res.json(await grammarRepository.getRules(req.query.level));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Impossible de lire les règles depuis Google Sheets" });
  }
});

app.get("/api/rules/:id", async (req, res) => {
  try {
    const detail = await grammarRepository.getRuleDetail(req.params.id);
    if (!detail) return res.status(404).json({ error: "Règle non trouvée" });
    res.json(detail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Impossible de lire la règle depuis Google Sheets" });
  }
});

app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

app.listen(port, () => console.log(`🚀 Serveur démarré sur http://localhost:${port}`));
