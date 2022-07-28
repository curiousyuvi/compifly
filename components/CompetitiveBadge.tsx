import { Skeleton, Text } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useCompetitiveAPI from "../hooks/useCompetitiveAPI";

const Codechef = ({ handle }: { handle: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);
  const { getCodechefRating } = useCompetitiveAPI();
  const [stars, setStars] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    const loadBadgeData = async () => {
      if (handle && handle !== "") {
        setLoading(true);
        setHidden(false);
        const ratingData = await getCodechefRating(handle);
        if (ratingData) {
          setRating(ratingData);
          if (ratingData <= 1399) setStars(1);
          else if (ratingData <= 1599) setStars(2);
          else if (ratingData <= 1799) setStars(3);
          else if (ratingData <= 1999) setStars(4);
          else if (ratingData <= 2199) setStars(5);
          else if (ratingData <= 2499) setStars(6);
          else if (ratingData >= 2500) setStars(7);
        } else setHidden(true);
        setLoading(false);
      } else setHidden(true);
    };

    loadBadgeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handle]);
  if (hidden) return <></>;

  if (loading)
    return (
      <div className="w-[6rem] h-[7.5rem] sm:w-[9rem] sm:h-[11.25rem] rounded-lg overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>
    );
  return (
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
  );
};

const Codeforces = ({ handle }: { handle: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);
  const { getCodeforcesRating } = useCompetitiveAPI();
  const [title, setTitle] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    const loadBadgeData = async () => {
      if (handle && handle !== "") {
        setLoading(true);
        setHidden(false);
        const ratingData = await getCodeforcesRating(handle);
        if (ratingData) {
          setRating(ratingData);
          if (ratingData <= 1199) setTitle("Newbie");
          else if (ratingData <= 1399) setTitle("Pupil");
          else if (ratingData <= 1599) setTitle("Specialist");
          else if (ratingData <= 1899) setTitle("Expert");
          else if (ratingData <= 2199) setTitle("Candidate Master");
          else if (ratingData <= 2299) setTitle("Master");
          else if (ratingData <= 2399) setTitle("International Master");
          else if (ratingData <= 2599) setTitle("Grandmaster");
          else if (ratingData <= 2899) setTitle("International Grandmaster");
          else if (ratingData >= 2900) setTitle("Legendary Grandmaster");
        } else setHidden(true);
        setLoading(false);
      } else setHidden(true);
    };

    loadBadgeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handle]);

  if (hidden) return <></>;

  if (loading)
    return (
      <div className="w-[6rem] h-[7.5rem] sm:w-[9rem] sm:h-[11.25rem] rounded-lg overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>
    );
  return (
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
  );
};

const CompetitiveBadge = { Codechef, Codeforces };

export default CompetitiveBadge;
