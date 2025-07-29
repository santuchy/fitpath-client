import React from "react";

import loadingAnimation from "../../assets/Animations/loading.json";
import Lottie from "lottie-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      {/* Lottie Animation Only */}
      <Lottie animationData={loadingAnimation} loop autoplay className="w-32 h-32" />
    </div>
  );
};

export default Loading;
