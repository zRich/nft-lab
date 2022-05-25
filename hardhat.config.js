require("dotenv").config();
require('@nomiclabs/hardhat-waffle')
require('solidity-coverage')

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.4',
  mocha: {
    timeout: 400000,
  },
  networks: {
    hardhat: {
      accounts: [
        { privateKey: process.env.PRIVATE_KEY, balance: "10000000000000000000000" },
        { privateKey: process.env.RICH_KEY, balance: "10000000000000000000000" },
      ],
    },
  },
}