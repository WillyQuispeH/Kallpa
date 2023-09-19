import React, { useState } from "react";
import styles from "./ListUser.module.scss";
import IUser from "@/store/zustand/userStore";
import { useUser } from "@/store/hooks";
import { Overlay, Modal, ModalBody, ModalTitle } from "../Modal";
import ButtonIcon from "../ButtonIcon";
import ComboBox from "../ComboBox";
import Button from "../Button";
import { set } from "date-fns";

interface IListUser {
  data: IUser[];
}

const ListUser = ({ data }: IListUser) => {
  const { updateStateUser, isLoadingUser } = useUser();

  const [state, setState] = useState("");
  const [userId, setUserId] = useState("");
  const [userEdit, setUserEdit] = useState("");
  const [modal, setModal] = useState(false);

  const handleEditState = async () => {
    updateStateUser(userId, state);
    setModal(false);
  };

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const dataState = [
    {
      name: "Administrador",
    },
    {
      name: "Vendedor",
    },
    {
      name: "Comprador",
    },
  ];

  return (
    <>
      <div className={styles.listUser}>
        <div className={styles.contentItemUser}>
          {data?.map((user: IUser, key: number) => (
            <div className={styles.itemUser} key={key}>
              <img src="/img4.jpg" alt="" />
              <div className={styles.itemUserInfo}>
                <h1>{`${user.name} ${user.paternallastname} ${user.maternallastname}`}</h1>
                <p>{user.status}</p>
              </div>
              <span
                className="material-symbols-outlined"
                onClick={() => {
                  setModal(true);
                  setUserId(user.userId);
                  setState(user.status);
                  setUserEdit(user.name + " " + user.paternallastname);
                }}
              >
                edit_note
              </span>
            </div>
          ))}
        </div>
      </div>

      <Overlay active={modal}>
        <Modal>
          <ModalTitle title={userEdit}>
            <ButtonIcon
              typeButton="square"
              icon="close"
              onClick={() => setModal(false)}
            />
          </ModalTitle>
          <ModalBody>
            <ComboBox
              value={state}
              onChange={handleOnchange}
              isValid={true}
              width="315px"
              label="Tipo de cargo"
              data={dataState}
              valueName="name"
              textName="name"
              name="state"
            />

            <Button
              width="250px"
              valor="Actualizar"
              height="40px"
              onClick={handleEditState}
              isLoading={isLoadingUser}
            />
          </ModalBody>
        </Modal>
      </Overlay>
    </>
  );
};

export default ListUser;
