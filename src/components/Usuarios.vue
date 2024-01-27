<script>
import axios from 'axios';

export default {
  name: "Clientes",
  data() {
    return {
      titulo: "Clientes",
      usuarios: [],
      modalAdicionarAberto: false,
      modalEditarAberto: false,
      modalExcluirAberto: false,
      novoUsuario: {
        nome: '',
        numeroConta: ''
      },
      usuarioEditando: {
        id: null,
        nome: '',
        numeroConta: ''
      },
      erroCadastro: null,
      erroEditar: null,
      erroExcluir: null
    };
  },
  mounted() {
    this.fetchUsuarios();
  },
  methods: {
    async fetchUsuarios() {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/cliente/findAll');
        this.usuarios = response.data.content;
      } catch (error) {
        console.error('Erro ao obter usuários:', error);
        this.usuarios = [
          { id: 1, nome: 'Usuário Padrão 1', numeroConta: '123' },
          { id: 2, nome: 'Usuário Padrão 2', numeroConta: '456' },
          { id: 3, nome: 'Usuário Padrão 3', numeroConta: '789' }
        ];
      }
    },
    abrirModalExcluir(usuario) {
      this.usuarioEditando.id = usuario.id;
      this.modalExcluirAberto = true;
    },
    abrirModal() {
      this.modalAdicionarAberto = true;
    },
    abrirModalEditar(usuario) {
      this.usuarioEditando.id = usuario.id;
      this.usuarioEditando.nome = usuario.nome;
      this.usuarioEditando.numeroConta = usuario.numeroConta;
      this.modalEditarAberto = true;
    },
    fecharModais() {
      this.modalAdicionarAberto = false;
      this.modalEditarAberto = false;
      this.modalExcluirAberto = false;
      this.novoUsuario = {
        nome: '',
        numeroConta: ''
      };
      this.usuarioEditando = {
        id: null,
        nome: '',
        numeroConta: ''
      };
      this.erroCadastro = null;
      this.erroEditar = null;
      this.erroExcluir = null;
    },
    async cadastrarUsuario() {
      try {
        const response = await axios.post('http://localhost:8080/api/v1/cliente/insert', this.novoUsuario);
        console.log(response.status);
        if (response.status === 200) {
          this.fecharModais();
          this.fetchUsuarios();
        } else {
          this.erroCadastro = 'Erro ao cadastrar usuário. Tente novamente.';
        }
      } catch (error) {
        this.erroCadastro = 'Erro ao cadastrar usuário. Tente novamente.';
      }
    },
    async editarUsuario() {
      try {
        const response = await axios.put('http://localhost:8080/api/v1/cliente/update', this.usuarioEditando);
        console.log(response);
      if (response.status === 200) {
          this.fecharModais();
          this.fetchUsuarios(); 
        } else {
          this.erroEditar = 'Erro ao editar usuário. Tente novamente.';
        }
      } catch (error) {
        this.erroEditar = 'Erro ao editar usuário. Tente novamente.';
      }
    },

    async excluirUsuario() {
      try {
        const response = await axios.delete(`http://localhost:8080/api/v1/cliente/delete/${this.usuarioEditando.id}`);
        if (response.status === 200) {
          this.fecharModais();
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

<template>
  <div class="pagina">
    <h1>{{ titulo }}</h1>
    
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <button @click="abrirModal" class="btn btn-primary mb-3">Cadastrar</button>
    </div>

    <div class="container-fluid">
      <div class="table-responsive">
        <table v-if="usuarios.length" class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Número da Conta</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="usuario in usuarios" :key="usuario.id">
              <th scope="row">{{ usuario.id }}</th>
              <td>{{ usuario.nome }}</td>
              <td>{{ usuario.numeroConta }}</td>
              <td>
                <button @click="abrirModalEditar(usuario)" class="btn btn-warning me-2">Editar</button>
                <button @click="abrirModalExcluir(usuario)" class="btn btn-danger">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else class="centralizado"> Não possui usuários registradas </p>
      </div>
    </div>

    <!-- Modal de cadastro -->
    <div class="modal" :class="{ 'show': modalAdicionarAberto }">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Cadastrar Usuário</h5>
            <button type="button" class="btn-close" @click="fecharModais"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="cadastrarUsuario">
              <div class="mb-3">
                <label for="nome" class="form-label">Nome:</label>
                <input v-model="novoUsuario.nome" type="text" class="form-control" id="nome" required>
              </div>
              <div class="mb-3">
                <label for="agencia" class="form-label">numeroConta:</label>
                <input v-model="novoUsuario.numeroConta" type="text" class="form-control" id="agencia" required>
              </div>
              <p v-if="erroCadastro" class="text-danger">{{ erroCadastro }}</p>
              <div class="centralizado">
                <button type="submit" class="btn btn-primary">Cadastrar</button>
                <button type="button" class="btn btn-secondary" @click="fecharModais">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de edicao -->
    <div class="modal" :class="{ 'show': modalEditarAberto }">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Usuário</h5>
            <button type="button" class="btn-close" @click="fecharModais"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editarUsuario">
              <div class="mb-3">
                <label for="nomeEditar" class="form-label">Nome:</label>
                <input v-model="usuarioEditando.nome" type="text" class="form-control" id="nomeEditar" required>
              </div>
              <div class="mb-3">
                <label for="agenciaEditar" class="form-label">numeroConta:</label>
                <input v-model="usuarioEditando.numeroConta" type="text" class="form-control" id="agenciaEditar" required>
              </div>
              <p v-if="erroEditar" class="text-danger">{{ erroEditar }}</p>
              <div class="centralizado">
                <button type="submit" class="btn btn-primary">Salvar</button>
                <button type="button" class="btn btn-secondary" @click="fecharModais">Cancelar</button>
              </div>
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
            <h5 class="modal-title">Excluir Usuário</h5>
            <button type="button" class="btn-close" @click="fecharModais"></button>
          </div>
          <div class="modal-body centralizado">
          <p v-if="erroExcluir" class="text-danger">{{ erroExcluir }}</p>
            <p>Deseja realmente excluir o usuário?</p>
            <button type="button" class="btn btn-danger" @click="excluirUsuario">Sim</button>
            <button type="button" class="btn btn-secondary" @click="fecharModais">Cancelar</button>
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
</style>
