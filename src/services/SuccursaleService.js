import axios from "axios";
import { API_URL } from "configs/AppConfig";

class SuccursaleService {

    saveSuccursale(succursale) {
        return axios.post(API_URL + 'succursale/', succursale)
    }
}

export default SuccursaleService