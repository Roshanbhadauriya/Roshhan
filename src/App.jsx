import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "./Layout/Layout.jsx";
import HolaLoader from "./Components/HolaLoader.jsx";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loader" 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <HolaLoader onComplete={() => setLoading(false)} />
          </motion.div>
        ) : (
          <motion.div 
            key="layout" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Layout />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
