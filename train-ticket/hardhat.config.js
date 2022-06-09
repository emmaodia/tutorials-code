require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require('dotenv').config();

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const EOA_PRIVATE_KEY = process.env.EOA_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.14",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${EOA_PRIVATE_KEY}`]
    }
  }
};
