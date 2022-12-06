<script setup>
import CriarProduto from '../components/CriarProduto.vue';
</script>

<template>
  <div class="formulario">
    <h1>Cadastro de Produto</h1>
    <CriarProduto></CriarProduto>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .formulario {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  label {
    display: block;
  }

  input[type=submit] {
    margin-top: 15px;
  }
}
</style>
