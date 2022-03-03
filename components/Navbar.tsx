import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

import { useAuthentication } from "@contexts/AuthenticationContext";

const Navbar = () => {
  const router = useRouter();

  const { checkAuthentication } = useAuthentication();

  if (checkAuthentication === null || checkAuthentication === false)
    return <></>;

  return (
    <Box as="section" pb={{ base: "12", md: "24" }}>
      <Box as="nav" bg="bg-accent" color="on-accent">
        <Container py={{ base: "3", lg: "4" }}>
          <Flex>
            <HStack spacing="4">
              <ButtonGroup variant="ghost-on-accent" spacing="1">
                <Button onClick={() => router.push("/")}>Home</Button>
                <Button onClick={() => router.push("/blogs")}>Blogs</Button>
              </ButtonGroup>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Navbar;
