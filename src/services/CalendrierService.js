import axios from "axios";
import { API_URL } from "configs/AppConfig";

class CalendrierService {

    saveCalendrier(calendrier) {
        return axios.post(API_URL + 'calendrier/', calendrier)
    }

}

export default new CalendrierService()