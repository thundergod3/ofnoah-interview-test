import React, { useCallback, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Icon,
  useMediaQuery,
  Text,
} from "@chakra-ui/react";
import { GrClose } from "react-icons/gr";

import { Form, Formik } from "formik";

interface Props {
  usingFooter?: boolean;
  usingHeader?: boolean;
  modalBody?: any;
  sizeModal?: string;
}

const useModal = ({
  usingFooter = true,
  usingHeader = false,
  modalBody = null,
  sizeModal = "md",
}: Props) => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    data: any;
  }>({
    isOpen: false,
    title: "",
    data: {},
  });

  const [checkMobileView] = useMediaQuery("(max-width: 48em)");

  const ModalBodyComponent = modalBody;

  const open = useCallback(
    ({ title = "", data }) =>
      setModalState((prevState) => ({
        ...prevState,
        isOpen: true,
        title,
        data,
      })),
    []
  );

  const close = useCallback(() => {
    setModalState({
      isOpen: false,
      title: "",
      data: null,
    });
  }, []);

  const Dialog = useCallback(
    () => (
      <Formik
        enableReinitialize
        initialValues={modalState.data}
        onSubmit={() => {
          close();
        }}>
        {(formProps) => (
          <Modal size={sizeModal} isOpen={modalState.isOpen} onClose={close}>
            <Form>
              <ModalOverlay />
              <ModalContent>
                {usingHeader && (
                  <Text
                    fontWeight="bold"
                    fontSize="2xl"
                    width="max-content"
                    marginLeft="20px"
                    marginTop="20px">
                    {modalState.title}
                  </Text>
                )}
                {checkMobileView ? (
                  <Icon
                    as={GrClose}
                    fontSize="18px"
                    position="absolute"
                    top="20px"
                    right="25px"
                    onClick={close}
                  />
                ) : (
                  <ModalCloseButton
                    cursor="pointer"
                    fontSize="18px"
                    top="20px"
                  />
                )}
                <ModalBody py={8}>
                  <ModalBodyComponent {...modalState} {...formProps} />
                </ModalBody>
                {usingFooter && (
                  <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={close}>
                      Close
                    </Button>
                  </ModalFooter>
                )}
              </ModalContent>
            </Form>
          </Modal>
        )}
      </Formik>
    ),
    [modalState, close, sizeModal, usingHeader, checkMobileView, usingFooter]
  );

  return {
    open,
    close,
    Dialog,
  };
};

export default useModal;
