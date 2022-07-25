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
import { validateCallback } from "@firebase/util";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetStaticProps, NextPage } from "next/types";
import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import AuthLayout from "../components/AuthLayout";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";

const Register: NextPage = () => {
  const router = useRouter();
  const { signUp, authenticateWithGithub, authenticateWithGoogle } = useAuth();

  useEffect(() => {
    if (auth.currentUser) {
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.currentUser]);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event: any) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const [isFormError, setIsFormError] = useState<boolean>(false);
  const validateForm = () => {
    setIsFormError(false);
    setFormError({ email: "", password: "", confirmPassword: "" });

    var validEmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!formData.email.trim().match(validEmailRegex)) {
      setFormError({
        password: "",
        confirmPassword: "",
        email: "Not a valid email",
      });
      return false;
    }

    if (formData.password.trim().length < 8) {
      setFormError({
        email: "",
        confirmPassword: "",
        password: "Password is too short, must be atleast 8 charachters",
      });
      return false;
    }

    if (formData.password.trim() !== formData.confirmPassword.trim()) {
      setFormError({
        email: "",
        password: "",
        confirmPassword: "Password does not match",
      });
      return false;
    }

    setIsFormError(false);
    setFormError({ email: "", password: "", confirmPassword: "" });

    return true;
  };

  const handleEmailPasswordFormSubmit = async (event: any) => {
    event.preventDefault();
    if (validateForm()) {
      setLoading(true);
      await signUp(formData.email.trim(), formData.password.trim());
      setLoading(false);
    } else {
      setIsFormError(true);
    }
  };

  const handleGithubAuthClick = async () => {
    setLoading(true);
    await authenticateWithGithub();
    setLoading(false);
  };

  const handleGoogleAuthClick = async () => {
    setLoading(true);
    await authenticateWithGoogle();
    setLoading(false);
  };

  return (
    <AuthLayout>
      <Box className="w-full h-full p-4 flex flex-col justify-center items-center">
        <Image
          src="/logo.svg"
          alt="Compifly"
          height={75}
          width={75}
          className="rounded-full"
        />
        <span className="my-1" />
        <p>Welcome to Compifly</p>
        <span className="my-2" />
        <Heading>Register</Heading>
        <FormControl isInvalid={isFormError}>
          <form
            onSubmit={handleEmailPasswordFormSubmit}
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
            <span className="my-2" />
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full max-w-sm"
              height="14"
              fontSize="xl"
              focusBorderColor={useColorModeValue("green.300", "green.500")}
              size="lg"
            />
            <FormErrorMessage>{formError.password}</FormErrorMessage>
            <span className="my-2" />
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm password"
              className="w-full max-w-sm"
              height="14"
              fontSize="xl"
              focusBorderColor={useColorModeValue("green.300", "green.500")}
              size="lg"
            />
            <FormErrorMessage>{formError.confirmPassword}</FormErrorMessage>
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
                  "REGISTER"
                )}
              </Text>
            </Button>
            <span className="my-2" />
          </form>
        </FormControl>
        <p>or</p>
        <span className="my-2" />
        <Button
          className="w-full max-w-sm"
          height="14"
          variant="outline"
          borderColor={useColorModeValue("red.400", "red.600")}
          color={useColorModeValue("red.400", "red.600")}
          onClick={handleGoogleAuthClick}
        >
          <Text
            fontWeight="extrabold"
            fontSize="xl"
            className="flex items-center"
          >
            <FcGoogle className="text-2xl" />
            <span className="mx-2" />
            {"Continue with Google"}
          </Text>
        </Button>
        <span className="my-3" />
        <Button
          className="w-full max-w-sm"
          height="14"
          variant="outline"
          borderColor={useColorModeValue("black", "white")}
          color={useColorModeValue("black", "white")}
          onClick={handleGithubAuthClick}
        >
          <Text
            fontWeight="extrabold"
            fontSize="xl"
            className="flex items-center"
          >
            <FaGithub className="text-2xl" />
            <span className="mx-2" />
            {"Continue with GitHub"}
          </Text>
        </Button>
        <span className="my-4" />
        <Text>
          Already have an account?
          <span className="ml-1" />
          <Link href="/login">
            <Button variant="link">Login</Button>
          </Link>
        </Text>
      </Box>
    </AuthLayout>
  );
};

export default Register;
