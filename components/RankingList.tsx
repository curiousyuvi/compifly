import React from "react";
import { UserDoc } from "../interfaces/UserDoc";
import RankingListItem from "./RankingListItem";

const RankingList = ({
  userDocsWithRating,
}: {
  userDocsWithRating: { userDoc: UserDoc; handle: string; rating: number }[];
}) => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      {userDocsWithRating.length >= 3 ? (
        <>
          <span className="my-16" />
          <div className="relative w-full max-w-md flex justify-center items-center">
            <div className="w-full flex items-center justify-between">
              <RankingListItem.Rank23
                rank={2}
                photoURL={userDocsWithRating[1].userDoc.photoURL}
                username={userDocsWithRating[1].userDoc.username}
                handle={userDocsWithRating[1].handle}
                rating={userDocsWithRating[1].rating}
              />

              <RankingListItem.Rank23
                rank={3}
                photoURL={userDocsWithRating[2].userDoc.photoURL}
                username={userDocsWithRating[2].userDoc.username}
                handle={userDocsWithRating[2].handle}
                rating={userDocsWithRating[2].rating}
              />
            </div>
            <div className="absolute bottom-16">
              <RankingListItem.Rank1
                photoURL={userDocsWithRating[0].userDoc.photoURL}
                username={userDocsWithRating[0].userDoc.username}
                handle={userDocsWithRating[0].handle}
                rating={userDocsWithRating[0].rating}
              />
            </div>
          </div>
          <span className="my-3" />
          {userDocsWithRating.slice(3).map((item, index) => {
            return (
              <RankingListItem.Normal
                key={item.userDoc.username}
                rank={index + 4}
                photoURL={item.userDoc.photoURL}
                username={item.userDoc.username}
                handle={item.handle}
                rating={item.rating}
              />
            );
          })}
        </>
      ) : (
        <>
          {userDocsWithRating.map((item, index) => {
            return (
              <RankingListItem.Normal
                key={item.userDoc.username}
                rank={index + 1}
                photoURL={item.userDoc.photoURL}
                username={item.userDoc.username}
                handle={item.handle}
                rating={item.rating}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default RankingList;
