import { Avatar, Divider, Text, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useDB from "../hooks/useDB";

const FriendsListItem = ({ friendUID }: { friendUID: string }) => {
  const [photoURL, setPhotoURL] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const { getUserDoc } = useDB();

  useEffect(() => {
    const loadFriendDoc = async () => {
      const friendUserDoc = await getUserDoc(friendUID);
      if (friendUserDoc) {
        setName(friendUserDoc.name);
        setPhotoURL(friendUserDoc.photoURL);
        setUsername(friendUserDoc.username);
      }
    };
    loadFriendDoc();
  }, []);

  return (
    <Link href={`/${username}`}>
      <div
        className={`w-full max-w-sm p-4 rounded-lg cursor-pointer flex items-center my-2 ${useColorModeValue(
          "bg-green-700/10",
          "bg-white/10"
        )}`}
      >
        <Avatar src={photoURL} />
        <span className="mx-4" />
        <div className="flex flex-col items-start">
          <Text className="font-bold">{name}</Text>
          <Text className="opacity-80 text-sm">{"@" + username}</Text>
        </div>
      </div>
    </Link>
  );
};

export default FriendsListItem;
