const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploy contract with the account: " + deployer.address);
    const tokenFactory = await ethers.getContractFactory("TsungHsiangWu");
    const token = await tokenFactory.deploy();
    console.log("Token is deployed to: " + token.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });