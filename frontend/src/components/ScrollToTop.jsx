import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// https://stackoverflow.com/a/61602724
function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
};

export default ScrollToTop;