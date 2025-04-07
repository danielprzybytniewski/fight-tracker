import { useState } from "react";

// Created for Next.js issue with image optimization (406 error)
export const useUnoptimizedImage = () => {
  const [unoptimized, setUnoptimized] = useState(false);

  const handleImageLoadError = () => {
    setUnoptimized(true);
  };

  return { unoptimized, handleImageLoadError };
};
