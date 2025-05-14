import http from "./http-common"

class MedicationsDataService {
  get (id) {
    return http.get(`/medications/${id}`);
  }
  getAll () {
    return http.get("/medications");
  }
  create (data) {
    return http.post("/medications", data);
  }
  update (id, data) {
    return http.put(`/medications/${id}`, data);
  }
  delete (id) {
    return http.delete(`/medications/${id}`);
  }

}

export default new MedicationsDataService();