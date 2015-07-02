var commonBlockchainTests = require('abstract-common-blockchain/tests/mainnet');
var test = require('tape');
var biteasyAPI = require('../');

var common = {
  setup: function(t, cb) {
    var commonBlockchain = biteasyAPI({ network: 'mainnet' })
    cb(null, commonBlockchain)
  },
  teardown: function(t, commonBlockchain, cb) {
    cb()
  }
}

commonBlockchainTests(test, common);
