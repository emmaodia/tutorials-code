const { ethers, upgrades } = require("hardhat");

const PROXY_CONTRACT = "0x022aA95A1fB518607eEF4093Bd82eAe4dAF97337";

async function main() {
  const Contract = await ethers.getContractFactory("TrainTicketV2");
  console.log("Deploying Train Ticket v2...");

  await upgrades.upgradeProxy(PROXY_CONTRACT, Contract)
  console.log("Contract Upgraded");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
