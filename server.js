const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.post("/create-payment", async (req, res) => {
  try {
    const { product } = req.body;

    const harga = {
      "Panel 1GB": 5000,
      "Panel 2GB": 8000,
      "Script": 15000
    };

    const response = await axios.post(
      "https://api.pakasir.com/create",
      {
        amount: harga[product],
        note: "Pembelian " + product
      },
      {
        headers: {
          Authorization: process.env.API_KEY
        }
      }
    );

    res.json({
      url: response.data.payment_url
    });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Gagal buat payment" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server jalan...");
});