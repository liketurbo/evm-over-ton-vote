import React from "react";
import Modal from "./Modal";

interface MetamaskPopupProps {
  onClose: () => void;
}

const MetamaskPopup: React.FC<MetamaskPopupProps> = ({ onClose }) => {
  return (
    <Modal className="max-w-lg" onClose={onClose}>
      <p className="text-lg font-semibold mb-4">Metamask Required</p>
      <p className="mb-4">
        Please install{" "}
        <a
          className="text-blue-500 underline"
          href="https://metamask.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Metamask
        </a>{" "}
        to use this feature.
      </p>
      <p>
        Metamask is a cryptocurrency wallet and browser extension that allows
        you to interact with decentralized applications on the Ethereum network.
      </p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
        onClick={onClose}
      >
        OK
      </button>
    </Modal>
  );
};

export default MetamaskPopup;
