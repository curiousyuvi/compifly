import axios from "axios";

const api_endpoint = "https://competitive-coding-api.herokuapp.com/api";
const axiosInstance = axios.create({ baseURL: api_endpoint });

const getCodechefRating: (handle: string) => Promise<number | null> = async (
    handle
) => {
    try {
        const response = await axiosInstance.get(`/codechef/${handle}`);
        if (response.data?.rating) return Promise.resolve(response.data.rating);
        else return null;
    } catch (error: any) {
        console.error(error)
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
        console.error(error)
        return null;
    }
};

export { getCodechefRating, getCodeforcesRating }