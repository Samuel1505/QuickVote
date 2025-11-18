const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying VotingContract...");

  // Get the contract factory
  const VotingContract = await ethers.getContractFactory("VotingContract");

  // Deploy the contract (no constructor args needed)
  const votingContract = await VotingContract.deploy();

  // Wait for deployment
  await votingContract.waitForDeployment();

  const address = await votingContract.getAddress();
  console.log("VotingContract deployed to:", address);

  // Optional: Verify on-chain (uncomment if running on testnet/mainnet)
  // await hre.run("verify:verify", {
  //   address: address,
  //   constructorArguments: [],  // No args
  // });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });