import React from "react";
import MobileNavlink from "./MobileNavlink";
import { AiFillTrophy, AiOutlineTrophy } from "react-icons/ai";
import {
  IoHomeOutline,
  IoHomeSharp,
  IoPeopleOutline,
  IoPeopleSharp,
  IoSearch,
} from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Avatar,
  Button,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
import { FaOptinMonster, FaSearch } from "react-icons/fa";
import useUser from "../hooks/useUser";

const MobileNavbar = () => {
  const { logout } = useAuth();
  const userDoc = useUser();

  const handleLogoutClick = () => {
    logout();
  };
  return (
    <div
      className={`sm:hidden fixed z-10 ${useColorModeValue(
        "bg-green-700/10",
        "bg-white/10"
      )} backdrop-blur border border-x-0 border-b-0 border-green-500/20 bottom-0 w-full px-2 py-3 flex items-center justify-evenly`}
    >
      {auth.currentUser ? (
        <>
          <MobileNavlink
            href={`/${userDoc?.username || "nan"}/rankings`}
            idleIcon={<AiOutlineTrophy className="text-3xl" />}
            activeIcon={<AiFillTrophy className="text-3xl text-green-500" />}
          />
          <MobileNavlink
            href="/friends"
            idleIcon={<IoPeopleOutline className="text-3xl" />}
            activeIcon={<IoPeopleSharp className="text-3xl text-green-500" />}
          />
          <MobileNavlink
            href={`/${userDoc?.username || "nan"}`}
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
          <MobileNavlink
            href="/search"
            idleIcon={<IoSearch className="text-3xl" />}
            activeIcon={<IoSearch className="text-3xl text-green-500" />}
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
        </>
      ) : (
        <>
          <MobileNavlink
            href="/"
            idleIcon={<IoHomeOutline className="text-3xl" />}
            activeIcon={<IoHomeSharp className="text-3xl text-green-500" />}
          />
          <MobileNavlink
            href="/search"
            idleIcon={<IoSearch className="text-3xl" />}
            activeIcon={<IoSearch className="text-3xl text-green-500" />}
          />
          <Link href="/register">
            <Button
              className="p-1 px-8"
              paddingX={8}
              height="14"
              bgColor="green.400"
              color="white"
              fontWeight="bold"
              size="sm"
            >
              GET STARTED
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default MobileNavbar;
