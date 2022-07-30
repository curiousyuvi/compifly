import router from "next/router";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import useDB from "../hooks/useDB";
import { UserDoc } from "../interfaces/UserDoc";
import LoadingLayout from "../components/LoadingLayout";
import { collection, doc, onSnapshot } from "firebase/firestore";

const userContext = createContext<UserDoc | null>(null);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userDoc, setUserDoc] = useState<UserDoc | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const { getUserDoc, userDocExists } = useDB();
  useEffect(() => {
    const loadUserData = async (uid: string) => {
      setUserDoc(await getUserDoc(uid));
    };

    const checkUser = async () => {
      setAuthLoading(true);
      if (auth.currentUser && auth.currentUser?.uid) {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const friendsColRef = collection(
          db,
          "users",
          auth.currentUser.uid,
          "friends"
        );

        const unsubscribeUserDocListener = onSnapshot(
          userDocRef,
          (snapshot) => {
            if (snapshot) {
              loadUserData(auth.currentUser?.uid || "");
            }
          }
        );

        const unsubscribeFriendsColListener = onSnapshot(
          friendsColRef,
          (snapshot) => {
            if (snapshot) {
              loadUserData(auth.currentUser?.uid || "");
            }
          }
        );

        if (!(await userDocExists(auth.currentUser.uid)))
          router.replace("/create_user");
        else {
          await loadUserData(auth.currentUser.uid);
        }

        setAuthLoading(false);

        return () => {
          unsubscribeFriendsColListener();
          unsubscribeUserDocListener();
        };
      } else router.replace("/login");
      setAuthLoading(false);
    };

    auth.onAuthStateChanged(() => {
      checkUser();
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  if (authLoading) return <LoadingLayout />;

  return (
    <userContext.Provider value={userDoc}>{children}</userContext.Provider>
  );
};

export default UserProvider;

export { userContext };
