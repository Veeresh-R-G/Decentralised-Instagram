const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
module.exports = {
  mocha: {},
  compilers: {
    solc: {
      version: '0.8.17'
    }
  },
  networks: {
    loc_development_development: {
      network_id: "*",
      port: 7545,
      host: "127.0.0.1"
    },
    inf_instagram_App_goerli: {
      network_id: 5,
      gasPrice: 100000000000,
      provider: new HDWalletProvider(fs.readFileSync('c:\\Users\\Veeresh\\Desktop\\mnemonic.env', 'utf-8'), "https://goerli.infura.io/v3/57f1af66a6f14809817b427ae2f17e63")
    }
  }
};
