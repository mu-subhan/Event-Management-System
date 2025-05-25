import React, { useEffect } from "react";
import "../../CSS/Loader.css";
import { useNavigate } from "react-router-dom";
const Loader = () => {
  return (
    <div class="preloader bg-blue-500">
      <div class="loader">
        <div class="loader-outter"></div>
        <div class="loader-inner"></div>

        <div class="indicator flex justify-center items-center">
          <svg width="16px" height="12px">
            <polyline id="back" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
            <polyline
              id="front"
              points="1 6 4 6 6 11 10 1 12 6 15 6"
            ></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Loader;
