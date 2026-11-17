"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

const DraggableWindow = ({
  children,
  initialX = 0,
  initialY = 0,
  height = "auto",
}) => {
  const elRef = useRef(null);
  const x = useMotionValue(initialX);
  const y = useMotionValue(initialY);

  const handleDragEnd = (e, info) => {
    const el = elRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;

    // Allows widgets to be dragged far toward corners, keeping at least 50px grabable on-screen
    const GRAB_HANDLE = 50;
    let deltaX = 0;
    let deltaY = 0;

    if (rect.right < GRAB_HANDLE) deltaX = GRAB_HANDLE - rect.right;
    else if (rect.left > vw - GRAB_HANDLE) deltaX = (vw - GRAB_HANDLE) - rect.left;

    if (rect.top < 36) deltaY = 36 - rect.top;
    else if (rect.top > vh - 65) deltaY = (vh - 65) - rect.top;

    if (deltaX !== 0 || deltaY !== 0) {
      const targetX = x.get() + deltaX;
      const targetY = y.get() + deltaY;
      animate(x, targetX, { duration: 0.22, ease: "easeOut" });
      animate(y, targetY, { duration: 0.22, ease: "easeOut" });
    }
  };

  return (
    <motion.div
      ref={elRef}
      drag
      dragMomentum={false}
      dragElastic={0}
      style={{ x, y, height }}
      onDragEnd={handleDragEnd}
    >
      <div>{children}</div>
    </motion.div>
  );
};

export default DraggableWindow;
