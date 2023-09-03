import { create } from "zustand";
import apiInstance from "@/utils/api";
import IPerson from "@/interfaces/person";

type personState = {
  person: IPerson;
  isLoading: boolean;
  isError: boolean;
  error: string;
  create: (
    dni: string,
    name: string,
    paternallastname: string,
    maternallastname: string,
    address: string,
    email: string,
    phone: string
  ) => void;
  getByDni: (dni: string) => void;
};

const initDataPerson = {
  id: "",
  dni: "",
  name: "",
  paternallastname: "",
  maternallastname: "",
  email: "",
  address: "",
  phone: "",
};

export const personStore = create<personState>((set, get) => ({
  person: initDataPerson,
  isLoading: false,
  isError: false,
  error: "",

  create: async (
    dni: string,
    name: string,
    paternallastname: string,
    maternallastname: string,
    address: string,
    email: string,
    phone: string
  ) => {
    try {
      set((state) => ({
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      }));

      const { data } = await apiInstance.post("/person/create", {
        dni,
        name,
        paternallastname,
        maternallastname,
        address,
        email,
        phone,
      });
      set((state) => ({
        ...state,
        person: data.data ? data.data : initDataPerson,
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

      const { data } = await apiInstance.get("/person/getByDni/" + dni);

      console.log(data.data);
      set((state) => ({
        ...state,
        person: data.data ? data.data : initDataPerson,
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
