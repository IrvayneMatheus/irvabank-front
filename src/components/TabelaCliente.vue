<script lang="ts">
import axios from 'axios';
import moment from 'moment';
import ModalExcluirCliente from "@/components/ModalExcluirCliente.vue";
import ModalCadastrarCliente from "@/components/ModalCadastrarCliente.vue";
import ModalEditarCliente from "@/components/ModalEditarCliente.vue";

export default {
  components: { ModalExcluirCliente, ModalCadastrarCliente, ModalEditarCliente },
  data() {
    return {
      clientes: [],
      erro: 'Não possui clientes cadastrados'
    };
  },
  mounted() {
    this.fetchClientes();
  },
  methods: {
	  async fetchClientes() {
	      try {
	        const response = await axios.get('http://localhost:8080/api/v1/cliente/findAll');
	        this.clientes = response.data.content;
	      } catch (error) {
	      	this.erro = "Erro ao buscar dados no servidor. Entre em contato com o suporte."
    	}
    }
  },
}
</script>

<template>

<ModalCadastrarCliente @atualizarLista="fetchClientes()"/>


<div class="container-fluid">
      <div class="table-responsive">
        <table v-if="clientes.length" class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Número da Conta</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cliente in clientes" :key="cliente.id">
              <th scope="row">{{ cliente.id }}</th>
              <td>{{ cliente.nome }}</td>
              <td>{{ cliente.numeroConta }}</td>
              <td>
                <ModalEditarCliente :cliente="cliente" 
                    @atualizarLista="fetchClientes()"/>
                <ModalExcluirCliente :cliente="cliente" 
                    @atualizarLista="fetchClientes()"/>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else class="centralizado"> Não possui clientes registradas </p>
      </div>
    </div>

</template>
<style scoped>
.centralizado {
  text-align: center;
}
</style>