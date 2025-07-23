"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // ✅ Remove cookies
    Cookies.remove("username");
    Cookies.remove("userId");
    Cookies.remove("email");
    Cookies.remove("token"); // optional if you store token

    // ✅ Redirect to home or login
    router.push("/");
  };

  return (
    <><div onClick={handleLogout} style={{ cursor: "pointer" }}>
  <Link href="#">
    <Image
      src="/images/icon/logout.png"
      width={20}
      height={20}
      alt="logout"
    />
    Log Out
  </Link>
</div>

</>
  );
}
