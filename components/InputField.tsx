import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from "@chakra-ui/react";
import React, { forwardRef } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

interface InputFieldI extends InputProps {
  type?: string;
  label: string;
  showEyeIcon?: boolean;
  error?: string;
  touched?: boolean;
}

const InputField = forwardRef<HTMLInputElement, InputFieldI>((props, ref) => {
  const {
    type = "text",
    label,
    name,
    showEyeIcon,
    error,
    touched,
    value,
    onChange,
    onBlur,
  } = props;

  const { isOpen, onToggle } = useDisclosure();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const mergeRef = useMergeRefs(inputRef, ref);
  const onClickReveal = () => {
    onToggle();
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  };

  return (
    <FormControl isInvalid={error && touched}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <InputGroup>
        {showEyeIcon && (
          <InputRightElement>
            <IconButton
              variant="link"
              aria-label={isOpen ? "Mask password" : "Reveal password"}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={onClickReveal}
            />
          </InputRightElement>
        )}
        <Input
          id={name}
          ref={mergeRef}
          name={name}
          type={isOpen || type === "text" ? "text" : "password"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
});

export default InputField;
