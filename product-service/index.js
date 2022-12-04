const express = require("express");
const config = require("../config");
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const productRouter = require("./routes/product");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/products", productRouter);

mongoose
  .connect(config.mongo.url + "/product-service", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Product-Service conectado ao MongoDB"))
  .catch((e) => console.log(e));

app.listen(PORT, () => {
  console.log(`Product-Service listener na porta ${PORT}`);
});
