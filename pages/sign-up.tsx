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
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

import { useAuthentication } from "@contexts/AuthenticationContext";

import InputField from "@components/InputField";

import styles from "styles/Home.module.css";

const signUpValidation = Yup.object({
  email: Yup.string()
    .email("Invalid email. Please enter again")
    .required("Email is a require field"),
  password: Yup.string().required("Password is a require field"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is a required field"),
});

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { checkAuthentication, handleSignUp } = useAuthentication();

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
      validationSchema={signUpValidation}
      onSubmit={async (values) => {
        setLoading(true);
        await handleSignUp(values.email, values.password);
        setLoading(false);
      }}>
      {({ values, errors, touched, handleChange, handleBlur }) =>
        checkAuthentication !== null && (
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
                        Sign up to your account
                      </Heading>
                      <HStack spacing="1" justify="center">
                        <Text color="muted">Have an account?</Text>
                        <Link href="/login">
                          <Button variant="link" colorScheme="blue">
                            Login
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
                        <InputField
                          label="Confirm Password"
                          name="confirmPassword"
                          type="password"
                          showEyeIcon
                          value={values.confirmPassword}
                          error={errors.confirmPassword}
                          touched={touched.confirmPassword}
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
                        Sign up
                      </Button>
                    </Stack>
                  </Box>
                </Stack>
              </Container>
            </Box>
          </Form>
        )
      }
    </Formik>
  );
};

export default SignUpPage;
