<script>
import axios from 'axios';

import TabelaCliente from "@/components/TabelaCliente.vue";


export default {
  components: { TabelaCliente }
};
</script>

<template>
  <div class="pagina">
    <h1>Clientes</h1>

    <TabelaCliente />

  </div>
</template>

<style scoped>
.pagina {
  padding: 20px;
  background-color: #fff;
}
</style>
