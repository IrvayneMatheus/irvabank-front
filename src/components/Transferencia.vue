<template>
  <div class="pagina">
    <h1>{{ titulo }}</h1>
    
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <button @click="abrirModal" class="btn btn-primary mb-3">Cadastrar</button>
    </div>

    <div class="container-fluid">
      <div class="table-responsive">
        <table class="table">
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
              <td>{{ transferencia.dataAgendamento }}</td>
              <td>{{ transferencia.dataTransferencia }}</td>
              <td>{{ transferencia.valor }}</td>
              <td>{{ transferencia.taxa }}</td>
              <td>
                <button @click="abrirModalExcluir(transferencia)" class="btn btn-danger">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal de cadastro -->
    <div class="modal" :class="{ 'show': modalAdicionarAberto }">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Cadastrar Transferência</h5>
            <button type="button" class="btn-close" @click="fecharModais"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="cadastrarTransferencia">
              <div class="mb-3">
                <label for="contaOrigem" class="form-label">Conta Origem:</label>
                <input v-model="novaTransferencia.contaOrigem" type="text" class="form-control" id="contaOrigem" required>
              </div>
              <div class="mb-3">
                <label for="contaDestino" class="form-label">Conta Destino:</label>
                <input v-model="novaTransferencia.contaDestino" type="text" class="form-control" id="contaDestino" required>
              </div>
              <div class="mb-3">
                <label for="valor" class="form-label">Valor:</label>
                <input v-model="novaTransferencia.valor" type="text" class="form-control" id="valor" required>
              </div>
              <div class="mb-3">
                <label for="dataTransferencia" class="form-label">Data Transferência:</label>
                <input v-model="novaTransferencia.dataTransferencia" type="text" class="form-control" id="dataTransferencia" required>
              </div>
              <p v-if="erroCadastro" class="text-danger">{{ erroCadastro }}</p>
              <button type="submit" class="btn btn-primary">Cadastrar</button>
              <button type="button" class="btn btn-secondary" @click="fecharModais">Cancelar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    

    <!-- Modal para excluir -->
    <div class="modal" :class="{ 'show': modalExcluirAberto }">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Excluir Transferência</h5>
            <button type="button" class="btn-close" @click="fecharModais"></button>
          </div>
          <div class="modal-body">
          <p v-if="erroExcluir" class="text-danger">{{ erroExcluir }}</p>
            <p>Deseja realmente excluir a transferência?</p>
            <button type="button" class="btn btn-danger" @click="excluirTransferencia">Sim</button>
            <button type="button" class="btn btn-secondary" @click="fecharModais">Cancelar</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Transferências",
  data() {
    return {
      titulo: "Transferências Financeiras",
      transferencias: [],
      modalAdicionarAberto: false,
      modalExcluirAberto: false,
      novaTransferencia: {
        contaOrigem: '',
        contaDestino: '',
        valor: '',
        dataTransferencia: ''
      },
      transferencia: {
        id: null
      },
      erroCadastro: null,
      erroExcluir: null
    };
  },
  mounted() {
    this.fetchTransferencias();
  },
  methods: {
    async fetchTransferencias() {
      try {
        const response = await axios.get('http://localhost:8080/trasnferencias');
        this.transferencias = response.data;
      } catch (error) {
        console.error('Erro ao obter transferencias:', error);
        this.transferencias = [
          { id: 1, contaOrigem: '123', contaDestino: '567', dataTransferencia: '02/02/2024', dataAgendamento: '02/02/2024', taxa: '12,00', valor: '100,00' },
          { id: 2, contaOrigem: '444', contaDestino: '999', dataTransferencia: '02/02/2024', dataAgendamento: '02/02/2024', taxa: '34,00', valor: '230,00' },
        ];
      }
    },
    abrirModalExcluir(transferencia) {
      this.transferencia.id = transferencia.id;
      this.modalExcluirAberto = true;
    },
    abrirModal() {
      this.modalAdicionarAberto = true;
    },
    fecharModais() {
      this.modalAdicionarAberto = false;
      this.modalExcluirAberto = false;
      this.novaTransferencia = {
        contaOrigem: '',
        contaDestino: '',
        valor: '',
        dataTransferencia: ''
      };
      this.erroCadastro = null;
      this.erroExcluir = null;
    },
    async cadastrarTransferencia() {
      try {
        const response = await axios.post('http://localhost:8080/transferencia', this.novaTransferencia);
        if (response.status === 201) {
          this.fecharModal();
          this.fetchTransferencias();
        } else {
          this.erroCadastro = 'Erro ao cadastrar transferencia. Tente novamente.';
        }
      } catch (error) {
        this.erroCadastro = 'Erro ao cadastrar transferencia. Tente novamente.';
      }
    },
    async excluirTransferencia() {
      try {
        const response = await axios.delete(`http://localhost:8080/transferencia/${this.transferencia.id}`);
        if (response.status === 201) {
          this.fecharModal();
          this.fetchUsuarios();
        } else {
          this.erroExcluir = 'Erro ao excluir usuário. Tente novamente.';
        }
      } catch (error) {
        this.erroExcluir = 'Erro ao excluir usuário. Tente novamente.';
      }
    }
  }
};
</script>

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
</style>
