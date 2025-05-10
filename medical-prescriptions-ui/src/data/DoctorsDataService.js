import http from "./http-common"

class DoctorsDataService {
  getAll () {
    return http.get("/doctors");
  }
}

export default new DoctorsDataService();