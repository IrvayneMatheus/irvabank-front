<script lang="ts">
import axios from 'axios';

export default {
  props: {
     cliente: { type: Object as PropType, required: true}
  },
  data() {
    return { 
      erro: null,
      ativo: false,
      clienteEditar: {
        id: null,
        nome: '',
        numeroConta: ''
      }
    }
	},
	methods: {
		fecharModal() {
			this.ativo = false;
		},
	    async editarCliente() {
        try {
          const response = await axios.put('http://localhost:8080/api/v1/cliente/update', this.clienteEditar);
          if (response.status === 200) {
            this.fecharModal();
            this.$emit('atualizarLista');
          } else {
            this.erro = 'Erro ao salvar informacao do cliente.';
          }
        } catch (error) {
          this.erro = 'Erro ao salvar informacao do cliente.';
        }
      },
	    abrirModal(cliente) {
	      this.ativo = true;
        this.clienteEditar.id = cliente.id;
        this.clienteEditar.nome = cliente.nome;
        this.clienteEditar.numeroConta = cliente.numeroConta;
	    },
	},
  emits: ['atualizarLista']
}


</script>

<template>

<button @click="abrirModal(cliente)" class="btn btn-warning">Editar</button>

<div class="modal" :class="{ 'show': ativo }">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Editar Cliente</h5>
        <button type="button" class="btn-close" @click="fecharModal"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="editarCliente">
          <div class="mb-3">
            <label for="nomeEditar" class="form-label">Nome:</label>
            <input v-model="clienteEditar.nome" type="text" class="form-control" id="nomeEditar" required>
          </div>
          <div class="mb-3">
            <label for="agenciaEditar" class="form-label">Numero da Conta:</label>
            <input v-model="clienteEditar.numeroConta" type="text" class="form-control" id="agenciaEditar" required>
          </div>
          <p v-if="erro" class="text-danger">{{ erro }}</p>
          <div class="centralizado">
            <button type="submit" class="btn btn-primary">Salvar</button>
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
</style>