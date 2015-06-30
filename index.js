var blocktrail = require('blocktrail-sdk');

var Addresses = require('./lib/addresses.js');
var Blocks = require('./lib/blocks.js');
var Transactions = require('./lib/transactions.js');

var CLIENT;

/* Initialize the blocktrailAPI object with a specified
 * network. If no network is provided, default will be
 * set to Bitcoin Mainnet. */
function blocktrailAPI(options) {
  if (!(this instanceof blocktrailAPI)) return new blocktrailAPI(options);
  options = options || {};
  if (!options.network) console.log("Warning: Network was not specified, defaulting to Bitcoin Mainnet.");
  var apiKey = options.apiKey || process.env.APIKEY;
  var apiSecret = options.apiSecret || process.env.APISECRET;
  if (!apiKey || !apiSecret) console.log("Warning: API Parameters are incomplete.");
  CLIENT = createClient(options.network, apiKey, apiSecret);
}

/* Returns the address of the specified network.
 * Includes error handling for erroneous networks.
 * Default network is mainnet. */
function createClient(network, apiKey, apiSecret) {
  var client = blocktrail.BlocktrailSDK({apiKey: apiKey, apiSecret: apiSecret, network: "BTC", testnet: false});
  if (network === 'testnet') {
    client = blocktrail.BlocktrailSDK({apiKey: apiKey, apiSecret: apiSecret, network: "BTC", testnet: true});
  }
  return client;
}

/* Get Summary, Transactions, and Unspents information
 * for provided Addresses (in array). */
blocktrailAPI.prototype.Addresses = {
  Summary: function (options) {
    options = { addresses: options.addresses, client: CLIENT };
    Addresses.Summary(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  },
  Transactions: function (options) {
    options = { addresses: options.addresses, client: CLIENT };
    Addresses.Transactions(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  },
  Unspents: function (options) {
    options = { addresses: options.addresses, client: CLIENT };
    Addresses.Unspents(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  }
}

/* Get Block and Transaction information for specified Blocks,
 * get Transactions for specified Blocks, and Propogate to the
 * network a Block by specified blockHex */
blocktrailAPI.prototype.Blocks = {
  Get: function (options) {
    options = { blockIds: options.blockIds, client: CLIENT };
    Blocks.Get(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  },
  Latest: function () {
    var options = { client: CLIENT };
    Blocks.Latest(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  },
  Propogate: function (options) {
    options = { blockHex: options.blockHex, client: CLIENT };
    Blocks.Propogate(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  },
  Transactions: function (options) {
    options = { blockIds: options.blockIds, client: CLIENT };
    Blocks.Transactions(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  }
}

/* Get Transaction, Outputs, and Status information for 
 * a specified Transaction. Get latest Transaction and also 
 * propogate a Transaction. */
blocktrailAPI.prototype.Transactions = {
  Get: function (options) {
    options = { txids: options.txids, txIds: options.txIds, client: CLIENT };
    Transactions.Get(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  },
  Latest: function () {
    var options = { client: CLIENT };
    Transactions.Latest(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  },
  Outputs: function (options) {
    options = { outputs: options.outputs, client: CLIENT };
    Transactions.Outputs(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  },
  Propogate: function (options) {
    options = { hex: options.hex, txHex: options.txHex, client: CLIENT };
    Transactions.Propogate(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  },
  Status: function (options) {
    options = { txids: options.txids, txIds: options.txIds, client: CLIENT };
    Transactions.Status(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  }
}

module.exports = blocktrailAPI;
