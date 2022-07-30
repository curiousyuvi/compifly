import { Heading } from "@chakra-ui/react";
import React from "react";
import FriendsList from "../components/FriendsList";
import Layout from "../components/Layout";

const friends = () => {
  return (
    <Layout>
      <div className="w-full h-full flex flex-col items-center">
        <Heading>Friends</Heading>
        <span className="my-4" />
        <FriendsList />
      </div>
    </Layout>
  );
};

export default friends;
