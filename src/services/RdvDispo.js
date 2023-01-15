import axios from "axios";
import { API_URL } from "configs/AppConfig";

class RdvDispo {

    getAll() {
        // return axios.get(API_URL + 'rdvdispo/')
        return fetch(API_URL + 'rdvdispo/')
    }

    getBySuccursale(nom) {
        return fetch(API_URL + 'rdvdispo/succursale/' + nom)
    }

    book(rdv) {
        return axios.post(API_URL + 'rendez_vous/book/', rdv)
    }

    bookedRdv(client) {
        return fetch(API_URL + 'rendez_vous/book/client/' + client)
    }
}

export default new RdvDispo();