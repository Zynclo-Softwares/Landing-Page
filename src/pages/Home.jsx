import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import About from "../components/landing/About";
import Support from "../components/landing/Support";
import Footer from "../components/landing/Footer";

const APP_ICON_URL = "/__generating__/img_4424a1a885e6.png";

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