import React from "react";
import styled from 'styled-components';
import { GrOverview } from "react-icons/gr";
import { IoPencil, IoTrashOutline } from "react-icons/io5";


const Backdrop = styled("div")`
  position: fixed;
  z-index: 1;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
  background-color: #000;
//   opacity: 0.5;
`;

// we use some pseudo random coords so nested modals
// don't sit right on top of each other.
const RandomlyPositionedModal = styled("div")`
//   position: fixed;
  width: 100px;
  z-index: 4;
    position: absolute;
    top: calc(100% - 40px); // Adjust based on modal size
    left: calc(100% + 510px); // Place it right next to the task
    background-color: white;
    border: 1px solid black;
    padding: 10px;
//   border: 1px solid #e5e5e5;
  border-radius: 10px;
//   background-color: white;
//   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
//   padding: 5px;
text-align: center;
`;

const Modal = ({onView, onEdit, onDelete}) => {
    const style = { fontSize: "1em", verticalAlign: "middle" };
    const Modal = props => {
        return (
           <Backdrop>{props.children}</Backdrop>
        );
    };

    return (
        <Modal>
           <RandomlyPositionedModal>

                <small><GrOverview style={style} /> view</small>
                <hr></hr>
                <small><IoPencil style={style} /> edit</small>
                <hr></hr>
                <small style={{color:"red"}}><IoTrashOutline style={style} /> delete</small>
            </RandomlyPositionedModal>
        </Modal>
    )
}

export default Modal;