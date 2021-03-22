import Axios from "axios";

let urls = {
  test: `http://localhost:3334`,
  development: "http://localhost:3333/",
  production: "https://your-production-url.com/",
};
const api = Axios.create({
  baseURL: `http://localhost:3000`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
