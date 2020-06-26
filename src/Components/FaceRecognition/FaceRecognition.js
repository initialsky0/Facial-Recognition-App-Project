import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imgUrl, faceBox}) => {
   return (
      <div className='center ma2'>
         <div className='absolute mt3 mb3'>
            <img id='pic' src={imgUrl} alt="Face-To-Detect" width='500px' height='auto'/>
            <div 
               className='bounding-box' 
               style={{
                  top: faceBox.topRow, 
                  right: faceBox.rightCol, 
                  bottom: faceBox.bottomRow, 
                  left: faceBox.leftCol}}></div>
         </div>
      </div>
   );
}

export default FaceRecognition;