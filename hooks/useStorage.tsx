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
      toast({
        title: "Failed to upload image",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        variant: "solid",
      });
    }
  };

  return { uploadImageAndGetURL };
};

export default useStorage;
