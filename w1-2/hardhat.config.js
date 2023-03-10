require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");

require("dotenv").config()

const GOERLI_OWNER_PRIVATE_KEY = process.env.GOERLI_OWNER_PRIVATE_KEY
const GOERLI_OTHERS_PRIVATE_KEY = process.env.GOERLI_OTHERS_PRIVATE_KEY

const INFURA_API_KEY = process.env.INFURA_API_KEY;
const ETHERS_API_KEY = process.env.ETHERS_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  etherscan: {
    apiKey: {
      goerli: ETHERS_API_KEY
    }
  },
  networks: {
    dev: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [GOERLI_OWNER_PRIVATE_KEY,GOERLI_OTHERS_PRIVATE_KEY],
    }
  }
};