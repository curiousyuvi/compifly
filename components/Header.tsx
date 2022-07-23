import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect } from "react";

const Header = () => {
  const { colorMode } = useColorMode();
  const logo = useColorModeValue("/logo_light.svg", "/logo.svg");

  return (
    <div className="w-full bg-white/10 fixed top-0 backdrop-blur flex justify-center p-1 border border-x-0 border-t-0 border-green-400/10">
      <Image src={logo} alt="Compifly" width={75} height={75} />
    </div>
  );
};

export default Header;
