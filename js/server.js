import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const TOKEN = "SEU_TOKEN_AQUI";

app.post("/frete", async (req, res) => {
  try {
    const response = await fetch("https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.listen(3000, () => console.log("Rodando em http://localhost:3000"));