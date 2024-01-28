<template>
  <div class="menu-lateral">
  <img src="@/components/icons/icon.png" alt="Logo IrvaBank" class="logo-img">
    <router-link to="/clientes" class="nav-link">Clientes</router-link>
    <router-link to="/transferencias" class="nav-link">Transferências</router-link>
  </div>
</template>

<style scoped>
.menu-lateral {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 200px; 
  background-color: #f8f9fa; 
  padding-top: 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); 
}

.logo-img {
  width: 100px;
  margin-left: 40px; 
  margin-bottom: 1rem; 
}

.nav-link {
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #495057; 
}

.nav-link:hover {
  background-color: #e9ecef; 
}
</style>
