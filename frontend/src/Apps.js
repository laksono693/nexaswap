import React, { useState } from 'react';
import { ethers } from 'ethers';
import tokenABI from './abi/token.json';

const tokenAddress = "0xfcd17BA06B49134490e42CDc966C8E876E80e138"; // Token NEXA kamu

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      const token = new ethers.Contract(tokenAddress, tokenABI, provider);
      const bal = await token.balanceOf(address);
      setBalance(ethers.formatUnits(bal, 18));
    } else {
      alert("Install MetaMask dulu bro!");
    }
  };

  return (
    <div style={{ padding: 30, fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>NexaSwap - DApp Token NEXA</h1>
      {account ? (
        <>
          <p><strong>Alamat:</strong> {account}</p>
          <p><strong>Saldo NEXA:</strong> {balance}</p>
        </>
      ) : (
        <button onClick={connectWallet} style={{ padding: 10, fontSize: 16 }}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default App;
