import axios from "axios";

// const API_URL = "http://localhost:8090/api/v1/";
const API_URL = "http://localhost:8090/";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "login", {
                username,
                password
            })
            .then(response => {
                // console.log(response.headers['authorization'])
                if (response.headers['authorization']) {
                    localStorage.setItem('token', JSON.stringify(response.headers['authorization']))
                    this.decode()
                }
            });
    }

    logout() {
        // localStorage.removeItem('token');
        // localStorage.removeItem('role');
        localStorage.clear();
    }

    register(username, email, password) {
        return axios.post(API_URL + "api/v1/process_register", {
            username,
            email,
            password
        });
    }

    registerClient(username, email, password, cin) {
        return axios.post(API_URL + "api/v1/client/", {
            username,
            email,
            password,
            cin
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }

    decode() {
        let token = localStorage.getItem('token')
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        var parsedToken = JSON.parse(jsonPayload)
        console.log(parsedToken)
        var role = parsedToken['sub'].toString()
        var userRole = parsedToken['roles'].toString()
        localStorage.setItem('userRole', userRole.substring(1, userRole.length-1))
        localStorage.setItem('role', role)
        return JSON.parse(jsonPayload);
    }
}

export default new AuthService();