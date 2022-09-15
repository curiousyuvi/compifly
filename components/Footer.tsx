import { Button, IconButton } from "@chakra-ui/react";
import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="hidden sm:flex w-full flex-col justify-center items-center p-4 text-xs">
      <a href="https://github.com/curiousyuvi/compifly">
        <FaGithub className="text-lg text-white hover:scale-110 duration-100" />
      </a>
      <span className="my-1" />
      Copyright © 2022 Yuvraj Singh - All Rights Reserved.
    </footer>
  );
};

export default Footer;
