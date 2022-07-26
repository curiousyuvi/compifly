import React from "react";
import MobileNavlink from "./MobileNavlink";
import { AiFillTrophy, AiOutlineTrophy } from "react-icons/ai";
import { IoPeopleOutline, IoPeopleSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Avatar,
  Button,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
import { FaOptinMonster } from "react-icons/fa";

const MobileNavbar = () => {
  const { logout } = useAuth();

  const handleLogoutClick = () => {
    logout();
  };
  return (
    <div className="sm:hidden fixed bg-white/10 backdrop-blur border border-x-0 border-b-0 border-green-500/20 bottom-0 w-full px-2 py-3 flex items-center justify-evenly">
      <MobileNavlink
        href="/rankings"
        idleIcon={<AiOutlineTrophy className="text-3xl" />}
        activeIcon={<AiFillTrophy className="text-3xl text-green-500" />}
      />
      <MobileNavlink
        href="/friends"
        idleIcon={<IoPeopleOutline className="text-3xl" />}
        activeIcon={<IoPeopleSharp className="text-3xl text-green-500" />}
      />
      <MobileNavlink
        href="/"
        idleIcon={
          <Avatar
            src={auth.currentUser?.photoURL || ""}
            size="sm"
            className="opacity-80"
          />
        }
        activeIcon={
          <Avatar
            src={auth.currentUser?.photoURL || ""}
            size="sm"
            borderColor="green.500"
            className="border-4"
          />
        }
      />
      <Menu>
        <MenuButton as={Button} padding="1.5" background="transparent">
          <BsThreeDotsVertical className="text-3xl" />
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
  );
};

export default MobileNavbar;
