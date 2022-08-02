import { Text } from "@chakra-ui/react";
import React from "react";
import Layout from "./Layout";

const LoggedIn = () => {
  return (
    <Layout>
      <div className="w-full min-h-screen h-full py-24 flex flex-col justify-center items-center">
        <Text>{"😵 You are already logged in."}</Text>
      </div>
    </Layout>
  );
};

export default LoggedIn;
