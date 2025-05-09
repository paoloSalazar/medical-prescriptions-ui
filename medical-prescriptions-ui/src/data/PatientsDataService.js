import http from "./http-common"

class PatientsDataService {
  getAll () {
    return http.get("/patients");
  }
}

export default new PatientsDataService();