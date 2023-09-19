import { create } from "zustand";
import apiInstance from "@/utils/api";
import IPerson from "@/interfaces/person";

export default interface IUser {
  id: string;
  userId: string;
  dni: string;
  name: string;
  paternallastname: string;
  maternallastname: string;
  address: string;
  email: string;
  phone: string;
  photo: string;
  status: string;
}

type userState = {
  user: IUser;
  list: IUser[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  validate: (email: string, password: string) => void;
  getAll: () => void;
  updateState: (userId: string, state: string) => void;
};

const initDataPerson = {
  id: "",
  userId: "",
  dni: "",
  name: "",
  paternallastname: "",
  maternallastname: "",
  email: "",
  address: "",
  phone: "",
  photo: "",
  status: "",
};

export const userStore = create<userState>((set, get) => ({
  user: initDataPerson,
  list: [],
  isLoading: false,
  isError: false,
  error: "",

  validate: async (email: string, password: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.post("/user/validate", {
        email,
        password,
      });
      set((state) => ({
        ...state,
        user: data.data ? data.data : initDataPerson,
        isLoading: false,
        isError: false,
        error: "",
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
  getAll: async () => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.get("/user/getAll");

      set((state) => ({
        ...state,
        list: data.data ? data.data : [],
        isLoading: false,
        isError: false,
        error: "",
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
  
  updateState: async (userId: string, state: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.post("/user/updateState", {
        userId,
        state,
      });

      set((state) => ({
        ...state,
        list: data.data ? data.data : [],
        isLoading: false,
        isError: false,
        error: "",
      }));
    } catch (e) {
      set((state) => ({
        ...state,
        isLoading: false,
        isError: true,
        error: (e as Error).message,
      }));
    }
  },
}));
