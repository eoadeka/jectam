import React from 'react';
import Container from '../components/layout/Container';
import { GiIncomingRocket } from "react-icons/gi";


const ReportsAndAnalytics = () => {
  const style = { fontSize: "3em", verticalAlign: "middle", cursor:"pointer" };

  return (
    <div>
        <Container>
            <h1>Reports and Analytics</h1>

            <div className='project-item-body'> 
              <div className='no-projects'>
                <GiIncomingRocket style={style}/>
                <h4 style={{marginBottom:"-0.1em"}}>Coming Soon...</h4>
                <small>Reports are on the way</small>
              </div>
            </div>
        </Container>
    </div>
  );
}

export default ReportsAndAnalytics;