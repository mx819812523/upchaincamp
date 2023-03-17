const {
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");


describe("Counter", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployCounter() {
        const [owner, otherAccount] = await ethers.getSigners();

        const Counter = await ethers.getContractFactory("Counter");
        let counter = await Counter.deploy();
        counter=await counter.deployed();
        console.log("counter:" + counter.address);
        console.log("counter:" + owner.address);
        console.log("counter:" + otherAccount.address);

        return { counter, owner, otherAccount };
    }

    it("Owner call", async () => {
        const { counter } = await loadFixture(deployCounter);
        await counter.add(1);
        await counter.add(1);
        await counter.count();
        expect(await counter.counter()).to.be.equal(2)
    });
    it("Other call", async () => {
        const { counter, owner, otherAccount } = await loadFixture(deployCounter);
        await expect(counter.connect(otherAccount).count()).to.be.revertedWith('failed call');
    })
})