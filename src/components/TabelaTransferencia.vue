<script lang="ts">
import axios from 'axios';
import moment from 'moment';
import ModalExcluirTransferencia from "@/components/ModalExcluirTransferencia.vue";
import ModalCadastrarTransferencia from "@/components/ModalCadastrarTransferencia.vue";

export default {
  components: { ModalExcluirTransferencia, ModalCadastrarTransferencia },
  data() {
    return {
      transferencias: []
    };
  },
  mounted() {
    this.fetchTransferencias();
  },
  methods: {
	  async fetchTransferencias() {
	      try {
	        const response = await axios.get('http://localhost:8080/api/v1/transferencia/findAll');
	        this.transferencias = response.data.content;
	      } catch (error) {
	        console.error('Erro ao obter transferencias:', error);
	        this.transferencias = [
	          { id: 1, contaOrigem: '123', contaDestino: '567', dataTransferencia: '02/02/2024', dataAgendamento: '02/02/2024', taxa: '12,00', valor: '100,00' },
	          { id: 2, contaOrigem: '444', contaDestino: '999', dataTransferencia: '02/02/2024', dataAgendamento: '02/02/2024', taxa: '34,00', valor: '230,00' },
	        ];
    	}
    },
    formatarData(data) {
      return moment(data).format('HH:mm - DD/MM/YYYY');
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
          <td>{{ formatarData(transferencia.dataAgendamento) }}</td>
          <td>{{ formatarData(transferencia.dataTransferencia) }}</td>
          <td>{{ formatarValor(transferencia.valor) }}</td>
          <td>{{ formatarValor(transferencia.taxa) }}</td>
          <td>
            <ModalExcluirTransferencia :transferencia="transferencia" 
            		@atualizarLista="fetchTransferencias()"/>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="centralizado"> Não possui transferências registradas </p>
  </div>
</div>

</template>
<style scoped>
.centralizado {
  text-align: center;
}
</style>