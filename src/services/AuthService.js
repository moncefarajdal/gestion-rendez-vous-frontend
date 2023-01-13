import axios from "axios";
import { useState } from "react";
import User from "../models/User"

// const API_URL = "http://localhost:8090/api/v1/";
const API_URL = "http://localhost:8090/";
// const [authenticatedUser, setAuthenticatedUser] = useState("")
// const authenticatedUser = new User()
// const [authenticated, setAuthenticated] = useState("")

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "login", {
                username,
                password
            })
            .then(response => {
                if (response.headers['authorization']) {
                    localStorage.setItem('token', JSON.stringify(response.headers['authorization']))
                }
            });
    }

    logout() {
        localStorage.removeItem('token');
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
        // const helper = new JwtHelperService()
        // return helper.decodeToken(localStorage.getItem('token'));
    }

    // loadInfos() {
    //     const tokenDecoded = decode();
    //     const username = tokenDecoded.sub;
    //     const roles = tokenDecoded.roles;
    //     const email = tokenDecoded.email;
    //     const prenom = tokenDecoded.prenom;
    //     const nom = tokenDecoded.nom;
    //     this.authenticatedUser.username = username;
    //     this.authenticatedUser.nom = nom;
    //     this.authenticatedUser.prenom = prenom;
    //     this.authenticatedUser.email = email;
    //     this.authenticatedUser.roles = roles;
    //     console.log(this.authenticatedUser.roles);
    //     localStorage.setItem('token', tokenDecoded);
    //     setAuthenticated = true
    // }
}

export default new AuthService();