import axios from "axios";

const API = axios.create({

  baseURL: "http://localhost:8000/api",

});


// ADD ACCESS TOKEN

API.interceptors.request.use(

  (config) => {

    const tokens =
      localStorage.getItem(
        "tokens"
      );

    if (tokens) {

      config.headers.Authorization =
        `Bearer ${
          JSON.parse(tokens).access
        }`;
    }

    return config;
  }
);


// AUTO REFRESH TOKEN

API.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest =
      error.config;

    // TOKEN EXPIRED

    if (

      error.response?.status === 401 &&
      !originalRequest._retry

    ) {

      originalRequest._retry = true;

      try {

        const tokens =
          JSON.parse(
            localStorage.getItem(
              "tokens"
            )
          );

        const refreshResponse =
          await axios.post(

            "http://localhost:8000/api/auth/token/refresh/",

            {
              refresh:
                tokens.refresh,
            }
          );

        // UPDATE ACCESS TOKEN

        tokens.access =
          refreshResponse.data.access;

        localStorage.setItem(

          "tokens",

          JSON.stringify(tokens)
        );

        // RETRY REQUEST

        originalRequest.headers.Authorization =
          `Bearer ${tokens.access}`;

        return API(
          originalRequest
        );

      } catch (refreshError) {

        // REFRESH FAILED

        localStorage.removeItem(
          "tokens"
        );

        localStorage.removeItem(
          "user"
        );

        window.location.href =
          "/login";

        return Promise.reject(
          refreshError
        );
      }
    }

    return Promise.reject(error);
  }
);

export default API;