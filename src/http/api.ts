

export async function listarTransferencias() {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/transferencia/findAll');
    return response.data.content;
  } catch (error) {
   	return null;
  }
}

