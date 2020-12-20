export default {
    namespaced: true,

    state: {
        products: [],
        pagination: {}
    },

    actions: {
        async getProducts ({ commit }, payload) {
            return await axios.get(`/products?page=${payload.current_page}&per_page=${payload.per_page}&query=${payload.query}`);
        },
        async storeProduct ({ commit }, product) {
            return await axios.post('/products', product);
        },

        async updateProduct ({ commit }, payload) {
            return await axios.post(`/products/${payload.id}`, payload.formData);
        },

        async deleteProduct ({ commit }, product) {
            return await axios.delete(`/products/${product}`);
        }
    }
}