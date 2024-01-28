<script lang="ts">
import { mensagemErro } from '@/util/msgErro.ts';
import moment from 'moment';

export default {
  props: {
     cliente: { type: Object as PropType, required: true}
  },
  data() {
    return { 
      ativo: false,
      transferencias: []
    }
	},
	methods: {
		fecharModal() {
			this.ativo = false;
		},
    abrirModal() {
      console.log(this.cliente);
      this.ativo = true;
      this.transferencias = this.cliente.transferencias;
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
	}
}


</script>

<template>

<button @click="abrirModal()" class="btn btn-info margem">Transferências</button>

<div class="modal" :class="{ 'show': ativo }">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Histórico de Transferências</h5>
        <button type="button" class="btn-close" @click="fecharModal"></button>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
          <div class="table-responsive">
            <table v-if="transferencias.length" class="table">
              <thead>
                <tr>
                  <th scope="col">Conta Destino</th>
                  <th scope="col">Data Agendamento</th>
                  <th scope="col">Data Transferencia</th>
                  <th scope="col">Valor</th>
                  <th scope="col">Taxa</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="transferencia in transferencias" :key="transferencia.id">
                  <td>{{ transferencia.contaDestino }}</td>
                  <td>{{ formatarDataCompleta(transferencia.dataAgendamento) }}</td>
                  <td>{{ formatarData(transferencia.dataTransferencia) }}</td>
                  <td>{{ formatarValor(transferencia.valor) }}</td>
                  <td>{{ formatarValor(transferencia.taxa) }}</td>
                </tr>
              </tbody>
            </table>
            <p v-else class="centralizado"> Cliente não possui transferências realizadas </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


</template>
<style scoped>
.pagina {
  padding: 20px;
  background-color: #fff;
}

.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
}

.modal.show {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-dialog {
  width: 900px ;
  max-width: 3000px;
}

.modal-content {
  padding: 20px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
}

.centralizado {
  text-align: center;
}

.margem {
  margin-right: 10px;
}
</style>