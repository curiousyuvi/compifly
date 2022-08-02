import { Text } from "@chakra-ui/react";
import React from "react";
import Layout from "./Layout";

const NotLoggedIn = () => {
  return (
    <Layout>
      <div className="w-full min-h-screen h-full py-24 flex flex-col justify-center items-center">
        <Text>{"😵 You need to Log in or Register to access this page."}</Text>
      </div>
    </Layout>
  );
};

export default NotLoggedIn;
