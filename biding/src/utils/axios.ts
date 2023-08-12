import axios from "axios";

const jwtToken = (token: string, flag: boolean) => {
  return flag ? token : "";
};

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.data.statusCode === 403) {
      window.localStorage.removeItem("token");
      window.location.assign("/");
    }
  }
);

const getResponse = async (requestData: any, flag: boolean) => {
  const BACKEND_API_URL = "http://localhost:3000";
  const { url } = requestData;
  const token = localStorage.getItem("token") || "";
  return await axios(`${BACKEND_API_URL}${url}`, {
    headers: {
      Authorization: jwtToken(token, flag),
    },
    ...requestData,
  });
};

export default getResponse;
