<template>

  <div class="menu-lateral">
  <img src="@/components/icons/icon.png" alt="Logo IrvaBank" class="logo-img">
    <router-link to="/usuarios" class="nav-link">Clientes</router-link>
    <router-link to="/transferencias" class="nav-link">Transferências</router-link>
  </div>
</template>

<script>
export default {
  name: "MenuLateral"
};
</script>

<style scoped>
.menu-lateral {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 200px; /* Largura do menu lateral, ajuste conforme necessário */
  background-color: #f8f9fa; /* Cor de fundo do Bootstrap */
  padding-top: 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Sombra lateral para um efeito visual */
}

.logo-img {
  width: 100px; /* Largura da imagem */
  margin-left: 40px; /* Margem à esquerda da imagem */
  margin-bottom: 1rem; /* Adicione margem inferior para separar a imagem dos links */
}

.nav-link {
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #495057; /* Cor do texto do Bootstrap */
}

.nav-link:hover {
  background-color: #e9ecef; /* Cor de fundo ao passar o mouse do Bootstrap */
}
</style>
