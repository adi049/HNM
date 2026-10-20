import { useEffect } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { UIProvider } from "./context/UIContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { BookingDrawer } from "./components/BookingDrawer";
import { Chatbot } from "./components/Chatbot";
import { LogoIntro } from "./components/LogoIntro";

import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Hotels from "./pages/Hotels";
import RoomDetail from "./pages/RoomDetail";
import Experiences from "./pages/Experiences";
import Offers from "./pages/Offers";
import Weddings from "./pages/Weddings";
import Contact from "./pages/Contact";
import { Privacy, Terms } from "./pages/Legal";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <UIProvider>
        <ScrollToTop />
        <LogoIntro />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/rooms/:roomId" element={<RoomDetail />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/weddings" element={<Weddings />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <BookingDrawer />
        <Chatbot />
      </UIProvider>
    </HashRouter>
  );
}
