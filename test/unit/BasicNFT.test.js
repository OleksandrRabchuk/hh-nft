const { assert, expect } = require("chai")
const { network, deployments, ethers, getNamedAccounts } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("BasicNFT test", function () {

        let basicNFT, deployer

        beforeEach(async () => {
            const account = await ethers.getSigners()
            deployer = account[0]
            await deployments.fixture(["all"])
            basicNFT = await ethers.getContract("BasicNFT")
        })


        it("Allows users to mint an NFT, and updates appropriately", async function () {
            const txResponse = await basicNFT.mintNft()
            await txResponse.wait(1)
            const tokenURI = await basicNFT.tokenURI(0)
            const tokenCounter = await basicNFT.getTokenCounter()

            assert.equal(tokenCounter.toString(), "1")
            assert.equal(tokenURI, await basicNFT.TOKEN_URI())
        })
    })