//client for testing endpoints and check load balance
//the /version endpoint returns the backend that is receiving the req
//service-v2 is a simulated canary

const ClientService = require("./ClientService");
const client = new ClientService();


setInterval(function() {
  client.testEndpoint();
}, 100);
