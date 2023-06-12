import React from "react";
import Modal from "@/components/Modal";

interface VotePopupProps {
  onClose: () => void;
}

const VotePopup: React.FC<VotePopupProps> = ({ onClose }) => {
  return (
    <Modal onClose={onClose} className="max-w-lg">
      <ol className="list-decimal pl-6">
        <li className="mb-2">Acquiring your TON address</li>
        <li className="mb-2">Signing your TON address with your EVM wallet</li>
        <li>Sending the vote transaction</li>
      </ol>
    </Modal>
  );
};

export default VotePopup;
