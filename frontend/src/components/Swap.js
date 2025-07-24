import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import tokenAbi from '../abi/tokenAbi.json';

const contractAddress = '0xfcd17BA06B49134490e42CDc966C8E876E80e138';

function Swap() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState('0');

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    }
  };

  const loadBalance = async () => {
    if (!account) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, tokenAbi, signer);
    const balance = await contract.balanceOf(account);
    setBalance(ethers.utils.formatUnits(balance, 18));
  };

  useEffect(() => {
    if (account) loadBalance();
  }, [account]);

  return (
    <div>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected: {account}</p>
          <p>NEXA Balance: {balance}</p>
        </div>
      )}
    </div>
  );
}

export default Swap;
