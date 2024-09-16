import React from "react";
import { useModal } from "@/providers/ModalProvider";

const Modal = () => {
  const { isModalOpen, closeModal, modalContent } = useModal();

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={closeModal}
        >
          &times;
        </button>
        {modalContent}
      </div>
    </div>
  );
};

export default Modal;
