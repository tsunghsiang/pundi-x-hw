/**
 * Build smart contract tests using Waffle in Hardhat
 */
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
/**
 * Solidity testing library
 * */
require('solidity-coverage');
require('dotenv').config();
const { ETHERSCAN_API_KEY, API_URL, PRIVATE_KEY } = process.env;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    hardhat: {},
    ropsten: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    rinkeby: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: `${ETHERSCAN_API_KEY}`
  },
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};
