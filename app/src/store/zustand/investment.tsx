import { create } from "zustand";
import apiInstance from "@/utils/api";
import IDataInvetment, { initData } from "@/interfaces/dataInvestment";
import IPerson from "@/interfaces/person";
import IInvestment from "@/interfaces/investment";

type investmentState = {
  investment: IDataInvetment;
  investmentList: IDataInvetment[];
  isLoading: boolean;
  isError: boolean;
  error: string;
  create: (invertor: object, investment: object) => void;
  getAll: () => void;
  getById: (id: string) => void;
  getByDni: (dni: string) => void;
  update: (investment: IInvestment) => void;
  updateState: (id: string, state: string) => void;
};

export const investmentStore = create<investmentState>((set, get) => ({
  investment: initData,
  investmentList: [],
  isLoading: false,
  isError: false,
  error: "",

  create: async (invertor: object, investment: object) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.post("/investment/create", {
        invertor,
        investment,
      });

      set((state) => ({
        ...state,
        investment: data.data ? data.data : initData,
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

      const { data } = await apiInstance.get("/investment/getAll");

      set((state) => ({
        ...state,
        investmentList: data.data ? data.data : [],
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

  getById: async (id: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.post("/investment/getById", { id });

      set((state) => ({
        ...state,
        investment: data.data ? data.data : initData,
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

  getByDni: async (dni: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.get("/investment/getByDni/" + dni);

      set((state) => ({
        ...state,
        investmentList: data.data ? data.data : initData,
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

  update: async (investment: IInvestment) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.post("/investment/update", investment);

      set((state) => ({
        ...state,
        investment: data.data ? data.data : initData,
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

  updateState: async (id: string, state: string) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.post("/investment/updateState", {
        id,
        state,
      });

      set((state) => ({
        ...state,
        investment: data.data ? data.data : initData,
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
