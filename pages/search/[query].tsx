import {
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Kbd,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Layout from "../../components/Layout";
import FriendListItem from "../../components/FriendListItem";
import useDB from "../../hooks/useDB";
import { UserShortDoc } from "../../interfaces/UserShortDoc";
import UserListItem from "../../components/UserListItem";

const SearchResults = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<UserShortDoc[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { query } = router.query;
  const toast = useToast();
  const { searchUserDoc } = useDB();

  const handleQueryChange = (event: any) => {
    setSearchQuery(event.target.value);
  };
  const handleFromSubmit = (event: any) => {
    event.preventDefault();
    if (searchQuery.length >= 3)
      router.push(`/search/${searchQuery.toLowerCase()}`);
    else
      toast({
        title: "Search query is too short",
        status: "warning",
        duration: 3000,
        isClosable: true,
        variant: "solid",
      });
  };

  useEffect(() => {
    const loadSearchResults = async () => {
      setLoading(true);
      setSearchResults(await searchUserDoc(query as string));
      setLoading(false);
    };
    loadSearchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

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
              value={searchQuery}
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
        {loading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="white"
            color={"green.500"}
            size="xl"
          />
        ) : (
          <>
            {searchResults.map((searchResult) => {
              return (
                <UserListItem
                  key={searchResult.username}
                  userShortDoc={searchResult}
                />
              );
            })}
          </>
        )}
      </div>
    </Layout>
  );
};

export default SearchResults;
