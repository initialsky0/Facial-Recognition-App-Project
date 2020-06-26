import React from 'react';
import Tilt from 'react-tilt';
import brainIcon from './icons8-brain-64.png'
import './Logo.css';

const Logo = () => {
   return (
      <div className='ma4 mt0'>
         <Tilt className="Tilt br2 shadow-2" options={{ max : 35 }} style={{ height: 120, width: 120 }} >
            <div className="Tilt-inner pa3">
               <img style={{paddingTop: '10px'}} src={brainIcon} alt="brain"/>
            </div>
         </Tilt>

      </div>
   );
}

export default Logo;