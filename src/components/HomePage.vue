<script>
import MenuLateral from "@/components/MenuLateral.vue";

export default {
  components: { MenuLateral }
};
</script>

<template>
  <div id="app">
    <MenuLateral />
    <div class="conteudo-com-menu">
      <router-view />
    </div>
  </div>
</template>

<style>

#app {
  display: flex;
  height: 100vh;
}

.conteudo-com-menu {
  flex: 1;
  overflow: auto; 
  padding: 20px; 
  margin-left: 200px; 
  width: 1200px; 
  z-index: 1;
  position: relative;
}

</style>