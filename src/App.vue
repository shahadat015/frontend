<template>
	<div>
		<div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
		  <h5 class="my-0 mr-md-auto font-weight-normal">weDevs</h5>
		  <a v-if="loggedIn" class="btn btn-outline-primary" href="#" @click.prevent="submit">Logout</a>
		  <router-link v-else class="btn btn-outline-primary" to="/create">Add New</router-link>
		</div>
		<div class="container my-5">
			<router-view/>
		</div>
	</div>
</template>
<script>
	import {mapActions} from 'vuex'

	export default {
		data(){
			return {
				loggedIn: User.loggedIn(),
			}
		},
		methods: {
			...mapActions({
				logout: 'auth/logout',
			}),
			async submit(){
				await this.logout();
				User.logout();
                location.href = 'login';
			}
		}
	}
</script>