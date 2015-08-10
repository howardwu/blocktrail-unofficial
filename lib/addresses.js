var Addresses = function (options, client) {

  /* Returns JSON of Summary information for Addresses. Includes check
   * that addresses are provided and ensures that return from Blocktrail
   * is valid data for use. */
  function Summary(options, callback) {
    if (options && client) {
      var count = 0;
      var result = [];
      options.forEach(function (address) {
        client.address(address, function (error, body) {
          if (error) console.log(error);
          if (body.code !== 404) {
            var total = body.total_transactions_in + body.total_transactions_out;
            result.push({
              address: address,
              balance: body.balance + body.unconfirmed_received,
              confirmedBalance: body.balance,
              unconfirmedBalance: body.unconfirmed_received,
              totalReceived: body.received,
              totalSent: body.sent,
              txCount: total,
            });
          }
          if (count === options.length - 1) {
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
     if (options && client) {
      var count = 0;
      var result = [];
      options.forEach(function (address) {
        client.addressTransactions(address, {
          page: 1,
          limit: 200,
          sort_dir: 'asc'
        }, function (error, body) {
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
            result.push(addressResult);
          }
          if (count === options.length - 1) {
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
    if (options && client) {
      var count = 0;
      var result = [];
      options.forEach(function (address) {
        client.addressUnspentOutputs(address, {
          page: 1,
          limit: 200,
          sort_dir: 'asc'
        }, function (error, body) {
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
            result.push(addressResult);
          }
          if (count === options.length - 1) {
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

  return {
    Summary: Summary,
    Transactions: Transactions,
    Unspents: Unspents
  }
}

module.exports = Addresses;
