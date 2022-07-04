const {verify} = require('../utils/verify')
const { network } = require('hardhat')
const { developmentChains } = require('../helper-hardhat-config')

module.exports = async ({ getNamedAccounts, deployments }) => {
    const {deployer} = await getNamedAccounts()
    const { deploy, log } = deployments
    log("----------------------------")
    const args = []
    const basicNFT = await deploy("BasicNFT",{
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: 1
    })

    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY){
        log('Verifying...')
        await verify(basicNFT.address, args)
    }
    log("----------------------------")
}

module.exports.tags = ["all", "basicNFT"]