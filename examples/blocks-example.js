var blocktrailAPI = require('../index.js');

/** GET **/

blocktrailAPI({ network: 'mainnet' }).Blocks.Get([
  "00000000000000000216a936ebc1962e319a51bab8d3eae69335ac940284491d",
  "00000000000000001034f207d3ce18f03054ddfb0e4dba712f5b76cb1cda9499"
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

blocktrailAPI({ network: 'testnet' }).Blocks.Get([
  "00000000005df195c304bc89652377f3ef17ed8c71c636e88adecb0bbf20f873"
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

// Invalid Example
blocktrailAPI({ network: 'mainnet' }).Blocks.Get([
  "29384792387042379481703948710983749018374098137409817304987139"
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

/** LATEST **/

blocktrailAPI({ network: 'mainnet' }).Blocks.Latest(function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

blocktrailAPI({ network: 'testnet' }).Blocks.Latest(function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

/** PROPAGATE **/

blocktrailAPI({ network: 'mainnet' }).Blocks.Propagate({
  blockHex: ''
}, function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

blocktrailAPI({ network: 'testnet' }).Blocks.Propagate({
  blockHex: ''
}, function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

/** TRANSACTIONS **/

blocktrailAPI({ network: 'mainnet' }).Blocks.Transactions([
  "00000000000000000216a936ebc1962e319a51bab8d3eae69335ac940284491d",
  "00000000000000001034f207d3ce18f03054ddfb0e4dba712f5b76cb1cda9499"
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

blocktrailAPI({ network: 'testnet' }).Blocks.Transactions([
  "00000000005df195c304bc89652377f3ef17ed8c71c636e88adecb0bbf20f873"
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});

// Invalid Example
blocktrailAPI({ network: 'mainnet' }).Blocks.Transactions([
  "00009809898sdf98s98fs9df98sd989sd8f9s8df9s8df9s8dfy8337isuhsf3iuhi"
], function (err, resp) {
  if (err) console.log(err);
  console.log(resp);
});
