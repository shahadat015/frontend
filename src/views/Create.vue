<template>
	<div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex justify-content-between">
                        <h2>Create Product</h2>
                        <router-link to="/"><button class="btn btn-primary">Back</button></router-link>
                    </div>
                </div>
                <div class="card-body">
					<form @submit.prevent="createProduct">
						<div class="form-group">
							<label for="">Title</label>
							<input type="text" class="form-control" v-model="title">
							<small class="form-text text-danger" v-if="errors.title">{{ errors.title[0] }}</small>
						</div>
						<div class="form-group">
							<label for="">Price</label>
							<input type="number" class="form-control" v-model.number="price">
							<small class="form-text text-danger" v-if="errors.price">{{ errors.price[0] }}</small>
						</div>
						<div class="form-group">
						    <label for="">Description</label>
						    <textarea class="form-control" rows="4" v-model="description"></textarea>
						    <small class="form-text text-danger" v-if="errors.description">{{ errors.description[0] }}</small>
						</div>
						<div class="form-group">
						    <label for="">Image</label>
						    <input type="file" class="form-control-file" @change="handleImage">
						    <small class="form-text text-danger" v-if="errors.image">{{ errors.image[0] }}</small>
						  </div>
						<button :disabled="disabled" type="submit" class="btn btn-primary">Submit</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
    import { mapActions } from 'vuex';
	export default {
        data(){
            return {
                title: "",
                price: "",
                description: "",
                image: "",
                errors: {},
                disabled: false
            }
        },


	    methods: {
            ...mapActions({
                storeProduct: 'product/storeProduct'
            }),
            async createProduct(){
                try{
                	this.disabled = true;
                    let formData = new FormData();
                    formData.append('title', this.title);
                    formData.append('price', this.price);
                    formData.append('description', this.description);
                    formData.append('image', this.image);
                    await this.storeProduct(formData);
                    this.$router.push("/");
                }catch(e){
                	this.disabled = false;
                    this.errors = e.response.data.errors
                }
            },
            handleImage(e){
                this.image = e.target.files[0];
            }
	    }
	}
</script>