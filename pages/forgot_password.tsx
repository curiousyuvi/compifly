import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { GetStaticProps, NextPage } from "next/types";
import React, { useEffect, useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";

const ForgotPassword: NextPage = () => {
  const router = useRouter();
  const { sendPasswordChangeEmail } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({ email: "" });
  const [formError, setFormError] = useState({
    email: "",
  });

  const handleInputChange = (event: any) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const [isFormError, setIsFormError] = useState<boolean>(false);
  const validateForm = () => {
    setIsFormError(false);
    setFormError({ email: "" });

    var validEmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!formData.email.trim().match(validEmailRegex)) {
      setFormError({ email: "Not a valid email" });
      return false;
    }

    setIsFormError(false);
    setFormError({ email: "" });

    return true;
  };

  const handleForgotPasswordFormSubmit = async (event: any) => {
    event.preventDefault();
    if (validateForm()) {
      sendPasswordChangeEmail(formData.email);
    } else {
      setIsFormError(true);
    }
  };

  return (
    <AuthLayout>
      <Box className="w-full h-full p-4 flex flex-col justify-center items-center">
        <Heading>Forgot Password</Heading>
        <span className="my-2" />
        <p>Enter email to get a password reset link.</p>
        <FormControl isInvalid={isFormError}>
          <form
            onSubmit={handleForgotPasswordFormSubmit}
            className="w-full flex flex-col justify-center items-center"
          >
            <span className="my-4" />
            <Input
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full max-w-sm"
              height="14"
              fontSize="xl"
              focusBorderColor={useColorModeValue("green.300", "green.500")}
              size="lg"
            />
            <FormErrorMessage>{formError.email}</FormErrorMessage>
            <span className="my-3" />
            <Button
              className="w-full max-w-sm p-2"
              height="14"
              bgColor={useColorModeValue("green.300", "green.500")}
              type="submit"
            >
              <Text fontWeight="extrabold" fontSize="xl">
                {loading ? (
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.400"
                    color={"white"}
                    size="md"
                  />
                ) : (
                  "Send password reset link"
                )}
              </Text>
            </Button>
            <span className="my-2" />
          </form>
        </FormControl>
      </Box>
    </AuthLayout>
  );
};

export default ForgotPassword;
