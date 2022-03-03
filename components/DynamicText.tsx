import { Text } from "@chakra-ui/react";
import React, { forwardRef, useImperativeHandle, useState } from "react";

const DynamicText = forwardRef((_, ref) => {
  const [value, setValue] = useState<string>("Random Text");

  const changeValue = (newValue: string) => {
    setValue(newValue);
  };

  useImperativeHandle(ref, () => ({
    handleChangeValue(newValue: string) {
      changeValue(newValue);
    },
  }));

  return (
    <Text fontSize="4xl" marginBottom="10px" wordBreak="break-all">
      {value}
    </Text>
  );
});

export default DynamicText;
