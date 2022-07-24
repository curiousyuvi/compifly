import { useToast } from "@chakra-ui/react";
import { doc, getDoc } from "@firebase/firestore";
import { FirebaseError } from "firebase/app";
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

  return { userDocExists };
};

export default useDB;
