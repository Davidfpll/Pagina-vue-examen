<template>
  <div id="tabla-mascotas">
    <table class="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripcion</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="mascota in mascotas" :key="mascota._id">
           <td v-if="editando === mascota.id">
              <input type="text" class="form-control" v-model="mascota.nombre" />
          </td>
          <td v-else>
              {{ mascota.nombre }}
          </td>
          <td v-if="editando === mascota.id">
              <input type="text" class="form-control" v-model="mascota.descripcion" />
          </td>
          <td v-else>
              {{ mascota.descripcion }}
          </td>
         <td v-if="editando === mascota.id">
			<button class="btn btn-success" @click="guardarMascota(mascota)">💾 Guardar</button>
			<button class="btn btn-secondary ml-2" @click="cancelarEdicion(mascota)">❌ Cancelar</button>
		</td>
		<td v-else>
			<button class="btn btn-info" @click="editarMascota(mascota)">✏️ Editar</button>
			<button class="btn btn-danger ml-2" @click="borrarMascota(mascota)">🗑️ Eliminar</button>
		</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'tabla-mascotas',
  data() {
	return {
		mascotas:[],
		editando: null,
	}
},
  methods: {
	editarMascota(mascota) {
		this.mascotasEditada = Object.assign({}, mascota);
		this.editando = mascota.id;
	},
	guardarMascota(mascota) {

		if (!mascota.nombre.length || !mascota.descripcion.length) return;
		const requestOptions = {
			method: 'PUT',
			headers:{
				Authorization: `Bearer ${global.token}`,
				"Content-Type": "application/json"
			},
			redirect: 'follow',
			body: JSON.stringify({
				"nombre": mascota.nombre,
				"descripcion": mascota.descripcion
			})
		};

		fetch(`${process.env.VUE_APP_URL_BACK}/api/mascotas/${mascota._id}`, requestOptions)
			.then(response => response.text())
			.then(JSON.parse)
			.catch(error => console.log('error', error));

		this.editando = null;
    },
	cancelarEdicion(mascota) {
        Object.assign(mascota, this.mascotaEditada);
        this.editando = null;
      },
	
	async listadoMascotas(){
		var requestOptions = {
			method: 'GET',
			redirect: 'follow'
		};
		const respuesta = await fetch(`${process.env.VUE_APP_URL_BACK}/api/mascotas`, requestOptions)
			.then(response => response.text())
			.then(JSON.parse)
			.catch(error => console.log('error', error));
		this.mascotas = respuesta
	},
	borrarMascota(mascota) {
		if ( !mascota.id ) return;

		const requestOptions = {
			method: 'DELETE',
			headers:{
				Authorization: `Bearer ${global.token}`
			},
			redirect: 'follow',
		};

		fetch(`${process.env.VUE_APP_URL_BACK}/api/mascotas/${mascota._id}`, requestOptions)
			.then(response => response.text())
			.then(JSON.parse)
			.catch(error => console.log('error', error));
		
		this.mascotas = this.mascotas.filter(_mascota => ''+_mascota.id !== ''+mascota.id);
			
		this.editando = null;
	}
},
	mounted() {
      this.listadoMascotas();
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
