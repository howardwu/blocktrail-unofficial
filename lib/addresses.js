/* Returns JSON of Summary information for Addresses. Includes check
 * that addresses are provided and ensures that return from Blocktrail
 * is valid data for use. */
function Summary(options, callback) {
  if (options.addresses && options.client) {
    var count = 0;
    var result = [];
    options.addresses.forEach(function (address) {
      options.client.address(address, function (error, body) {
        if (error) console.log(error);
        if (body.code !== 404) {
          var total = body.total_transactions_in + body.total_transactions_out;
          result.push({
            address: address,
            balance: body.balance,
            totalReceived: body.received,
            totalSent: body.sent,
            txCount: total,
          });
        }
        if (count === options.addresses.length - 1) {
          callback(null, result);
        }
        count += 1;
      });
    });
  }
  else {
    callback('error: no address provided', null);
  }
}

/* Returns JSON of Transaction information for Addresses. Includes check
 * that addresses are provided and ensures that return from Blocktrail
 * is valid data for use. */
function Transactions(options, callback) {
   if (options.addresses && options.client) {
    var count = 0;
    var result = [];
    options.addresses.forEach(function (address) {
      options.client.addressTransactions(address, function (error, body) {
        if (error) console.log(error);
        var addressResult = [];
        if (body.code !== 404) {
          body.data.forEach(function (transaction) {
            addressResult.push({
              blockHeight: transaction.block_height,
              blockId: transaction.block_hash,
              hex: null,
              txHex: null,
              txid: transaction.hash,
              txId: transaction.hash
            });
          });
          result.push({
            address: address,
            result: addressResult
          });
        }
        if (count === options.addresses.length - 1) {
          callback(null, result);
        }
        count += 1;
      });
    });
  }
  else {
    callback('error: no address provided', null);
  }
}

/* Returns JSON of Unspents information for Addresses. Includes check
 * that addresses are provided and ensures that return from Blocktrail
 * is valid data for use. */
function Unspents(options, callback) {
  if (options.addresses && options.client) {
    var count = 0;
    var result = [];
    options.addresses.forEach(function (address) {
      options.client.addressUnspentOutputs(address, function (error, body) {
        if (error) console.log(error);
        var addressResult = [];
        if (body.code !== 404) {
          body.data.forEach(function (unspent) {
            addressResult.push({
              address: address,
              confirmations: unspent.confirmations,
              txid: unspent.hash,
              txId: unspent.hash,
              value: unspent.value,
              amount: unspent.value,
              vout: unspent.index,
              scriptPubKey: unspent.script,
            });
          });
          result.push({
            address: address,
            result: addressResult
          });
        }
        if (count === options.addresses.length - 1) {
          callback(null, result);
        }
        count += 1;
      });
    });
  }
  else {
    callback('error: no address provided', null);
  }
}

module.exports.Summary = Summary;
module.exports.Transactions = Transactions;
module.exports.Unspents = Unspents;
