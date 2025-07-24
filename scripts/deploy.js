const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contract with the account:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", balance.toString());

  const Token = await hre.ethers.getContractFactory("NEXA");
  const initialSupply = hre.ethers.parseUnits("1000000", 18); // Suplai awal
  const token = await Token.deploy(initialSupply);
  await token.waitForDeployment(); // Ganti dari `deployed()` ke `waitForDeployment()`

  console.log("Token deployed to:", await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
