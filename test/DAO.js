const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DAO", function () {
  let admin, investor1, investor2, investor3, proposalAddress;

  beforeEach(async function () {
    [admin, investor1, investor2, investor3, proposalAddress] = await ethers.getSigners();

    const DAO = await ethers.getContractFactory("DAO", admin);
    this.dao = await DAO.deploy(10, 10, 65);
  });

  describe("Proposal", function () {
    it("Should create and execute proposal", async function () {
      await this.dao.connect(investor1).contribute({ value: 10 });
      await this.dao.connect(investor2).contribute({ value: 10 });
      await this.dao.connect(investor3).contribute({ value: 10 });
      await this.dao.connect(investor1).createProposal("Sober Shiba", 5, proposalAddress.address);
      await this.dao.connect(investor2).vote(0);
      await this.dao.connect(investor3).vote(0);
      await network.provider.send("evm_increaseTime", [10]);
      expect(await this.dao.connect(admin).executeProposal(0));
    });
  });
});