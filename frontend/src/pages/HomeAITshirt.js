import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';

import state from '../store';
import { CustomButton } from '../Components';
import './Homeai.css';

const HomeAITshirt = () => {
    const snap = useSnapshot(state);

    return (
        <AnimatePresence>
            {snap.intro && (
                <motion.section className='home-ai-tshirt slide-left'>
                    <motion.header className='slide-down'>
                        <img src="./threejs.png" alt="logo" className='logo' />
                    </motion.header>
                    <motion.div className='home-content-ai-tshirt'>
                        <motion.div className='head-text-ai-tshirt'>
                            <h1>LET'S <br className="line-break" /> DO IT.</h1>
                        </motion.div>
                        <motion.div className='content-description'>
                            <p className='description'>Create your unique and exclusive shirt with our brand-new 3D customization tool. <strong>Unleash your imagination</strong> and define your own style.</p>
                            <CustomButton
                                type="filled"
                                title="Customize It"
                                handleClick={() => state.intro = false}
                                customStyles="custom-button"
                            />
                        </motion.div>
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    );
}

export default HomeAITshirt;
