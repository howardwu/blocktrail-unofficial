var Blocks = function (options, client) {
  /* Returns JSON of Get information for Block IDs. Includes check
   * that blockIds are provided and ensures that return from Blocktrail
   * is valid data for use. */
  function Get(options, callback) {
    if (options && client) {
      var count = 0;
      var result = [];
      options.forEach(function (blockId) {
        client.block(blockId, function (error, body) {
          if (error) console.log(error);
          if (body.code != 404) {
            result.push({
              blockHex: null,
              blockId: blockId
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
      callback('error: no block id provided', null);
    }
  }

  /* Returns JSON of Latest information for Blocks. Ensures that 
   * return from Blocktrail is valid data for use. */
  function Latest(callback) {
    if (client) {
      client.blockLatest(function (error, body) {
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
  function Propagate(options, callback) {
    callback('error: propogate block to Blocktrail. unsupported function.', null);
  }

  /* Returns JSON of Transaction information for provided Block IDs. Includes
   * check that blockIds are provided and ensures that return from Blocktrail
   * is valid data for use. */
  function Transactions(options, callback) {
    if (options && client) {
      var count = 0;
      var result = [];
      options.forEach(function (blockId) {
        client.blockTransactions(blockId, {
          page: 1,
          limit: 200,
          sort_dir: 'asc'
        }, function (error, body) {
          if (error) console.log(error);
          if (body.code !== 400) {
            var transactionResult = [];
            body.data.forEach(function (transaction) {
              transactionResult.push({
                blockId: blockId,
                txid: transaction.hash,
                txId: transaction.hash
              });
            });
            result.push(transactionResult);
          }
          if (count === options.length - 1) {
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

  return {
    Get: Get,
    Latest: Latest,
    Propagate: Propagate,
    Transactions: Transactions
  }
}

module.exports = Blocks;
