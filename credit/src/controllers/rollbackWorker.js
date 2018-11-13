const Queue = require("bull");
const debug = require("debug")("debug:rollWorker");
const rollbackQueue = new Queue("rollbackQueue", "redis://redis:6379");
const rollbackPayment = require("../clients/rollbackPayment");

module.exports = rollbackQueue.process(job => {
  debug("job received at rollback queue: ", job.data);
  rollbackPayment(job.data);
});
