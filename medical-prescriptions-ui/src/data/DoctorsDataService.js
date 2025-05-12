import http from "./http-common"

class DoctorsDataService {
  getAll () {
    return http.get("/doctors");
  }

  create (data) {
    return http.post("/doctors", data);
  }
}

export default new DoctorsDataService();