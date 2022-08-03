import { Avatar, Text, useColorModeValue } from "@chakra-ui/react";
import { Player } from "@lottiefiles/react-lottie-player";
import Link from "next/link";
import React from "react";

const Rank1 = ({
  username,
  photoURL,
  handle,
  rating,
}: {
  photoURL: string;
  handle: string;
  username: string;
  rating: number;
}) => {
  return (
    <Link href={`/${username}`} className="cursor-pointer">
      <div className="flex flex-col items-center">
        <Text>
          <span className="text-xs">#</span>1
        </Text>
        <span className="my-1" />
        <Player
          autoplay={true}
          loop={true}
          src={"/crown-lottie.json"}
          style={{
            height: 50,
            width: 50,
          }}
        />
        <span className="my-2" />
        <div className="lg:h-48 lg:w-48 md:h-44 md:w-44 sm:h-36 sm:w-36 h-32 w-32 border-4 border-green-500 rounded-full drop-shadow-2xl">
          <Avatar src={photoURL} size="full" />
        </div>
        <span className="my-1" />
        <Text className="sm:text-sm text-xs">{"@" + handle}</Text>
        <span className="my-1" />
        <Text className="text-2xl" fontWeight="bold" color="green.400">
          {rating + " pts"}
        </Text>
      </div>
    </Link>
  );
};

const Rank23 = ({
  rank,
  username,
  photoURL,
  handle,
  rating,
}: {
  rank: 2 | 3;
  photoURL: string;
  handle: string;
  username: string;
  rating: number;
}) => {
  return (
    <Link href={`/${username}`} className="cursor-pointer">
      <div className="flex flex-col items-center">
        <Text>
          <span className="text-xs">#</span>
          {rank}
        </Text>
        <span className="my-2" />
        <div className="lg:h-44 lg:w-44 md:h-40 md:w-40 sm:h-32 sm:w-32 h-28 w-28 border-4 border-green-500 rounded-full drop-shadow-[20px_0_0_rgb(20, 184, 166,0.25)]">
          <Avatar src={photoURL} size="full" />
        </div>
        <span className="my-1" />
        <Text className="sm:text-sm text-xs">{"@" + handle}</Text>
        <span className="my-1" />
        <Text className="text-2xl" fontWeight="bold" color="green.400">
          {rating + " pts"}
        </Text>
      </div>
    </Link>
  );
};

const Normal = ({
  rank,
  username,
  photoURL,
  handle,
  rating,
}: {
  rank: number;
  photoURL: string;
  handle: string;
  username: string;
  rating: number;
}) => {
  return (
    <div className="w-full flex items-center justify-center">
      <Text>{"#" + rank}</Text>
      <span className="mx-2" />
      <Link href={`/${username}`} className="cursor-pointer">
        <div
          className={`w-full max-w-sm p-4 rounded-lg cursor-pointer flex items-center my-2 ${useColorModeValue(
            "bg-green-700/10",
            "bg-white/10"
          )}`}
        >
          <Avatar src={photoURL} />
          <span className="mx-2" />
          <Text className="text-sm">{"@" + handle}</Text>
          <span className="mx-2" />
          <Text
            className="sm:text-2xl text-md"
            fontWeight="bold"
            color="green.400"
          >
            {rating + " pts"}
          </Text>
        </div>
      </Link>
    </div>
  );
};

const RankingListItem = { Rank1, Rank23, Normal };

export default RankingListItem;
