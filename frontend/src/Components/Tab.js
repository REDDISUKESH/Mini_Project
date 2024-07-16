import React from 'react'
import { useSnapshot } from 'valtio';

import state from '../store';
import * as images from '../assets';


const Tab = (tab, isFilterTab, isActiveTab, handleClick) => {
  const snap = useSnapshot(state);
  const activeStyles = isFilterTab && isActiveTab 
    ? {backgroundColor: snap.color, opacity: 0.5}
    : {backgroundColor: "transparent", opacity: 1}
  return (    
    <div key={tab.tab.name} 
      className={`tab-btn ${isFilterTab ? 'rounded-full glassmorhism': 'rounded-4'}`}
      onClick={tab.handleClick}
      style={activeStyles}
    >      
      <img src={tab.tab.icon}
         alt={tab.tab.name}
         className={`${isFilterTab ? 'w-2/3 h-2/3': 'w-11/12 h-11/12 object-contain'}`}
      />
      
    </div>
  )
}

export default Tab
