import React from "react";

import loadingAnimation from "../../assets/Animations/loading.json";
import Lottie from "lottie-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      
      <Lottie animationData={loadingAnimation} loop autoplay className="w-50 h-50" />
    </div>
  );
};

export default Loading;
