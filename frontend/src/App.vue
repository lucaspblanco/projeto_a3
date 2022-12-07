<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <!-- Top Menu -->
    <v-app-bar color="primary" prominent>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Lojinha</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" location="left" temporary>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" :title="item.title" :to="item.route"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Content - Main -->
    <v-main>
      <v-container fluid>
          <!-- Router View -->
          <RouterView></RouterView>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    items: [
      {
        title: 'Produtos / Comprar',
        value: 'produtosComprar',
        route: '/'
      },
      {
        title: 'Cadastro de Produtos',
        value: 'cadastrar',
        route: '/cadastrar'
      },
      {
        title: 'Pedidos',
        value: 'pedidos',
        route: '/pedidos'
      }
    ]
  }),
  watch: {
    group() {
      this.drawer = false
    },
  },
}
</script>
<style scoped>

</style>
