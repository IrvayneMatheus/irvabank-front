<script>
import axios from 'axios';

import TabelaTransferencia from "@/components/TabelaTransferencia.vue";


export default {
  components: { TabelaTransferencia }
};
</script>

<template>
  <div class="pagina">
    <h1>Transferências Financeiras</h1>

    <TabelaTransferencia />

  </div>
</template>

<style scoped>
.pagina {
  padding: 20px;
  background-color: #fff;
}
</style>
