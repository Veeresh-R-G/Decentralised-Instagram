# Instagram Clone App with Next.js & Solidity

---

### Tech used in this project:

- MetaMask Login using Wagmi & Rainbow Kit
- Web3.js
- Solidity (v0.8.17)
- Pinata, as IPFS provider

---

### To Run the Application on Local system
1. Clone the Repo
```
git clone https://github.com/Veeresh-R-G/Decentralised-Instagram/edit/main/readme.md
```
2. Open a Browser of your choice , Open MetaMask and select a test network. Keep an account ready to connect to the Application

3. Run Ganache and export one of the accounts(With fake 100ETH 🤑) into MetaMask

4. Go to truffle-app folder to compile and deploy the smart contract
```
cd truffle-app
```
A Few steps : 
 - Install <strong>truffle<strong/> extension for VSC 🌟
 - Right-click on the contracts/Instgram.sol and select to deploy the contract option
 - Copy the build/contracts/Instagram.json file into next-app/utils directory (if not present)
 - Copy the contract address and paste it in next-app/utils/contants.js
  
  
5. Move to the next-app directory to run the front-end 
```
cd next-app
npm install
npm run dev
```
  
6.  Connect the wallet to the web interface, Upload Images and enjoy 🚀
