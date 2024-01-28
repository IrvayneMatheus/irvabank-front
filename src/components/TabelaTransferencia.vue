<script lang="ts">
import { listarTransferencias } from '@/http/api.ts';
import moment from 'moment';
import ModalCadastrarTransferencia from "@/components/ModalCadastrarTransferencia.vue";
import ModalExcluir from "@/components/ModalExcluir.vue";

export default {
  components: { ModalExcluir, ModalCadastrarTransferencia },
  data() {
    return {
      transferencias: [],
      erro: 'Não possui transferências registradas',
      funcionalidade: 'transferencia'
    };
  },
  mounted() {
    this.fetchTransferencias();
  },
  methods: {
	  async fetchTransferencias() {
	      try {
	        const response = await listarTransferencias();
	        this.transferencias = response.data.content;
          if (this.transferencias.length === 0) {
            this.erro = "Não possui transferências cadastradas."
          }
	      } catch (error) {
	      	this.erro = "Erro ao buscar dados no servidor. Entre em contato com o suporte."
    	}
    },
    formatarDataCompleta(data) {
      return moment(data).format('HH:mm - DD/MM/YYYY');
    },
    formatarData(data) {
      return moment(data).format('DD/MM/YYYY');
    },
    formatarValor(valor) {
      return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },
  },
}
</script>

<template>

<ModalCadastrarTransferencia @atualizarLista="fetchTransferencias()"/>


<div class="container-fluid">
  <div class="table-responsive">
    <table v-if="transferencias.length" class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Conta Origem</th>
          <th scope="col">Conta Destino</th>
          <th scope="col">Data Agendamento</th>
          <th scope="col">Data Transferencia</th>
          <th scope="col">Valor</th>
          <th scope="col">Taxa</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transferencia in transferencias" :key="transferencia.id">
          <th scope="row">{{ transferencia.id }}</th>
          <td>{{ transferencia.contaOrigem }}</td>
          <td>{{ transferencia.contaDestino }}</td>
          <td>{{ formatarDataCompleta(transferencia.dataAgendamento) }}</td>
          <td>{{ formatarData(transferencia.dataTransferencia) }}</td>
          <td>{{ formatarValor(transferencia.valor) }}</td>
          <td>{{ formatarValor(transferencia.taxa) }}</td>
          <td>
            <ModalExcluir :entidade="transferencia" :funcionalidade="funcionalidade" 
            		@atualizarLista="fetchTransferencias()"/>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="centralizado"> {{ erro }} </p>
  </div>
</div>

</template>
<style scoped>
.centralizado {
  text-align: center;
}
</style>