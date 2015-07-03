var blocktrailAPI = require('../index.js');

/** SUMMARY **/

blocktrailAPI({ network: 'mainnet' }).Addresses.Summary([
  "1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq",
  "1DmUeGjuQWLHxq5jhyn3uPCD9N16Ar9xGw"
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

blocktrailAPI({ network: 'testnet' }).Addresses.Summary([
  "mjf6CRReqGSyvbgryjE3fbGjptRRfAL7cg"
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

blocktrailAPI({ network: 'mainnet' }).Addresses.Summary([
  "abcdefghijklmnopqrstuvxyz1234567890"
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

/** TRANSACTIONS **/

blocktrailAPI({ network: 'mainnet' }).Addresses.Transactions([
  "1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq",
  "1DmUeGjuQWLHxq5jhyn3uPCD9N16Ar9xGw"
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

blocktrailAPI({ network: 'testnet' }).Addresses.Transactions([
  "mjf6CRReqGSyvbgryjE3fbGjptRRfAL7cg"
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

blocktrailAPI({ network: 'mainnet' }).Addresses.Transactions([
  "abcdefghijklmnopqrst"
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

/** UNSPENTS **/

blocktrailAPI({ network: 'mainnet' }).Addresses.Unspents([
  "1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq",
  "1DmUeGjuQWLHxq5jhyn3uPCD9N16Ar9xGw"
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

blocktrailAPI({ network: 'testnet' }).Addresses.Unspents([
  "mjf6CRReqGSyvbgryjE3fbGjptRRfAL7cg"
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

blocktrailAPI({ network: 'mainnet' }).Addresses.Unspents([
  "asdfghjkl"
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});
