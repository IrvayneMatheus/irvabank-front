<template>
  <div id="app">
    <MenuLateral />
    <div class="conteudo-com-menu">
      <router-view />
    </div>
  </div>
</template>

<script>
import MenuLateral from "@/components/MenuLateral.vue";

export default {
  name: "App",
  components: {
    MenuLateral
  }
};
</script>

<style>
/* Estilos globais da aplicação aqui */
#app {
  display: flex;
  height: 100vh;
}

.conteudo-com-menu {
  flex: 1;
  overflow: auto; /* Adicionado para permitir rolar o conteúdo se necessário */
  padding: 20px; /* Ajuste conforme necessário */
  margin-left: 200px; /* Largura do menu lateral, mantendo a margem à esquerda */
  width: 1200px; /* Calcula o restante da largura da tela */
  z-index: 1;
  position: relative;
}

.menu-lateral {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 200px; /* Largura do menu lateral, ajuste conforme necessário */
  background-color: #f8f9fa; /* Cor de fundo do Bootstrap */
  padding-top: 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Sombra lateral para um efeito visual */
  z-index: 2;
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
