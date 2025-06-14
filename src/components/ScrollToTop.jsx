import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//sayfalar arası değişikliklerde sayfanın en üstüne taşır 
export default function ScrollToTop(){
    const {pathname} = useLocation();

    useEffect(()=>{
        window.scrollTo(0,0);
    }, [pathname]);

    return null;
}