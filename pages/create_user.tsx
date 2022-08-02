import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";
import AuthLayout from "../components/AuthLayout";
import NotLoggedIn from "../components/NotLoggedIn";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
import useDB from "../hooks/useDB";
import useStorage from "../hooks/useStorage";

const CreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [isFormError, setIsFormError] = useState(false);
  const [formError, setFormError] = useState({
    name: "",
    username: "",
    codechefHandle: "",
    codeforcesHandle: "",
  });
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [photoDisplayURL, setPhotoDisplayURL] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoURL, setPhotoURL] = useState("");
  const [codechefHandle, setCodechefHandle] = useState("");
  const [codeforcesHandle, setCodeforcesHandle] = useState("");
  const { updateUserProfile } = useAuth();
  const { createUserDoc } = useDB();
  const { uploadImageAndGetURL } = useStorage();
  const router = useRouter();

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };
  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
  };
  const handleCodechefHandleChange = (event: any) => {
    setCodechefHandle(event.target.value);
  };
  const handleCodeforcesHandleChange = (event: any) => {
    setCodeforcesHandle(event.target.value);
  };

  const handlePhotoFileChange = (event: any) => {
    if (event.target.files[0]) {
      setPhotoFile(event.target.files[0]);
      setPhotoDisplayURL(URL.createObjectURL(event.target.files[0]));
    }
  };

  const validateForm = () => {
    setIsFormError(false);
    setFormError({
      name: "",
      username: "",
      codechefHandle: "",
      codeforcesHandle: "",
    });

    var validEmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (name.trim().length === 0) {
      setFormError({
        name: "Name can't be left empty",
        username: "",
        codechefHandle: "",
        codeforcesHandle: "",
      });
      return false;
    }

    if (name.trim().length <= 3) {
      setFormError({
        name: "Name is too short",
        username: "",
        codechefHandle: "",
        codeforcesHandle: "",
      });
      return false;
    }

    if (username.trim().length === 0) {
      setFormError({
        username: "Username can't be left empty",
        name: "",
        codechefHandle: "",
        codeforcesHandle: "",
      });
      return false;
    }

    if (username.trim().length <= 3) {
      setFormError({
        username: "Username is too short",
        name: "",
        codechefHandle: "",
        codeforcesHandle: "",
      });
      return false;
    }

    if (username.trim().includes(" ")) {
      setFormError({
        username: "Username must not contain spaces",
        name: "",
        codechefHandle: "",
        codeforcesHandle: "",
      });
      return false;
    }

    if (codechefHandle.trim().includes(" ")) {
      setFormError({
        username: "",
        name: "",
        codechefHandle: "Competitive handle must not contain spaces",
        codeforcesHandle: "",
      });
      return false;
    }

    if (codeforcesHandle.trim().includes(" ")) {
      setFormError({
        username: "",
        name: "",
        codechefHandle: "",
        codeforcesHandle: "Competitive handle must not contain spaces",
      });
      return false;
    }

    setIsFormError(false);
    setFormError({
      name: "",
      username: "",
      codechefHandle: "",
      codeforcesHandle: "",
    });

    return true;
  };

  const handleCreateUserFormSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    if (validateForm()) {
      if (photoFile) {
        const photoURLFromStorage = await uploadImageAndGetURL(
          photoFile,
          auth.currentUser?.uid as string
        );
        await updateUserProfile({
          name,
          photo_url: photoURLFromStorage || photoURL,
        });
        await createUserDoc(auth.currentUser?.uid as string, {
          name: name.toLowerCase(),
          photoURL: photoURLFromStorage || photoURL,
          username: username.toLowerCase(),
          codechefHandle,
          codeforcesHandle,
          friends: [],
        });
      } else {
        await updateUserProfile({ name, photo_url: photoURL });
        await createUserDoc(auth.currentUser?.uid as string, {
          name: name.toLowerCase(),
          photoURL,
          username: username.toLowerCase(),
          codechefHandle,
          codeforcesHandle,
          friends: [],
        });
      }

      router.replace("/");
    } else {
      setIsFormError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    const loadProfileData = () => {
      if (auth.currentUser?.displayName) setName(auth.currentUser.displayName);
      if (auth.currentUser?.photoURL) {
        setPhotoDisplayURL(auth.currentUser.photoURL);
        setPhotoURL(auth.currentUser.photoURL);
      }
    };
    auth.onAuthStateChanged(() => {
      loadProfileData();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const borderFocusColor = useColorModeValue("green.300", "green.500");

  if (!auth.currentUser) return <NotLoggedIn />;

  return (
    <AuthLayout>
      <div className="w-full min-h-screen h-full flex flex-col justify-center items-center p-4">
        <FormControl isInvalid={isFormError}>
          <form
            onSubmit={handleCreateUserFormSubmit}
            className="w-full flex flex-col justify-center items-center"
          >
            <Heading>Create User Profile</Heading>
            <span className="my-4" />
            <Text className="w-full max-w-sm text-lg">Write your name</Text>
            <span className="my-1" />
            <Input
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder="John Doe"
              className="w-full max-w-sm"
              fontSize="lg"
              focusBorderColor={borderFocusColor}
            />
            <FormErrorMessage>{formError.name}</FormErrorMessage>
            <span className="my-3" />
            <Text className="w-full max-w-sm text-lg">Choose a username</Text>
            <span className="my-1" />
            <Input
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="johnDoe00"
              className="w-full max-w-sm"
              fontSize="lg"
              focusBorderColor={borderFocusColor}
            />
            <FormErrorMessage>{formError.username}</FormErrorMessage>
            <span className="my-3" />
            <Text className="w-full max-w-sm text-lg">
              Choose a profile picture
            </Text>
            <span className="my-2" />
            <Avatar src={photoDisplayURL} size="2xl" />
            <span className="my-2" />
            <input
              className="text-sm"
              type="file"
              onChange={handlePhotoFileChange}
            />
            <span className="my-3" />
            <Text className="w-full max-w-sm text-lg">
              Competitive Programming Hanldes
            </Text>
            <span className="my-1" />
            <Text className="w-full max-w-sm text-xs opacity-70">
              {"Write your competitive programming website's user handles"}
            </Text>
            <span className="mt-1" />
            <Text className="w-full max-w-sm text-xs opacity-70">
              {"If you don't have one, you can leave it empty."}
            </Text>
            <span className="my-2" />
            <Box className="flex items-center w-full max-w-sm">
              <Avatar
                src="/codechef.png"
                backgroundColor="gray.700"
                size="lg"
              />
              <span className="mx-1" />
              <Text fontSize="xl" fontWeight="bold">
                {"/"}
              </Text>
              <span className="mx-1" />
              <Input
                placeholder="codechef_handle"
                value={codechefHandle}
                onChange={handleCodechefHandleChange}
                focusBorderColor={borderFocusColor}
              />
            </Box>
            <FormErrorMessage>{formError.codechefHandle}</FormErrorMessage>
            <span className="my-2" />
            <Box className="flex items-center w-full max-w-sm">
              <Avatar
                src="/codeforces.png"
                backgroundColor="gray.700"
                size="lg"
                padding="1"
              />
              <span className="mx-1" />
              <Text fontSize="xl" fontWeight="bold">
                {"/"}
              </Text>
              <span className="mx-1" />
              <Input
                placeholder="codeforces_handle"
                value={codeforcesHandle}
                onChange={handleCodeforcesHandleChange}
                focusBorderColor={borderFocusColor}
              />
            </Box>
            <FormErrorMessage>{formError.codeforcesHandle}</FormErrorMessage>
            <span className="my-4" />
            <Button
              className="w-full max-w-sm p-2"
              height="14"
              bgColor={borderFocusColor}
              type="submit"
            >
              <Text fontWeight="extrabold" fontSize="xl">
                {loading ? (
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.400"
                    color={"white"}
                    size="md"
                  />
                ) : (
                  "CREATE PROFILE"
                )}
              </Text>
            </Button>
          </form>
        </FormControl>
      </div>
    </AuthLayout>
  );
};

export default CreateUser;
