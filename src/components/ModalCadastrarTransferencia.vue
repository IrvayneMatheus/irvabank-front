<script lang="ts">
import { cadastrarTransferencia } from '@/http/api.ts';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Portuguese } from 'flatpickr/dist/l10n/pt';
import { mensagemErro } from '@/util/msgErro.ts';

export default {
  data() {
    return { 
      erro: null,
      ativo: false,
      transferencia: {
        contaOrigem: '',
        contaDestino: '',
        valor: '',
        dataTransferencia: null
      },
    }
	},
  mounted() {
    this.inicializarFlatpickr();
  },
	methods: {
    inicializarFlatpickr() {
      flatpickr(this.$refs.dataTransferenciaInput, {
        locale: Portuguese,
        dateFormat: 'Z',
      });
    },
		fecharModal() {
			this.ativo = false;
      this.transferencia = {
        contaOrigem: '',
        contaDestino: '',
        valor: '',
        dataTransferencia: ''
      };
      this.erro = null;
		},
	    async cadastrarTransferencia() {
        try {
          const response = await cadastrarTransferencia(this.transferencia);
          this.fecharModal();
          this.$emit('atualizarLista');
        } catch (error) {
          this.erro = mensagemErro(error);
        }
      },
	    abrirModal() {
	      this.ativo = true;
	    },
	},
  emits: ['atualizarLista']
}


</script>

<template>

<div class="d-grid gap-2 d-md-flex justify-content-md-end">
  <button @click="abrirModal" class="btn btn-primary mb-3">Cadastrar</button>
</div>


<div class="modal" :class="{ 'show': ativo }">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Cadastrar Transferência</h5>
        <button type="button" class="btn-close" @click="fecharModal"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="cadastrarTransferencia">
          <div class="mb-3">
            <label for="contaOrigem" class="form-label">Conta Origem:</label>
            <input v-model="transferencia.contaOrigem" type="text" class="form-control" id="contaOrigem" required>
          </div>
          <div class="mb-3">
            <label for="contaDestino" class="form-label">Conta Destino:</label>
            <input v-model="transferencia.contaDestino" type="text" class="form-control" id="contaDestino" required>
          </div>
          <div class="mb-3">
            <label for="valor" class="form-label">Valor:</label>
            <input v-model="transferencia.valor" type="text" class="form-control" id="valor" required>
          </div>
          <div class="mb-3">
            <label for="dataTransferencia" class="form-label">Data Transferência:</label>
            <input
              v-model="transferencia.dataTransferencia"
              type="text"
              class="form-control"
              id="dataTransferencia"
              required
              ref="dataTransferenciaInput"
            >
          </div>
          <p v-if="erro" class="text-danger">{{ erro }}</p>
          <div class="centralizado">
            <button type="submit" class="btn btn-primary margem">Cadastrar</button>
            <button type="button" class="btn btn-secondary" @click="fecharModal">Cancelar</button>
          </div>
        </form>
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
  width: 400px;
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