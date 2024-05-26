import axios from "axios";

export const axiosInit = () => {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;

  const redirect = (url: string) => {
    window.location.href = url;
  };

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      // TODO : replace error pages
      if (error) {
        switch (error.response.status) {
          case "undefined":
            redirect("/neterror");
            return Promise.reject(error);
          case 401:
            return Promise.reject(error);
          default:
            return Promise.resolve(error);
        }
        return Promise.reject(error);
      }
    }
  );

  return axios;
};
