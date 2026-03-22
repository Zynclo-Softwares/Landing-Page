import { useEffect } from "react";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import About from "../components/landing/About";
import Waitlist from "../components/landing/Waitlist";
import Support from "../components/landing/Support";
import Footer from "../components/landing/Footer";

const APP_ICON_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69b591daf6da87ce28f820e7/f2ff9b2d7_pp-app-logo.png";

export default function Home() {
  useEffect(() => {
    const scrollTo = sessionStorage.getItem("scrollTo");
    if (scrollTo) {
      sessionStorage.removeItem("scrollTo");
      setTimeout(() => {
        const el = document.getElementById(scrollTo);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 200);
      return;
    }
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa]" style={{ scrollBehavior: "smooth" }}>
      <Navbar />
      <Hero />
      <About appIconUrl={APP_ICON_URL} />
      <Waitlist />
      <Support />
      <Footer />
    </div>
  );
}