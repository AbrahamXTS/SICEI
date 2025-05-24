import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export const useAxiosClient = () => {
  const { getAccessTokenSilently } = useAuth0();

  const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_HOST,
  });

  axiosClient.interceptors.request.use(async (config) => {
    config.headers["Authorization"] =
      `Bearer ${await getAccessTokenSilently()}`;

    return config;
  });

  return axiosClient;
};
