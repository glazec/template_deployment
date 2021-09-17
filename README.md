# template_deployment
A template to auto generate deployment code for hardhat project without additional deployment library

# Use
Run `npx tsc` to compile typescript file. Place the `dist/src/template.js` into the contract work dir. Input the contract name in L69. `node template.js`. Then you will find the deploy script at `task/deploy.ts`.

@Notice: You still need to adjust the deployment script for constructor parameters and initialization.
# Todo
* Console
* Customize deployed instance name
* Fuzzing
* auto add constructor
