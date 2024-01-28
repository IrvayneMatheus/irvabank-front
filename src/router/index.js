import { createRouter, createWebHistory } from 'vue-router';
import Clientes from "@/components/Cliente.vue";
import Transferencias from "@/components/Transferencia.vue";

const routes = [
  { path: "/clientes", component: Clientes },
  { path: "/transferencias", component: Transferencias },
  { path: "/", redirect: "/clientes" }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
