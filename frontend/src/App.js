import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider("https://testnet3-rpc.nexus.xyz");

function App() {
  const [block, setBlock] = useState(null);

  useEffect(() => {
    const getBlock = async () => {
      try {
        const latestBlock = await provider.getBlockNumber();
        setBlock(latestBlock);
      } catch (err) {
        console.error("Error fetching block:", err);
      }
    };
    getBlock();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial", color: "#333" }}>
      <h1>NexaSwap - Welcome to the DEX</h1>
      <p>Connected to Nexus Testnet 3</p>
      <p>Latest Block: {block !== null ? block : "Loading..."}</p>
    </div>
  );
}

export default App;
