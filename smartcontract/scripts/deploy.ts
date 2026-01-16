import { ethers } from "hardhat";

async function main() {
  console.log("Deploying VotingContract...");

  // Get the signer (deployer account)
  const signers = await ethers.getSigners();
  if (signers.length === 0) {
    throw new Error("No accounts configured. Please set ACCOUNT_PRIVATE_KEY in your .env file.");
  }
  const deployer = signers[0];
  console.log("Deploying with account:", await deployer.getAddress());

  // Get the contract factory with the signer
  const VotingContract = await ethers.getContractFactory("VotingContract", deployer);

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