import { Text } from "@chakra-ui/react";
import React from "react";
import Layout from "./Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="w-full min-h-screen h-full py-24 flex flex-col justify-center items-center">
        <Text>{"😵 Page not found."}</Text>
      </div>
    </Layout>
  );
};

export default NotFound;
