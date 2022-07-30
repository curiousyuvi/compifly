import {
  Avatar,
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import DesktopNavlink from "./DesktopNavlink";
import { BsThreeDotsVertical } from "react-icons/bs";
import useUser from "../hooks/useUser";
import Link from "next/link";

const DesktopHeader = () => {
  const { colorMode } = useColorMode();
  const logo = "/logo.svg";
  const { logout } = useAuth();
  const userDoc = useUser();

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <div className="hidden sm:flex w-full bg-white/10 fixed top-0 backdrop-blur justify-center p-1 border border-x-0 border-t-0 border-green-400/10">
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
          <DesktopNavlink href="/rankings"> RANKINGS</DesktopNavlink>
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
