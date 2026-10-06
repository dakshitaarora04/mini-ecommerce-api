const express = require("express");
const errorMiddleware = require("./middleware/error.middleware");
const productRouter = require("./routes/product.routes");

const app = express();

app.use(express.json());

app.use("/api/products", productRouter);
app.use(errorMiddleware);

module.exports = app;