import React, { createContext, useContext, useState } from "react";

// Create the context
const ModalContext = createContext();

// Create a provider component
export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, modalContent }}>
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook to use the modal context
export const useModal = () => {
  return useContext(ModalContext);
};
