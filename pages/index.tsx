import Head from "next/head";
import { Box, Container, Input } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

import { useAuthentication } from "@contexts/AuthenticationContext";

import DynamicText from "components/DynamicText";

import styles from "styles/Home.module.css";

interface RefObject {
  handleChangeValue: (value: string) => void;
}

const Home = () => {
  const childCompRef = useRef<RefObject>();
  const router = useRouter();

  const { checkAuthentication } = useAuthentication();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    childCompRef?.current?.handleChangeValue(e.target.value);
  };

  useEffect(() => {
    if (checkAuthentication === false) router.push("/login");
  }, [checkAuthentication]);

  return (
    checkAuthentication !== null && (
      <Box className={styles.container}>
        <Head>
          <title>Coding Test</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Container display="flex" flexDirection="column" alignItems="center">
          <DynamicText ref={childCompRef} />
          <Input onChange={onChange} />
        </Container>
      </Box>
    )
  );
};

export default Home;
