const axios = require("axios");

class ClientService {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:48151",
      withCredentials: true
    });
  }

  testEndpoint() {
    return this.service
      .get("/version")
      .then(response => console.log(response.data))
      .catch(error => console.log("error: ", error.response.data));
  }
}

module.exports = ClientService;
