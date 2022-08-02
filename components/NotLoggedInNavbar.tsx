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

const NotLoggedInNavbar = () => {
  const { logout } = useAuth();
  const userDoc = useUser();
  const [query, setQuery] = useState<string>("");
  const toast = useToast();
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
    </div>
  );
};

export default NotLoggedInNavbar;
