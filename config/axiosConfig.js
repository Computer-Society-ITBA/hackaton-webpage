import axios from "axios";
import useStore from "../config/storeConfig";
import auth from "../config/firebaseConfig";

export const axiosApiInstance = axios.create();

let userToken = useStore.getState().token;
const setToken = useStore.getState().setToken;
const setConfig = useStore.getState().setConfig;

//Lo de antes creo que no reacciona a cambios, por eso usamos esto para cambiar con el store
useStore.subscribe(
  (state) => [state.token],
  (token, prevToken) => {
    userToken = token;
  }
);

axiosApiInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${userToken}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.response.data.error.code === "auth/id-token-expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const accessToken = await auth.currentUser?.getIdToken(true);
      setAxiosToken(accessToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

// NOTE: update config when config error
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    if (
      error.response.status === 403 &&
      error.response.data.error.code === "config"
    ) {
      const config = (await axiosApiInstance.get("/config")).data;
      setConfig(config);
    }
    return Promise.reject(error);
  }
);

export async function setAxiosToken(token) {
  setToken(token);
  userToken = token;

  const config = (await axiosApiInstance.get("/config")).data;

  setConfig(config);
}
