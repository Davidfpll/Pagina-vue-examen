import { createWebHistory, createRouter } from "vue-router";
import LoginRegistro from "../components/LoginRegistro.vue";
import RegistroLogin from "../components/RegistroLogin.vue";
import FormularioMascotas from "../components/FormularioMascotas.vue";
import FormularioUsuarios from "../components/FormularioUsuarios.vue";
// import About from "@/views/About.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginRegistro,
  },
  {
    path: "/registroLogin",
    name: "Registro",
    component: RegistroLogin,
  },
  {
    path: "/FormularioMascotas",
    name: "Formlario Mascotas",
    component: FormularioMascotas,
  },
  {
    path: "/FormularioUsuarios",
    name: "Formlario Usuarios",
    component: FormularioUsuarios,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to,from,next)=>{

  if ( to.name === 'Login' || to.name === "Registro" ) return next();
  else if( !localStorage.getItem('token') ) return window.location = "/";
  else return next()

})

export default router;