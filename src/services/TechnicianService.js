import axios from "axios";
import { API_URL } from "configs/AppConfig";

class SuccursaleService {

    getSuccursaleList() {
        return axios.get(API_URL + 'succursale/')
    }
    saveTechnician(technician) {
        return axios.post(API_URL + 'technicien/', technician)
    }

    getAll() {
        return axios.get(API_URL + 'technicien/')
    }
}

export default new SuccursaleService