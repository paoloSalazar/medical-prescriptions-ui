import axios from "axios";
export default axios.create({
  baseURL: "https://medical-prescriptions.onrender.com/api",
  headers: {
    "Content-type": "application/json"
  }

});