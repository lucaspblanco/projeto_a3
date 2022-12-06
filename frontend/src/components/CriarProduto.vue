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
      productName: null,
      productPrice: 0.00,
      productDescription: null
    }
  },
  methods: {
    onSubmit() {
      const request = {
        name: this.productName,
        price: this.productPrice,
        description: this.productDescription
      }

      fetch("http://localhost:3001/produtos/criar", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(request),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message + " - [" + data.product.name + "]")
          this.productName = null;
          this.productPrice = 0;
          this.productDescription = null;
        });
    }
  }
}
</script>
<template>
  <form v-on:submit.prevent="onSubmit">
    <div class="form-group">
      <label for="productName">Nome</label>
      <input v-model="productName" id="productName" name="productName" type="text"
        placeholder="Informe o nome do produto..." />
    </div>
    <div class="form-group">
      <label for="productPrice">Preço</label>
      <input v-model="productPrice" id="productPrice" name="productPrice" type="text"
        placeholder="Informe o preço do produto..." />
    </div>
    <div class="form-group">
      <label for="productDescription">Descrição</label>
      <textarea v-model="productDescription" id="productDescription" name="productDescription"
        placeholder="Informe a descrição do produto..."></textarea>
    </div>
    <div class="form-group">
      <input type="submit" value="Cadastrar" />
    </div>
  </form>
</template>

<style scoped>

</style>
