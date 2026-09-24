import { Outlet } from "react-router-dom";
import LiquidGlassNavbar from "../components/LiquidGlassNavbar";
import Footer from "../components/Footer";
import FloatingActionBar from "../components/FloatingActionBar";
import Preloader from "../components/Preloader";

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Preloader />
      <LiquidGlassNavbar />
      <main className="flex-grow pb-[calc(4rem+env(safe-area-inset-bottom,0px))] lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <FloatingActionBar />
    </div>
  );
}
