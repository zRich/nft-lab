import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Membership", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployMembershipFixture() {
    const name = "Restaurant";
    const symbol = "RICH";

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Membership = await ethers.getContractFactory("Membership");
    const membership = await Membership.deploy(name, symbol);

    return { membership, name, symbol, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should get the right account address", async function () {
      const { owner } = await loadFixture(deployMembershipFixture);

      expect(await owner.address).to.equal("0x333eea8e3F6580ddF7128e9b42b694655067fd0d");
    });
  });
});
