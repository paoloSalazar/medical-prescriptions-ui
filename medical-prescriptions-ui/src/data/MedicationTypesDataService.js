import http from "./http-common"

class MedicationTypesDataService {
  get (id) {
    return http.get(`/medicationtypes/${id}`);
  }
  getAll () {
    return http.get("/medicationtypes");
  }
  create (data) {
    return http.post("/medicationtypes", data);
  }
  update (id, data) {
    return http.put(`/medicationtypes/${id}`, data);
  }
  delete (id) {
    return http.delete(`/medicationtypes/${id}`);
  }

}

export default new MedicationTypesDataService();