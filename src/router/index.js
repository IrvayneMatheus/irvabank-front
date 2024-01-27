import { createRouter, createWebHistory } from 'vue-router';
import Usuarios from "@/components/Usuarios.vue";
import Transferencias from "@/components/Transferencia.vue";

const routes = [
  { path: "/usuarios", component: Usuarios },
  { path: "/transferencias", component: Transferencias },
  { path: "/", redirect: "/usuarios" }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
