import { Heading, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-full min-h-screen flex items-center overflow-y-auto">
      <div className="w-full h-full">{children}</div>
      <div
        className={`hidden lg:flex w-full h-full min-h-screen text-gray-100 ${useColorModeValue(
          "bg-gradient-to-b from-green-500 to-green-400",
          "bg-gradient-to-b from-green-500 to-green-400"
        )} flex-col justify-center items-center relative`}
      >
        <span className="absolute top-[-5rem] left-0 drop-shadow-xl">
          <Image
            src={"/laptop.png"}
            alt="Codechef Codeforces"
            width={400}
            height={400}
          />
        </span>
        <div className="flex items-center">
          <Image
            src={"/logo.svg"}
            alt="Compifly"
            width={120}
            height={120}
            className="rounded-full"
          />
          <span className="mx-3" />
          <Heading fontSize="6xl">COMPIFLY</Heading>
        </div>
        <span className="my-4" />
        <p className="text-lg">
          A social media app for Competitive Programmers
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
