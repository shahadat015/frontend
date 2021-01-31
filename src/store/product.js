export default {
    namespaced: true,

    state: {
        products: [],
        pagination: {}
    },

    getters: {
        products(state) {
            return state.products;
        },
        pagination(state) {
            return state.pagination;
        },
    },

    mutations: {
        SET_PRODUCTS(state, value) {
            state.products = value
        },
        SET_PAGINATION(state, value) {
            state.pagination = value
        }

    },

    actions: {
        async getProducts ({ commit }, payload) {
            let response = await axios.get(`/products?page=${payload.current_page}&per_page=${payload.per_page}&query=${payload.query}`);
            commit('SET_PRODUCTS', response.data.data);
            commit('SET_PAGINATION', response.data.meta);
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