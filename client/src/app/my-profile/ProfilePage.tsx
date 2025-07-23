// src/app/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import useAuthStore from "@/store/authStore";
import useProfileUpdateStore from "@/store/profileUpdateStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import LogoutButton from "@/components/LogoutButton";
import { getUserById, updateUserById } from "@/lib/userProfile";

export default function ProfilePage() {
  const { token } = useAuthStore();
  const {
    formData,
    setFormData,
    isSubmitting,
    isSuccess,
    error,
    submitStart,
    submitSuccess,
    submitError,
    reset,
  } = useProfileUpdateStore();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const userId = Number(Cookies.get("userId"));
  const email = String(Cookies.get("email"));

  console.log("User ID from cookies:", userId, email);

  useEffect(() => {
    if (!userId || !token) return;

    getUserById(userId, token)
      .then((data) => {
        setFormData({
          firstname: data.firstname || "",
          lastname: data.lastname || "",
          email: data.email || email || "",
          phone: data.phone || "",
          gender: data.gender || "",
          dateofbirth: data.dateofbirth || "",
          nationality: data.nationality || "",
          address: data.address || "",
        });

        if (data.dateofbirth) {
          setSelectedDate(new Date(data.dateofbirth));
        }
      })
      .catch((err) => {
        console.error("Failed to fetch user profile:", err.message);
      });
  }, [userId, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return alert("User ID missing in cookies");

    submitStart();

    try {
      await updateUserById(userId, token!, formData);
      submitSuccess();
    } catch (err: any) {
      submitError(err.message || "Unknown error");
    }
  };

  return (
    <div className="container-fluid user-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="left-nav">
              <div className="sidebar-header">
                <nav className="profile-nav">
                  <ul>
                    <li className="nav-item active">
                      <Link href="#">
                        <Image src="/images/icon/my-profile.png" width={20} height={20} alt="profile" />
                        My Profile
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="#">
                        <Image src="/images/icon/my-booking.png" width={20} height={20} alt="profile" />
                        Your Booking
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="#">
                        <Image src="/images/icon/my-trip.png" width={20} height={20} alt="profile" />
                        My Trips
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="#">
                        <Image src="/images/icon/co-travellers.png" width={20} height={20} alt="profile" />
                        Co-Travellers
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="#">
                        <Image src="/images/icon/my-wallet.png" width={20} height={20} alt="profile" />
                        My Wallet
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="#">
                        <Image src="/images/icon/promo-code.png" width={20} height={20} alt="profile" />
                        Promo Codes
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="#">
                        <Image src="/images/icon/make-payment.png" width={20} height={20} alt="profile" />
                        Make a Payment
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="#">
                        <Image src="/images/icon/settingg.png" width={20} height={20} alt="profile" />
                        Settings
                      </Link>
                    </li>
                    <li className="nav-item">
                      <LogoutButton />
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <form className="form" onSubmit={handleSubmit}>
              <div className="profile-form form-card">
                <h4 className="heading">Personal Information</h4>
                <div className="row">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="firstname"
                      className="form-control custom-input"
                      placeholder="First & Middle Name"
                      value={formData.firstname}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="lastname"
                      className="form-control custom-input"
                      placeholder="Last Name"
                      value={formData.lastname}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <select
                      name="gender"
                      className="form-select profiledate"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-md-6 position-relative">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => {
                        setSelectedDate(date);
                        setFormData({
                          dateofbirth: date ? date.toISOString().split("T")[0] : "",
                        });
                      }}
                      placeholderText="Date of Birth"
                      dateFormat="dd/MM/yyyy"
                      className="form-control custom-input datepicker-input"
                    />
                  </div>
                  <div className="col-md-6">
                    <select
                      name="nationality"
                      className="form-select"
                      value={formData.nationality}
                      onChange={handleChange}
                    >
                      <option value="">Nationality</option>
                      <option value="indian">Indian</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="address"
                      className="form-control custom-input"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="profile-form form-card">
                <h4 className="heading">Contact Information</h4>
                <div className="row">
                  <div className="col-md-6">
                    <input
                      type="email"
                      name="email"
                      className="form-control custom-input"
                      placeholder="Email Id."
                      value={Cookies.get("email") || ""}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="phone"
                      className="form-control custom-input"
                      placeholder="Mobile No."
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {isSuccess && (
                <div className="alert alert-success mt-2">
                  ✅ Profile updated successfully!
                </div>
              )}
              {error && (
                <div className="alert alert-danger mt-2">
                  ❌ {error}
                </div>
              )}

              <div className="col-md-12">
                <div className="profile-btn">
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
