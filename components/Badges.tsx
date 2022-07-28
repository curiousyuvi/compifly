import { Text } from "@chakra-ui/react";
import React from "react";
import CompetitiveBadge from "./CompetitiveBadge";

const Badges = ({
  codchefHandle,
  codeforcesHandle,
}: {
  codchefHandle: string;
  codeforcesHandle: string;
}) => {
  return (
    <div className="flex flex-col items-center w-full p-4">
      <Text className="text-lg sm:text-2xl">Badges</Text>
      <span className="my-2 sm:my-4" />
      <div className="grid grid-cols-2 gap-8">
        <CompetitiveBadge.Codechef handle={codchefHandle} />
        <CompetitiveBadge.Codeforces handle={codeforcesHandle} />
      </div>
    </div>
  );
};

export default Badges;
