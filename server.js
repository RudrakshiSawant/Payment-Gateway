const express = require("express");
const Razorpay = require("razorpay");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post("/create-order", async (req, res) => {
    const { amount } = req.body;
    const options = {
        amount: amount * 100, // Convert ₹ to paise
        currency: "INR",
        receipt: "receipt_order_" + Date.now(),
    };
    try {
        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(3000, () => console.log("Server running at http://localhost:3000"));
