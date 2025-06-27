
"use client";


import Header from "@/app/components/Header";
import Login from "./Login";
import Footer from "../components/Footer";





export default function Page() { 
    return (
      <>
      <div className="main_background_blog">
               <Header />
             </div>
       <Login />
       <Footer />
      </>
    );
}