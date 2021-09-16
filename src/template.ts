import fs = require("fs");
import path = require("path");

function lowerFirstLetter(string: string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

export default function generateDeployCode(contract: string[]) {
  const codePiece1 = `
import type { HardhatUserConfig, NetworksUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-waffle";
import { task } from "hardhat/config";
import fs = require("fs");
import path = require("path");
import editJsonFile = require("edit-json-file");
import ethers = require("ethers");
task("deploy", "Deploy contracts", async (_args, hre) => {
    const ethers = hre.ethers;
    await hre.run("compile");
    `;
  const codePiece2 = `  let account1;
  let account2;
  let deployer;
  let signer;
  const { parseEther, parseUnits } = ethers.utils;
  // save contract address
  const CONTRACT_ADDRESS_DIR = path.join(__dirname, "..", "cache");
  if (!fs.existsSync(CONTRACT_ADDRESS_DIR)) {
    fs.mkdirSync(CONTRACT_ADDRESS_DIR);
  }
  const contractAddress = editJsonFile(
    path.join(CONTRACT_ADDRESS_DIR, "contract_address.json"),
    {
      autosave: true,
    }
  );
  signer = await ethers.getSigners();
  deployer = signer[0];
  account1 = signer[1];
  account2 = signer[2];
  `;
  const TASKS_ADDRESS_DIR = path.join(__dirname, "task");
  const DEOLOY_ADDRESS = path.join(TASKS_ADDRESS_DIR, "deploy.ts");
  if (!fs.existsSync(TASKS_ADDRESS_DIR)) {
    fs.mkdirSync(TASKS_ADDRESS_DIR);
  }
  fs.writeFileSync(DEOLOY_ADDRESS, codePiece1);
  contract.forEach((element) => {
    let code = "let " + lowerFirstLetter(element) + ";" + "\n";
    fs.appendFileSync(DEOLOY_ADDRESS, code);
  });
  fs.appendFileSync(DEOLOY_ADDRESS, codePiece2);
  contract.forEach((element) => {
    let deployCode = `const ${element} = await ethers.getContractFactory(
    "${element}"
  );
  ${lowerFirstLetter(element)} = await ${element}.deploy();
  contractAddress.set("${lowerFirstLetter(element)}", ${lowerFirstLetter(
      element
    )}.address);
  console.log("${lowerFirstLetter(element)}: ", ${lowerFirstLetter(
      element
    )}.address);
  `;
    fs.appendFileSync(DEOLOY_ADDRESS, deployCode);
  });
  fs.appendFileSync(DEOLOY_ADDRESS, "});");
}
generateDeployCode(["Pool","Treasury"]);