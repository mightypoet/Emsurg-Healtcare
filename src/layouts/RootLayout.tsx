import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingActionBar from "../components/FloatingActionBar";

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <main className="flex-grow pt-[114px]">
        {/* pt-[114px] accounts for the fixed header height (34px top bar + 80px main header) */}
        <Outlet />
      </main>
      <Footer />
      <FloatingActionBar />
    </div>
  );
}
