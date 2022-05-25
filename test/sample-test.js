// We import Chai to use its asserting functions here.
const { expect } = require("chai");
const { ethers } = require("hardhat");

// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` receives the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
describe("Fungie Business contract", function () {
  // Mocha has four functions that let you hook into the the test runner's
  // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

  // They're very useful to setup the environment for tests, and to clean it
  // up after they run.

  // A common pattern is to declare some variables, and assign them in the
  // `before` and `beforeEach` callbacks.

  let nftContract;
  let nft;
  let owner;
  let rich;
  let addr2;
  let addrs;
  const baseTokenURI = "https://bestnft.com/token/?id=";

  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    nftContract = await ethers.getContractFactory("FunToken");
    [owner, rich, addr2, ...addrs] = await ethers.getSigners();

    nft = await nftContract.deploy();
    for (let i = 0; i < 5; i++) {
      await nft.safeMint(owner.address, baseTokenURI + i);
    }
  });

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {
    it("Should set the right symbol", async function () {
      expect(await nft.symbol()).to.equal("RICH");
    });
  });

  describe("Mint", function () {
    it("Should mint NFT to owner", async function () {

      const balance = await nft.balanceOf(owner.address);

      console.log("balance ", balance.toNumber())

      expect(balance.toNumber()).to.greaterThan(4);
    });

    it("Should be owned by owner", async function () {

      nftOwner = await nft.ownerOf(0);
      expect(nftOwner).to.equal(owner.address);

    });

    it("Should be transferred to new owner", async function () {
      await nft.transferFrom(owner.address, rich.address, 0);
      nftOwner = await nft.ownerOf(0)
      expect(nftOwner).to.equal(rich.address);
    });
  });
});