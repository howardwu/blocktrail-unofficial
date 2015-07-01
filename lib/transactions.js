/* Returns JSON of a transaction. Includes check that a
 * transaction is provided and ensures that return from Blocktrail
 * is valid data for use.
 */
function Get(options, callback) {
  if ((options.txids || options.txIds) && options.client) {
    var transactions;
    if (options.txids) transactions = options.txids;
    else transactions = options.txIds;
    var count = 0;
    var result = [];
    transactions.forEach(function (transaction) {
      options.client.transaction(transaction, function (error, body) {
        if (error) console.log(error);
        if (body.code != 400) {
          var input = [];
          var output = [];
          var time = new Date(body.first_seen_at);
          time = time.getTime();
          body.inputs.forEach(function (inp) {
            input.push({
              txid: inp.output_hash,
              txId: inp.output_hash,
              vout: inp.index, 
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
          callback(null, result);
        }
        count += 1;
      });
    });
  }
  else {
    callback('error: no txids and/or base provided', null);
  }
}

/* Returns JSON of Latest information for Transactions. Currently 
 * Unsupported by Blocktrail. */
function Latest(options, callback) {
  callback('error: latest transaction from Blocktrail. unsupported function.', null);
}

/* Returns JSON of Output information for provided Transaction IDs. Includes
 * check that txids or txIds and vout are provided and ensures that return
 * from Blocktrail is valid data for use. */
function Outputs(options, callback) {
  if (options.outputs && options.client) {
    var count = 0;
    var result = [];
    var base = options.base;
    var length = options.outputs.length;
    var client = options.client;
    options.outputs.forEach(function (options) {
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
                    scriptPubKey: output.script,
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
    callback('error: no outputs or base provided', null);
  }
}

/* Propogates a provided Transaction Hex. Currently Unsupported by Blocktrail. */
function Propogate(options, callback) {
  callback('error: propogate transaction to Blocktrail. unsupported function.', null);
}

/* Returns JSON of Status information for provided Transaction IDs. Includes
 * check that txids or txIds are provided and ensures that return from Blocktrail
 * is valid data for use. */
function Status(options, callback) {
  if ((options.txids || options.txIds) && options.client) {
    var transactions;
    if (options.txids) transactions = options.txids;
    else transactions = options.txIds;
    var count = 0;
    var result = [];
    transactions.forEach(function (transaction) {
      options.client.transaction(transaction, function (error, body) {
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
    callback('error: no txids and/or base provided', null);
  }
}

module.exports.Get = Get;
module.exports.Latest = Latest;
module.exports.Outputs = Outputs;
module.exports.Propogate = Propogate;
module.exports.Status = Status;
