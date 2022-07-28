import { useToast } from "@chakra-ui/react";
import { doc, getDoc } from "@firebase/firestore";
import { FirebaseError } from "firebase/app";
import { collection, getDocs, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { UserDoc } from "../interfaces/UserDoc";

const useDB = () => {
  const toast = useToast();

  const userDocExists = async (uid: string) => {
    try {
      const userDocRef = doc(db, "users", uid);

      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        return true;
      } else {
        return false;
      }
    } catch (error: any | FirebaseError) {
      toast({
        title: "Database Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        variant: "solid",
      });
      return false;
    }
  };

  const createUserDoc = async (
    uid: string,
    {
      username,
      codechefHandle,
      codeforcesHandle,
    }: { username: string; codechefHandle: string; codeforcesHandle: string }
  ) => {
    try {
      const userDocRef = doc(db, "users", uid);

      await setDoc(userDocRef, { username, codechefHandle, codeforcesHandle });
    } catch (error: any | FirebaseError) {
      toast({
        title: "Database Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        variant: "solid",
      });
    }
  };

  const getUserDoc = async (uid: string) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const friendColRef = collection(db, "users", uid, "friends");

      const userDocSnapshot = await getDoc(userDocRef);
      const frinedColSnapshot = await getDocs(friendColRef);

      const userDoc: UserDoc = {
        username: userDocSnapshot.data()?.username,
        codechefHandle: userDocSnapshot.data()?.codechefHandle,
        codeforcesHandle: userDocSnapshot.data()?.codeforcesHandle,
        friends: frinedColSnapshot.docs.map((doc) => {
          return doc.id;
        }),
      };

      return userDoc;
    } catch (error: any | FirebaseError) {
      toast({
        title: "Database Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        variant: "solid",
      });
      return null;
    }
  };

  return { userDocExists, createUserDoc, getUserDoc };
};

export default useDB;
