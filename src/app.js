const express = require("express");
const productRouter = require("./routes/product.routes");

const app = express();

app.use(express.json());

app.use("/api/products", productRouter);

module.exports = app;