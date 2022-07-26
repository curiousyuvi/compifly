import { useToast } from "@chakra-ui/react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "@firebase/auth";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { auth } from "../firebase";

const useAuth = () => {
  const router = useRouter();
  const toast = useToast();
  const authenticateWithGithub = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user) router.replace("/");
    } catch (error: any) {
      console.error(error);
    }
  };

  const authenticateWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");
      const result = await signInWithPopup(auth, provider);
      if (result.user) router.replace("/");
    } catch (error: any) {
      console.error(error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result.user) router.replace("/");
    } catch (error: any) {
      console.error(error);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (result.user) router.replace("/create_user");
    } catch (error: any | FirebaseError) {
      console.error(error);
    }
  };

  const sendPasswordChangeEmail = (email: string) => {
    sendPasswordResetEmail(auth, email);
    toast({
      title: "Password reset email sent!",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "solid",
    });
    router.replace("/login");
  };

  const updateUserProfile = async ({
    name,
    photo_url,
  }: {
    name: string;
    photo_url: string;
  }) => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo_url,
        });
      }
    } catch (error: any | FirebaseError) {
      console.error(error);
    }
  };

  const logout = () => {
    auth.signOut();
    router.replace("/");
  };

  return {
    authenticateWithGithub,
    authenticateWithGoogle,
    signIn,
    signUp,
    sendPasswordChangeEmail,
    updateUserProfile,
    logout,
  };
};

export default useAuth;
