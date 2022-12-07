const Router = require("express").Router;
const config = require("../../config");
const router = new Router();
const Order = require("../models/Order");
const amqp = require("amqplib");

var order, channel, connection;

// Conexão RabbitMQ
async function connectToRabbitMQ() {
    connection = await amqp.connect(config.rabbitmq.ampq);
    channel = await connection.createChannel();
    await channel.assertQueue("order-service-queue");
}
connectToRabbitMQ();

// Listar  Pedidos
router.get("/", async (req, res) => {
    // Obtem os pedidos no banco de dados
    const orders = await Order.find({}).sort({ createdAt: 'desc' });

    return res.status(201).json({
        message: "Todos os pedidos",
        orders,
    });
});

// Buscar Pedido
router.post("/buscar", async (req, res) => {
    const { orderId } = req.body;
    // Obtem o pedido no banco de dados utilizando o id
    const order = await Order.findById(orderId);

    return res.status(201).json({
        message: "Pedido encontrado",
        order,
    });
});

module.exports = router;
