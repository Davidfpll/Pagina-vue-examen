<template>
  <div id="tabla-usuarios">
    <table class="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario in usuarios" :key="usuario._id">
           <td v-if="editando === usuario._id">
              <input type="text" class="form-control" v-model="usuario.nombre" />
          </td>
          <td v-else>
              {{ usuario.nombre }}
          </td>
          <td v-if="editando === usuario._id">
              <input type="text" class="form-control" v-model="usuario.user" />
          </td>
          <td v-else>
              {{ usuario.user }}
          </td>
         <td v-if="editando === usuario._id">
			<button class="btn btn-success" @click="guardarUsuario(usuario)">💾 Guardar</button>
			<button class="btn btn-secondary ml-2" @click="cancelarEdicion(usuario)">❌ Cancelar</button>
		</td>
		<td v-else>
			<button class="btn btn-info" @click="editarUsuario(usuario)">✏️ Editar</button>
			<button class="btn btn-danger ml-2" @click="borrarUsuario(usuario)">🗑️ Eliminar</button>
		</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'tabla-usuarios',
  data() {
	return {
		usuarios:[],
		editando: null,
	}
},
  methods: {
	editarUsuario(usuario) {
		this.usuariosEditada = Object.assign({}, usuario);
		this.editando = usuario._id;
	},
	guardarUsuario(usuario) {
		if (!usuario.nombre.length || !usuario.user.length) return;

		const requestOptions = {
			method: 'PUT',
			headers:{
				Authorization: `Bearer ${global.token}`,
				"Content-Type": "application/json"
			},
			redirect: 'follow',
			body: JSON.stringify({
				"nombre": usuario.nombre,
				"user": usuario.user
			})
		};

		fetch(`${process.env.VUE_APP_URL_BACK}/api/usuarios/${usuario._id}`, requestOptions)
			.then(response => response.text())
			.then(JSON.parse)
			.catch(error => console.log('error', error));
		
			
		this.editando = null;
    },
	borrarUsuario(usuario) {
		if ( !usuario._id.length ||!usuario.user.length ) return;

		const requestOptions = {
			method: 'DELETE',
			headers:{
				Authorization: `Bearer ${global.token}`
			},
			redirect: 'follow',
		};

		fetch(`${process.env.VUE_APP_URL_BACK}/api/usuarios/${usuario._id}`, requestOptions)
			.then(response => response.text())
			.then(JSON.parse)
			.catch(error => console.log('error', error));
		
		this.usuarios = this.usuarios.filter(_usuario => ''+_usuario._id !== ''+usuario._id);
			
		this.editando = null;
    },
	cancelarEdicion(usuario) {
        Object.assign(usuario, this.usuarioEditada);
        this.editando = null;
	},
	
	async listadoUsuarios(){
		var requestOptions = {
			method: 'GET',
			redirect: 'follow'
		};
		const respuesta = await fetch(`${process.env.VUE_APP_URL_BACK}/api/usuarios`, requestOptions)
			.then(response => response.text())
			.then(JSON.parse)
			.catch(error => console.log('error', error));
		this.usuarios = respuesta
	}
},
	mounted() {
      this.listadoUsuarios();
    }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>