import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Showcase from "./components/Showcase";
const Specs = lazy(() => import("./components/pages/Specs"));
const Design = lazy(() => import("./components/pages/Design"));
const Reviews = lazy(() => import("./components/pages/Reviews"));
const Checkout = lazy(() => import("./components/pages/Checkout"));

const Home = () => (
  <>
    <Hero />
    <Features />
    <Showcase />
  </>
);

function App() {
  return (
    <CartProvider>
      <Router>
        <MotionConfig reducedMotion="user">
          <main className="bg-brand-black min-h-screen text-brand-white selection:bg-brand-gray selection:text-brand-white relative">
            <Navbar />
            <CartDrawer />
            <Suspense fallback={<div className="min-h-screen bg-brand-black" aria-label="Loading page" />}>
              <PageRoutes />
            </Suspense>
            <Footer />
          </main>
        </MotionConfig>
      </Router>
    </CartProvider>
  );
}

function PageRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/specs" element={<Specs />} />
          <Route path="/design" element={<Design />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/buy" element={<Checkout />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
