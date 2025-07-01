import { useEffect, useRef, useState } from "react";

export function useContainerWidth(breakpoint: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [isWide, setIsWide] = useState<boolean>(true);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.ResizeObserver((entries) => {
      for (let entry of entries) {
        setIsWide(entry.contentRect.width >= breakpoint);
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [breakpoint]);

  return { ref, isWide };
}
