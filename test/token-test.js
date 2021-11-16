const { expect } = require("chai");
const { ethers } = require("hardhat");
const { web } = require("web3");

describe("TsungHsiangWu", () => {
    it("New token should be established", async () => {
        const tokenFactory = await ethers.getContractFactory("TsungHsiangWu");
        const token = await tokenFactory.deploy();
        expect(await token.name()).to.equal("TsungHsiangWu");
        expect(await token.symbol()).to.equal("NFT");
    });

    it("Mint a token for a specific address", async () => {
        const metadata = "https://opensea-creatures-api.herokuapp.com/api/creature/1" //Random metadata url
        const tester = await ethers.getSigner();
        const tokenFactory = await ethers.getContractFactory("TsungHsiangWu");
        const token = await tokenFactory.deploy();
        const transaction = await token.mint(tester.address, metadata);
        const tx = await transaction.wait();

        const event = tx.events[0];
        const value = event.args[2];
        const tokenId = value.toNumber();

        const tokenURI = await token.tokenURI(tokenId);
        expect(tokenURI).to.equal(metadata);
    });

    it("When paused, mint function should be reverted", async () => {
        const metadata = "https://opensea-creatures-api.herokuapp.com/api/creature/1" //Random metadata url
        const tester = await ethers.getSigner();
        const tokenFactory = await ethers.getContractFactory("TsungHsiangWu");
        const token = await tokenFactory.deploy();
        await token.pause();
        expect(await token.paused()).to.equal(true);
        await expect(token.mint(tester.address, metadata)).to.be.reverted;;
    });

    it("Burn a token for a specific tokenId", async () => {
        const metadata = "https://opensea-creatures-api.herokuapp.com/api/creature/1" //Random metadata url
        const tester = await ethers.getSigner();
        const tokenFactory = await ethers.getContractFactory("TsungHsiangWu");
        const token = await tokenFactory.deploy();
        const transaction = await token.mint(tester.address, metadata);
        const tx = await transaction.wait();

        const event = tx.events[0];
        const value = event.args[2];
        const tokenId = value.toNumber();
        // Mint the token
        expect(await token.exist(tokenId)).to.equal(true);
        // Burn the token
        await token.burn(tokenId);
        // After being burned, the tokenId doesn't exist
        expect(await token.exist(tokenId)).to.equal(false);
    });

    it("When paused, burn function should be reverted", async () => {
        const metadata = "https://opensea-creatures-api.herokuapp.com/api/creature/1" //Random metadata url
        const tester = await ethers.getSigner();
        const tokenFactory = await ethers.getContractFactory("TsungHsiangWu");
        const token = await tokenFactory.deploy();
        const transaction = await token.mint(tester.address, metadata);
        const tx = await transaction.wait();

        const event = tx.events[0];
        const value = event.args[2];
        const tokenId = value.toNumber();
        // Mint the token
        expect(await token.exist(tokenId)).to.equal(true);
        // Pause
        await token.pause();
        expect(await token.paused()).to.equal(true);
        // Try to Burn the token; it should be reverted
        await expect(token.burn(tokenId)).to.be.reverted;
    });

    it("When a specific tokenId is non-existent, burn function should be reverted", async () => {
        const tokenFactory = await ethers.getContractFactory("TsungHsiangWu");
        const token = await tokenFactory.deploy();
        await expect(token.burn(1)).to.be.reverted;
    });

    it("Pause any token transfer", async () => {
        const tokenFactory = await ethers.getContractFactory("TsungHsiangWu");
        const token = await tokenFactory.deploy();
        await token.pause();
        expect(await token.paused()).to.equal(true);
    });

    it("Unpause any token transfer", async () => {
        const tokenFactory = await ethers.getContractFactory("TsungHsiangWu");
        const token = await tokenFactory.deploy();
        await token.pause();
        expect(await token.paused()).to.equal(true);
        await token.unpause();
        expect(await token.paused()).to.equal(false);
    });
});