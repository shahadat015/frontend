import Token from './Token'
import Storage from './Storage'

class User {
	loginResponse(response) {
		const token = response.data.access_token;
        if(Token.isValid(token)) {
        	Storage.store(token);
        }
    }

    hasToken() {
    	const token = Storage.getToken();

    	if(token) {
    		return Token.isValid(token) ? true : false;
    	}

    	return false;
    }

    loggedIn() {
    	return this.hasToken();
    }

    logout() {
    	Storage.clear();
    }

    name() {
    	if(this.loggedIn()) {
    		Storage.getUser();
    	}
    }

    id() {
    	if(this.loggedIn()) {
    		const payload = Token.payload(Storage.getToken());
    		return payload.sub;
    	}
    }

    own(id) {
        return this.id() == id;
    }
}

export default User = new User();