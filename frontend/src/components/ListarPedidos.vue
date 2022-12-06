<script setup>
defineProps({
  msg: {
    type: String,
    required: false
  }
})
</script>
<script>
export default {
  data() {
    return {
      orders: []
    }
  },
  beforeMount() {
    this.buscarPedidos()
  },
  methods: {
    buscarPedidos() {
      fetch("http://localhost:3002/pedidos", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        }
      })
        .then((response) => response.json())
        .then((data) => {
          let list = []
          data.orders.map(function (value) {
            list.push(value)
          });
          this.orders = list;
        })
    }
  }
}
</script>
<template>
  <v-col cols="4">
    <v-list>
      <v-list-item v-for="order in orders" :key="order._id" :border="true">
        <v-list-item-title>
          <h4>Pedido: {{ order._id }}</h4>
        </v-list-item-title>
        <p><b>Cliente:</b> {{ order.user.name }}</p>
        <p><b>E-mail:</b> {{ order.user.email }}</p>
        <v-list dark="true">
          <v-list-item class="pl-0">
            <v-list-item-title>
              <h4>Produtos</h4>
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-for="product in order.products">
            {{ product.name }} <v-chip color="green">R$ {{ product.price }}</v-chip>
          </v-list-item>
        </v-list>
      </v-list-item>
    </v-list>
  </v-col>
</template>

<style scoped>
b {
  font-weight: bold;
}

ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  padding-bottom: 7.5px;
  margin-bottom: 7.5px;
  border-bottom: 1px dashed;
}
</style>
