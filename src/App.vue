<template>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"  integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <!-- <div id="nav">
      <router-link to="/">Login</router-link> |
      <router-link to="/registro">Registro</router-link>
  </div> -->
  <router-view />
</template>

<script>
// import LoginRegistro from './components/LoginRegistro.vue'

export default {
  name: 'App',
  components: {
    // LoginRegistro
  }
}
</script>

<style>
button {
    background: #009435;
    border: 1px solid #009435;
  }
</style>
