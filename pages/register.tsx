import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetStaticProps, NextPage } from "next/types";
import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import AuthLayout from "../components/AuthLayout";
import { auth } from "../firebase";

const Register: NextPage<{ userProtected: boolean }> = (props) => {
  const router = useRouter();

  useEffect(() => {
    if (props.userProtected && auth.currentUser) {
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.currentUser]);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (event: any) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleEmailPasswordFormSubmit = (event: any) => {
    event.preventDefault();
  };

  return (
    <AuthLayout>
      <Box className="w-full h-full p-4 flex flex-col justify-center items-center">
        <p>Welcome to Compifly</p>
        <span className="my-2" />
        <Heading>Register</Heading>
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
          />
          <span className="my-2" />
          <Input
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full max-w-sm"
            height="14"
            fontSize="xl"
            focusBorderColor={useColorModeValue("green.300", "green.500")}
          />
          <span className="my-3" />
          <Button
            className="w-full max-w-sm"
            height="14"
            bgColor={useColorModeValue("green.300", "green.500")}
            type="submit"
          >
            <Text fontWeight="extrabold" fontSize="xl">
              REGISTER
            </Text>
          </Button>
          <span className="my-2" />
        </form>
        <p>or</p>
        <span className="my-2" />
        <Button
          className="w-full max-w-sm"
          height="14"
          variant="outline"
          borderColor={useColorModeValue("red.400", "red.600")}
          color={useColorModeValue("red.400", "red.600")}
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
          <span className="mx-1" />
          <Link href="/login">
            <Button variant="link">Login</Button>
          </Link>
        </Text>
      </Box>
    </AuthLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      userProtected: true,
    },
  };
};

export default Register;
