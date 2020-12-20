<template>
	<div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex justify-content-between">
                        <h2>Show Product</h2>
                        <router-link to="/"><button class="btn btn-primary">Back</button></router-link>
                    </div>
                </div>
                <div class="card-body">
                    <img width="200" :src="image" alt="...">
                    <h5 class="card-title mt-5">Title: {{ title }}</h5>
                    <p class="card-text">Description: {{ description }}.</p>
                    <p class="card-text">Price: {{ price }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                title: "",
                price: "",
                description: "",
                image: "",
            }
        },
        created(){
            axios.get(`/products/${this.$route.params.id}`)
                .then(response => {

                    this.title = response.data.data.title,
                    this.price = response.data.data.price,
                    this.description = response.data.data.description
                    this.image = response.data.data.image

                })
                .catch(error => console.log(error));
        }
    }
</script>