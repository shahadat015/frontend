class Storage {
	setToken(token) {
		localStorage.setItem('token', token);
	}

	getToken() {
		return localStorage.getItem('token');
	}

	store(token, user) {
		this.setToken(token);
	}

	clear() {
		localStorage.removeItem('token');
	}
}

export default Storage = new Storage();