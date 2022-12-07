<template>
  <v-row>
    <v-col cols="4" align-self="center">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field v-model="productName" clearable class="px-5 mt-4" name="productName" id="productName"
          label="Nome do Produto" outlined :rules="[required]"></v-text-field>
        <v-text-field v-model="productPrice" clearable class="px-5 mt-4" name="productPrice" id="productPrice"
          label="Preço do Produto" outlined :rules="[required]"></v-text-field>
        <v-text-field v-model="productDescription" clearable class="px-5 mt-4" name="productDescription"
          id="productDescription" label="Descriçao do Produto" outlined :rules="[required]"></v-text-field>
        <v-divider class="mb-5"></v-divider>
        <div class="text-right">
          <v-btn type="submit" color="primary" variation="elevated" :disable="!form">
            Cadastrar
          </v-btn>
        </div>
      </v-form>
    </v-col>
    <v-col cols="4">
      <v-alert text color="success" v-model="alert" :value="alert" dismissible elevation="2" colored-border>
        <h3 class="text-h5">
          {{ productName || 'Nome do Produto' }}
        </h3>
        <div>
          <p>{{ productDescription || 'Descrição do Produto' }}</p>
          <p>R$ {{ productPrice || 890.55 }}</p>
        </div>

        <v-divider class="my-4 info" style="opacity: 0.22"></v-divider>

        <v-row align="center" no-gutters>
          <v-col class="grow">
            {{ message || 'Mensagem de Sucesso' }}
          </v-col>
          <v-col cols="3" class="shrink">
            <v-btn color="success" outlined @click="close()">
              Fechar
            </v-btn>
          </v-col>
        </v-row>
      </v-alert>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      form: false,
      productName: null,
      productPrice: 0.00,
      productDescription: null,
      message: null,
      alert: false
    }
  },
  methods: {
    onSubmit() {
      if (!this.form) return

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
          this.message = data.message
          this.productName = data.product.name
          this.productPrice = data.product.price
          this.productDescription = data.product.description
          this.alert = true
        });
    },
    required(v) {
      return !!v || 'Campo obrigatório'
    },
    close() {
      this.alert = false
      this.productName = null
      this.productPrice = null
      this.productDescription = null
    }
  }
}
</script>