var blocktrail = require('blocktrail-sdk');
var assert = require('assert');

var Addresses = require('./lib/addresses.js');
var Blocks = require('./lib/blocks.js');
var Transactions = require('./lib/transactions.js');

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
  var client = createClient(options.network, apiKey, apiSecret);
  return {
    Addresses: Addresses(options, client),
    Blocks: Blocks(options, client),
    Transactions: Transactions(options, client)
  }
}

/* Returns the address of the specified network.
 * Includes error handling for erroneous networks.
 * Default network is mainnet. */
function createClient(network, apiKey, apiSecret) {
  if (network === 'testnet') {
    return blocktrail.BlocktrailSDK({apiKey: apiKey, apiSecret: apiSecret, network: "BTC", testnet: true});
  }
  return blocktrail.BlocktrailSDK({apiKey: apiKey, apiSecret: apiSecret, network: "BTC", testnet: false});
}

module.exports = blocktrailAPI;
