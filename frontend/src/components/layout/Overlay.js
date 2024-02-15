import React, { useState } from "react";
import styled from 'styled-components';

const OverlayDiv = styled.div`
    position: fixed;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    /* background-color: lightgray; */
    backdrop-filter: blur(10px);
    cursor: pointer;
    z-index: 2;
    animation: smooth-appear 1s ease forwards;
`

const OverlayContent = styled.div`
    width: 30%;
    height: 100%;
    background-color: white;
    margin: 0;
    position: absolute;
    top: 0;
    right: 0;
    padding: 20px;
`
const Overlay = (props) => {
    const Modal = props => {
        return (
           <OverlayDiv>{props.children}</OverlayDiv>
        );
    };

    return (
        <Modal>
           <OverlayContent>{props.children}</OverlayContent>
        </Modal>
    )
}

export default Overlay;