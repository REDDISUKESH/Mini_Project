import React from 'react';
import Canvas from './canvas';
import Customizer from './pages/Customizer';
import HomeAITshirt from './pages/HomeAITshirt';
import './Tshirt.css';

const Tshirt = () => {
  return (
    <div>
        <main className="app transition-all ease-in">
            <HomeAITshirt />
            <Canvas />
            <Customizer />
      </main>
    </div>
  )
}

export default Tshirt
