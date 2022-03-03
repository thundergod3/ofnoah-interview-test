import { AuthenticationProvider } from "contexts/AuthenticationContext";
import { ChakraProvider } from "@chakra-ui/react";

import Navbar from "@components/Navbar";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <AuthenticationProvider>
        <Navbar />
        <Component {...pageProps} />
      </AuthenticationProvider>
    </ChakraProvider>
  );
};

export default MyApp;
