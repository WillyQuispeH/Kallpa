import { create } from "zustand";
import apiInstance from "@/utils/api";

interface IProyect {
  id: string;
  name: string;
  code: string;
  date: string;
}

type proyectState = {
  proyect: IProyect;
  list: IProyect[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  create: (name: string, code: string, date: string) => void;
  remove: (id: string) => void;
  update: (id: string, name: string, code: string, date: string) => void;
  getAll: () => void;
};

const initData = {
  id: "",
  name: "",
  code: "",
  date: "",
};

export const proyectStore = create<proyectState>((set, get) => ({
  proyect: initData,
  list: [],
  isLoading: false,
  isError: false,
  error: "",

  create: async (name: string, code: string, date: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.post("/proyect/create", {
        name,
        code,
        date,
      });
      set((state) => ({
        ...state,
        proyect: data.data ? data.data : initData,
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

      const { data } = await apiInstance.get("/proyect/getAll");
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

  remove: async (id: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.post("/proyect/remove", { id });
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

  update: async (id: string, name: string, code: string, date: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.post("/proyect/update", {
        id,
        name,
        code,
        date,
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
