import React from "react";
import {Modal, ModalContent} from "./styled"
export const ModalView = ({active, setActive, children}:any):any =>{
    return(<div>
        <Modal onClick={() => setActive(false)} active={active}>
            <ModalContent onClick={e => e.stopPropagation()} active={active}>
                {children}
            </ModalContent>
        </Modal>
    </div>)
}
