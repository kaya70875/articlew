"use client";

import { useEffect, useState } from "react";

const useScreenSize = (size: number) => {
  const [isBelow, setIsBelow] = useState<boolean | null>(null);

  useEffect(() => {
    const checkIsTablet = () => {
      setIsBelow(window.innerWidth <= size);
    };

    // Set initial state
    checkIsTablet();

    // Listen for resize events
    window.addEventListener("resize", checkIsTablet);

    return () => window.removeEventListener("resize", checkIsTablet);
  }, [size]);

  if (isBelow === null) {
    return { isBelow: null, isLoading: true };
  }

  return { isBelow, isLoading: false };
};

export default useScreenSize;
