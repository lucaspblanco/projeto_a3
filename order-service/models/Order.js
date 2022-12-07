const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    user: {
      name: String,
      email: String
    },
    products: [
      {
        product_id: String,
        name: String,
        price: Number
      },
    ],
    total: {
      type: Number,
      required: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
