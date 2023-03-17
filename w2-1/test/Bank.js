const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Bank", function() {
    let owner;
    let alice;
    let bob;
    // 定义测试用的账户地址和金额
    const depositAmount = ethers.utils.parseEther("1");

    // 定义测试前要用到的合约实例和初始状态
    let bank;
    let initialBalance = {};

    beforeEach(async () => {
        [owner, alice, bob] = await ethers.getSigners();

        // 部署合约
        const Bank = await ethers.getContractFactory("Bank");
        bank = await Bank.deploy();

        // 保存所有账户的初始余额
        initialBalance[owner.address] = await owner.getBalance();
        initialBalance[alice.address] = await alice.getBalance();
        initialBalance[bob.address] = await bob.getBalance();

        // 将一定金额存入银行账户
        await alice.sendTransaction({
            to: bank.address,
            value: depositAmount,
        });

    });

    it("should have correct balance after deposit", async ()=> {
        // Alice 存入一定金额后，检查银行账户余额是否正确

        expect(await bank.connect(alice).balanceOf()).to.equal(depositAmount);
    });

    it("should not allow withdrawal if balance is zero", async function() {
        // 检查银行账户余额是否为零
        expect(await bank.balanceOf()).to.equal(0);

        // Bob 尝试从银行账户中提取资金，应该抛出异常
        await expect(bank.connect(bob).withdraw()).to.be.revertedWith("not have balance");
    });

    it("should allow withdrawal if balance is positive", async function() {
        // Alice 存入一定金额后，检查银行账户余额是否正确
        expect(await bank.connect(alice).balanceOf()).to.equal(depositAmount);


        // 检查银行账户余额是否为零
        expect(await bank.connect(alice).balanceOf()).to.equal(0);
    });
});
