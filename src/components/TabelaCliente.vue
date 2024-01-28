<script lang="ts">
import { listarClientes } from '@/http/api.ts';
import moment from 'moment';
import ModalExcluir from "@/components/ModalExcluir.vue";
import ModalCadastrarCliente from "@/components/ModalCadastrarCliente.vue";
import ModalEditarCliente from "@/components/ModalEditarCliente.vue";
import ModalListarTransferenciasCliente from "@/components/ModalListarTransferenciasCliente.vue";

export default {
  components: { ModalExcluir, ModalCadastrarCliente, ModalEditarCliente, ModalListarTransferenciasCliente },
  data() {
    return {
      clientes: [],
      erro: 'Não possui clientes cadastrados',
      funcionalidade: 'cliente'
    };
  },
  mounted() {
    this.fetchClientes();
  },
  methods: {
	  async fetchClientes() {
	      try {
	        const response = await listarClientes();
	        this.clientes = response.data.content;
          if (this.clientes.length === 0) {
            this.erro = "Não possui clientes cadastrados."
          }
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
                <ModalListarTransferenciasCliente :cliente="cliente"/>
                <ModalEditarCliente :cliente="cliente" 
                    @atualizarLista="fetchClientes()"/>
                <ModalExcluir :entidade="cliente" :funcionalidade="funcionalidade"
                    @atualizarLista="fetchClientes()"/>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else class="centralizado"> {{this.erro}} </p>
      </div>
    </div>

</template>
<style scoped>
.centralizado {
  text-align: center;
}
</style>