import { Heading, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-[calc(100%)] h-screen flex">
      <div className="w-full h-full">{children}</div>
      <div
        className={`w-full h-full text-gray-100 ${useColorModeValue(
          "bg-gradient-to-b from-green-500 to-green-400",
          "bg-gradient-to-b from-green-500 to-green-400"
        )} flex flex-col justify-center items-center relative`}
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
          <div className={"bg-black/80 p-2 rounded-full h-24 w-24"}>
            <Image src={"/logo.svg"} alt="Compifly" width={120} height={120} />
          </div>
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
