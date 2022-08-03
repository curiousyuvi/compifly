import { useToast } from "@chakra-ui/react";
import { FirebaseError } from "@firebase/app";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../firebase";

const useStorage = () => {
  const toast = useToast();
  const uploadImageAndGetURL = async (imageFile: File, uid: string) => {
    try {
      const imageRef = ref(storage, uid);
      await uploadBytes(imageRef, imageFile);
      const imageURL = await getDownloadURL(imageRef);
      return imageURL;
    } catch (error: any | FirebaseError) {
      console.error(error);
    }
  };

  return { uploadImageAndGetURL };
};

export default useStorage;
