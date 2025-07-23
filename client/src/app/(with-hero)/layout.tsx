'use client';

import { ReactNode, Suspense } from "react";
import Footer from "../../components/Footer";

import '../globals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Index from '../../../src/pages/homeSection/Index';

import HotelsPages from "./hotels/page";
import { usePathname } from 'next/navigation';
import HomestayPages from "./homestays/page";
import HolidaysPages from "./holidays/page";
import TrainPages from "./trains/page";
import BusesPages from "./buses/page";
import CabsPages from "./cabs/page";
import VisaPages from "./visa/page";
import InsurancePages from "./insurance/page";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";

  const showHotelsHero = pathname.startsWith("/hotels");

  const showHomeStay = pathname.startsWith("/homestays");
  const holiDays = pathname.startsWith("/holidays");
  const trains = pathname.startsWith("/trains");
  const Buses = pathname.startsWith("/buses");
  const Cabs = pathname.startsWith("/cabs");
  const visa = pathname.startsWith("/visa");
  const Insurance = pathname.startsWith("/insurance");
  

  

  const showHomePage = pathname === "/";

  return (
    <html lang="en">
      <body className="relative">
        <div className="">
          {/* <Header /> */}
<Suspense fallback={<div>Loading content...</div>}>
{children}
</Suspense>
          
          </div>
        
          {/* Render homepage content only on `/` */}
          {showHomePage && <Index /> }
          {showHotelsHero && <HotelsPages />}
          {showHomeStay && <HomestayPages />}
          {holiDays && <HolidaysPages/> }
          {trains && <TrainPages /> }
          {Buses && <BusesPages /> }
          {Cabs && <CabsPages />}
          {visa && <VisaPages /> }
          {Insurance && <InsurancePages /> }

          

          {/* Render hotels hero only on `/hotels` routes */}
          
        

        <Footer /> 
      </body>
    </html>
  );
}
