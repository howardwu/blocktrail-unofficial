/* Returns JSON of Get information for Block IDs. Includes check
 * that blockIds are provided and ensures that return from Blocktrail
 * is valid data for use. */
function Get(options, callback) {
  if (options.blockIds && options.client) {
    var count = 0;
    var result = [];
    options.blockIds.forEach(function (blockId) {
      options.client.block(blockId, function (error, body) {
        if (error) console.log(error);
        if (body.code != 404) {
          result.push({
            blockHex: null,
            blockId: blockId
          });
        }
        if (count === options.blockIds.length - 1) {
          callback(null, result);
        }
        count += 1;
      });
    });
  }
  else {
    callback('error: no block id provided', null);
  }
}

/* Returns JSON of Latest information for Blocks. Ensures that 
 * return from Blocktrail is valid data for use. */
function Latest(options, callback) {
  if (options.client) {
    options.client.blockLatest(function (error, body) {
      if (error) console.log(error);
      if (body.code !== 404) {
        var result = {
          blockHex: null,
          blockId: body.hash
        };
        callback(null, result);
      }
    });
  }
  else {
    callback('error: no client provided', null);
  }
}

/* Propogates a provided blockHex. Currently Unsupported by Blocktrail. */
function Propogate(options, callback) {
  callback('error: propogate block to Blocktrail. unsupported function.', null);
}

/* Returns JSON of Transaction information for provided Block IDs. Includes
 * check that blockIds are provided and ensures that return from Blocktrail
 * is valid data for use. */
function Transactions(options, callback) {
  if (options.blockIds && options.client) {
    var count = 0;
    var result = [];
    options.blockIds.forEach(function (blockId) {
      options.client.blockTransactions(blockId, {
        page: 1,
        limit: 200,
        sort_dir: 'asc'
      }, function (error, body) {
        if (error) console.log(error);
        if (body.code !== 400) {
          var transactionResult = [];
          body.data.forEach(function (transaction) {
            transactionResult.push({
              txid: transaction.hash,
              txId: transaction.hash
            });
          });
          result.push({
            blockId: blockId,
            result: transactionResult
          });
        }
        if (count === options.blockIds.length - 1) {
          callback(null, result);
        }
        count += 1;
      });
    });
  }
  else {
    callback('error: no block id provided', null);
  }
}

module.exports.Get = Get;
module.exports.Latest = Latest;
module.exports.Propogate = Propogate;
module.exports.Transactions = Transactions;
