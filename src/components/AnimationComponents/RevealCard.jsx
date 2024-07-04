import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const RevealCard = ({ children, delay = 0.2}) => {
  const ref = useRef(null);
  const isInView = useInView(ref,{ once: true });

  const controlls = useAnimation();

  useEffect(() => {
    if(isInView)  controlls.start('visible');
  }, [isInView])

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 10  },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={controlls}
      transition={{
        duration: 0.3,
        delay: delay
      }}
    >
      {children}
    </motion.div>
  );
};

export default RevealCard;
