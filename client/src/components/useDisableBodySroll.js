import { useEffect } from "react";

export const useDisableBodyScroll = (open) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);
};
