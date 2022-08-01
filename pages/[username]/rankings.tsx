import {
  Avatar,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import React from "react";
import Layout from "../../components/Layout";
import {
  getCodechefRating,
  getCodeforcesRating,
} from "../../services/competitiveAPIServices";
import {
  getDocumentIDFromUsername,
  getUserDoc,
} from "../../services/dbServices";
import { UserDocWithRating } from "../../interfaces/UserDocWithRating";
import RankingList from "../../components/RankingList";

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

    let userDocsWithRatings: UserDocWithRating[] = [];

    if (userDoc) {
      userDocsWithRatings = [
        {
          userDoc,
          codechefRating,
          codeforcesRating,
        },
      ];
      const promises = userDoc.friends.map(async (friendUID) => {
        const friendUserDoc = await getUserDoc(friendUID);
        if (friendUserDoc) {
          const friendCodechefRating = await getCodechefRating(
            friendUserDoc.codechefHandle || ""
          );
          const friendCodeforcesRating = await getCodeforcesRating(
            friendUserDoc.codeforcesHandle || ""
          );

          userDocsWithRatings.push({
            userDoc: friendUserDoc,
            codechefRating: friendCodechefRating,
            codeforcesRating: friendCodeforcesRating,
          });
        }
      });

      await Promise.all(promises);
    }

    return {
      props: {
        userDocsWithRatings,
      },
      revalidate: 3600,
    };
  }

  return {
    props: {
      userDocsWithRatings: [],
    },
    revalidate: 3600,
  };
};

const rankings: NextPage<{ userDocsWithRatings: UserDocWithRating[] }> = ({
  userDocsWithRatings,
}) => {
  let UserDocsWithCodechefRating = userDocsWithRatings
    .filter((item) => item.codechefRating)
    .map((item) => {
      return {
        userDoc: item.userDoc,
        rating: item.codechefRating as number,
        handle: item.userDoc.codechefHandle,
      };
    })
    .sort((a, b) => b.rating - a.rating);

  let UserDocsWithCodeforcesRating = userDocsWithRatings
    .filter((item) => item.codeforcesRating)
    .map((item) => {
      return {
        userDoc: item.userDoc,
        rating: item.codeforcesRating as number,
        handle: item.userDoc.codeforcesHandle,
      };
    })
    .sort((a, b) => b.rating - a.rating);
  return (
    <Layout>
      <div className="w-full h-full flex flex-col items-center">
        <Heading>Rankings</Heading>
        <span className="my-4" />
        <Tabs
          isFitted
          variant="soft-rounded"
          colorScheme="green"
          className="w-full h-full"
        >
          <TabList mb="1em">
            <Tab>
              CODECHEF <span className="hidden sm:flex ml-2">RANKINGS</span>
            </Tab>
            <Tab>
              CODEFORCES <span className="hidden sm:flex ml-2">RANKINGS</span>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="w-full h-full">
                <RankingList userDocsWithRating={UserDocsWithCodechefRating} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="w-full h-full">
                <RankingList
                  userDocsWithRating={UserDocsWithCodeforcesRating}
                />
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </Layout>
  );
};

export default rankings;