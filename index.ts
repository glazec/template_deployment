#!/usr/bin/env node
// let shell = require('shelljs')
// let colors = require('colors')
let fs = require("fs");
let contractName = process.argv[2];
let appDirectory = `${process.cwd()}`;
let generateDeployCode = require("./dist/index");

const run = async () => {
  let success = generateDeployCode(contractName);
};
run();
