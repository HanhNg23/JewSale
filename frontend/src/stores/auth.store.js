import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import api from "../api";
import axios from "axios";

const storeApi = (set) => ({
  status: "unauthorized", // 'authorized' | 'unauthorized' | 'pending'
  accessToken: undefined,
  refreshToken: undefined,
  user: undefined,
  loginUser: (payload) => {
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:8080/api/v1/auth/authenticate", payload)
        .then((res) => {
          resolve(res);
          localStorage.setItem("refreshToken", res.refresh_token);
          set({
            status: "authorized",
            accessToken: res.access_token,
            refreshToken: res.refresh_token,
            user: {
              id: res.user_id,
              role: res.role,
              userName: res.userName,
            },
          });
        })
        .catch((err) => reject(err));

      // api.authenticate(payload, (error, data, response) => {
      //   if (error) {
      //     console.error("API call failed:", error);
      //     reject(error); // Đưa lỗi vào reject của Promise
      //   } else {
      //     console.log("API call succeeded, data:", data);
      //     localStorage.setItem("refreshToken", data.refresh_token);
      //     set({
      //       status: "authorized",
      //       accessToken: data.access_token,
      //       refreshToken: data.refresh_token,
      //       user: {
      //         id: data.user_id,
      //         role: data.role,
      //         userName: data.userName,
      //       },
      //     });
      //     resolve(data); // Trả về dữ liệu thành công qua resolve của Promise
      //   }
      // });
    });
  },
  logoutUser: () => {
    localStorage.setItem("refreshToken", "");
    set({
      status: "unauthorized",
      accessToken: undefined,
      refreshToken: undefined,
      user: undefined,
    });
  },
  setAT: (at_token) => {
    set((state) => ({
      ...state,
      accessToken: at_token,
    }));
  },
  registerUser: async (payload) => {
    await api.register(payload);
  },
});

export const useAuthStore = create()(
  devtools(persist(storeApi, { name: "auth-storage" }))
);
