import { Heading } from "@chakra-ui/react";
import React from "react";
import FriendsList from "../components/FriendsList";
import Layout from "../components/Layout";
import NotLoggedIn from "../components/NotLoggedIn";
import { auth } from "../firebase";

const friends = () => {
  if (!auth.currentUser) return <NotLoggedIn />;
  return (
    <Layout>
      <div className="w-full h-full flex flex-col items-center p-4 py-24">
        <Heading>Friends</Heading>
        <span className="my-4" />
        <FriendsList />
      </div>
    </Layout>
  );
};

export default friends;
