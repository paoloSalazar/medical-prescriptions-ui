import http from "./http-common"

class AppointmentsDataService {
  get (id) {
    return http.get(`/appointments/${id}`);
  }

  update (id, data) {
    return http.put(`/appointments/${id}`, data);
  }

  delete (id) {
    return http.delete(`/appointments/${id}`);
  }
  
  getAll () {
    return http.get("/appointments");
  }

  create (data) {
    return http.post("/appointments", data);
  }
}

export default new AppointmentsDataService();