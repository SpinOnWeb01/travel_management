"use client";



import { Suspense } from "react";
import ForgetForm from "./ForgetForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function PageContent() {
  return (
    <>
      <div className="main_background_blog">
        <Header />
      </div>
      <ForgetForm />
      <Footer />
    </>
  );
}

export default function ForgetPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
