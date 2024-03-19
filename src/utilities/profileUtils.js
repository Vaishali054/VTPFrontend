import styled from "styled-components";
import Modal from "react-modal";

export const CustomModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const ModalContent = styled.div`
  width: 500px;
  height: 420px;
  flex-shrink: 0;
  border-radius: 16.477px;
  background: #fff;
  box-shadow: 0px 4px 28px 0px rgba(0, 0, 0, 0.16);
  background-color: #fff;
  border: 1px solid #888;
  border-radius: 8px;
  display: block;
  @media (max-width: 690px) {
    width: 300px;
    height: 460px;
    padding: 5px;
  }
`;
