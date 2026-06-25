import React, { useEffect } from "react";
import { motion } from "framer-motion";

const TabLayout = ({ bg, children, testId }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="tab-page" data-testid={testId}>
      {bg}
      <motion.main
        className="tab-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {children}
      </motion.main>
    </div>
  );
};

export default TabLayout;
