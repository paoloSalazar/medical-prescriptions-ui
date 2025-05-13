import http from "./http-common"

class PatientsDataService {
  getAll () {
    return http.get("/patients");
  }

  get (id) {
    return http.get(`/patients/${id}`);
  }

  create (data) {
    return http.post("/patients", data);
  }

  update (id, data) {
    return http.put(`/patients/${id}`, data);
  }

  delete (id) {
    return http.delete(`/patients/${id}`);
  }
}

export default new PatientsDataService();