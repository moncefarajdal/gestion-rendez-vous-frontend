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
                // const jwt = response.headers.get('Authorization')
                // if(!jwt) localStorage.setItem('token', jwt);
                // if (response.data.accessToken) {
                //     // localStorage.setItem("Authorization", JSON.stringify(response.data));
                //     localStorage.setItem("token", JSON.stringify(response.data));
                // }
                // return response.data;
                if (response.headers.get('Authorization')) {
                    localStorage.setItem('token', JSON.stringify(response.headers.get('Authorization')))
                }
                console.log(response.headers.get('Authorization'))
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(API_URL + "api/v1/process_register", {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();