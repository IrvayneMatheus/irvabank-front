<script lang="ts">
import axios from 'axios';

export default {
  props: {
     transferencia: { type: Object as PropType, required: true}
  },
  data() {
    return { erro: null, ativo: false, idTransferencia: null }
	},
	methods: {
		fecharModal() {
			this.ativo = false;
		},
	    async excluirTransferencia() {
	      try {
	        const response = await axios.delete(`http://localhost:8080/api/v1/transferencia/delete/${this.idTransferencia}`);
	        if (response.status === 200) {
	          this.fecharModal();
	          this.$router.go();
	        } else {
	          this.erro = 'Erro ao excluir transferencia. Tente novamente.';
	        }
	      } catch (error) {
	        this.erro = 'Erro ao excluir transferencia. Tente novamente.';
	      }
	    },
	    abrirModalExcluir(transferencia) {
	      this.idTransferencia = transferencia.id;
	      this.ativo = true;
	    },
	},
}


</script>

<template>

<button @click="abrirModalExcluir(transferencia)" class="btn btn-danger">Excluir</button>

<div class="modal" :class="{ 'show': ativo }">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Excluir Transferência</h5>
        <button type="button" class="btn-close" @click="fecharModal"></button>
      </div>
      <div class="modal-body">
      <p v-if="erro" class="text-danger">{{ erro }}</p>
        <p>Deseja realmente excluir a transferência?</p>
        <button type="button" class="btn btn-danger" @click="excluirTransferencia">Sim</button>
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