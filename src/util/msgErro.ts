
export function mensagemErro(error) {
	if (error.code == "ERR_NETWORK") {
    	return "Erro no servidor. Entre em contato com o suporte."
  	} else {
    	return error.response.data;
  	}
}