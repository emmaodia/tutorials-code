const { ethers, upgrades } = require("hardhat");

async function main() {
  
  const Contract = await ethers.getContractFactory("TrainTicketV1");
  console.log("Deploying Train Tikcet v1...");
  
  const contract = await upgrades.deployProxy(Contract)
  await contract.deployed();

  console.log("Contract deployed to: ", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
