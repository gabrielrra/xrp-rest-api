const RippleAPI = require('ripple-lib').RippleAPI;

 // Here you can use a public rippled server
 // It is set to use a TestNet server as default
const api = new RippleAPI({
  server: 'wss://s.altnet.rippletest.net:51233'
});

module.exports = {
  // If you want you can test this method on the browser
  // Remember to pass the XRP address as a query parameter
  // http://localhost:3333/info?myAddress=r32BSEotwFefZa4ADyGtpQhKRhTCF1a7q9
  async getAccountInfo(req, res) {
    //REQUIRED: start the connection to the api
    api.connect().then(() => {

      const {myAddress} = req.query;
      //If the client sends no address
      if (!myAddress) {
        return res.json({message: 'No address found'});
      }

      return api.getAccountInfo(myAddress);
    })
    .then(info => {
      if (info) {
        return res.json(info);
      } else {
        return res.json({message: 'Error, '});
      }
    })
    .catch(error => res.json({error: error.name, message: error.message}))
    .finally(() => api.disconnect()); //Terminate the connection
  },
  /**     4 STEPS required to send a transaction 
   *  1 - Prepare the transaction
   *  2 - Sign the transaction
   *  3 - Submit the transaction (At this point the transaction is in theory complete)
   *  4 - Verify if it succeded
   * 
   * Body of the request must contain a Payment JSON and the secret of the sender XRP account
   * 
   * Request format on client side:
    fetch('http://localhost:3333/pay', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payment: {                    //Minimal payment object, more options can be added, refer to the official documentation
          TransactionType: 'Payment',
          Account: senderXRPAddress,
          Amount: '2000000',
          Destination: receiverXRPAddress,
        },
        secret: firstXRPAddressSecret,
      }),
    })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(console.log());
  }
  */

  async sendPayment (req, res) {
    const {payment, secret} = req.body;
    api.connect().then(() => api.prepareTransaction(payment, {"maxLedgerVersionOffset": 75})) //1 - Prepare
    .then( preparedTx => preparedTx.txJSON) //1.5 - Get the TxJSON
    .then(txJSON => api.sign(txJSON, secret)) //2 - Sign
    .then(response => {
      const {signedTransaction} = response;
      return api.submit(signedTransaction); //3 - Submit
    })
    .then(result => {
      return res.json({result: result});  //4 - Check the result on client side, or modify the code to check here
    })
    .catch(error => res.json({error: error.name, message: error.message}))
    .finally(() => api.disconnect());
  },
}