import {
  Avatar,
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import DesktopNavlink from "./DesktopNavlink";
import { BsThreeDotsVertical } from "react-icons/bs";
import useUser from "../hooks/useUser";
import Link from "next/link";
import { query } from "firebase/firestore";
import { FaSearch } from "react-icons/fa";
import router from "next/router";

const DesktopHeader = () => {
  const { colorMode } = useColorMode();
  const logo = "/logo.svg";
  const { logout } = useAuth();
  const userDoc = useUser();
  const [query, setQuery] = useState<string>("");
  const toast = useToast();

  const handleLogoutClick = () => {
    logout();
  };

  const handleQueryChange = (event: any) => {
    setQuery(event.target.value);
  };
  const handleFromSubmit = (event: any) => {
    event.preventDefault();
    if (query.length >= 3) router.push(`/search/${query.toLowerCase()}`);
    else
      toast({
        title: "Search query is too short",
        status: "warning",
        duration: 3000,
        isClosable: true,
        variant: "solid",
      });
  };

  return (
    <div
      className={`hidden sm:flex w-full ${useColorModeValue(
        "bg-green-700/10",
        "bg-white/10"
      )} fixed top-0 backdrop-blur justify-center p-1 border border-x-0 border-t-0 border-green-400/10`}
    >
      <div className="w-full max-w-6xl p-2 flex justify-between">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <Image
              src={logo}
              alt="Compifly"
              width={50}
              height={50}
              className="rounded-full"
            />
            <span className="mx-1" />
            <Heading size="lg">COMPIFLY</Heading>
          </div>
        </Link>
        <div className="flex items-center">
          <form
            className="w-[8.6rem] lg:w-[20rem] flex items-center justify-center"
            onSubmit={handleFromSubmit}
          >
            <InputGroup className="w-full flex items-center justify-center">
              <InputLeftElement pointerEvents="none" height="full">
                <FaSearch className="text-lg" />
              </InputLeftElement>
              <Input
                id="search"
                value={query}
                onChange={handleQueryChange}
                placeholder="Search a name or handle"
                height="12"
                fontSize="md"
                focusBorderColor={useColorModeValue("green.300", "green.500")}
                size="md"
              />
            </InputGroup>
            <span className="mx-3" />
          </form>
          <Link href={`/${userDoc?.username || ""}`}>
            <Avatar
              src={userDoc?.photoURL || ""}
              size="md"
              className="cursor-pointer"
            />
          </Link>
          <span className="mx-3" />
          <DesktopNavlink href="/friends"> FRIENDS</DesktopNavlink>
          <span className="mx-3" />
          <DesktopNavlink href={`/${userDoc?.username || "nan"}/rankings`}>
            RANKINGS
          </DesktopNavlink>
          <span className="mx-3" />
          <Menu>
            <MenuButton as={Button} padding="1.5" background="transparent">
              <BsThreeDotsVertical className="text-xl" />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link href="/edit_profile">Edit Profile</Link>
              </MenuItem>
              <MenuItem textColor="red.500" onClick={handleLogoutClick}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default DesktopHeader;
