<script lang="ts">
import { excluir } from '@/http/api.ts';
import { mensagemErro } from '@/util/msgErro.ts';

export default {
  props: {
     entidade: { type: Object as PropType, required: true},
     funcionalidade: { type: String, required: true}
  },
  data() {
    return { erro: null, ativo: false, idEntidade: null }
	},
	methods: {
		fecharModal() {
			this.ativo = false;
		},
	    async excluir() {
	      try {
	        const response = await excluir(this.funcionalidade, this.idEntidade);
	        this.fecharModal();
	        this.$emit('atualizarLista');
	      } catch (error) {
          this.erro = mensagemErro(error);
	      }
	    },
	    abrirModal(entidade) {
	      this.idEntidade = entidade.id;
	      this.ativo = true;
	    },
	},
	emits: ['atualizarLista']
}


</script>

<template>

<button @click="abrirModal(entidade)" class="btn btn-danger">Excluir</button>

<div class="modal" :class="{ 'show': ativo }">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Excluir</h5>
        <button type="button" class="btn-close" @click="fecharModal"></button>
      </div>
      <div class="modal-body">
      <p v-if="erro" class="text-danger">{{ erro }}</p>
        <p>Deseja realmente excluir?</p>
        <div class="centralizado">
          <button type="button" class="btn btn-danger margem" @click="excluir">Sim   </button>
          <button type="button" class="btn btn-secondary" @click="fecharModal">Cancelar</button>
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