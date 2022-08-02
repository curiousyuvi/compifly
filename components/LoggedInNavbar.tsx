import {
  useToast,
  InputGroup,
  InputLeftElement,
  Input,
  useColorModeValue,
  Avatar,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import DesktopNavlink from "./DesktopNavlink";

const LoggedInNavbar = () => {
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
    <div className="flex items-center">
      <form
        className="w-[8.6rem] lg:w-[20rem] flex items-center justify-center"
        onSubmit={handleFromSubmit}
      >
        <InputGroup className="w-full flex items-center justify-center">
          <InputLeftElement pointerEvents="none" height="full">
            <FaSearch className="text-lg opacity-50" />
          </InputLeftElement>
          <Input
            id="search"
            value={query}
            onChange={handleQueryChange}
            className="placeholder:text-white/60"
            placeholder="Search a name or handle"
            height="12"
            fontSize="md"
            focusBorderColor={useColorModeValue("gray.500", "gray.500")}
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
  );
};

export default LoggedInNavbar;
