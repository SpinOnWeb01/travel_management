
"use client";

import HeroSec from "../../../pages/homeSection/HeroSec";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";



export default function RootLayout ({ children }: { children: ReactNode }){
    

    const pathname = usePathname();

    // Check if the current path is "/hotels"
    const isHotelsPage = pathname === "/visa";
    // If it is, we can render the HeroSec component
    if (isHotelsPage) {
        return (
          <>
            <HeroSec />
            
            
          </>
        );
    }


}
