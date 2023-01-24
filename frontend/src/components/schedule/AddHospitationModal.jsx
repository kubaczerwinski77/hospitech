import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import { BASE_URL, PREFIX } from "../../config";

const AddHospitationModal = ({ isOpen, onClose }) => {
  const [lecturers, setLectureres] = useState([]);
  const [classes, setClasses] = useState([]);
  const [wzhz, setWzhz] = useState([]);
  const toast = useToast();

  const handleSubmitForm = async (values) => {
    try {
      const res = await fetch(`${BASE_URL}${PREFIX}/hospitations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          classIds: [parseInt(values.classId)],
          hospitatedLecturer: parseInt(values.hospitatedLecturer),
          wzhzReviewer: parseInt(values.wzhzReviewer),
          secondReviewer: parseInt(values.secondReviewer),
        }),
      });
      const data = await res.json();

      if (data.error) {
        toast({
          title: "Request failed",
          description: data.message,
          position: "bottom-left",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Dodawanie powiodło się",
          description: "Pomyślnie dodano hospitację",
          position: "bottom-left",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchClasses = async (lecturerId) => {
    const res = await fetch(
      `${BASE_URL}${PREFIX}/lecturers/${lecturerId}/classes?semester=zimowy%202022%2F2023`
    );
    const data = await res.json();
    setClasses(data);
  };

  const fetchLecturers = async () => {
    const res = await fetch(`${BASE_URL}${PREFIX}/lecturers`);
    const data = await res.json();
    setLectureres(data);
  };

  const fetchWzhz = async () => {
    const res = await fetch(`${BASE_URL}${PREFIX}/lecturers?wzhz=true`);
    const data = await res.json();
    setWzhz(data);
  };

  useEffect(() => {
    fetchLecturers();
    fetchWzhz();
  }, [isOpen]);

  const validate = (text) => (value) => {
    let error;
    if (!value) {
      error = `Wybór ${text} jest wymagany!`;
    }
    return error;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader>Dodaj hospitację</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{
            hospitatedLecturer: "",
            classId: "",
            wzhzReviewer: "",
            secondReviewer: "",
          }}
          onSubmit={(values, actions) => {
            handleSubmitForm(values);
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form>
              <ModalBody>
                <VStack spacing={3}>
                  <Field
                    name="hospitatedLecturer"
                    validate={validate("hospitującego")}
                  >
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.hospitatedLecturer &&
                          form.touched.hospitatedLecturer
                        }
                        isRequired
                      >
                        <FormLabel>Hospitowany</FormLabel>
                        <Select
                          {...field}
                          placeholder="Wybierz hospitowanego"
                          onChange={(e) => {
                            field.onChange(e);
                            fetchClasses(e.target.value);
                          }}
                        >
                          {lecturers.map(
                            ({ lecturerId, firstName, lastName }) => (
                              <option key={lecturerId} value={lecturerId}>
                                {firstName} {lastName} {lecturerId}
                              </option>
                            )
                          )}
                        </Select>
                        <FormErrorMessage>
                          {form.errors.hospitatedLecturer}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="classId" validate={validate("przedmiotu")}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.classId && form.touched.classId}
                        isRequired
                      >
                        <FormLabel>Przedmiot</FormLabel>
                        <Select {...field} placeholder="Wybierz przedmiot">
                          {classes.map(({ classId, course }) => (
                            <option key={classId} value={classId}>
                              {course.name}
                            </option>
                          ))}
                        </Select>
                        <FormErrorMessage>
                          {form.errors.classId}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field
                    name="wzhzReviewer"
                    validate={validate("hospitującego")}
                  >
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.wzhzReviewer && form.touched.wzhzReviewer
                        }
                        isRequired
                      >
                        <FormLabel>Hospitujący WZHZ</FormLabel>
                        <Select {...field} placeholder="Wybierz hopitującego">
                          {wzhz
                            .filter(
                              ({ lecturerId }) =>
                                String(lecturerId) !==
                                props.values.hospitatedLecturer
                            )
                            .map(({ lecturerId, firstName, lastName }) => (
                              <option key={lecturerId} value={lecturerId}>
                                {firstName} {lastName} {lecturerId}
                              </option>
                            ))}
                        </Select>
                        <FormErrorMessage>
                          {form.errors.wzhzReviewer}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field
                    name="secondReviewer"
                    validate={validate("hospitującego")}
                  >
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.secondReviewer &&
                          form.touched.secondReviewer
                        }
                        isRequired
                      >
                        <FormLabel>Hospitujący</FormLabel>
                        <Select {...field} placeholder="Wybierz hopitującego">
                          {lecturers
                            .filter(
                              ({ lecturerId }) =>
                                String(lecturerId) !==
                                  props.values.hospitatedLecturer &&
                                String(lecturerId) !== props.values.wzhzReviewer
                            )
                            .map(({ lecturerId, firstName, lastName }) => (
                              <option key={lecturerId} value={lecturerId}>
                                {firstName} {lastName} {lecturerId}
                              </option>
                            ))}
                        </Select>
                        <FormErrorMessage>
                          {form.errors.secondReviewer}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button mr={3} onClick={onClose}>
                  Zamknij
                </Button>
                <Button
                  isLoading={props.isSubmitting}
                  colorScheme="green"
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
