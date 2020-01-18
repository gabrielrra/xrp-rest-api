# REST API for XRP
Make your own XRP Ripple RESTful API using Node.

## Installing
After cloning make sure you install the dependencies
  ```
    yarn install
  ```
Nodemon is installed so the server can restart whenever you save a file.

To run the server with `Nodemon` just use the script: 
  ```
    yarn dev
  ```

Use whatever program that makes HTTP requests you like to test it (Postman, Insomnia, etc...).

## Usage

This template comes with two methods: one for retrieving info from a given XRP address and another to transfer XRP between two accounts.

### GET info

After starting the server just a make a GET request to `http://localhost:3333/info` with a query param `myAddress`, that is you XRP address. You can generate test addresses on [Testnet](https://xrpl.org/xrp-testnet-faucet.html).
You can test this on your browser:

http://localhost:3333/info?myAddress=rfe21ovi4pLzQfszv3DnFWAT4VRkPZCQuS


### POST payment

After starting the server just a make a POST request to `http://localhost:3333/pay` with two parameters on the body:


**payment: *JSON***
A payment object with at least the minimal information to make a transfer

##### Example
```json
{
  "TransactionType": "Payment",
  "Account": senderXRPAddress,
  "Amount": "2000000",
  "Destination": receiverXRPAddress,
},
```
**secret: *String***
The *secret* of the sender's XRP account