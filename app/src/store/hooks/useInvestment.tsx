import { investmentStore } from "../zustand";

const useInvestment = () => {
  const {
    investment,
    investmentList,
    isLoading: isLoadingInvestment,
    isError: isErrorInvestment,
    error: errorInvestment,
  } = investmentStore((state) => ({
    investment: state.investment,
    investmentList: state.investmentList,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  }));

  const {
    create: createInvestment,
    getAll: getAllInvestment,
    getById: getByIdInvestment,
  } = investmentStore();

  return {
    investment,
    investmentList,
    isLoadingInvestment,
    isErrorInvestment,
    errorInvestment,
    createInvestment,
    getAllInvestment,
    getByIdInvestment,
  };
};

export default useInvestment;
