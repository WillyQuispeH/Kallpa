import React, { useContext } from "react";
import { useRouter } from "next/router";

import { Row } from "@/components/layout/Generic";
import UIContext from "@/context/ui";
import ButtonIcon from "../ButtonIcon";

import styles from "./Header.module.scss";

const Header = () => {
  const router = useRouter();
  const { sidebar, setSidebar } = useContext(UIContext);

  const hanOnclickSideBar = () => {
    setSidebar(!sidebar);
  };

  const handleClickOption = (path: string) => {
    router.push(path);
    setSidebar(false);
  };

  return (
    <div className={styles.header}>
      <ButtonIcon onClick={hanOnclickSideBar} typeButton="square" icon="menu" />
      <Row gap="10px">
        {/* <ButtonIcon
          onClick={() => handleClickOption("/investments/settings")}
          typeButton="square"
          icon="settings"
        /> */}
        <ButtonIcon
          onClick={() => handleClickOption("/investments/welcome")}
          typeButton="square"
          icon="monitoring"
        />
        <ButtonIcon
          onClick={() => handleClickOption("/proyect/search")}
          typeButton="square"
          icon="manage_search"
        />
        <ButtonIcon
          onClick={() => handleClickOption("/investments/investor")}
          typeButton="square"
          icon="add_box"
        />
        <ButtonIcon
          onClick={() => handleClickOption("/settings/user")}
          typeButton="circle"
          icon="person"
        />
      </Row>
    </div>
  );
};

export default Header;
