import { useToast } from "@chakra-ui/react";
import axios from "axios";

const useCompetitiveAPI = () => {
  const api_endpoint = "https://competitive-coding-api.herokuapp.com/api";
  const axiosInstance = axios.create({ baseURL: api_endpoint });
  const toast = useToast();

  const getCodechefRating: (handle: string) => Promise<number | null> = async (
    handle
  ) => {
    try {
      const response = await axiosInstance.get(`/codechef/${handle}`);
      if (response.data?.rating) return Promise.resolve(response.data.rating);
      else return null;
    } catch (error: any) {
      toast({
        title: "Failed to get codechef rating",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
        variant: "solid",
      });
      return null;
    }
  };

  const getCodeforcesRating: (
    handle: string
  ) => Promise<number | null> = async (handle) => {
    try {
      const response = await axiosInstance.get(`/codeforces/${handle}`);
      if (response.data?.rating) return Promise.resolve(response.data.rating);
      else return null;
    } catch (error: any) {
      toast({
        title: "Failed to get codeforces rating",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
        variant: "solid",
      });
      return null;
    }
  };

  return { getCodechefRating, getCodeforcesRating };
};

export default useCompetitiveAPI;