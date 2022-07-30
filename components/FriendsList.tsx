import { Text } from "@chakra-ui/react";
import React from "react";
import useUser from "../hooks/useUser";
import FriendsListItem from "./FriendsListItem";

const FriendsList = () => {
  const userDoc = useUser();
  if (userDoc?.friends.length === 0)
    return <Text>{"🧐 No Friends added"}</Text>;
  return (
    <>
      {userDoc?.friends?.map((friendUID: string) => {
        return <FriendsListItem key={friendUID} friendUID={friendUID} />;
      })}
    </>
  );
};

export default FriendsList;
