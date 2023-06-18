import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import cls from "classnames";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, children, className }) => {
  useEffect(() => {
    const rootElement = document.getElementById("root") as HTMLElement;
    rootElement.classList.add("modal-open");
    return () => {
      rootElement.classList.remove("modal-open");
    };
  }, []);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex flex-col items-center bg-black bg-opacity-50">
      <div className={cls("bg-white p-6 rounded shadow mt-36", className)}>
        <button
          className="absolute top-0 right-0 m-4 text-gray-700 hover:text-gray-400 focus:outline-none text-4xl transition ease-in-out duration-100 w-10 h-10"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
