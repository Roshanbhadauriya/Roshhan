import { useState, useEffect } from "react";
import Layout from "./Layout/Layout.jsx";
import LottieLoader from "./Components/LottieLoader.jsx";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return <>{loading ? <LottieLoader /> : <Layout />}</>;
}

export default App;
