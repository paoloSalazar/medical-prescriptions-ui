import http from "./http-common"

class PatientsDataService {
  getAll () {
    return http.get("/patients");
  }

  create (data) {
    return http.post("/patients", data);
  }
}

export default new PatientsDataService();