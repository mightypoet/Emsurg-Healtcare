import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import PlaceholderPage from "./pages/PlaceholderPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blogs" element={<BlogList />} />
          <Route path="blogs/:slug" element={<BlogPost />} />
          <Route path="innovation" element={<PlaceholderPage title="Innovation & R&D" />} />
          <Route path="partners" element={<PlaceholderPage title="Global Partners" />} />
          <Route path="insights" element={<PlaceholderPage title="Insights & Blog" />} />
          <Route path="careers" element={<PlaceholderPage title="Careers at Emsurg" />} />
          <Route path="locations" element={<PlaceholderPage title="Our Locations" />} />
          <Route path="leaders" element={<PlaceholderPage title="Leadership" />} />
          <Route path="gallery" element={<PlaceholderPage title="Gallery" />} />
          <Route path="faq" element={<PlaceholderPage title="Frequently Asked Questions" />} />
          <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
        </Route>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
