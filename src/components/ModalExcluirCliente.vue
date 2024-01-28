<script lang="ts">
import axios from 'axios';

export default {
  props: {
     cliente: { type: Object as PropType, required: true}
  },
  data() {
    return { erro: null, ativo: false, idCliente: null }
	},
	methods: {
		fecharModal() {
			this.ativo = false;
		},
	    async excluirCliente() {
	      try {
	        const response = await axios.delete(`http://localhost:8080/api/v1/cliente/delete/${this.idCliente}`);
	        if (response.status === 200) {
	          this.fecharModal();
	          this.$emit('atualizarLista');
	        } else {
	          this.erro = 'Erro ao excluir cliente. Tente novamente.';
	        }
	      } catch (error) {
	        this.erro = 'Erro ao excluir cliente. Tente novamente.';
	      }
	    },
	    abrirModal(cliente) {
	      this.idCliente = cliente.id;
	      this.ativo = true;
	    },
	},
	emits: ['atualizarLista']
}


</script>

<template>

<button @click="abrirModal(cliente)" class="btn btn-danger">Excluir</button>

<div class="modal" :class="{ 'show': ativo }">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Excluir Transferência</h5>
        <button type="button" class="btn-close" @click="fecharModal"></button>
      </div>
      <div class="modal-body">
      <p v-if="erro" class="text-danger">{{ erro }}</p>
        <p>Deseja realmente excluir a cliente?</p>
        <button type="button" class="btn btn-danger" @click="excluirCliente">Sim</button>
        <button type="button" class="btn btn-secondary" @click="fecharModal">Cancelar</button>
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