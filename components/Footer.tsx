import { Button, IconButton } from "@chakra-ui/react";
import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="hidden sm:flex w-full bg-green-500 flex-col justify-center items-center p-4">
      <a href="https://github.com/curiousyuvi/compifly">
        <FaGithub className="text-3xl text-white" />
      </a>
    </footer>
  );
};

export default Footer;
