"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Footer from "@/components/Footer";
import ProfilePage from "./ProfilePage";
import Header from "@/components/Header";

export default function Profile() {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const username = Cookies.get("username");
    if (!username) {
      window.location.href = "/"; // Redirect if not logged in
    } else {
      setIsAuthorized(true); // Allow render
    }
  }, []);

  // Show nothing until authorization check completes
  if (isAuthorized === null) return null;

  return (
    <>
      <div className="main_background_profile">
        <Header />
      </div>
      <ProfilePage />
      <Footer />
    </>
  );
}
