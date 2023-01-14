import axios from "axios";
import { API_URL } from "configs/AppConfig";

class RdvDispo {

    getAll() {
        // return axios.get(API_URL + 'rdvdispo/')
        return fetch(API_URL + 'rdvdispo/')
    }
}

export default new RdvDispo()