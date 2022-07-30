import { Heading, useColorMode, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const MobileHeader = () => {
  const { colorMode } = useColorMode();
  const logo = "/logo.svg";

  return (
    <div className="flex sm:hidden w-full bg-white/10 fixed top-0 backdrop-blur justify-center p-1 border border-x-0 border-t-0 border-green-400/10">
      <Link href="/">
        <Image
          src={logo}
          alt="Compifly"
          width={50}
          height={50}
          className="rounded-full"
        />
      </Link>
    </div>
  );
};

export default MobileHeader;
