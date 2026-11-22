"use client";

import { useEffect } from "react";

interface TabTitleProps {
  originalTitle?: string;
  awayTitle?: string;
}

export default function TabTitle({
  originalTitle = "Armand | Developer & Designer",
  awayTitle = "Hey, over here! 👋",
}: TabTitleProps) {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = awayTitle;
      } else {
        document.title = originalTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [originalTitle, awayTitle]);

  return null;
}
