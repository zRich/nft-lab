import { ethers } from "hardhat";

async function main() {
  const name = "Restaurant";
    const symbol = "RICH";
  const Membership = await ethers.getContractFactory("Membership");
  const membership = await Membership.deploy(name, symbol);

  await membership.deployed();

  console.log(
    `Contract deployed to ${membership.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
