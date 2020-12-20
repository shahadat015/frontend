<template>
	<form class="form-signin" @submit.prevent="submit">
		<h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
		<label for="inputEmail" class="sr-only">Email address</label>
		<input type="email" v-model="credentials.email" class="form-control" placeholder="Email address" required="" autofocus="">
		<label for="" class="sr-only">Password</label>
		<input type="password" v-model="credentials.password" class="form-control" placeholder="Password" required="">
		<div class="form-text text-danger" v-if="errors == 'Unauthorized'"> <strong> Credentials does not match to our record</strong></div>
		<div class="checkbox mb-3">
			<label>
				<input type="checkbox" value="remember-me" v-model="credentials.remember"> Remember me
			</label>
		</div>
		<button :disabled="disabled" class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
	</form>
</template>
<script>
    import { mapActions } from 'vuex';
	export default {
		name: "Login",
        data(){
            return {
            	credentials: { 
            		email: "",
                	password: "",
                	remember: "",
            	},
                errors: {},
                disabled: false
            }
        },


	    methods: {
            ...mapActions({
                login: 'auth/login',
            }),
            async submit(){
                try{
                	this.disabled = true;
                    let response = await this.login(this.credentials);
                    User.loginResponse(response);
                    location.href = "/";
                }catch(e){
                	this.disabled = false;
                    this.errors = e.response.data.error
                }
            }
	    }
	}
</script>
<style>
.form-signin {
  width: 100%;
  max-width: 430px;
  padding: 15px;
  margin: auto;
  margin-top: 100px
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>