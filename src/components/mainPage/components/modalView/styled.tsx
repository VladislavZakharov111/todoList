import styled from "styled-components";

export const Modal = styled.div<{ active: any }>`
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.active ? "1" : "0")};
  pointer-events: ${(props) => (props.active ? "all" : "none")};
  transition: 0.5s;
`;

export const ModalContent = styled.div<{ active: any }>`
    padding:20px;   
    border-radius:12px;
    background-color:white;
    width:150px;
    transfrom: ${(props) => (props.active ? "scale(1)" : "scale(0.5)")}
    transition: 0.4s all;
    position:relative;
`;
