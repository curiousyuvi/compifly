import { useToast } from "@chakra-ui/react";
import { doc, getDoc } from "@firebase/firestore";
import axios from "axios";
import { FirebaseError } from "firebase/app";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
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

  const createUserDoc = async (uid: string, userDoc: UserDoc) => {
    try {
      const userDocRef = doc(db, "users", uid);

      await setDoc(userDocRef, userDoc);
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
      const friendColSnapshot = await getDocs(friendColRef);

      const userDoc: UserDoc = {
        name: userDocSnapshot.data()?.name,
        photoURL: userDocSnapshot.data()?.photoURL,
        username: userDocSnapshot.data()?.username,
        codechefHandle: userDocSnapshot.data()?.codechefHandle,
        codeforcesHandle: userDocSnapshot.data()?.codeforcesHandle,
        friends: friendColSnapshot.docs.map((doc) => {
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

  const getDocumentIDFromUsername = async (username: string) => {
    const usersColRef = collection(db, "users");

    // Create a query against the collection.
    const q = query(usersColRef, where("username", "==", username));

    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
      return querySnapshot.docs[0].id;
    } else return null;
  };

  const addFriend = async (
    friendUID: string,
    uid: string,
    username: string
  ) => {
    try {
      if (friendUID) {
        const friendDocRef = doc(db, "users", uid, "friends", friendUID);

        await setDoc(friendDocRef, { uid: friendUID });
        axios.get("/api/revalidate", {
          params: { revalidate_path: `/${username}/rankings` },
        });
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
    }
  };

  const removeFriend = async (
    friendUID: string,
    uid: string,
    username: string
  ) => {
    try {
      if (friendUID) {
        const friendDocRef = doc(db, "users", uid, "friends", friendUID);
        await deleteDoc(friendDocRef);

        axios.get("/api/revalidate", {
          params: { revalidate_path: `/${username}/rankings` },
        });
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
    }
  };

  return {
    userDocExists,
    createUserDoc,
    getUserDoc,
    getDocumentIDFromUsername,
    addFriend,
    removeFriend,
  };
};

export default useDB;
