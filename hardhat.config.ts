import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  mocha: {
    timeout: 600000,
  },
  networks: {
    hardhat: {
      accounts: [
        {
          privateKey: process.env.RICH_KEY || '',
          balance: '100000000000000000',
        },
        {
          privateKey: process.env.MEMBERSHIP_KEY || '',
          balance: '100000000000000000',
        },
      ],

    },
    mumbai: {
      url:"https://rpc-mumbai.maticvigil.com/v1/b05c8dbad6026e2da28175af81a936259917426e",
      chainId: 80001,
      accounts: [process.env.RICH_KEY || '']
    }
  },
  etherscan:{
    apiKey: process.env.MUMBAI_API_KEY
  }
};

export default config;
