import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import axios from 'axios'
import config from '../config/config';
import state from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../Components';

const Customizer = () => {
    const snap = useSnapshot(state);

    const [file, setFile] = useState('');

    const [prompt, setPrompt] = useState('');
    const [generatingImg, setGeneratingImg] = useState(false);

    const [activeEditorTab, setActiveEditorTab] = useState("");
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: true,
        stylishShirt: false
    })

    //show tab content depending on the activeTab
    const generateTabContent = () => {
        switch(activeEditorTab) {
            case "colorpicker":
                console.log("colorpicker");
                return <ColorPicker/>
            case "filepicker":
                console.log("filepicker");
                return <FilePicker file={file} setFile={setFile} readFile={readFile}/>
            case "aipicker":
                console.log("aipicker");
                return <AIPicker prompt={prompt} setPrompt={setPrompt} generateingImg={generatingImg} handleSubmit={handleSubmit}/>
            default:
                return null;
        }
    }

    const handleSubmit = async (type) => {
        if (!prompt) return alert("Please enter a prompt");
    
        try {
            setGeneratingImg(true);
    
            const response = await axios.post('http://localhost:3500/api/v1/dalle', {
                prompt,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const data = response.data;
            console.log('API Response:', data);
    
            const result = handleDecals(type, `data:image/png;base64,${data.photo}`);
            console.log('Decal Result:', result);
        } catch (error) {
            alert(error);
        } finally {
            setGeneratingImg(false);
            setActiveEditorTab("");
        }
    };
    const handleDecals = (type, result) => {
        const decalType = DecalTypes[type];

        state[decalType.stateProperty] = result;

        if(!activeFilterTab[decalType.filterTab]) {
            handleActiveFilterTab(decalType.filterTab)
        }
        return result;
    }

    const handleActiveFilterTab = (tabName) => {
        switch(tabName) {
            case "logoShirt":
                state.isLogoTexture = !activeFilterTab[tabName];
                break;
            case "stylishShirt":
                state.isFullTexture = !activeFilterTab[tabName];
                break;
            default:
                state.isLogoTexture = true;
                state.isFullTexture = false;
                break;
        }

        // after setting the state, activeFilterTab is updated
        setActiveFilterTab((prevState) => {
            return {
                ...prevState,
                [tabName]: !prevState[tabName]
            }
        })
    }

    const readFile = (type) => {
        reader(file)
        .then((result) => {
            handleDecals(type, result);
            setActiveEditorTab("");
        })
    }
  return (
    <AnimatePresence>
        {!snap.intro && (
            <>
                <motion.div key="custom" className='absolute top-0 left-0 z-10' {...slideAnimation('left')}>
                    <div className='flex items-center min-h-screen'>
                        <div className='editortabs-container tabs'>
                        {EditorTabs.map((tab) => (                                
                            <Tab key={tab.name} tab={tab} handleClick={() => {                            
                                setActiveEditorTab(tab.name);
                              }} />
                        ))}
                        {generateTabContent()}
                        </div>
                    </div>
                </motion.div>

                <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation}>
                    <CustomButton type="filled" title='Go Back' handleClick={() => state.intro = true} customStyles="w-fit px-4 py-2.5 font-bold text-sm" />
                </motion.div>

                <motion.div className='filtertabs-container' {...slideAnimation("up")}>
                    {FilterTabs.map((tab) => (
                        <Tab key={tab.name} tab={tab} isFilterTab isActiveTab="" handleClick={() => {
                            handleActiveFilterTab(tab.name);
                        }}/>
                    ))}

                </motion.div>
            </>
        )}
    </AnimatePresence>
  )
}

export default Customizer
