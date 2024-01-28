<script>
import axios from 'axios';

import TabelaTransferencia from "@/components/TabelaTransferencia.vue";
import ModalCadastrarTransferencia from "@/components/ModalCadastrarTransferencia.vue";

export default {
  components: { TabelaTransferencia, ModalCadastrarTransferencia }
};
</script>

<template>
  <div class="pagina">
    <h1>Transferências Financeiras</h1>
    
    <ModalCadastrarTransferencia />

    <TabelaTransferencia />

    
  </div>
</template>

<style scoped>
.pagina {
  padding: 20px;
  background-color: #fff;
}
</style>
