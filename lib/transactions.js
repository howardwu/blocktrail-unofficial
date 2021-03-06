var async = require('async');

var Transactions = function (options, client) {

  /* Returns JSON of a transaction. Includes check that a
   * transaction is provided and ensures that return from Blocktrail
   * is valid data for use. */
  function Get(options, callback) {
    if (options && client) {
      var count = 0;
      var transactions = options;
      var result = [];
      async.eachSeries(transactions, function (transaction, cb) {
        setTimeout(function () {
          client.transaction(transaction, function (error, body) {
            if (error) {
              console.log(error);
            } else if (body) {
              var input = [];
              var output = [];
              var time = new Date(body.first_seen_at);
              time = time.getTime();
              body.inputs.forEach(function (inp) {
                input.push({
                  txid: inp.output_hash,
                  txId: inp.output_hash,
                  vout: inp.output_index,
                  addresses: [
                    inp.address
                  ],
                  scriptSig: {
                    asm: null,
                    hex: inp.script_signature
                  },
                  sequence: null 
                });
              });
              body.outputs.forEach(function (out) {
                output.push({
                  value: out.value,
                  index: out.index,
                  n: out.index,
                  spentTxid: out.spent_hash,
                  scriptPubKey:
                  {
                    asm: out.script,
                    hex: out.script_hex,
                    reqSigs: out.multisig,
                    type: out.type,
                    addresses: [
                      out.address
                    ]
                  }
                });
              });
              result.push({
                txHex: body.raw,
                hex : body.raw,
                txid: body.hash,
                txId: body.hash,
                version: null,
                locktime: null,
                fee: body.total_fee,
                vin: input,
                vout: output,
                blockhash: body.block_hash,
                blockindex: body.block_height,
                blocktime: body.block_time,
                confirmations: body.confirmations,
                timeReceived: time, 
              });
            }
            if (count === transactions.length - 1) {
              cb();
            }
            count++;
          });
        }, 250);
      }, function (err) {
        if (err) callback(err, null);
        callback(null, result);
      });
    }
    else {
      callback('error: no txids and/or base provided', null);
    }
  }

  /* Returns JSON of Latest information for Transactions. Currently 
   * Unsupported by Blocktrail. */
  function Latest(callback) {
    callback('error: latest transaction from Blocktrail. unsupported function.', null);
  }

  /* Returns JSON of Output information for provided Transaction IDs. Includes
   * check that txids or txIds and vout are provided and ensures that return
   * from Blocktrail is valid data for use. */
  function Outputs(options, callback) {
    if (options && client) {
      var count = 0;
      var result = [];
      var base = options.base;
      var length = options.length;
      options.forEach(function (options) {
        if ((options.txid || options.txId) && options.vout >= 0) {
          var transaction;
          if (options.txid) transaction = options.txid;
          else transaction = options.txId;
          client.transaction(transaction, function (error, body) {
            if (error) console.log(error);
            if (body.code !== 400) {
              if (body.outputs.length > options.vout) {
                body.outputs.forEach(function (output) {
                  if (output.index === options.vout) {
                    result.push({
                      scriptPubKey: null,
                      txid: transaction,
                      txId: transaction,
                      value: output.value,
                      vout: options.vout
                    });
                  }
                });
              }
              else {
                callback('error: vout does not exist or incorrect', null);
              }
            }
            if (count === length - 1) {
              result.sort(function(a, b) {
                return a.vout > b.vout;
              });
              callback(null, result);
            }
            count += 1;
          });
        }
        else {
          callback('error: an options parameter is missing', null);
        }
      });
    }
    else {
      callback('error: no outputs or client provided', null);
    }
  }

  /* Propogates a provided Transaction Hex. Currently Unsupported by Blocktrail. */
  function Propagate(options, callback) {
    callback('error: propogate transaction to Blocktrail. unsupported function.', null);
  }

  /* Returns JSON of Status information for provided Transaction IDs. Includes
   * check that txids or txIds are provided and ensures that return from Blocktrail
   * is valid data for use. */
  function Status(options, callback) {
    if (options && client) {
      var transactions = options;
      var count = 0;
      var result = [];
      transactions.forEach(function (transaction) {
        client.transaction(transaction, function (error, body) {
          if (error) console.log(error);
          if (body.code !== 400) {
            result.push({
              blockId: body.block_hash,
              txid: transaction,
              txId: transaction
            });
          }
          if (count === transactions.length - 1) {
            callback(null, result);
          }
          count += 1;
        });
      });
    }
    else {
      callback('error: no txids and/or client provided', null);
    }
  }

  return {
    Get: Get,
    Latest: Latest,
    Outputs: Outputs,
    Propagate: Propagate,
    Status: Status
  }
}

module.exports = Transactions;
