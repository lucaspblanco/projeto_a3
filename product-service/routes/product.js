const Router = require("express").Router;
const config = require("../../config");
const router = new Router();
const Product = require("../models/Product");
const amqp = require("amqplib");

var order, channel, connection;

// Conexão RabbitMQ
async function connectToRabbitMQ() {
  connection = await amqp.connect(config.rabbitmq.ampq);
  channel = await connection.createChannel();
  await channel.assertQueue("product-service-queue");
}
connectToRabbitMQ();

// Criar novo produto
router.post("/criar", async (req, res) => {
  const { name, price, description } = req.body;
  // verifica se nome, preço e descrição estão vazios
  if (!name || !price || !description) {
    return res.status(400).json({
      message: "Por favor, informe preço, nome e descrição",
    });
  }
  const product = await new Product({ ...req.body });
  await product.save();
  return res.status(201).json({
    message: "Produto criado com sucesso",
    product,
  });
});

// Comprar produto
router.post("/comprar", async (req, res) => {
  const { productIds, userEmail } = req.body;
  // Obtem os produtos no banco de dados utilizando os ids
  const products = await Product.find({ _id: { $in: productIds } });

  // Envia ao RabbitMQ
  channel.sendToQueue(
    "order-service-queue",
    Buffer.from(
      JSON.stringify({
        products,
        userEmail: userEmail,
      })
    )
  );

  // Consumindo do RabbitMQ
  channel.consume("product-service-queue", (data) => {
    console.log("Consumido da fila product-service-queue");
    order = JSON.parse(data.content);
    channel.ack(data);
  });
  return res.status(201).json({
    message: "Pedido realizado com sucesso",
    order,
  });
});

module.exports = router;
