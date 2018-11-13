const updateCreditTransaction = require("../transactions/updateCredit");

module.exports = function(message) {
  updateCreditTransaction(
    {
      amount: { $gte: 0 }
    },
    {
      $inc: { amount: 1 }
    },
    function(doc, error) {
      if (error) {
        console.log(error);
      }
    }
  )
    .then(() => {
      console.log(`ROLLBACK done over message sent to ${message.destination}`);
    })
    .catch(e => console.log(e));
};
