<script setup>
import DialogComprar from './dialogs/DialogComprar.vue';
</script>
<script>
export default {
  data() {
    return {
      products: []
    };
  },
  beforeMount() {
    this.buscarProdutos();
  },
  methods: {
    buscarProdutos() {
      fetch("http://localhost:3001/produtos", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        }
      })
        .then((response) => response.json())
        .then((data) => {
          let list = [];
          data.products.map(function (value) {
            list.push(value);
          });
          this.products = list;
        });
    }
  },
  components: { DialogComprar }
}
</script>
<template>

  <v-list>
    <v-list-item v-for="product in products" :key="product._id" :title="product.name"
      :subtitle="product.description">
      <v-chip color="green" class="ma-2">R$ {{ product.price }}</v-chip>
      <DialogComprar :product="product" />
    </v-list-item>
  </v-list>
</template>

<style scoped>
b {
  font-weight: bold;
}
</style>
