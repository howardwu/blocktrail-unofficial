var blocktrailAPI = require('../index.js');

/** SUMMARY **/

blocktrailAPI({ network: 'mainnet' }).Addresses.Summary({
  addresses: [
    "1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq", "1DmUeGjuQWLHxq5jhyn3uPCD9N16Ar9xGw"
  ]
}, function (err, resp) {
  console.log(resp);
});

blocktrailAPI({ network: 'testnet' }).Addresses.Summary({
  addresses: ["mjf6CRReqGSyvbgryjE3fbGjptRRfAL7cg"]
}, function (err, resp) {
  console.log(resp);
});

blocktrailAPI({ network: 'mainnet' }).Addresses.Summary({
  addresses: ["abcdefghijklmnopqrstuvxyz1234567890"]
}, function (err, resp) {
  console.log(resp);
});


/** TRANSACTIONS **/

blocktrailAPI({ network: 'mainnet' }).Addresses.Transactions({
  addresses: ["1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq", "1DmUeGjuQWLHxq5jhyn3uPCD9N16Ar9xGw"]
}, function (err, resp) {
  console.log(resp);
});

blocktrailAPI({ network: 'testnet' }).Addresses.Transactions({
  addresses: ["mjf6CRReqGSyvbgryjE3fbGjptRRfAL7cg"]
}, function (err, resp) {
  console.log(resp);
});

blocktrailAPI({ network: 'mainnet' }).Addresses.Transactions({
  addresses: ["abcdefghijklmnopqrst"]
}, function (err, resp) {
  console.log(resp);
});


/** UNSPENTS **/

blocktrailAPI({ network: 'mainnet' }).Addresses.Unspents({
  addresses: [
    "1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq",
    "1DmUeGjuQWLHxq5jhyn3uPCD9N16Ar9xGw"]
}, function (err, resp) {
  console.log(resp);
});

blocktrailAPI({ network: 'testnet' }).Addresses.Unspents({
  addresses: ["mjf6CRReqGSyvbgryjE3fbGjptRRfAL7cg"]
}, function (err, resp) {
  console.log(resp);
});

blocktrailAPI({ network: 'mainnet' }).Addresses.Unspents({
  addresses: ["asdfghjkl"]
}, function (err, resp) {
  console.log(resp);
});
