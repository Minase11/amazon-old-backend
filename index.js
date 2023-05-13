const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51JcXQfB6n4gamyDe7lOogbmENv96LWIbYox0BGSYguaTdxeCgE8egVpQRSlLlov6f7aKV1RwWT5H80tYso7l5VU300WW4losXj"
);

// App Config
const app = express();
const port = process.env.PORT || 8001;

// Middlewares
app.use(express.json());
app.use(cors({ origin: true }));

// API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello World!"));

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log(`Payment Received BOOM!!!! For this amount >>> ${total}`);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listeners
app.listen(port, () => console.log(`Listening on port ${port}`));
