import { Avatar, Divider, Text, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useDB from "../hooks/useDB";
import { UserShortDoc } from "../interfaces/UserShortDoc";

const UserListItem = ({ userShortDoc }: { userShortDoc: UserShortDoc }) => {
  return (
    <Link href={`/${userShortDoc.username}`}>
      <div
        className={`w-full max-w-lg p-4 rounded-lg cursor-pointer flex items-center my-2 ${useColorModeValue(
          "bg-green-700/10",
          "bg-white/10"
        )}`}
      >
        <Avatar src={userShortDoc.photoURL} />
        <span className="mx-4" />
        <div className="flex flex-col items-start">
          <Text className="font-bold">{userShortDoc.name}</Text>
          <Text className="opacity-80 text-sm">
            {"@" + userShortDoc.username}
          </Text>
        </div>
      </div>
    </Link>
  );
};

export default UserListItem;
