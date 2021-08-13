import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8801/v1",
  crossDomain: true,
  headers: {
    "Content-type": "application/json"
  }
});