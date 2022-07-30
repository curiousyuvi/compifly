import { Skeleton, Text } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useCompetitiveAPI from "../hooks/useCompetitiveAPI";

const Codechef = ({ handle, rating }: { handle: string; rating: number }) => {
  const [hidden, setHidden] = useState<boolean>(false);
  const [stars, setStars] = useState<number>(0);

  useEffect(() => {
    const loadBadgeData = async () => {
      if (handle && handle !== "") {
        setHidden(false);
        if (rating && rating > 0) {
          if (rating <= 1399) setStars(1);
          else if (rating <= 1599) setStars(2);
          else if (rating <= 1799) setStars(3);
          else if (rating <= 1999) setStars(4);
          else if (rating <= 2199) setStars(5);
          else if (rating <= 2499) setStars(6);
          else if (rating >= 2500) setStars(7);
        } else setHidden(true);
      } else setHidden(true);
    };

    loadBadgeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  handle;
  if (hidden) return <></>;

  return (
    <a
      href={`https://codeforces.com/profile/${handle}`}
      className="cursor-pointer"
    >
      <div className="w-[6rem] h-[7.5rem] sm:w-[9rem] sm:h-[11.25rem] relative">
        <div className="w-full h-full absolute drop-shadow-2xl">
          <Image src="/codechef-badge.png" alt="codechef-badge" layout="fill" />
        </div>
        <div className="w-full p-0 sm:p-2 pb-1 sm:pb-3 bg-orange-400/50 flex flex-col items-center absolute rounded-lg rounded-t-none bottom-0">
          <span className="text-sm sm:text-lg">
            {[...Array(stars)].map((star) => {
              return "★";
            })}
          </span>

          <Text className="flex items-center text-xs sm:text-sm">
            {rating}
            <span className="mx-1" />
            <span>PTS</span>
          </Text>
        </div>
        <div className="w-full h-full absolute">
          <Image src="/badge-frame.png" alt="frame" layout="fill" />
        </div>
      </div>
    </a>
  );
};

const Codeforces = ({ handle, rating }: { handle: string; rating: number }) => {
  const [hidden, setHidden] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const loadBadgeData = async () => {
      if (handle && handle !== "") {
        setHidden(false);
        if (rating && rating > 0) {
          if (rating <= 1199) setTitle("Newbie");
          else if (rating <= 1399) setTitle("Pupil");
          else if (rating <= 1599) setTitle("Specialist");
          else if (rating <= 1899) setTitle("Expert");
          else if (rating <= 2199) setTitle("Candidate Master");
          else if (rating <= 2299) setTitle("Master");
          else if (rating <= 2399) setTitle("International Master");
          else if (rating <= 2599) setTitle("Grandmaster");
          else if (rating <= 2899) setTitle("International Grandmaster");
          else if (rating >= 2900) setTitle("Legendary Grandmaster");
        } else setHidden(true);
      } else setHidden(true);
    };

    loadBadgeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hidden) return <></>;
  return (
    <a
      href={`https://www.codechef.com/users/${handle}`}
      className="cursor-pointer"
    >
      <div className="w-[6rem] h-[7.5rem] sm:w-[9rem] sm:h-[11.25rem] relative">
        <div className="w-full h-full absolute drop-shadow-2xl">
          <Image
            src="/codeforces-badge.png"
            alt="codeforces-badge"
            layout="fill"
          />
        </div>
        <div className="w-full p-0 sm:p-2 pb-1 sm:pb-3 bg-purple-400/50 flex flex-col items-center absolute rounded-lg rounded-t-none bottom-0">
          <Text
            fontWeight="bold"
            className="flex items-center text-sm sm:text-lg"
          >
            {title}
          </Text>

          <Text className="flex items-center text-xs sm:text-sm">
            {rating}
            <span className="mx-1" />
            <span>PTS</span>
          </Text>
        </div>
        <div className="w-full h-full absolute">
          <Image src="/badge-frame.png" alt="frame" layout="fill" />
        </div>
      </div>
    </a>
  );
};

const CompetitiveBadge = { Codechef, Codeforces };

export default CompetitiveBadge;
