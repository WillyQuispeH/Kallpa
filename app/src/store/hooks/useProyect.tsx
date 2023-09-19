import { proyectStore } from "../zustand";

const useProyect = () => {
  const {
    proyect,
    list: listProyect,
    isLoading: isLoadingProyect,
    isError: isErrorProyect,
    error: errorProyect,
  } = proyectStore((state) => ({
    proyect: state.proyect,
    list: state.list,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const {
    create: createProyect,
    getAll: getAllProyect,
    update: updateProyect,
    remove: removeProyect,
  } = proyectStore();

  return {
    proyect,
    listProyect,
    isLoadingProyect,
    isErrorProyect,
    errorProyect,
    getAllProyect,
    createProyect,
    updateProyect,
    removeProyect,
  };
};

export default useProyect;
