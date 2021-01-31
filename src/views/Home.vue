<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex justify-content-between">
                        <h2>Products</h2>
                        <router-link to="/create"><button class="btn btn-primary">Add New Product</button></router-link>
                    </div>
                </div>
                <div class="card-body">
				  	<div class="d-flex justify-content-between">
                        <div class="form-group">
                            <select class="form-control" v-model="params.per_page">
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <input type="text" class="form-control" v-model="params.query" placeholder="Search"/>
                        </div>
                    </div>
				  	<table class="table table-bordered">
				  		<thead>
				  			<tr>
				  				<th scope="col">#</th>
				  				<th scope="col">Title</th>
				  				<th scope="col">Image</th>
				  				<th scope="col">Price</th>
				  				<th scope="col"></th>
				  			</tr>
				  		</thead>
				  		<tbody>
				  			<tr v-for="(product, index) in products" :key="product.id">
				  				<th width="10%">{{ product.id }}</th>
				  				<td>{{ product.title }}</td>
				  				<td>
				  					<img width="50" :src="product.image">
				  				</td>
				  				<td>{{ product.price }}</td>
				  				<td width="10%">
				  					<router-link :to="`/show/${product.id}`" title="View"><i class="fa fa-eye mr-2"></i></router-link>
				  					<router-link :to="`/edit/${product.id}`" title="Edit"><i class="fa fa-edit mr-2"></i></router-link>
				  					<a href="#" @click.prevent="destroyProduct(product.id, index)" title="Delete"><i class="fa fa-trash text-danger"></i></a>
				  				</td>
				  			</tr>
				  			<tr v-if="products.length == 0">
				  				<td colspan="5" class="text-center">No product found</td>
				  			</tr>
				  		</tbody>
				  	</table>
				  	 <pagination
				        v-if="pagination.last_page > 1"
				        :pagination="pagination"
				        :params="params"
				        :offset="5"
				    ></pagination>
  				</div>
  			</div>
  		</div>
  		<vue-progress-bar></vue-progress-bar>
        <vue-snotify></vue-snotify>
  	</div>
</template>

<script>
    import Pagination from '@/components/Pagination.vue'
	import { mapGetters, mapActions } from 'vuex';

	export default {
        data(){
            return {
                params: {
                    per_page: 10,
                    query: "",
                    current_page: 1
                }
            }
        },

        computed: {
            ...mapGetters({
                products: 'product/products',
                pagination: 'product/pagination',
            })
        },

        watch: {
            "params.query"() {
                this.getProducts(this.params);
            },
            "params.per_page"() {
                this.getProducts(this.params);
            },
            "params.current_page"() {
                this.getProducts(this.params);
            }
        },

	    methods: {
	    	...mapActions({
	            getProducts: 'product/getProducts',
                deleteProduct: 'product/deleteProduct',
	        }),
            destroyProduct(id, index){
            	if (confirm("Are you sure to delete?")) {
            		this.$Progress.start();
                    this.deleteProduct(id).then(res => {
                        this.getProducts(this.params);
                    	this.$Progress.finish();
                    	this.$snotify.success('Product successfully deleted',"Success");
                    }).catch(e => {
                    	this.$snotify.error('Product deleting failed',"Error");
                    	this.$Progress.fail();
                    });
				}
            }
	    },

	    created(){
	    	this.getProducts(this.params);
	    },
        components: {
            Pagination
        }
	}
</script>
