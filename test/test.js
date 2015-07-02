var commonBlockchainMainnetTests = require('abstract-common-blockchain/tests/mainnet');
var commonBlockchainTestnetTests = require('abstract-common-blockchain/tests/testnet');
var test = require('tape');
var biteasyAPI = require('../');

var commonMainnet = {
  setup: function(t, cb) {
    var commonBlockchain = biteasyAPI({ network: 'mainnet' })
    cb(null, commonBlockchain)
  },
  teardown: function(t, commonBlockchain, cb) {
    cb()
  }
}

var commonTestnet = {
  setup: function(t, cb) {
    var commonBlockchain = biteasyAPI({ network: 'testnet' })
    cb(null, commonBlockchain)
  },
  teardown: function(t, commonBlockchain, cb) {
    cb()
  }
}

commonBlockchainMainnetTests(test, commonMainnet);
commonBlockchainTestnetTests(test, commonTestnet);
