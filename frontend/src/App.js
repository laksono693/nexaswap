import React, { useEffect, useState } from "react";
import {
  JsonRpcProvider,
  Web3Provider,
  Contract,
  parseUnits
} from "ethers";

const provider = new JsonRpcProvider("https://testnet3.rpc.nexus.xyz");
const CONTRACT_ADDRESS = "0xfcd17BA06B49134490e42CDc966C8E876E80e138";
const RECEIVER = "0xD7828b71b2347CD1c33C9530C06af8907801AC43";

const ABI = [
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount) returns (bool)",
  "function decimals() view returns (uint8)"
];

function App() {
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [balance, setBalance] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const [addr] = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(addr);
        fetchBalance(addr);
      } catch (err) {
        alert("Wallet tidak terhubung");
      }
    } else {
      alert("Metamask belum terinstall");
    }
  };

  const fetchBalance = async (address) => {
    try {
      const token = new Contract(CONTRACT_ADDRESS, ABI, provider);
      const decimals = await token.decimals();
      const bal = await token.balanceOf(address);
      const formatted = Number(bal) / 10 ** decimals;
      setBalance(formatted);
    } catch (err) {
      console.error("Gagal ambil saldo:", err);
    }
  };

  const handleSwap = async () => {
    if (!amount || isNaN(amount)) {
      alert("Masukkan jumlah yang valid");
      return;
    }
    try {
      const web3p = new Web3Provider(window.ethereum);
      const signer = web3p.getSigner();
      const token = new Contract(CONTRACT_ADDRESS, ABI, signer);
      const decimals = await token.decimals();
      const amt = parseUnits(amount, decimals);
      setStatus("Menunggu transaksi...");
      const tx = await token.transfer(RECEIVER, amt);
      await tx.wait();
      setStatus("Swap berhasil!");
      fetchBalance(account); // refresh saldo
    } catch (err) {
      console.error("Swap gagal:", err);
      setStatus("Swap gagal!");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>NEXASWAP</h1>
      {account ? (
        <>
          <p>Wallet: {account}</p>
          <p>Saldo: {balance ?? "Loading..."} NEXA</p>
          <input
            type="text"
            placeholder="Jumlah yang ingin ditukar"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={handleSwap}>Swap ke Wallet Tujuan</button>
          <p>Status: {status}</p>
        </>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}

export default App;
