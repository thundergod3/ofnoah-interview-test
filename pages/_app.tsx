import { AuthenticationProvider } from "contexts/AuthenticationContext";
import { ChakraProvider } from "@chakra-ui/react";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <AuthenticationProvider>
        <Component {...pageProps} />
      </AuthenticationProvider>
    </ChakraProvider>
  );
};

export default MyApp;
