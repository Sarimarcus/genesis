const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Genesis", function () {
  it("Should mint and transfer an NFT to someone", async function () {
    const Genesis = await ethers.getContractFactory("Genesis");
    const genesis = await Genesis.deploy();
    await genesis.deployed();

    const recipient = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
    const metadataURI = "cid/test.png";

    let balance = await genesis.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await genesis.payToMint(recipient, metadataURI, {
      value: ethers.utils.parseEther("0.05"),
    });

    // wait until the transaction is mined
    await newlyMintedToken.wait();

    balance = await genesis.balanceOf(recipient);
    expect(balance).to.equal(1);

    expect(await genesis.isContentOwned(metadataURI)).to.equal(true);
    const newlyMintedToken2 = await genesis.payToMint(recipient, "foo", {
      value: ethers.utils.parseEther("0.05"),
    });
  });
});
