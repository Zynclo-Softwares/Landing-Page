import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import Home from './pages/Home';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
// Add page imports here

function App() {
  useEffect(() => {
    document.title = "Zynclo";
    const link = document.querySelector("link[rel='icon']");
    if (link) {
      link.href = "https://media.base44.com/images/public/69b591daf6da87ce28f820e7/8b4312ef9_generated_image.png";
      link.type = "image/png";
    }
  }, []);

  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
      <style>{`
        html {
          scrollbar-width: none;
        }
        html::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </Router>
  )
}

export default App