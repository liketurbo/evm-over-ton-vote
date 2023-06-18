import React, { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import QRCode from "react-qr-code";
import { isWalletInfoRemote } from "@tonconnect/sdk";
import connector from "@/connector";
import { useTonWallet } from "@/hooks/useTonWallet";

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
  }, []);

  return (
    <Modal onClose={onClose} className="max-w-lg">
      <ol className="list-decimal pl-6 space-y-4">
        <li>
          {wallet ? (
            <div>
              <p className="font-medium">TON address acquired ✅</p>
              <p className="mb-4">
                Your TON address:{" "}
                <span className="font-mono">{wallet.account.address}</span>
              </p>
            </div>
          ) : (
            <div>
              <p className="font-medium">Acquiring your TON address ⏳</p>
              <p className="mb-4">
                Scan the QR code below to access your address in the app:
              </p>
              <QRCode
                size={256}
                className="max-w-full w-full"
                style={{ height: "260px" }}
                value={modalUniversalLink}
                viewBox={`0 0 256 256`}
              />
            </div>
          )}
        </li>
        <li className="mb-4">Signing your TON address with your EVM wallet</li>
        <li>Sending the vote transaction</li>
      </ol>
    </Modal>
  );
};

export default VotePopup;
