export default {
    namespaced: true,

    state: {
        authenticated: false,
        user: null
    },

    getters: {
        authenticated (state) {
            return state.authenticated
        },
        user (state) {
            return state.user
        }
    },

    mutations: {
        SET_AUTHENTICATED (state, value) {
            state.authenticated = value
        },
        SET_USER (state, value) {
            state.user = value
        }
    },

    actions: {
        async login ({ commit }, credentials) {
            return await axios.post('/login', credentials);
        },

        async logout ({ dispatch }) {
            await axios.post('/logout')
        },

        me ({ commit }) {
            return axios.post('/me').then((response) => {
                commit('SET_AUTHENTICATED', true)
                commit('SET_USER', response.data)
            }).catch((e) => {
                commit('SET_AUTHENTICATED', false)
                commit('SET_USER', null)
            })
        }
    }
}