const express = require("express");
const os = require("os");

const bodyParser = require("body-parser");
const { Validator, ValidationError } = require("express-json-validator-middleware");

const requestQueue = require("./src/controllers/requestQueue");
const getMessages = require("./src/controllers/getMessages");
const getStatus = require("./src/controllers/getStatus");

const app = express();

const validator = new Validator({ allErrors: true });
const { validate } = validator;

const messageSchema = {
  type: "object",
  required: ["destination", "body"],
  properties: {
    destination: {
      type: "string"
    },
    body: {
      type: "string"
    },
    location: {
      name: {
        type: "string"
      },
      cost: {
        type: "number"
      }
    }
  }
};

const payedReqWorker = require("./src/controllers/payedReqWorker");

app.post("/messages", bodyParser.json(), validate({ body: messageSchema }), requestQueue);

app.get("/messages", getMessages);

app.get("/messages/:requestID/status", getStatus);

app.get("/serverstatus", (req, res, next) => {
  res.status(200).send("OK");
});

app.get("/hostname", (req, res, next) => {
  const hostname = os.hostname();
  res.status(200).send(hostname);
});

app.get("/version", (req, res, next) => {
  const serviceVersion = "service-v2"
  res.status(200).send(serviceVersion);
});

app.use(function(err, req, res, next) {
  console.log(res.body);
  if (err instanceof ValidationError) {
    res.sendStatus(400);
  } else {
    res.sendStatus(500);
  }
});

app.listen(9005, function() {
  console.log("App started on PORT 9005");
});
