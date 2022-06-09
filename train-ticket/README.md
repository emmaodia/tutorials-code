# Train Ticket

The Contract sets the price for a train ticket. Given that there are no rising Economic costs, the tickets cost the same whereever the destination, there is room providing for increasing the Ticke Price if ever there is the need.

This project demonstrates Upgradable Smart Contracts using the Transparent Proxy use case. It coontains 2 version of a Train Ticket Contract, and scripts that deploy the v1 and v2 of the contract.

To compile the contract, run the following commands after cloning.

```shell
npx hardhat compile
```

You can deploy your version to any Testnet of choice, using:

```shell
npx hardhat run scripts/deploy_<version>.js --network <network>
```

I recommend using Goerli network. Goerli Faucet here: https://goerlifaucet.com/ N.B: You will need to have an Alchemy account to receive tokens from this faucet. 
 
 &nbsp;

## The contracts are deployed on the Goerli Testnet

Proxy: https://goerli.etherscan.io/address/0x022aa95a1fb518607eef4093bd82eae4daf97337#code

Implementation V1: https://goerli.etherscan.io/address/0x5f5a9b36780f111417db19ffbe2f04876344009e#code

Implementation V2: https://goerli.etherscan.io/address/0x53bbdb042997ddbf2be8116e6c6d3c9205026ab7#code