import React from 'react';
import { Outlet } from 'react-router-dom';  
import Sidebar from './Sidebar';  

const VolunteerLayout = () => {
  return (
    <div className="flex">
      <Sidebar /> 
      <div className="flex-1 p-6">
        <Outlet /> 
      </div>
    </div>
  );
};

export default VolunteerLayout;
