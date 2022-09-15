import {
  Avatar,
  Button,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Player } from "@lottiefiles/react-lottie-player";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Badges from "../../components/Badges";
import Layout from "../../components/Layout";
import LoadingLayout from "../../components/LoadingLayout";
import { auth } from "../../firebase";
import useDB from "../../hooks/useDB";
import useUser from "../../hooks/useUser";
import { UserDoc } from "../../interfaces/UserDoc";
import {
  getCodechefRating,
  getCodeforcesRating,
} from "../../services/competitiveAPIServices";
import {
  getDocumentIDFromUsername,
  getUserDoc,
} from "../../services/dbServices";
import { HiOutlineUserAdd, HiOutlineUserRemove } from "react-icons/hi";

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const username = context.params?.username;

  const uid = await getDocumentIDFromUsername(username as string);
  if (uid) {
    const userDoc = await getUserDoc(uid);
    const codechefRating = await getCodechefRating(
      userDoc?.codechefHandle || ""
    );
    const codeforcesRating = await getCodeforcesRating(
      userDoc?.codeforcesHandle || ""
    );

    return {
      props: {
        uid,
        name: userDoc?.name,
        username: userDoc?.username,
        photoURL: userDoc?.photoURL,
        codechefHandle: userDoc?.codechefHandle,
        codeforcesHandle: userDoc?.codeforcesHandle,
        codechefRating,
        codeforcesRating,
        userNotFound: false,
      },
      revalidate: 3600,
    };
  }

  return {
    props: {
      uid: "",
      name: "",
      username: "",
      photoURL: "",
      codechefHandle: "",
      codeforcesHandle: "",
      codechefRating: "",
      codeforcesRating: "",
      userNotFound: true,
    },
  };
};

const Profile: NextPage<{
  uid: string;
  name: string;
  username: string;
  photoURL: string;
  codechefHandle: string;
  codeforcesHandle: string;
  codechefRating: number;
  codeforcesRating: number;
  userNotFound: boolean;
}> = ({
  uid,
  name,
  username,
  photoURL,
  codechefHandle,
  codeforcesHandle,
  codechefRating,
  codeforcesRating,
  userNotFound,
}) => {
  const userDoc = useUser();
  const router = useRouter();
  const { addFriend, removeFriend } = useDB();
  const [isMyProfile, setIsMyProfile] = useState<boolean>(false);
  const [isMyFriend, setIsMyFriend] = useState<boolean>(false);
  const circleWaveAnimation = useColorModeValue(
    "/circle-wave-lottie-light.json",
    "/circle-wave-lottie.json"
  );

  const handleAddFriend = () => {
    if (auth.currentUser?.uid) {
      setIsMyFriend(true);
      addFriend(uid, auth.currentUser.uid, userDoc?.username || "");
    } else {
      router.push("/login");
    }
  };
  const handleRemoveFriend = () => {
    if (auth.currentUser?.uid) {
      setIsMyFriend(false);
      removeFriend(uid, auth.currentUser.uid, userDoc?.username || "");
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    setIsMyFriend(
      (userDoc?.friends?.find((friend) => friend === uid)?.length || 0) > 0
    );

    if (auth.currentUser?.uid) setIsMyProfile(uid === auth.currentUser.uid);
    else setIsMyProfile(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDoc, username, auth]);

  if (userNotFound)
    return (
      <Layout>
        <Heading>User Not Found</Heading>
      </Layout>
    );

  return (
    <Layout>
      <Head>
        <title>{username} | Compifly</title>
      </Head>
      <div className="w-full h-full flex flex-col justify-center items-center p-4 py-24">
        <div className="h-56 w-56 sm:h-72 sm:w-72 flex justify-center items-center relative">
          <Player
            autoplay={true}
            loop={true}
            src={circleWaveAnimation}
            speed={0.4}
            style={{
              height: "100%",
              width: "100%",
              top: "0",
              left: "0",
              position: "absolute",
              opacity: "70%",
            }}
          />
          <div className="h-3/5 w-3/5 border-4 border-green-500 rounded-full">
            <Avatar src={photoURL} size="full" className="drop-shadow-xl" />
          </div>
        </div>
        <Text className="text-2xl sm:text-3xl">{name}</Text>
        <Text className="text-md sm:text-lg opacity-80">{"@" + username}</Text>
        {isMyProfile ? (
          <></>
        ) : isMyFriend ? (
          <Button
            className="w-full max-w-sm my-4"
            height="14"
            variant="outline"
            borderColor={"green.500"}
            color={"green.500"}
            onClick={handleRemoveFriend}
          >
            <Text
              fontWeight="extrabold"
              fontSize="xl"
              className="flex items-center"
            >
              <HiOutlineUserRemove className="text-lg" />
              <span className="mx-2" />
              {"Remove from friends"}
            </Text>
          </Button>
        ) : (
          <Button
            className="w-full max-w-sm my-4"
            height="14"
            onClick={handleAddFriend}
            bgColor="green.500"
          >
            <Text
              fontWeight="extrabold"
              fontSize="xl"
              className="flex items-center"
            >
              <HiOutlineUserAdd className="text-lg" />
              <span className="mx-2" />
              {"Add friend"}
            </Text>
          </Button>
        )}
        <Badges
          codchefHandle={codechefHandle}
          codechefRating={codechefRating}
          codeforcesHandle={codeforcesHandle}
          codeforcesRating={codeforcesRating}
        />
      </div>
    </Layout>
  );
};

export default Profile;
