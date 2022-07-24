import { Button, IconButton } from "@chakra-ui/react";
import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-green-500 flex flex-col justify-center items-center p-4">
      <a href="https://github.com/curiousyuvi/compifly">
        <FaGithub className="text-3xl text-white" />
      </a>
      <span className="my-2" />
      <h1 className="text-gray-100">{"Made with ❤️ and Next.js"}</h1>
    </footer>
  );
};

export default Footer;
