import { useEffect, useState } from 'react';

export const useAdaptiveTextSize = (
  text,
  maxFontSize,
  minFontSize,
  threshold
) => {
  const [fontSize, setFontSize] = useState(maxFontSize);

  useEffect(() => {
    if (text) {
      const length = text.length;
      if (length > threshold) {
        // Calculate new font size based on text length
        const newSize = Math.max(
          minFontSize,
          maxFontSize - Math.floor((length - threshold) / 5)
        );
        setFontSize(newSize);
      } else {
        setFontSize(maxFontSize);
      }
    }
  }, [text]);
  return fontSize;
};
