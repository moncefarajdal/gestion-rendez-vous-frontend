import axios from "axios";
import { API_URL } from "configs/AppConfig";

class SuccursaleService {

    saveSuccursale(succursale) {
        return axios.post(API_URL + 'succursale/', succursale)
    }

    getNomByChef(chef) {
        return axios.get(API_URL + 'succursale/chef/' + chef)
    }

    getByService(reference) {
        return axios.get(API_URL + 'succursale/service/reference/' + reference)
    }
}

export default new SuccursaleService