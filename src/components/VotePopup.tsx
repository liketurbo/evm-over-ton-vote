import React, { useEffect, useCallback, useState, useMemo } from "react";
import QRCode from "react-qr-code";
import { isWalletInfoRemote } from "@tonconnect/sdk";
import { useRouter } from "next/navigation";
import Web3 from "web3";
import cls from "classnames";
import Modal from "@/components/Modal";
import connector from "@/connector";
import { useTonWallet } from "@/hooks/useTonWallet";
import MetamaskPopup from "@/components/MetamaskPopup";

interface VotePopupProps {
  onClose: () => void;
}

const VotePopup: React.FC<VotePopupProps> = ({ onClose }) => {
  const [modalUniversalLink, setModalUniversalLink] = useState("");
  const wallet = useTonWallet();

  useEffect(() => {
    async function generateQrCode() {
      const walletsList = await connector.getWallets();
      const remoteConnectionWalletInfos =
        walletsList.filter(isWalletInfoRemote);
      const walletInfo = remoteConnectionWalletInfos[0];

      const link = connector.connect({
        universalLink: walletInfo.universalLink,
        bridgeUrl: walletInfo.bridgeUrl,
      });

      setModalUniversalLink(link);
    }

    generateQrCode();

    () => {
      connector.disconnect();
    };
  }, []);

  const [showPopup, setShowPopup] = useState(false);

  const router = useRouter();

  const handleOkClick = useCallback(() => {
    setShowPopup(false);
    router.push("/");
  }, [router]);

  const [provider, setProvider] = useState<Web3 | null>(null);

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

  const [signature, setSignature] = useState("");

  useEffect(() => {
    async function generateSignature() {
      if (!provider || !wallet) {
        return;
      }

      // sign(keccak256("\x19Ethereum Signed Message:\n" + dataToSign.length + dataToSign)))
      const signature = await (provider.eth as any).personal.sign(
        wallet.account.address,
        provider.eth.defaultAccount,
        ""
      );

      setSignature(signature);
    }

    generateSignature();
  }, [provider, wallet]);

  const currentStep = useMemo(() => {
    if (wallet && signature) {
      return 2;
    } else if (wallet) {
      return 1;
    } else {
      return 0;
    }
  }, [wallet, signature]);

  return (
    <>
      <Modal onClose={onClose} className="max-w-lg">
        <ol className="list-decimal pl-6 space-y-4">
          <li
            className={cls(
              "mb-4",
              currentStep === 0 ? "opacity-100" : "opacity-50"
            )}
          >
            {wallet ? (
              <>
                <p className="font-medium">TON address acquired ✅</p>
                <p>
                  Your TON address:{" "}
                  <span className="font-mono break-all">
                    {wallet.account.address}
                  </span>
                </p>
              </>
            ) : (
              <>
                <p className="font-medium">Acquiring your TON address ⏳</p>
                <p>Scan the QR code below to access your address in the app:</p>
                <QRCode
                  size={256}
                  className="max-w-full w-full"
                  style={{ height: "260px" }}
                  value={modalUniversalLink}
                  viewBox={`0 0 256 256`}
                />
              </>
            )}
          </li>
          <li
            className={cls(
              "mb-4",
              currentStep === 1 ? "opacity-100" : "opacity-50"
            )}
          >
            {signature ? (
              <>
                <p className="font-medium">
                  Signing your TON address with your EVM wallet ✅
                </p>
                <p>
                  Signature of your TON address:{" "}
                  <span className="font-mono break-all">{signature}</span>
                </p>
              </>
            ) : (
              <>
                <p className="font-medium">
                  Signing your TON address with your EVM wallet ⏳
                </p>
                <p>Confirm data sign on your TON address in MetaMask popup</p>
              </>
            )}
          </li>
          <li
            className={cls(
              "mb-4",
              currentStep === 2 ? "opacity-100" : "opacity-50"
            )}
          >
            <p className="font-medium">Sending the vote transaction</p>
          </li>
        </ol>
      </Modal>
      {showPopup && <MetamaskPopup onClose={handleOkClick} />}
    </>
  );
};

export default VotePopup;
