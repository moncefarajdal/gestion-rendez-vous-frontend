import axios from "axios";
import { API_URL } from "configs/AppConfig";

class SuccursaleService {

    getSuccursaleList() {
        return axios.get(API_URL + 'succursale/')
    }
}

export default new SuccursaleService