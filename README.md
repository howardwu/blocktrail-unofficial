# blocktrail-unofficial
A Blocktrail adapter built to standardize the output of requests to follow the common-blockchain convention

[![Version](http://img.shields.io/npm/v/blocktrail-unofficial.svg)](https://www.npmjs.org/package/blocktrail-unofficial)

A Blocktrail adapter built to standardize the output of requests to follow the common-blockchain convention. Aliases are introduced in the return of functions to account for differences in convention between the two standards. It is our hope that the Bitcoin community will come to an agreement on proper style and convention for requests on addresses, transactions, and blocks. 

[Information on common-blockchain for convention](https://github.com/common-blockchain/common-blockchain/blob/master/README.md)

## Installation

Install as you normally install an npm module:
```
  npm install blocktrail-unofficial
```

## Usage

First, export a Blocktrail ``` APIKEY ``` and ``` APISECRET ``` by creating an API Key from your account on Blocktrail.

To use the blocktrail API, simply require the module.
```javascript
  var blocktrailAPI = require('blocktrail-unofficial');
  var commonBlockchain = blocktrailAPI({ network: 'mainnet' });
```
For Mainnet, use ``` blocktrailAPI({ network: 'mainnet' }) ``` when calling a function. For Testnet, use ``` blocktrailAPI({ network: 'testnet' }) ``` when calling a function. By default, if no parameter is provided, Mainnet will be used.

[See abstract-common-blockchain for API](https://github.com/blockai/abstract-common-blockchain/blob/master/README.md)

### Addresses

#### commonBlockchain.Addresses.Summary
Summary returns a JSON of information regarding provided Bitcoin addresses.
```javascript
  commonBlockchain.Addresses.Summary({
    addresses: ["1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq", "1DmUeGjuQWLHxq5jhyn3uPCD9N16Ar9xGw"]
  }, function (err, resp) {
    console.log(resp);
  });
```

#### commonBlockchain.Addresses.Transactions
Transactions returns a JSON with a list of transactions associated with the provided Bitcoin addresses.
```javascript
  commonBlockchain.Addresses.Transactions({
    addresses: ["1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq", "1DmUeGjuQWLHxq5jhyn3uPCD9N16Ar9xGw"]
  }, function (err, resp) {
    console.log(resp);
  });

```

#### commonBlockchain.Addresses.Unspents
Unspents returns a JSON with a list of unspent outputs for the provided Bitcoin addresses.

```javascript
  commonBlockchain.Addresses.Unspents({
    addresses: ["1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq", "1DmUeGjuQWLHxq5jhyn3uPCD9N16Ar9xGw"]
  }, function (err, resp) {
    console.log(resp);
  });
```

### Blocks

#### commonBlockchain.Blocks.Get
Get returns a JSON of information for the provided block IDs.
```javascript
  commonBlockchain.Blocks.Get({
    blockIds: [
      "00000000000000000216a936ebc1962e319a51bab8d3eae69335ac940284491d", 
      "00000000000000001034f207d3ce18f03054ddfb0e4dba712f5b76cb1cda9499"]
  }, function (err, resp) {
    console.log(resp);
  });
```

#### commonBlockchain.Blocks.Latest
Latest returns a JSON of the latest blocks to hit Blocktrail's endpoint.
```javascript
  commonBlockchain.Blocks.Latest(function (err, resp) {
    console.log(resp);
  });
```

#### commonBlockchain.Blocks.Propogate
Propogate is unsupported with Blocktrail as of now. Any call to Propogate will return an error.
```javascript
  commonBlockchain.Blocks.Propogate({
    blockHex: ''
  }, function (err, resp) {
    console.log(resp);
  });
```

#### commonBlockchain.Blocks.Transactions
Transactions returns a JSON of transactions for the provided block IDs.
```javascript
  commonBlockchain.Blocks.Transactions({
    blockIds: [
      "00000000000000000216a936ebc1962e319a51bab8d3eae69335ac940284491d",
      "00000000000000001034f207d3ce18f03054ddfb0e4dba712f5b76cb1cda9499"]
  }, function (err, resp) {
    console.log(resp);
  });
```

### Transactions

#### commonBlockchain.Transactions.Get
Get returns a JSON with transaction data for provided transaction IDs.
```javascript
  commonBlockchain.Transactions.Get({
    txIds: [
      "186efd8689fc403e5cc6faeef9497fcf177750b52afe55f407244d0c95625836",
      "9375818c85a6712416dac6edd403498180ee9ee0e604bd11ec35beaea384da51"]
  }, function (err, resp) {
    console.log(resp);
  });
```

#### commonBlockchain.Transactions.Latest
Latest returns a JSON of the latest transactions to hit Blocktrail's endpoint (mostly unconfirmed).
```javascript
  commonBlockchain.Transactions.Latest(function (err, resp) {
    console.log(resp);
  });
```

#### commonBlockchain.Transactions.Outputs
Outputs returns a JSON of output information for provided transaction IDs.
```javascript
  commonBlockchain.Transactions.Outputs({
    outputs: [
      {
        vout: 0,
        txId: "186efd8689fc403e5cc6faeef9497fcf177750b52afe55f407244d0c95625836"
      }
    ]
  }, function (err, resp) {
    console.log(resp);
  });
```

#### commonBlockchain.Transactions.Propogate
Propogate is unsupported with Blocktrail as of now. Any call to Propogate will return an error.
```javascript
  commonBlockchain.Transactions.Propogate({
    hex: ''
  }, function (err, resp) {
    console.log(resp);
  });
```

#### commonBlockchain.Transactions.Status
Transactions returns a JSON of transactions for the provided transaction IDs.
```javascript
  commonBlockchain.Transactions.Status({
    txIds: [
      "186efd8689fc403e5cc6faeef9497fcf177750b52afe55f407244d0c95625836",
      "9375818c85a6712416dac6edd403498180ee9ee0e604bd11ec35beaea384da51"]
  }, function (err, resp) {
    console.log(resp);
  });
```

## Examples

There are examples for using Addresses, Blocks, and Transactions, provided in the /examples folder. Each function includes a Mainnet and Testnet sample call and where possible, an invalid example is provided to show error handling. Expect all returns to be of the form (error, response).

## Convention

Standard convention is described fully by common-blockchain in the ```types.json``` file: https://github.com/blockai/common-blockchain/blob/master/types.json

## Maintainers
  * Howard Wu (howardwu) - howardwu@berkeley.edu
  * Andrew Malta (andrewmalta13) - andrew.malta@yale.edu
