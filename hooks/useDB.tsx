import { useToast } from "@chakra-ui/react";
import { doc, getDoc } from "@firebase/firestore";
import { FirebaseError } from "firebase/app";
import { setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

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

  return { userDocExists, createUserDoc };
};

export default useDB;
