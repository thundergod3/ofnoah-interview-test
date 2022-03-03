import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { useAuthentication } from "@contexts/AuthenticationContext";

import InputField from "@components/InputField";

import styles from "styles/Home.module.css";

const loginValidation = Yup.object({
  email: Yup.string()
    .email("Invalid email. Please enter again")
    .required("Email is a require field"),
  password: Yup.string().required("Password is a require field"),
});

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { checkAuthentication, handleLogin } = useAuthentication();

  useEffect(() => {
    if (checkAuthentication === true) router.push("/");
  }, [checkAuthentication]);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={loginValidation}
      onSubmit={async (values) => {
        setLoading(true);
        await handleLogin(values.email, values.password);
        setLoading(false);
      }}>
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form>
          <Box className={styles.container}>
            <Container
              maxW="lg"
              py={{ base: "12", md: "24" }}
              px={{ base: "0", sm: "8" }}>
              <Stack spacing="8">
                <Stack spacing="6">
                  <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
                    <Heading
                      size={useBreakpointValue({ base: "xs", md: "sm" })}>
                      Log in to your account
                    </Heading>
                    <HStack spacing="1" justify="center">
                      <Text color="muted">Don't have an account?</Text>
                      <Link href="/sign-up">
                        <Button variant="link" colorScheme="blue">
                          Sign up
                        </Button>
                      </Link>
                    </HStack>
                  </Stack>
                </Stack>
                <Box
                  py={{ base: "0", sm: "8" }}
                  px={{ base: "4", sm: "10" }}
                  bg={useBreakpointValue({
                    base: "transparent",
                    sm: "bg-surface",
                  })}
                  boxShadow={{
                    base: "none",
                    sm: useColorModeValue("md", "md-dark"),
                  }}
                  borderRadius={{ base: "none", sm: "xl" }}>
                  <Stack spacing="6">
                    <Stack spacing="5">
                      <InputField
                        label="Email"
                        name="email"
                        value={values.email}
                        error={errors.email}
                        touched={touched.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <InputField
                        label="Password"
                        name="password"
                        type="password"
                        showEyeIcon
                        value={values.password}
                        error={errors.password}
                        touched={touched.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Stack>
                  </Stack>
                  <Stack spacing="6" marginTop="16px">
                    <Button
                      colorScheme="blue"
                      type="submit"
                      isLoading={loading}>
                      Login
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </Container>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default LoginPage;
