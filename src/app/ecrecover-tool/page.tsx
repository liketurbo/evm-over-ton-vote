"use client";

import { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import { useRouter } from "next/navigation";
import MetamaskPopup from "@/components/MetamaskPopup";
import Button from "@/components/Button";
import Input from "@/components/Input";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function ECRecoverTool() {
  const [dataToSign, setDataToSign] = useState("");
  const [signature, setSignature] = useState("");
  const [provider, setProvider] = useState<Web3 | null>(null);
  const [extractedData, setExtractedData] = useState("");
  const [extractedSignature, setExtractedSignature] = useState("");
  const [extractedPublicKey, setExtractedPublicKey] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function initializeProvider() {
      if (!window.ethereum) {
        setShowPopup(true);
        return;
      }

      const provider = new Web3(window.ethereum);
      await window.ethereum.enable();
      const accounts = await provider.eth.getAccounts();
      provider.eth.defaultAccount = accounts[0];
      setProvider(provider);
    }

    initializeProvider();
  }, []);

  const handleDataToSignChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDataToSign(e.target.value);
      setSignature("");
    },
    []
  );

  const handleOkClick = useCallback(() => {
    setShowPopup(false);
    router.push("/");
  }, [router]);

  const handleDataSign = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        if (!(dataToSign && provider)) {
          return;
        }

        // sign(keccak256("\x19Ethereum Signed Message:\n" + dataToSign.length + dataToSign)))
        const signature = await (provider.eth as any).personal.sign(
          dataToSign,
          provider.eth.defaultAccount,
          ""
        );
        setSignature(signature);
        setExtractedData(dataToSign);
        setExtractedSignature(signature);
        setExtractedPublicKey("");
      } catch (error) {
        console.error(error);
      }
    },
    [dataToSign, provider]
  );

  const handleExtractSignatureChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setExtractedSignature(e.target.value);
      setExtractedPublicKey("");
    },
    []
  );

  const handleExtractDataChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setExtractedData(e.target.value);
      setExtractedPublicKey("");
    },
    []
  );

  const handleExtractPublicKey = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        if (!provider) {
          return;
        }

        const publicKeyHex = await (provider.eth as any).personal.ecRecover(
          extractedData,
          extractedSignature
        );
        setExtractedPublicKey(publicKeyHex);
      } catch (error) {
        console.error(error);
      }
    },
    [extractedData, extractedSignature, provider]
  );

  return (
    <main className="flex-grow">
      {showPopup && <MetamaskPopup onClose={handleOkClick} />}
      <div className="bg-gray-200 p-4 mb-8">
        <h2 className="text-xl font-bold mb-4">Sign Data</h2>
        <form onSubmit={handleDataSign}>
          <Input
            name="data"
            label="Data"
            value={dataToSign}
            onChange={handleDataToSignChange}
            required
            className="mb-6"
          />
          <Button type="submit" className="mb-2">
            Sign data
          </Button>
        </form>
        <p>
          Signature of the data:{" "}
          {signature ? (
            <span className="font-mono">{signature}</span>
          ) : (
            <span className="font-mono italic text-gray-400 text-sm">
              &lt;Empty&gt;
            </span>
          )}
        </p>
      </div>

      <div className="bg-gray-200 p-4">
        <h2 className="text-xl font-bold mb-4">
          Recover Public from Signature
        </h2>
        <form onSubmit={handleExtractPublicKey}>
          <Input
            name="data-that-was-signed"
            label="Data that was signed"
            value={extractedData}
            onChange={handleExtractDataChange}
            required
            className="mb-2"
          />
          <Input
            name="signature"
            label="Signature"
            value={extractedSignature}
            onChange={handleExtractSignatureChange}
            required
            className="mb-6"
          />
          <Button type="submit" className="mb-2">
            Extract public key
          </Button>
        </form>
        <p>
          Public key from the signature:{" "}
          {extractedPublicKey ? (
            <span className="font-mono">{extractedPublicKey}</span>
          ) : (
            <span className="font-mono italic text-gray-400 text-sm">
              &lt;Empty&gt;
            </span>
          )}
        </p>
      </div>
    </main>
  );
}
