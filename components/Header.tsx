import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect } from "react";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

const Header = () => {
  const { colorMode } = useColorMode();
  const logo = "/logo.svg";

  return (
    <>
      <DesktopHeader />
      <MobileHeader />
    </>
  );
};

export default Header;
