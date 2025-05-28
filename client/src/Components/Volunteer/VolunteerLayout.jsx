import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';  
import Sidebar from './Sidebar';  
import { useSelector } from 'react-redux';
import Loader from '../Shared/Loader';

const VolunteerLayout = () => {
  const { user, isLoading, isAuthenticated } = useSelector((state) => state.user);

  // If still loading, show loader
  if (isLoading) {
    return <Loader />;
  }

  // If not authenticated or not a volunteer, redirect to home
  if (!isAuthenticated || user?.role !== "Volunteer") {
    return <Navigate to="/" />;
  }

  // If authenticated and is a volunteer, show the layout
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
