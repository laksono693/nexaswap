import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider("https://testnet3-rpc.nexus.xyz");

function App() {
  const [block, setBlock] = useState(null);

  useEffect(() => {
    const fetchBlock = async () => {
      const latest = await provider.getBlockNumber();
      setBlock(latest);
    };
    fetchBlock();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial", color: "#333" }}>
      <h1>NexaSwap - Welcome to the DEX</h1>
      <p>Connected to Nexus Testnet</p>
      <p>Latest Block: {block ?? "Loading..."}</p>
    </div>
  );
}

export default App;
