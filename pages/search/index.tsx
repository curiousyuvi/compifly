import {
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Kbd,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Layout from "../../components/Layout";
import { capitalize } from "../../services/helpers";

const Search = () => {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();
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
    <Layout>
      <div className="w-full h-full flex flex-col items-center">
        <Heading>Search</Heading>
        <span className="my-4" />
        <form
          className="w-full flex items-center justify-center"
          onSubmit={handleFromSubmit}
        >
          <InputGroup className="w-full h-10 max-w-lg flex items-center justify-center">
            <InputLeftElement pointerEvents="none" height="full">
              <FaSearch className="text-lg" />
            </InputLeftElement>
            <Input
              autoFocus
              id="search"
              value={query}
              onChange={handleQueryChange}
              placeholder="Search a name or handle"
              className="w-full"
              height="14"
              fontSize="xl"
              focusBorderColor={useColorModeValue("green.300", "green.500")}
              size="lg"
            />
          </InputGroup>
        </form>
        <span className="my-4" />
        <div className="w-[20rem] h-[20rem] sm:w-[30rem] sm:h-[30rem]">
          <Player
            autoplay={true}
            loop={true}
            src={"/search-lottie.json"}
            style={{
              height: "100%",
              width: "100%",
            }}
          />
        </div>
        <Text>{"🔎 Search for your friend's profile"}</Text>
      </div>
    </Layout>
  );
};

export default Search;
