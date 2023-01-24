import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

const AddHospitationModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Lorem ipsum</ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Zamknij
          </Button>
          <Button colorScheme="teal">Stwórz</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddHospitationModal;
