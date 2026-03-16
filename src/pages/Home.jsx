import { useEffect } from "react";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import About from "../components/landing/About";
import Support from "../components/landing/Support";
import Footer from "../components/landing/Footer";

const APP_ICON_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b591daf6da87ce28f820e7/f2ff9b2d7_pp-app-logo.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa]" style={{ scrollBehavior: "smooth" }}>
      <Navbar />
      <Hero />
      <About appIconUrl={APP_ICON_URL} />
      <Support />
      <Footer />
    </div>
  );
}