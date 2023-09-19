import User from "@/components/funtional/User";
import { useUser } from "@/store/hooks";
import React, { useEffect } from "react";

const PageUser = () => {
  const { getAllUser, listUser } = useUser();

  useEffect(() => {
    if (listUser.length === 0) {
      getAllUser();
    }
  }, []);

  return <User />;
};

export default PageUser;
