import axios from "axios";
import { API_URL } from "configs/AppConfig";

class AdminService {

    saveAdmin(admin) {
        return axios.post(API_URL + 'process_register/', admin)
    }
}

export default new AdminService