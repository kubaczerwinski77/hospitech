import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { Formik, Form, Field } from "formik";

const AddHospitationModal = ({ isOpen, onClose }) => {
  const validateName = (value) => {
    let error;
    if (!value) {
      error = "Name is required";
    } else if (value.toLowerCase() !== "naruto") {
      error = "Jeez! You're not a fan 😱";
    }
    return error;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ name: "" }}
          onSubmit={(values, actions) => {
            console.log("submiting form");
            console.log("values", values);
            console.log("actions", actions);
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form>
              <ModalBody>
                <Field name="name" validate={validateName}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <FormLabel>First name</FormLabel>
                      <Input {...field} placeholder="Name" />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </ModalBody>
              <ModalFooter>
                <Button mr={3} onClick={onClose}>
                  Zamknij
                </Button>
                <Button
                  isLoading={props.isSubmitting}
                  colorScheme="teal"
                  type="submit"
                >
                  Stwórz
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default AddHospitationModal;
