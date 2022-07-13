<template>
<div id="login-registro" class="row">
	<div class="col-12">
		<h1 class="text-center pt-5">Registro MASCOTAS</h1>
	</div>
	<div class="col-12">
		<div class="logo centrar">
			<img src="https://www.segurmaniazurekin.eus/a/2020/11/segurmania_mascotas_destacada.jpg" alt="">
		</div>

		<div class="columnas">

			<div class="inputusuario separacion">
				<input
					v-model="usuario.email"
					type="email"
					:class="{ 'is-invalid': procesando && emailInvalido }"
					class="form-control"
					placeholder="EMAIL"
				/>
			</div>
			<div class="inputusuario separacion">
				<input 
					type="password"
					placeholder="CONTRASEÑA"
					class="form-control"
					v-model="usuario.contrasena"
				/>
			</div>
		</div>
		<div class="separacion acceder text-center pb-5">
			<button 
				type="button"
				class="btn btn-primary"
				@click="login(usuario)"
			>Acceder</button>
			<button 
				type="button"
				class="btn btn-primary"
				@click="()=>{
					this.$router.push('/registro')
				}"
			>Registrarse</button>
		</div>
	</div>
</div>
</template>

<script>
export default {
   name: 'login-registro',
   data() {
		return {
			usuario:{
				email:'',
				contrasena: ''
			}
		}
	},
	methods: {

		async login(usuario){

			const requestOptions = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					"user": usuario.email,
					"pass": usuario.contrasena
				}),
				redirect: 'follow'
			};

			const respuesta = await fetch(`${process.env.VUE_APP_URL_BACK}/api/login`, requestOptions)
			.then(response => response.text())
			.then(JSON.parse)
			.catch(error => console.log('error', error));

			console.log('respuesta',respuesta)
		}
	}
};
</script>


<style>

.columnas {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.centrar {
	display: flex;
	justify-content: center;
}
.logo img {
	width: 25vw;
}

.separacion{
	margin-top: 20px;
}

.inputusuario{
	width: 20vw !important;
}

</style>