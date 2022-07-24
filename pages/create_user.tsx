import { Heading } from "@chakra-ui/react";
import React from "react";
import AuthLayout from "../components/AuthLayout";

const CreateUser = () => {
  return (
    <AuthLayout>
      <div className="w-full h-full justify-center items-center">
        <Heading>Create User Profile</Heading>
      </div>
    </AuthLayout>
  );
};

export default CreateUser;
