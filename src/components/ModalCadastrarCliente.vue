<script lang="ts">
import { cadastrarCliente } from '@/http/api.ts';
import { mensagemErro } from '@/util/msgErro.ts';

export default {
  data() {
    return { 
      erro: null,
      ativo: false,
      cliente: {
        nome: '',
        numeroConta: ''
      },
    }
	},
	methods: {
		fecharModal() {
			this.ativo = false;
      this.cliente = {
        nome: '',
        numConta: ''
      };
      this.erro = null;
		},
	    async cadastrarCliente() {
        try {
          const response = await cadastrarCliente(this.cliente);
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
            <h5 class="modal-title">Cadastrar Cliente</h5>
            <button type="button" class="btn-close" @click="fecharModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="cadastrarCliente">
              <div class="mb-3">
                <label for="nome" class="form-label">Nome:</label>
                <input v-model="cliente.nome" type="text" class="form-control" id="nome" required>
              </div>
              <div class="mb-3">
                <label for="agencia" class="form-label">Numero da Conta:</label>
                <input v-model="cliente.numeroConta" type="text" class="form-control" id="agencia" required>
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