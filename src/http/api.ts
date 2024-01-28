import axios from 'axios';

export async function listarTransferencias() {
    return await axios.get('http://localhost:8080/api/v1/transferencia/');
}

export async function cadastrarCliente(cliente) {
    return await axios.post('http://localhost:8080/api/v1/cliente/insert', cliente);
}

export async function editarCliente(cliente) {
    return await axios.put('http://localhost:8080/api/v1/cliente/update', cliente);
}

export async function excluir(entidade, id) {
    return await axios.delete(`http://localhost:8080/api/v1/${entidade}/delete/${id}`);
}
