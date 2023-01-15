import axios from "axios";
import { API_URL } from "configs/AppConfig";

class ServiceS {

    getServices() {
        return axios.get(API_URL + 'service/')
    }

}

export default new ServiceS()