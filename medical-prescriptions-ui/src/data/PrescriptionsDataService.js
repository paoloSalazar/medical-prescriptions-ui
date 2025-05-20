import http from "./http-common"

class PrescriptionsDataService  {
  getAll () {
    return http.get("/prescriptions");
  }

  get (id) {
    return http.get(`/prescriptions/${id}`);
  }

  create (data) {
    return http.post("/prescriptions", data);
  }

  update (id, data) {
    return http.put(`/prescriptions/${id}`, data);
  }

  delete (id) {
    return http.delete(`/prescriptions/${id}`);
  }

  getByAppointmentId (id) {
    return http.get(`/prescriptions/appointment/${id}`);
  }
}

export default new PrescriptionsDataService();