const express = require("express");
const config = require("../config");
const app = express();
const PORT = process.env.PORT || 3002;
const mongoose = require("mongoose");
const amqp = require("amqplib");
const Order = require("./models/Order");
const orderRouter = require("./routes/orders");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/pedidos", orderRouter);
var channel, connection;

mongoose
  .connect(config.mongo.url + "/order-service", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Order-Service conectado ao MongoDB"))
  .catch((e) => console.log(e));

// Conexão RabbitMQ
async function connectToRabbitMQ() {
  connection = await amqp.connect(config.rabbitmq.ampq)
  channel = await connection.createChannel();
  await channel.assertQueue("order-service-queue")
    .then(() => console.log("Order-Service conectado ao RabbitMQ"))
    .catch((e) => console.log(e));
}

createOrder = (products, userEmail) => {
  let total = 0;
  products.forEach((product) => {
    total += product.price;
  });

  const order = new Order({
    user: userEmail,
    products,
    total,
  });
  order.save();
  return order;
};

connectToRabbitMQ().then(() => {
  // Listener pra fila no Rabbit
  channel.consume("order-service-queue", (data) => {
    const { products, userEmail } = JSON.parse(data.content);
    const newOrder = createOrder(products, userEmail);
    channel.ack(data);
    channel.sendToQueue(
      "product-service-queue",
      Buffer.from(JSON.stringify(newOrder))
    );
  });
});

app.listen(PORT, () => {
  console.log(`Order-Service listener na porta ${PORT}`);
});
