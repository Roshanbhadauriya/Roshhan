import Lottie from "lottie-react";
import animationData from "../assets/lottie/Loader.json";
import animationData2 from "../assets/lottie/Loader2.json";
const LottieLoader = () => {
  return (
    <div className="lottie-loader flex">
{/*
      <div className="h-[100vh] w-1/2">

      <Lottie animationData={animationData2} loop={true} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
      */}
      <div className="h-[100vh] w-[100vw] flex justify-center items-center">

      <Lottie animationData={animationData} loop={true} style={{ width: '100%', height: '50%', objectFit: 'contain' }} />
      </div>




    </div>
  );
};

export default LottieLoader;
