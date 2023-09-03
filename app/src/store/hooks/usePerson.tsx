import { personStore } from "../zustand";

const usePerson = () => {
  const {
    person,
    isLoading: isLoadingPerson,
    isError: isErrorPerson,
    error: errorPerson,
  } = personStore((state) => ({
    person: state.person,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const {
    create: createPerson,
    getByDni: getByDniPerson,
  } = personStore();

  return {
    person,
    isLoadingPerson,
    isErrorPerson,
    errorPerson,
    getByDniPerson,
    createPerson,
  };
};

export default usePerson;
