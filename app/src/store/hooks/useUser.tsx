import { userStore } from "../zustand";

const useUser = () => {
  const {
    user,
    list: listUser,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: errorUser,
  } = userStore((state) => ({
    user: state.user,
    list: state.list,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const {
    validate: validateUser,
    getAll: getAllUser,
    updateState: updateStateUser,
    
  } = userStore();

  return {
    user,
    listUser,
    isLoadingUser,
    isErrorUser,
    errorUser,
    getAllUser,
    validateUser,
    updateStateUser,
  };
};

export default useUser;
