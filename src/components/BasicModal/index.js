import React from "react";
import Input from "../Input";

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(14, 14, 14, 0.7);
  -webkit-tap-highlight-color: transparent;
`;

const BasicModal = ({ open, handleClose, type, buttonText }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropComponent={Backdrop}
    >
      <Box className="modal modal_price">
        <div onClick={handleClose} className="modal__close">
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L9.5 9.5M18 18L9.5 9.5M9.5 9.5L18 1L1 18"
              stroke="#1A1A1A"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="modal__content">
          {type === "cooperation" && (
            <>
              <div className="modal__title subtitle">
                Запрос на получения прайса
              </div>
              <div className="modal__text">
                Заполните данную форму и мы вам перезвоним!
              </div>
            </>
          )}
          {type === "seminars" && (
            <>
              <div className="modal__title subtitle">
			  Запись на семинар
              </div>
              <div className="modal__text">
			  Заполните данную форму, чтобы попасть на наш семинар.
              </div>
            </>
          )}

          <form action="">
            <div className="modal__block">
              <div className="modal__input-block">
                <Input ph="Имя *" />
              </div>
              <div className="modal__input-block">
                <Input ph="Фамилия *" />
              </div>
              <div className="modal__input-block">
                <Input ph="Телефон *" />
              </div>
              <div className="modal__input-block">
                <Input ph="Компания *" />
              </div>
            </div>

            <textarea
              className="modal__textarea textarea"
              name=""
              id=""
            ></textarea>

            <button
              onClick={handleClose}
              type="button"
              className="button modal__button button_black button_lg"
            >
				{buttonText}
            </button>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default BasicModal;
