export default async function handler(req, res) {
  try {
    const { product } = req.body;

    const harga = {
      "Panel 1GB": 5000,
      "Panel 2GB": 8000,
      "Script": 15000
    };

    const response = await fetch("https://api.pakasir.com/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": process.env.API_KEY
      },
      body: JSON.stringify({
        amount: harga[product],
        note: "Pembelian " + product
      })
    });

    const data = await response.json();

    res.status(200).json({
      url: data.payment_url
    });

  } catch (err) {
    res.status(500).json({ error: "Gagal" });
  }
}