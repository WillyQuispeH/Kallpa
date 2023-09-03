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
        <ButtonIcon
          onClick={() => handleClickOption("/investments/welcome")}
          typeButton="square"
          icon="home"
        />
        <ButtonIcon
          onClick={() => handleClickOption("/investments/welcome")}
          typeButton="square"
          icon="monitoring"
        />
        <ButtonIcon
          onClick={() => handleClickOption("/investments/welcome")}
          typeButton="square"
          icon="qr_code_2"
        />
        <ButtonIcon
          onClick={() => handleClickOption("/investments/investor")}
          typeButton="square"
          icon="add_box"
        />
        <ButtonIcon
          onClick={() => handleClickOption("/investments/welcome")}
          typeButton="circle"
          icon="person"
        />
      </Row>
    </div>
  );
};

export default Header;
