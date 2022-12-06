<template>
    <div>
        <v-dialog persistent v-model="dialog" width="500">
            <template v-slot:activator="{ attrs }">
                <v-btn v-bind="attrs" @click="(dialog = true)" color="primary" rounded="lg" class="mt-2 mb-2">
                    Comprar Produto
                </v-btn>
            </template>
            <v-card>
                <v-form v-if="formVisible" v-model="form" @submit.prevent="onSubmit" transition="scale-transition">
                    <v-card-title class="text-h5 grey lighten-2">
                        Dados da Compra
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-text-field v-model="clientName" clearable class="px-5 mt-4" name="clientName" id="clientName"
                        label="Nome do Cliente" outlined :rules="[required]"></v-text-field>
                    <v-text-field v-model="clientMail" clearable class="px-5" name="clientMail" id="clientMail"
                        label="E-mail do Cliente" outlined :rules="[required]"></v-text-field>

                    <v-card-text class="pb-5 pt-0">
                        <div class="cls text-h6 mb-2">O que você está comprando:</div>
                        <div class="font-weight-bold text-subtitle-1 mb-4">{{ product.name }}</div>
                        {{ product.description }}
                        <div class="mt-4 text-right">
                            <v-chip color="green">R$ {{ product.price }}</v-chip>
                        </div>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red lighten-2" text @click="cancelar()">
                            Cancelar
                        </v-btn>
                        <v-btn type="submit" color="primary" variation="elevated" :disable="!form" :loading="loading">
                            Comprar
                        </v-btn>
                    </v-card-actions>
                </v-form>
                <div v-if="!formVisible" transition="scale-transition">
                    <v-card-text class="pb-5 pt-0">
                        <div class="cls mt-4">
                            <v-alert text color="success">
                                <h3 class="text-h5">
                                    {{ product.name }}
                                </h3>
                                <div>
                                    <p>{{ clientName }}</p>
                                    <p>{{ clientMail }}</p>
                                    <p>Total: R$ {{ product.price }}</p>
                                </div>

                                <v-divider class="my-4 info" style="opacity: 0.22"></v-divider>

                                <v-row align="center" no-gutters>
                                    <v-col class="grow">
                                        {{ message }}
                                    </v-col>
                                    <v-spacer></v-spacer>
                                    <v-col cols="3" class="shrink">
                                        <v-btn color="success" outlined @click="cancelar()">
                                            Finalizar
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-alert>
                        </div>
                    </v-card-text>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props: ['product'],
    data() {
        return {
            form: false,
            loading: false,
            dialog: false,
            produto: null,
            clientName: null,
            clientMail: null,
            formVisible: true,
            message: null
        }
    },
    created() {
        this.produto = this.product
    },
    methods: {
        cancelar() {
            this.dialog = false
            this.clientName = null
            this.clientMail = null
            this.formVisible = true
            this.loading = false
            this.message = null
        },
        required(v) {
            return !!v || 'Campo obrigatório'
        },
        onSubmit() {
            if (!this.form) return

            const request = {
                productIds: [this.product._id],
                userData: {
                    name: this.clientName,
                    email: this.clientMail
                }
            }

            this.loading = true
            
            fetch("http://localhost:3001/produtos/comprar", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(request),
            })
                .then((response) => response.json())
                .then((data) => {
                    this.loading = false
                    this.clientName = null
                    this.clientMail = null
                    this.formVisible = false
                    this.message = data.message
                });
        }
    }
}
</script>

<style>

</style>