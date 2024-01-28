

export async function listarTransferencias() {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/transferencia/findAll');
    return response.data.content;
  } catch (error) {
   	return [
      { id: 1, contaOrigem: '123', contaDestino: '567', dataTransferencia: '02/02/2024', dataAgendamento: '02/02/2024', taxa: '12,00', valor: '100,00' },
      { id: 2, contaOrigem: '444', contaDestino: '999', dataTransferencia: '02/02/2024', dataAgendamento: '02/02/2024', taxa: '34,00', valor: '230,00' },
    ];
  }
}

