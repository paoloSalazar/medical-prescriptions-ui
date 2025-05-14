import http from "./http-common"

class DoctorsDataService {
  get (id) {
    return http.get(`/doctors/${id}`);
  }

  update (id, data) {
    return http.put(`/doctors/${id}`, data);
  }

  delete (id) {
    return http.delete(`/doctors/${id}`);
  }
  
  getAll () {
    return http.get("/doctors");
  }

  create (data) {
    return http.post("/doctors", data);
  }
}

export default new DoctorsDataService();