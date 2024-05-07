import React from 'react';
import ContainerWithoutNav from '../components/layout/ContainerWithoutNav';
import { IoArrowBack } from "react-icons/io5";
import background from "../assets/images/PAGE.png";
import Overlay from '../components/layout/Overlay';

const NotFound = () => {
  const style = { fontSize: "1.3em", verticalAlign: "middle" };

  return (
    <div  style={{backgroundImage: `url(${background})`, backgroundSize: "700px", backgroundRepeat: "no-repeat", backgroundPosition: "left 20% top 50%", height : "100vh", overflowY: "hidden"}}>
      <ContainerWithoutNav>
          <Overlay>
            <div style={{position: "absolute", top:"35%"}}>
              <h1>Oops!</h1>
              <p>We couldn't find the page you were looking for.</p>
              <a href='/'><button type='link'><IoArrowBack style={style} /> Go Home</button></a>
            </div>
          </Overlay>
      </ContainerWithoutNav>
    </div>
  );
}

export default NotFound;